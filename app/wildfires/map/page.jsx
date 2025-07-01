'use client'

import React, { useState, useEffect, useRef } from 'react';
import { Flame, MapPin, AlertTriangle, ChevronLeft, ChevronRight, Layers, ArrowLeft } from 'lucide-react';

const InteractiveWildfireMap = () => {
  const [fires, setFires] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [lastUpdate, setLastUpdate] = useState('');
  const [selectedFire, setSelectedFire] = useState(null);
  const [mapType, setMapType] = useState('satellite');
  const [locationCache, setLocationCache] = useState({});
  const [selectedRegion, setSelectedRegion] = useState('USA');
  const [loadingProgress, setLoadingProgress] = useState('');
  const [leftPanelCollapsed, setLeftPanelCollapsed] = useState(true);
  const [rightPanelCollapsed, setRightPanelCollapsed] = useState(true);
  const [topPanelCollapsed, setTopPanelCollapsed] = useState(false);
  const [instructionsVisible, setInstructionsVisible] = useState(false);
  const [cacheStats, setCacheStats] = useState({ hits: 0, misses: 0, size: 0 });
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markersRef = useRef([]);

  // Get NASA FIRMS API key from environment variables
  const MAP_KEY = process.env.REACT_APP_NASA_FIRMS_API_KEY || '189eab2d38f449abfe5ce4a50870c25a';
  
  // Cache configuration
  const CACHE_DURATION = 10 * 60 * 1000; // 10 minutes in milliseconds
  const CACHE_KEY_PREFIX = 'wildfire_data_';
  const MAX_CACHE_SIZE = 50; // Maximum number of cached entries

  // Memory cache for fire data
  const fireDataCache = useRef(new Map());

  // Create cache key based on parameters
  const createCacheKey = (country, days, sensor) => {
    return `${CACHE_KEY_PREFIX}${country}_${days}_${sensor}`;
  };

  // Check if cached data is still valid
  const isCacheValid = (cachedData) => {
    if (!cachedData || !cachedData.timestamp) return false;
    const now = Date.now();
    const age = now - cachedData.timestamp;
    return age < CACHE_DURATION;
  };

  // Get data from cache
  const getCachedData = (cacheKey) => {
    try {
      // Check memory cache first
      const memoryData = fireDataCache.current.get(cacheKey);
      if (memoryData && isCacheValid(memoryData)) {
        console.log(`Cache HIT (memory): ${cacheKey}`);
        setCacheStats(prev => ({ ...prev, hits: prev.hits + 1 }));
        return memoryData.data;
      }

      // Check sessionStorage cache
      const sessionData = sessionStorage.getItem(cacheKey);
      if (sessionData) {
        const parsed = JSON.parse(sessionData);
        if (isCacheValid(parsed)) {
          console.log(`Cache HIT (session): ${cacheKey}`);
          // Also store in memory for faster access
          fireDataCache.current.set(cacheKey, parsed);
          setCacheStats(prev => ({ ...prev, hits: prev.hits + 1 }));
          return parsed.data;
        } else {
          // Remove expired cache
          sessionStorage.removeItem(cacheKey);
        }
      }

      console.log(`Cache MISS: ${cacheKey}`);
      setCacheStats(prev => ({ ...prev, misses: prev.misses + 1 }));
      return null;
    } catch (error) {
      console.warn('Cache read error:', error);
      return null;
    }
  };

  // Store data in cache
  const setCachedData = (cacheKey, data) => {
    try {
      const cachedData = {
        data: data,
        timestamp: Date.now()
      };

      // Store in memory cache
      fireDataCache.current.set(cacheKey, cachedData);

      // Store in sessionStorage (with size limit)
      try {
        sessionStorage.setItem(cacheKey, JSON.stringify(cachedData));
      } catch (storageError) {
        console.warn('SessionStorage full, clearing old cache entries');
        clearOldCacheEntries();
        try {
          sessionStorage.setItem(cacheKey, JSON.stringify(cachedData));
        } catch (retryError) {
          console.warn('Still unable to cache to sessionStorage:', retryError);
        }
      }

      // Limit memory cache size
      if (fireDataCache.current.size > MAX_CACHE_SIZE) {
        const firstKey = fireDataCache.current.keys().next().value;
        fireDataCache.current.delete(firstKey);
      }

      setCacheStats(prev => ({ 
        ...prev, 
        size: fireDataCache.current.size 
      }));

      console.log(`Data cached: ${cacheKey}`);
    } catch (error) {
      console.warn('Cache write error:', error);
    }
  };

  // Clear expired cache entries
  const clearOldCacheEntries = () => {
    try {
      const keysToRemove = [];
      
      // Check sessionStorage
      for (let i = 0; i < sessionStorage.length; i++) {
        const key = sessionStorage.key(i);
        if (key && key.startsWith(CACHE_KEY_PREFIX)) {
          try {
            const data = JSON.parse(sessionStorage.getItem(key));
            if (!isCacheValid(data)) {
              keysToRemove.push(key);
            }
          } catch (e) {
            keysToRemove.push(key);
          }
        }
      }

      keysToRemove.forEach(key => sessionStorage.removeItem(key));

      // Check memory cache
      for (const [key, data] of fireDataCache.current.entries()) {
        if (!isCacheValid(data)) {
          fireDataCache.current.delete(key);
        }
      }

      console.log(`Cleared ${keysToRemove.length} expired cache entries`);
    } catch (error) {
      console.warn('Error clearing cache:', error);
    }
  };

  
  // Enhanced function to get detailed fire size and intensity information
  const getDetailedFireInfo = (frp, confidence, brightness) => {
    const power = parseFloat(frp) || 0;
    const bright = parseFloat(brightness) || 0;
    const conf = confidence;
    
    let sizeCategory = '';
    let intensityLevel = '';
    let estimatedSize = '';
    let description = '';
    
    // Determine size category based on Fire Radiative Power (FRP)
    if (power >= 100) {
      sizeCategory = 'Large Wildfire';
      estimatedSize = 'Potentially 1,000+ acres';
      description = 'Major incident requiring significant resources';
    } else if (power >= 50) {
      sizeCategory = 'Substantial Fire';
      estimatedSize = 'Potentially 500-1,000 acres';
      description = 'Significant fire requiring active suppression';
    } else if (power >= 20) {
      sizeCategory = 'Medium Fire';
      estimatedSize = 'Potentially 100-500 acres';
      description = 'Active fire requiring monitoring and resources';
    } else if (power >= 5) {
      sizeCategory = 'Small Fire';
      estimatedSize = 'Potentially 10-100 acres';
      description = 'Contained incident or growing fire';
    } else if (power >= 1) {
      sizeCategory = 'Hotspot';
      estimatedSize = 'Under 10 acres';
      description = 'Small fire or spot fire';
    } else if (power > 0) {
      sizeCategory = 'Heat Source';
      estimatedSize = 'Very small area';
      description = 'Possible ignition or smoldering';
    } else {
      sizeCategory = 'Thermal Anomaly';
      estimatedSize = 'Unknown';
      description = 'Heat detection without power measurement';
    }
    
    // Determine intensity based on brightness and confidence
    if (conf === 'high' || bright > 340) {
      intensityLevel = 'Very High Intensity';
    } else if (conf === 'nominal' || bright > 320) {
      intensityLevel = 'High Intensity';
    } else if (bright > 310) {
      intensityLevel = 'Moderate Intensity';
    } else {
      intensityLevel = 'Low Intensity';
    }
    
    return {
      sizeCategory,
      intensityLevel,
      estimatedSize,
      description,
      powerMW: power > 0 ? `${power.toFixed(1)} MW` : 'No data',
      temperatureK: bright > 0 ? `${bright.toFixed(0)}K (${((bright - 273.15) * 9/5 + 32).toFixed(0)}°F)` : 'No data'
    };
  };

  // Function to get human-readable fire size description
  const getFireSizeDescription = (frp, confidence, brightness) => {
    const fireInfo = getDetailedFireInfo(frp, confidence, brightness);
    return `${fireInfo.sizeCategory} (${fireInfo.intensityLevel})`;
  };

  // Function to get risk level description
  const getRiskLevel = (confidence, brightness) => {
    const conf = confidence;
    const bright = parseFloat(brightness) || 0;
    
    if (conf === 'high' || bright > 340) {
      return { level: 'HIGH RISK', color: '#dc2626', description: 'Confirmed active fire - immediate attention needed' };
    } else if (conf === 'nominal' || bright > 320) {
      return { level: 'MEDIUM RISK', color: '#ea580c', description: 'Likely fire activity - monitoring recommended' };
    } else {
      return { level: 'LOW RISK', color: '#ca8a04', description: 'Possible fire or heat source - verification needed' };
    }
  };

  // Function to format detection time in user-friendly way
  const formatDetectionTime = (date, time) => {
    try {
      const dateStr = date.replace(/-/g, '/');
      const timeStr = time.padStart(4, '0');
      const hours = timeStr.slice(0, 2);
      const minutes = timeStr.slice(2, 4);
      
      const dateTime = new Date(`${dateStr} ${hours}:${minutes}:00 UTC`);
      const now = new Date();
      const diffHours = Math.floor((now - dateTime) / (1000 * 60 * 60));
      
      if (diffHours < 1) {
        return 'Detected less than 1 hour ago';
      } else if (diffHours < 24) {
        return `Detected ${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
      } else {
        const diffDays = Math.floor(diffHours / 24);
        return `Detected ${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
      }
    } catch (error) {
      return `Detected on ${date} at ${time} UTC`;
    }
  };

  // Simple state detection as fallback
  const getSimpleStateFromCoords = (lat, lng) => {
    const stateBounds = {
      'California': { minLat: 32.5, maxLat: 42.0, minLng: -124.5, maxLng: -114.1 },
      'Oregon': { minLat: 41.9, maxLat: 46.3, minLng: -124.6, maxLng: -116.5 },
      'Washington': { minLat: 45.5, maxLat: 49.0, minLng: -124.8, maxLng: -116.9 },
      'Nevada': { minLat: 35.0, maxLat: 42.0, minLng: -120.0, maxLng: -114.0 },
      'Idaho': { minLat: 42.0, maxLat: 49.0, minLng: -117.2, maxLng: -111.0 },
      'Montana': { minLat: 44.4, maxLat: 49.0, minLng: -116.1, maxLng: -104.0 },
      'Wyoming': { minLat: 41.0, maxLat: 45.0, minLng: -111.1, maxLng: -104.0 },
      'Colorado': { minLat: 37.0, maxLat: 41.0, minLng: -109.1, maxLng: -102.0 },
      'Utah': { minLat: 37.0, maxLat: 42.0, minLng: -114.1, maxLng: -109.0 },
      'Arizona': { minLat: 31.3, maxLat: 37.0, minLng: -114.8, maxLng: -109.0 },
      'New Mexico': { minLat: 31.3, maxLat: 37.0, minLng: -109.1, maxLng: -103.0 },
      'Texas': { minLat: 25.8, maxLat: 36.5, minLng: -106.6, maxLng: -93.5 },
      'Florida': { minLat: 24.5, maxLat: 31.0, minLng: -87.6, maxLng: -80.0 },
      'Alaska': { minLat: 54.0, maxLat: 72.0, minLng: -180.0, maxLng: -125.0 },
    };
    
    for (const [state, bounds] of Object.entries(stateBounds)) {
      if (lat >= bounds.minLat && lat <= bounds.maxLat && 
          lng >= bounds.minLng && lng <= bounds.maxLng) {
        return state;
      }
    }
    
    if (lat >= 24.0 && lat <= 72.0 && lng >= -180.0 && lng <= -66.0) {
      return 'United States';
    }
    
    return `${lat.toFixed(4)}, ${lng.toFixed(4)}`;
  };

  // Clean up cache on component unmount
  useEffect(() => {
    // Clear expired cache entries on mount
    clearOldCacheEntries();
    
    return () => {
      // Clean up on unmount (optional)
      console.log('Component unmounting, cache preserved for next session');
    };
  }, []);

  // Hide Claude interface elements for full-screen experience
  useEffect(() => {
    // Add CSS to hide header and footer
    const style = document.createElement('style');
    style.id = 'hide-claude-ui';
    style.textContent = `
      /* Hide Claude interface elements */
      body {
        overflow: hidden !important;
      }
      
      /* Target common header/footer selectors */
      header, 
      .header,
      [class*="header"],
      [class*="Header"],
      footer,
      .footer,
      [class*="footer"],
      [class*="Footer"],
      nav,
      .nav,
      [class*="nav"],
      [class*="Nav"],
      .top-bar,
      .bottom-bar,
      .site-header,
      .site-footer {
        display: none !important;
        visibility: hidden !important;
        height: 0 !important;
        min-height: 0 !important;
        max-height: 0 !important;
        overflow: hidden !important;
      }
      
      /* Force full viewport */
      html, body {
        margin: 0 !important;
        padding: 0 !important;
        width: 100% !important;
        height: 100% !important;
        overflow: hidden !important;
      }
      
      /* Hide scrollbars */
      ::-webkit-scrollbar {
        display: none !important;
      }
      
      /* Target iframe container if in one */
      .artifact-container,
      .artifact-frame,
      iframe {
        width: 100vw !important;
        height: 100vh !important;
        border: none !important;
        margin: 0 !important;
        padding: 0 !important;
      }
    `;
    document.head.appendChild(style);
    
    // Try to hide parent elements if accessible
    try {
      if (window.parent && window.parent !== window) {
        const parentDoc = window.parent.document;
        const hideElements = parentDoc.querySelectorAll('header, footer, nav, .header, .footer, .nav, [class*="header"], [class*="footer"], [class*="nav"]');
        hideElements.forEach(el => {
          el.style.display = 'none';
          el.style.visibility = 'hidden';
          el.style.height = '0';
          el.style.overflow = 'hidden';
        });
      }
    } catch (e) {
      // Cross-origin restrictions prevent this, which is normal
      console.log('Cannot access parent elements due to cross-origin restrictions');
    }
    
    return () => {
      // Cleanup on unmount
      const styleEl = document.getElementById('hide-claude-ui');
      if (styleEl) {
        styleEl.remove();
      }
    };
  }, []);

  // Initialize map
  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;

    // Load Leaflet CSS and JS
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
    document.head.appendChild(link);

    const script = document.createElement('script');
    script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
    script.onload = () => {
      initializeMap();
    };
    document.head.appendChild(script);

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  const initializeMap = () => {
    if (!window.L || mapInstanceRef.current) return;

    // Initialize map centered on USA
    const map = window.L.map(mapRef.current, {
      center: [39.8283, -98.5795],
      zoom: 5,
      zoomControl: true,
      scrollWheelZoom: true,
      doubleClickZoom: true,
      dragging: true,
      worldCopyJump: false,
      maxBounds: [[-90, -180], [90, 180]],
      maxBoundsViscosity: 1.0
    });

    // Add base layers
    const satelliteLayer = window.L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
      attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community',
      maxZoom: 18
    });

    const streetLayer = window.L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      maxZoom: 18
    });

    const terrainLayer = window.L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
      attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)',
      maxZoom: 17
    });

    // Add default layer
    satelliteLayer.addTo(map);

    // Store layer references
    map.baseLayers = {
      satellite: satelliteLayer,
      street: streetLayer,
      terrain: terrainLayer
    };

    mapInstanceRef.current = map;

    // Fetch initial fire data for the USA
    fetchFireDataByRegions();
  };

  // New approach: Fetch data by major regions to avoid timeouts
  const fetchFireDataByRegions = async () => {
    setLoading(true);
    setError('');
    setLoadingProgress('Starting data collection...');
    
    try {
      // Try to get USA data directly first with a longer timeout
      setLoadingProgress('Attempting direct USA data fetch...');
      await fetchFireDataDirect('USA', 1);
      
    } catch (directError) {
      console.warn('Direct USA fetch failed, trying fallback approach:', directError);
      
      
     
      
      // Update map markers
      updateMapMarkers(sampleFires);
    } finally {
      setLoading(false);
      setTimeout(() => setLoadingProgress(''), 3000);
    }
  };

 

  // Remove all the client-side caching code and just call your API
const fetchFireDataDirect = async (country = 'USA', days = 1, sensor = 'VIIRS_SNPP_NRT') => {
  try {
    setLoadingProgress('Fetching from server...');
    
    const response = await fetch(`/api/fires/${sensor}/${country}/${days}`);
    const csvData = await response.text();
    const parsedFires = await parseCSVData(csvData);
    
    setFires(parsedFires);
    updateMapMarkers(parsedFires);
  } catch (error) {
    console.error('API failed:', error);
  }
};

  

  const parseCSVData = async (csvText, regionName = '') => {
    const lines = csvText.trim().split('\n');
    if (lines.length < 2) return [];
    
    const headers = lines[0].split(',');
    const fires = [];
    
    for (let i = 1; i < lines.length; i++) {
      const values = lines[i].split(',');
      if (values.length >= headers.length) {
        const fire = {};
        headers.forEach((header, index) => {
          fire[header.trim()] = values[index] ? values[index].trim() : '';
        });
        
        // Only include fires with valid coordinates
        if (fire.latitude && fire.longitude) {
          fire.lat = parseFloat(fire.latitude);
          fire.lng = parseFloat(fire.longitude);
          
          // Add human-readable data
          fire.locationName = regionName || getSimpleStateFromCoords(fire.lat, fire.lng);
          fire.sizeDescription = getFireSizeDescription(
            fire.frp, 
            fire.confidence, 
            fire.bright_ti4 || fire.brightness
          );
          fire.detailedFireInfo = getDetailedFireInfo(
            fire.frp, 
            fire.confidence, 
            fire.bright_ti4 || fire.brightness
          );
          fire.riskLevel = getRiskLevel(fire.confidence, fire.bright_ti4 || fire.brightness);
          fire.timeDescription = formatDetectionTime(fire.acq_date, fire.acq_time);
          
          fires.push(fire);
        }
      }
    }
    
    return fires;
  };

  const updateMapMarkers = (fireData) => {
    if (!mapInstanceRef.current || !window.L) return;

    // Clear existing markers
    markersRef.current.forEach(marker => {
      mapInstanceRef.current.removeLayer(marker);
    });
    markersRef.current = [];

    // Limit markers for performance (show only high-risk fires if too many)
    let displayFires = fireData;
    if (fireData.length > 1000) {
      displayFires = fireData
        .filter(fire => fire.riskLevel.level === 'HIGH RISK')
        .concat(
          fireData
            .filter(fire => fire.riskLevel.level === 'MEDIUM RISK')
            .slice(0, 500)
        );
    }

    // Add new markers
    displayFires.forEach((fire) => {
      const color = getFireColor(fire.confidence, fire.bright_ti4 || fire.brightness);
      const size = getFireSize(fire.confidence, fire.bright_ti4 || fire.brightness);
      
      // Create custom icon
      const fireIcon = window.L.divIcon({
        className: 'fire-marker',
        html: `<div style="
          background-color: ${color};
          width: ${size}px;
          height: ${size}px;
          border-radius: 50%;
          border: 2px solid white;
          box-shadow: 0 2px 4px rgba(0,0,0,0.3);
          animation: pulse 2s infinite;
        "></div>`,
        iconSize: [size, size],
        iconAnchor: [size/2, size/2]
      });

      // Create marker
      const marker = window.L.marker([fire.lat, fire.lng], { icon: fireIcon })
        .on('click', () => setSelectedFire(fire));

      // Add popup with enhanced fire information
      const riskBadge = `
        <span style="
          background: ${fire.riskLevel.color}; 
          color: white; 
          padding: 4px 8px; 
          border-radius: 12px; 
          font-size: 12px;
          font-weight: bold;
        ">${fire.riskLevel.level}</span>
      `;

      const popupContent = `
        <div style="min-width: 280px; font-family: Arial, sans-serif;">
          <h3 style="margin: 0 0 8px 0; color: #dc2626; display: flex; align-items: center; gap: 4px;">
            🔥 ${fire.detailedFireInfo.sizeCategory}
          </h3>
          
          <div style="margin: 8px 0;">
            ${riskBadge}
          </div>
          
          <div style="margin: 8px 0; padding: 8px; background: #f3f4f6; border-radius: 4px;">
            <p style="margin: 0; font-weight: bold; color: #374151;">📍 Location:</p>
            <p style="margin: 2px 0 0 0; color: #6b7280;">${fire.locationName}</p>
          </div>
          
          <div style="margin: 8px 0; padding: 8px; background: #fef3c7; border-radius: 4px; border-left: 4px solid #f59e0b;">
            <p style="margin: 0; font-weight: bold; color: #92400e;">🔥 Fire Size Estimate:</p>
            <p style="margin: 2px 0 0 0; color: #92400e;">${fire.detailedFireInfo.estimatedSize}</p>
            <p style="margin: 4px 0 0 0; font-size: 11px; color: #a16207;">${fire.detailedFireInfo.description}</p>
          </div>
          
          <div style="margin: 8px 0;">
            <p style="margin: 4px 0;"><strong>🕐 When:</strong> ${fire.timeDescription}</p>
            <p style="margin: 4px 0;"><strong>⚡ Power Output:</strong> ${fire.detailedFireInfo.powerMW}</p>
            <p style="margin: 4px 0;"><strong>🌡️ Temperature:</strong> ${fire.detailedFireInfo.temperatureK}</p>
            <p style="margin: 4px 0;"><strong>🔥 Intensity:</strong> ${fire.detailedFireInfo.intensityLevel}</p>
            <p style="margin: 4px 0;"><strong>🛰️ Satellite:</strong> ${getSatelliteName(fire.satellite)}</p>
          </div>
          
          <div style="margin-top: 8px; padding-top: 8px; border-top: 1px solid #e5e7eb; font-size: 11px; color: #6b7280;">
            <strong>Note:</strong> Size estimates based on fire intensity. Actual burned area may vary and requires ground verification.
          </div>
        </div>
      `;
      
      marker.bindPopup(popupContent);
      marker.addTo(mapInstanceRef.current);
      markersRef.current.push(marker);
    });

    // Add pulse animation CSS if not already added
    if (!document.getElementById('fire-marker-styles')) {
      const style = document.createElement('style');
      style.id = 'fire-marker-styles';
      style.textContent = `
        @keyframes pulse {
          0% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.2); opacity: 0.7; }
          100% { transform: scale(1); opacity: 1; }
        }
        .fire-marker {
          background: none !important;
          border: none !important;
        }
      `;
      document.head.appendChild(style);
    }
  };

  const getFireColor = (confidence, brightness) => {
    const conf = parseInt(confidence) || 0;
    const bright = parseFloat(brightness) || 0;
    
    if (conf >= 80 || confidence === 'high' || bright > 330) {
      return '#dc2626'; // red-600 - High risk
    } else if (conf >= 50 || confidence === 'nominal' || bright > 310) {
      return '#ea580c'; // orange-600 - Medium risk
    } else {
      return '#ca8a04'; // yellow-600 - Low risk
    }
  };

  const getFireSize = (confidence, brightness) => {
    const conf = parseInt(confidence) || 0;
    const bright = parseFloat(brightness) || 0;
    
    if (conf >= 80 || confidence === 'high' || bright > 330) {
      return 16;
    } else if (conf >= 50 || confidence === 'nominal' || bright > 310) {
      return 12;
    } else {
      return 8;
    }
  };

  const getSatelliteName = (satellite) => {
    const satelliteNames = {
      'T': 'Terra',
      'A': 'Aqua', 
      'N': 'Suomi NPP',
      'N20': 'NOAA-20',
      'N21': 'NOAA-21'
    };
    return satelliteNames[satellite] || satellite || 'Unknown';
  };

  const changeMapType = (type) => {
    if (!mapInstanceRef.current) return;
    
    const map = mapInstanceRef.current;
    
    // Remove current layer
    Object.values(map.baseLayers).forEach(layer => {
      map.removeLayer(layer);
    });
    
    // Add new layer
    map.baseLayers[type].addTo(map);
    setMapType(type);
  };

  const zoomToRegion = (bounds) => {
    if (!mapInstanceRef.current) return;
    mapInstanceRef.current.fitBounds(bounds);
  };

  const regionPresets = {
    usa: { bounds: [[24.396308, -125.0], [49.384358, -66.93457]], name: 'United States' },
    westCoast: { bounds: [[32.5, -125.0], [49.0, -114.0]], name: 'West Coast' },
    california: { bounds: [[32.5, -124.5], [42.0, -114.0]], name: 'California' },
    oregon: { bounds: [[41.9, -124.6], [46.3, -116.5]], name: 'Oregon' },
    washington: { bounds: [[45.5, -124.8], [49.0, -116.9]], name: 'Washington' },
    texas: { bounds: [[25.8, -106.6], [36.5, -93.5]], name: 'Texas' }
  };

  return (
    <div className="w-full h-screen bg-gray-100 relative overflow-hidden">
      {/* Collapsible Header */}
      {!topPanelCollapsed && (
        <div className="absolute top-0 left-0 w-full bg-gradient-to-r from-red-900 to-orange-800 text-white shadow-2xl z-[1001]">
          <div className="px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Flame className="w-8 h-8 text-yellow-300" />
                <div>
                  <h1 className="text-2xl font-bold">US Wildfire Monitor</h1>
                  <p className="text-red-100 text-sm">Real-time fire detection across America</p>
                </div>
              </div>
              
             
            </div>
            
            {error && (
              <div className="mt-3 p-3 bg-red-600 bg-opacity-80 rounded-lg flex items-center gap-2">
                <AlertTriangle className="w-5 h-5" />
                <span className="text-sm">{error}</span>
              </div>
            )}
            
            {loadingProgress && (
              <div className="mt-3 p-3 bg-blue-600 bg-opacity-80 rounded-lg">
                <span className="text-sm">{loadingProgress}</span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Top Panel Collapse Button */}
      <button
        onClick={() => setTopPanelCollapsed(!topPanelCollapsed)}
        className="absolute top-0 left-1/2 transform -translate-x-1/2 bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-b-lg shadow-lg z-[1002] transition-all duration-200 text-xs"
      >
        {topPanelCollapsed ? '▼ Show Header' : '▲ Hide Header'}
      </button>

      {/* Map Container with proper background */}
      <div
        ref={mapRef}
        className="w-full h-full bg-gray-900 absolute inset-0"
        style={{ 
          backgroundColor: '#1f2937',
          backgroundImage: 'linear-gradient(45deg, #374151 25%, transparent 25%), linear-gradient(-45deg, #374151 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #374151 75%), linear-gradient(-45deg, transparent 75%, #374151 75%)',
          backgroundSize: '20px 20px',
          backgroundPosition: '0 0, 0 10px, 10px -10px, -10px 0px'
        }}
      />

      {/* Loading Overlay */}
      {loading && (
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[2000]">
          <div className="bg-white rounded-lg p-6 flex items-center gap-3 max-w-md">
            <div className="w-6 h-6 border-3 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
            <div>
              <span className="text-gray-700">Loading fire data...</span>
              {loadingProgress && (
                <div className="text-sm text-gray-500 mt-1">{loadingProgress}</div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Collapsible Left Panel - Go Back Button and Map Controls */}
      <div className={`absolute bottom-4 left-4 z-[1000] transition-transform duration-300 ${leftPanelCollapsed ? 'transform -translate-x-full' : ''}`}>
        <div className="space-y-2">
          <button
            onClick={() => window.history.back()}
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-blue-700 transition-colors duration-200 w-full"
          >
            <ArrowLeft className="w-4 h-4" />
            Go Back
          </button>
          
          {/* Map Type Selector */}
          <div className="bg-white rounded-lg shadow-lg p-4">
            <div className="mb-3">
              <div className="text-sm font-semibold text-gray-800 flex items-center gap-2 mb-2">
                <Layers className="w-4 h-4" />
                Map Type
              </div>
              <select
                value={mapType}
                onChange={(e) => changeMapType(e.target.value)}
                className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
              >
                <option value="satellite">Satellite View</option>
                <option value="street">Street Map</option>
                <option value="terrain">Terrain Map</option>
              </select>
            </div>
            
            <div className="text-sm space-y-1 pt-3 border-t">
              <div className="font-semibold text-gray-800 flex items-center gap-2">
                <Flame className="w-4 h-4" />
                Active Fires
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-red-600 rounded-full"></div>
                <span className="text-gray-600">High Risk: {fires.filter(f => f.riskLevel?.level === 'HIGH RISK').length}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-orange-600 rounded-full"></div>
                <span className="text-gray-600">Medium Risk: {fires.filter(f => f.riskLevel?.level === 'MEDIUM RISK').length}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-yellow-600 rounded-full"></div>
                <span className="text-gray-600">Low Risk: {fires.filter(f => f.riskLevel?.level === 'LOW RISK').length}</span>
              </div>
              <div className="text-xs text-gray-500 pt-2 border-t">
                Total Detections: {fires.length}
              </div>
              {lastUpdate && (
                <div className="text-xs text-gray-500">
                  Updated: {lastUpdate}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Left Panel Collapse Button */}
      <button
        onClick={() => setLeftPanelCollapsed(!leftPanelCollapsed)}
        className="absolute bottom-4 left-2 bg-[#E32121] hover:bg-[#e32121dc] text-white p-2 rounded-full shadow-lg z-[1001] transition-all duration-200"
        style={{ transform: leftPanelCollapsed ? 'translateX(0)' : 'translateX(225px)' }}
      >
        {leftPanelCollapsed ? <ChevronRight/> : <ChevronLeft/>}
      </button>

      {/* Collapsible Fire Risk Guide - Bottom Right */}
      <div className={`absolute bottom-4 right-4 z-[1000] transition-transform duration-300 ${rightPanelCollapsed ? 'transform translate-x-full' : ''}`}>
        <div className="bg-white rounded-lg shadow-lg p-4">
          <div className="text-sm font-semibold text-gray-800 mb-2 flex items-center gap-2">
            <MapPin className="w-4 h-4" />
            Fire Risk Guide
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-red-600 rounded-full animate-pulse"></div>
              <span className="text-xs text-gray-600">High Risk - Confirmed Fire</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-orange-600 rounded-full animate-pulse"></div>
              <span className="text-xs text-gray-600">Medium Risk - Likely Fire</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-yellow-600 rounded-full animate-pulse"></div>
              <span className="text-xs text-gray-600">Low Risk - Possible Fire</span>
            </div>
          </div>
          <div className="text-xs text-gray-500 mt-3 pt-2 border-t">
            <div className="mb-1"><strong>Fire Size Estimates:</strong></div>
            <div>• Large Wildfire: 1,000+ acres (100+ MW)</div>
            <div>• Substantial Fire: 500-1,000 acres (50-100 MW)</div>
            <div>• Medium Fire: 100-500 acres (20-50 MW)</div>
            <div>• Small Fire: 10-100 acres (5-20 MW)</div>
            <div>• Hotspot: Under 10 acres (1-5 MW)</div>
            <div style={{marginTop: '4px', fontStyle: 'italic'}}>*Estimates based on fire power output</div>
          </div>
          <div className="text-xs text-gray-500 mt-2 pt-2 border-t">
            Click markers for details<br/>
            Data: NASA FIRMS
          </div>
        </div>
      </div>

      {/* Right Panel Collapse Button */}
      <button
        onClick={() => setRightPanelCollapsed(!rightPanelCollapsed)}
        className="absolute bottom-4 right-2 bg-[#E32121] hover:bg-[#e32121dc] text-white p-2 rounded-full shadow-lg z-[1001] transition-all duration-200"
        style={{ transform: rightPanelCollapsed ? 'translateX(0)' : 'translateX(-300px)' }}
      >
        {rightPanelCollapsed ? <ChevronLeft /> : <ChevronRight />}
      </button>

      {/* Collapsible Map Instructions */}
      {instructionsVisible && (
        <div className={`absolute top-6 right-4 z-[1000] transition-transform duration-300 ${topPanelCollapsed ? 'transform -translate-y-2' : 'transform translate-y-16'}`}>
          <div className="bg-white rounded-lg shadow-lg p-3 max-w-xs relative">
            {/* Close button */}
            <button
              onClick={() => setInstructionsVisible(false)}
              className="absolute top-1 right-1 text-gray-400 hover:text-gray-600 text-lg leading-none w-6 h-6 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors duration-200"
              title="Close instructions"
            >
              ×
            </button>
            
            <div className="text-xs text-gray-600 pr-4">
              <div className="font-semibold mb-1">Map Controls:</div>
              <div>• Drag to pan</div>
              <div>• Scroll or use 2 fingers to zoom</div>
              <div>• Click fire markers for details</div>
              
              
            </div>
          </div>
        </div>
      )}

      {/* Show Instructions Button (when hidden) */}
      {!instructionsVisible && (
        <button
          onClick={() => setInstructionsVisible(true)}
          className={`absolute top-6 right-4 z-[1000] bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-full shadow-lg transition-all duration-300 ${topPanelCollapsed ? 'transform -translate-y-2' : 'transform translate-y-16'}`}
          title="Show map instructions"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </button>
      )}
    </div>
  );
};

export default InteractiveWildfireMap;