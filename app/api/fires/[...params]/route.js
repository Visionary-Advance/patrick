// app/api/fires/[...params]/route.js - Enhanced for full US coverage
import { LRUCache } from 'lru-cache';
import { NextRequest, NextResponse } from 'next/server';

// Global cache
const cache = new LRUCache({
  max: 100,
  ttl: 10 * 60 * 1000, // 10 minutes
});

const MAP_KEY = process.env.NASA_FIRMS_API_KEY || '189eab2d38f449abfe5ce4a50870c25a';

// Enhanced US regional coverage - covers all major fire-prone areas
const US_REGIONS = {
  // Large regional areas for comprehensive coverage
  'USA_WEST': {
    name: 'US West Coast + Rockies',
    bounds: '-125,30,-102,49', // CA, OR, WA, NV, ID, MT, WY, UT, CO, AZ, NM
    description: 'Western US including Pacific Coast and Rocky Mountains'
  },
  'USA_CENTRAL': {
    name: 'US Central Plains + Texas',
    bounds: '-107,25,-90,49', // TX, OK, KS, NE, SD, ND, parts of surrounding states
    description: 'Central US plains and Texas'
  },
  'USA_EAST': {
    name: 'US Eastern States',
    bounds: '-95,24,-66,47', // Eastern seaboard and Great Lakes
    description: 'Eastern US including Florida to Maine'
  },
  'USA_SOUTHEAST': {
    name: 'US Southeast',
    bounds: '-95,24,-75,37', // FL, GA, AL, MS, LA, AR, TN, SC, NC
    description: 'Southeastern US including Florida and Gulf Coast'
  },
  'USA_ALASKA': {
    name: 'Alaska',
    bounds: '-180,54,-125,72', // Full Alaska
    description: 'Alaska - often has significant wildfire activity'
  }
};

// Alternative approach: Use multiple country API calls for comprehensive coverage
const COMPREHENSIVE_REGIONS = [
  // Primary approach: Try area-based for different US regions
  { type: 'area', region: 'USA_WEST', sensor: 'VIIRS_SNPP_NRT' },
  { type: 'area', region: 'USA_CENTRAL', sensor: 'VIIRS_SNPP_NRT' },
  { type: 'area', region: 'USA_EAST', sensor: 'VIIRS_SNPP_NRT' },
  { type: 'area', region: 'USA_SOUTHEAST', sensor: 'VIIRS_SNPP_NRT' },
  { type: 'area', region: 'USA_ALASKA', sensor: 'VIIRS_SNPP_NRT' },
  
  // Backup approach: Try different sensors for USA
  { type: 'country', region: 'USA', sensor: 'MODIS_A' },
  { type: 'country', region: 'USA', sensor: 'MODIS_T' },
  { type: 'country', region: 'USA', sensor: 'VIIRS_NOAA20_NRT' },
];

// Fetch and combine data from multiple sources
const fetchComprehensiveUSData = async (requestedSensor, days) => {
  console.log('🇺🇸 Fetching comprehensive US fire data...');
  
  let allFires = [];
  let successfulSources = [];
  let failedSources = [];
  
  // Try area-based approach first (more comprehensive)
  for (const regionName of Object.keys(US_REGIONS)) {
    try {
      console.log(`🗺️ Fetching ${regionName}...`);
      
      const region = US_REGIONS[regionName];
      const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD format
      
      // Area API: /api/area/csv/{api_key}/{source}/{area_extent}/{dayrange}/{date}
      const areaUrl = `https://firms.modaps.eosdis.nasa.gov/api/area/csv/${MAP_KEY}/${requestedSensor}/${region.bounds}/${days}/${today}`;
      
      console.log(`🔗 Area URL: ${areaUrl.replace(MAP_KEY, '[API_KEY]')}`);
      
      const response = await fetch(areaUrl, {
        headers: {
          'User-Agent': 'NextJS-Wildfire-App/1.0',
          'Accept': 'text/csv,text/plain',
        },
        signal: AbortSignal.timeout(20000)
      });
      
      if (response.ok) {
        const data = await response.text();
        
        if (data.length > 50 && data.includes('latitude') && !data.includes('Invalid')) {
          const fires = parseCSVToArray(data, regionName);
          allFires = allFires.concat(fires);
          
          successfulSources.push({
            type: 'area',
            region: regionName,
            count: fires.length,
            method: 'Area-based API'
          });
          
          console.log(`✅ ${regionName}: ${fires.length} fires`);
        } else {
          console.log(`⚠️ ${regionName}: No fire data (${data.length} chars)`);
          failedSources.push({
            type: 'area',
            region: regionName,
            reason: 'No fire data available',
            responseLength: data.length
          });
        }
      } else {
        failedSources.push({
          type: 'area',
          region: regionName,
          reason: `HTTP ${response.status}`,
          url: areaUrl.replace(MAP_KEY, '[API_KEY]')
        });
      }
      
    } catch (error) {
      console.log(`❌ ${regionName} failed: ${error.message}`);
      failedSources.push({
        type: 'area',
        region: regionName,
        reason: error.message
      });
    }
    
    // Small delay to avoid rate limiting
    await new Promise(resolve => setTimeout(resolve, 500));
  }
  
  // If area-based didn't get much data, try country-based with different sensors
  if (allFires.length < 10) {
    console.log('🔄 Area-based got limited data, trying country-based approaches...');
    
    const countrySensors = ['MODIS_A', 'MODIS_T', 'VIIRS_NOAA20_NRT', 'VIIRS_SNPP_NRT'];
    
    for (const sensor of countrySensors) {
      try {
        console.log(`🛰️ Trying USA with ${sensor}...`);
        
        const countryUrl = `https://firms.modaps.eosdis.nasa.gov/api/country/csv/${MAP_KEY}/${sensor}/USA/${days}`;
        
        const response = await fetch(countryUrl, {
          headers: {
            'User-Agent': 'NextJS-Wildfire-App/1.0',
            'Accept': 'text/csv,text/plain',
          },
          signal: AbortSignal.timeout(15000)
        });
        
        if (response.ok) {
          const data = await response.text();
          
          if (data.length > 50 && data.includes('latitude') && !data.includes('Invalid')) {
            const fires = parseCSVToArray(data, `USA_${sensor}`);
            
            // Avoid duplicates by checking coordinates
            const newFires = fires.filter(newFire => 
              !allFires.some(existingFire => 
                Math.abs(existingFire.lat - newFire.lat) < 0.001 && 
                Math.abs(existingFire.lng - newFire.lng) < 0.001
              )
            );
            
            allFires = allFires.concat(newFires);
            
            successfulSources.push({
              type: 'country',
              region: `USA_${sensor}`,
              count: newFires.length,
              totalCount: fires.length,
              method: 'Country-based API'
            });
            
            console.log(`✅ USA/${sensor}: ${newFires.length} new fires (${fires.length} total)`);
          }
        }
        
      } catch (error) {
        console.log(`❌ USA/${sensor} failed: ${error.message}`);
        failedSources.push({
          type: 'country',
          region: `USA_${sensor}`,
          reason: error.message
        });
      }
      
      await new Promise(resolve => setTimeout(resolve, 500));
    }
  }
  
  // Remove exact duplicates (same lat/lng/time)
  const uniqueFires = allFires.filter((fire, index, self) => 
    index === self.findIndex(f => 
      f.lat === fire.lat && 
      f.lng === fire.lng && 
      f.acq_date === fire.acq_date && 
      f.acq_time === fire.acq_time
    )
  );
  
  console.log(`🔥 Total unique fires found: ${uniqueFires.length}`);
  console.log(`📊 Successful sources: ${successfulSources.length}`);
  console.log(`❌ Failed sources: ${failedSources.length}`);
  
  return {
    fires: uniqueFires,
    successfulSources,
    failedSources,
    totalSources: successfulSources.length + failedSources.length
  };
};

// Parse CSV data into array of fire objects
const parseCSVToArray = (csvText, regionName = '') => {
  try {
    const lines = csvText.trim().split('\n');
    if (lines.length < 2) return [];
    
    const headers = lines[0].split(',').map(h => h.trim());
    const fires = [];
    
    for (let i = 1; i < lines.length; i++) {
      const values = lines[i].split(',').map(v => v.trim());
      
      if (values.length < headers.length) continue;
      
      const fire = {};
      headers.forEach((header, index) => {
        fire[header] = values[index] || '';
      });
      
      // Validate coordinates
      if (!fire.latitude || !fire.longitude) continue;
      
      fire.lat = parseFloat(fire.latitude);
      fire.lng = parseFloat(fire.longitude);
      
      if (isNaN(fire.lat) || isNaN(fire.lng)) continue;
      
      // Add source region info
      fire.sourceRegion = regionName;
      
      fires.push(fire);
    }
    
    return fires;
  } catch (error) {
    console.error(`Error parsing CSV for ${regionName}:`, error);
    return [];
  }
};

// Convert fire array back to CSV format
const arrayToCSV = (fires) => {
  if (fires.length === 0) {
    return 'latitude,longitude,bright_ti4,scan,track,acq_date,acq_time,satellite,instrument,confidence,version,bright_ti5,frp,daynight\n';
  }
  
  // Get all unique headers from all fire objects
  const allHeaders = new Set();
  fires.forEach(fire => {
    Object.keys(fire).forEach(key => {
      if (key !== 'sourceRegion') { // Exclude our added field
        allHeaders.add(key);
      }
    });
  });
  
  const headers = Array.from(allHeaders);
  const csvLines = [headers.join(',')];
  
  fires.forEach(fire => {
    const row = headers.map(header => fire[header] || '').join(',');
    csvLines.push(row);
  });
  
  return csvLines.join('\n');
};

export async function GET(request, { params }) {
  const requestStart = Date.now();
  console.log('🔥 Comprehensive US Fire Data API Called at', new Date().toISOString());
  
  try {
    // Handle params
    let resolvedParams;
    try {
      resolvedParams = await params;
    } catch (error) {
      resolvedParams = params;
    }
    
    const routeParams = resolvedParams?.params || resolvedParams;
    
    if (!Array.isArray(routeParams) || routeParams.length < 3) {
      return NextResponse.json({ 
        error: 'Invalid parameters',
        expected: '[sensor, country, days]',
        received: routeParams,
        example: '/api/fires/VIIRS_SNPP_NRT/USA/1'
      }, { status: 400 });
    }

    const [sensor, country, days] = routeParams;
    const daysNum = parseInt(days);
    
    // For USA requests, use comprehensive approach
    if (country.toUpperCase() === 'USA') {
      const cacheKey = `comprehensive_${sensor}_USA_${days}`;
      
      // Check cache first
      const cachedData = cache.get(cacheKey);
      if (cachedData) {
        console.log(`✅ Cache HIT: ${cacheKey}`);
        return new NextResponse(cachedData, {
          status: 200,
          headers: {
            'Content-Type': 'text/csv',
            'X-Cache': 'HIT',
            'X-Request-Duration': `${Date.now() - requestStart}ms`,
          },
        });
      }

      console.log(`❌ Cache MISS: ${cacheKey} - Fetching comprehensive US data`);
      
      // Fetch comprehensive US data
      const result = await fetchComprehensiveUSData(sensor, daysNum);
      
      if (result.fires.length > 0) {
        // Convert back to CSV format
        const csvData = arrayToCSV(result.fires);
        
        // Cache the successful data
        cache.set(cacheKey, csvData);
        
        const headers = {
          'Content-Type': 'text/csv',
          'X-Cache': 'MISS',
          'X-Method': 'comprehensive_us',
          'X-Fire-Count': result.fires.length.toString(),
          'X-Successful-Sources': result.successfulSources.length.toString(),
          'X-Failed-Sources': result.failedSources.length.toString(),
          'X-Request-Duration': `${Date.now() - requestStart}ms`,
        };
        
        console.log(`✅ Returning ${result.fires.length} fires from ${result.successfulSources.length} sources`);
        return new NextResponse(csvData, { status: 200, headers });
        
      } else {
        // No fires found
        const totalDuration = Date.now() - requestStart;
        
        return NextResponse.json({
          error: 'No fires found in comprehensive US search',
          details: {
            successfulSources: result.successfulSources,
            failedSources: result.failedSources,
            totalDuration: `${totalDuration}ms`,
            suggestion: 'No active fires detected in the US at this time, or all data sources are temporarily unavailable'
          }
        }, { 
          status: 404,
          headers: {
            'X-Request-Duration': `${totalDuration}ms`
          }
        });
      }
    } else {
      // For non-USA countries, use the original single-source approach
      const cacheKey = `${sensor}_${country}_${days}`;
      
      const cachedData = cache.get(cacheKey);
      if (cachedData) {
        console.log(`✅ Cache HIT: ${cacheKey}`);
        return new NextResponse(cachedData, {
          status: 200,
          headers: {
            'Content-Type': 'text/csv',
            'X-Cache': 'HIT',
            'X-Request-Duration': `${Date.now() - requestStart}ms`,
          },
        });
      }

      // Single country approach
      const countryUrl = `https://firms.modaps.eosdis.nasa.gov/api/country/csv/${MAP_KEY}/${sensor}/${country}/${days}`;
      
      const response = await fetch(countryUrl, {
        headers: {
          'User-Agent': 'NextJS-Wildfire-App/1.0',
          'Accept': 'text/csv,text/plain',
        },
        signal: AbortSignal.timeout(15000)
      });
      
      if (response.ok) {
        const data = await response.text();
        
        if (data.length > 50 && data.includes('latitude') && !data.includes('Invalid')) {
          cache.set(cacheKey, data);
          
          return new NextResponse(data, {
            status: 200,
            headers: {
              'Content-Type': 'text/csv',
              'X-Cache': 'MISS',
              'X-Method': 'single_country',
              'X-Request-Duration': `${Date.now() - requestStart}ms`,
            },
          });
        }
      }
      
      return NextResponse.json({
        error: 'No fire data available',
        country: country,
        sensor: sensor
      }, { status: 404 });
    }

  } catch (error) {
    console.error('💥 API Route Error:', error);
    
    return NextResponse.json({ 
      error: 'Internal server error',
      message: error.message,
      timestamp: new Date().toISOString()
    }, { status: 500 });
  }
}