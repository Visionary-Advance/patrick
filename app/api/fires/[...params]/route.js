// app/api/fires/[...params]/route.js (Retry until success - no sample data)
import { LRUCache } from 'lru-cache';
import { NextRequest, NextResponse } from 'next/server';

// Global cache that persists across requests
const cache = new LRUCache({
  max: 100,
  ttl: 10 * 60 * 1000, // 10 minutes
});

const MAP_KEY = process.env.NASA_FIRMS_API_KEY || '189eab2d38f449abfe5ce4a50870c25a';

// Retry configuration
const RETRY_CONFIG = {
  maxAttempts: 5,
  baseDelay: 2000, // 2 seconds
  maxDelay: 30000, // 30 seconds
  timeoutIncrement: 10000, // Increase timeout by 10s each attempt
  initialTimeout: 15000 // Start with 15 second timeout
};

// Exponential backoff with jitter
const calculateDelay = (attempt) => {
  const exponentialDelay = RETRY_CONFIG.baseDelay * Math.pow(2, attempt - 1);
  const jitter = Math.random() * 1000; // Add up to 1 second of randomness
  return Math.min(exponentialDelay + jitter, RETRY_CONFIG.maxDelay);
};

// Sleep function
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export async function GET(request, { params }) {
  console.log('🔥 API Route Called');
  console.log('Request URL:', request.url);
  
  try {
    // Next.js 15+ requires awaiting params
    const resolvedParams = await params;
    console.log('Resolved params:', resolvedParams);
    
    if (!resolvedParams || !resolvedParams.params) {
      console.error('❌ No params received');
      return NextResponse.json({ 
        error: 'No parameters provided' 
      }, { status: 400 });
    }

    const { params: routeParams } = resolvedParams;
    console.log('Route params:', routeParams);
    
    if (!Array.isArray(routeParams) || routeParams.length < 3) {
      console.error('❌ Invalid parameters:', routeParams);
      return NextResponse.json({ 
        error: 'Expected [sensor, country, days] parameters',
        received: routeParams
      }, { status: 400 });
    }

    const [sensor, country, days] = routeParams;
    console.log('✅ Parsed params:', { sensor, country, days });

    const cacheKey = `${sensor}_${country}_${days}`;
    console.log('🔍 Cache key:', cacheKey);
    
    // Check cache first
    let cachedData = cache.get(cacheKey);
    
    if (cachedData) {
      console.log(`✅ Cache HIT: ${cacheKey}`);
      return new NextResponse(cachedData, {
        status: 200,
        headers: {
          'Content-Type': 'text/csv',
          'X-Cache': 'HIT',
          'Cache-Control': 'public, max-age=300',
        },
      });
    }

    console.log(`❌ Cache MISS: ${cacheKey}`);
    
    // Retry NASA API until success
    const nasaUrl = `https://firms.modaps.eosdis.nasa.gov/api/country/csv/${MAP_KEY}/${sensor}/${country}/${days}`;
    console.log('NASA URL:', nasaUrl);

    let lastError = null;
    
    for (let attempt = 1; attempt <= RETRY_CONFIG.maxAttempts; attempt++) {
      try {
        // Calculate timeout for this attempt (increase each time)
        const timeout = RETRY_CONFIG.initialTimeout + (RETRY_CONFIG.timeoutIncrement * (attempt - 1));
        
        console.log(`🌐 NASA API Attempt ${attempt}/${RETRY_CONFIG.maxAttempts} (timeout: ${timeout/1000}s)`);
        
        const response = await fetch(nasaUrl, {
          signal: AbortSignal.timeout(timeout),
          headers: {
            'User-Agent': 'NextJS-Wildfire-App/1.0',
            'Accept': 'text/csv,text/plain',
            'Connection': 'keep-alive'
          }
        });

        console.log(`📡 Response status: ${response.status}`);
        
        if (response.ok) {
          const fireData = await response.text();
          
          // Validate the data
          if (fireData && fireData.includes('latitude') && fireData.length > 100) {
            console.log(`✅ NASA API SUCCESS on attempt ${attempt}! Data length: ${fireData.length} chars`);
            
            // Cache the successful data
            cache.set(cacheKey, fireData);
            
            return new NextResponse(fireData, {
              status: 200,
              headers: {
                'Content-Type': 'text/csv',
                'X-Cache': 'MISS',
                'X-Retry-Attempt': attempt.toString(),
                'Cache-Control': 'public, max-age=300',
              },
            });
          } else {
            throw new Error(`Invalid data received: length=${fireData?.length}, hasLatitude=${fireData?.includes('latitude')}`);
          }
        } else {
          // Handle specific HTTP errors
          const errorText = await response.text().catch(() => 'No error details');
          
          if (response.status === 429) {
            throw new Error(`Rate limited (429) - ${errorText}`);
          } else if (response.status >= 500) {
            throw new Error(`Server error (${response.status}) - ${errorText}`);
          } else {
            throw new Error(`HTTP ${response.status} - ${errorText}`);
          }
        }
        
      } catch (error) {
        lastError = error;
        console.warn(`⚠️ Attempt ${attempt} failed: ${error.message}`);
        
        // Don't retry on certain errors
        if (error.message.includes('AbortError') && error.message.includes('timeout')) {
          console.log('   → Timeout error, will retry with longer timeout');
        } else if (error.message.includes('Rate limited')) {
          console.log('   → Rate limited, will wait longer before retry');
        } else if (error.message.includes('400')) {
          // Don't retry on 400 errors (bad request)
          console.error('❌ Bad request error, not retrying');
          break;
        }
        
        // Wait before next attempt (except on last attempt)
        if (attempt < RETRY_CONFIG.maxAttempts) {
          const delay = calculateDelay(attempt);
          console.log(`   ⏳ Waiting ${delay/1000}s before next attempt...`);
          await sleep(delay);
        }
      }
    }
    
    // All attempts failed
    console.error(`❌ All ${RETRY_CONFIG.maxAttempts} attempts failed. Last error:`, lastError?.message);
    
    return NextResponse.json({ 
      error: 'NASA API failed after multiple attempts',
      details: {
        attempts: RETRY_CONFIG.maxAttempts,
        lastError: lastError?.message || 'Unknown error',
        suggestion: 'NASA API may be experiencing issues. Please try again later.',
        retryAfter: '5-10 minutes'
      },
      timestamp: new Date().toISOString()
    }, { 
      status: 503, // Service Unavailable
      headers: {
        'Retry-After': '300' // Suggest retry after 5 minutes
      }
    });

  } catch (error) {
    console.error('💥 API Route Error:', error);
    
    return NextResponse.json({ 
      error: 'Internal server error',
      message: error.message,
      timestamp: new Date().toISOString()
    }, { status: 500 });
  }
}