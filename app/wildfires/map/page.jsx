'use client'

import React, { useState, useEffect, useRef } from 'react';
import { Flame, MapPin, AlertTriangle, ChevronLeft, ChevronRight, Layers, ArrowLeft, RefreshCw, Bug } from 'lucide-react';

const InteractiveWildfireMap = () => {
  const [fires, setFires] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [lastUpdate, setLastUpdate] = useState('');
  const [selectedFire, setSelectedFire] = useState(null);
  const [mapType, setMapType] = useState('satellite');
  const [selectedRegion, setSelectedRegion] = useState('USA');
  const [loadingProgress, setLoadingProgress] = useState('');
  const [leftPanelCollapsed, setLeftPanelCollapsed] = useState(true);
  const [rightPanelCollapsed, setRightPanelCollapsed] = useState(true);
  const [topPanelCollapsed, setTopPanelCollapsed] = useState(false);
  const [instructionsVisible, setInstructionsVisible] = useState(false);
  const [debugMode, setDebugMode] = useState(false);
  const [debugLogs, setDebugLogs] = useState([]);
  const [apiCallCount, setApiCallCount] = useState(0);
  const [lastApiResponse, setLastApiResponse] = useState(null);
  
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markersRef = useRef([]);



  // Enhanced fetch function with better error handling and debugging
  const fetchFireDataDirect = async (country = 'USA', days = 1, sensor = 'VIIRS_SNPP_NRT') => {
    const callNumber = apiCallCount + 1;
    setApiCallCount(callNumber);
    
   
    setLoadingProgress(`Fetching data for ${country} (${days} day${days > 1 ? 's' : ''})...`);
    setLoading(true); // Make sure loading is set
    setError(''); // Clear any previous errors
    
    try {
      const apiUrl = `/api/fires/${sensor}/${country}/${days}`;
     
      
      const startTime = Date.now();
      const response = await fetch(apiUrl, {
        method: 'GET',
        headers: {
          'Accept': 'text/csv,application/json,text/plain',
          'Cache-Control': 'no-cache'
        }
      });
      
      const duration = Date.now() - startTime;
     
      
      setLastApiResponse({
        url: apiUrl,
        status: response.status,
        statusText: response.statusText,
        duration: duration,
        timestamp: new Date().toISOString(),
        headers: Object.fromEntries(response.headers.entries())
      });
      
      if (!response.ok) {
        let errorData;
        try {
          const contentType = response.headers.get('content-type');
          if (contentType && contentType.includes('application/json')) {
            errorData = await response.json();
          } else {
            errorData = await response.text();
          }
        } catch (e) {
          errorData = `Failed to read error response: ${e.message}`;
        }
        
       
        throw new Error(`API Error (${response.status}): ${JSON.stringify(errorData)}`);
      }
      
      const csvData = await response.text();
     
      
      if (!csvData || csvData.length < 50) {
        throw new Error(`Insufficient data received: ${csvData.length} characters`);
      }
      
      setLoadingProgress('Parsing CSV data...');
      const parsedFires = await parseCSVData(csvData);
      
     
      setFires(parsedFires);
      updateMapMarkers(parsedFires);
      
      setLastUpdate(new Date().toLocaleString());
      setError('');
      
    } catch (error) {
     
      console.error('API failed:', error);
      setError(`Failed to load fire data: ${error.message}`);
    } finally {
      // IMPORTANT: Always clear loading state
      setLoading(false);
      setLoadingProgress('');
     
    }
  };

  // Enhanced CSV parsing with better error handling
  const parseCSVData = async (csvText, regionName = '') => {
  
    
    try {
      const lines = csvText.trim().split('\n');
      if (lines.length < 2) {
        throw new Error(`Insufficient CSV data: only ${lines.length} lines`);
      }
      
      const headers = lines[0].split(',').map(h => h.trim());
     
      
      const fires = [];
      let invalidRows = 0;
      
      for (let i = 1; i < lines.length; i++) {
        const values = lines[i].split(',').map(v => v.trim());
        
        if (values.length < headers.length) {
          invalidRows++;
          continue;
        }
        
        const fire = {};
        headers.forEach((header, index) => {
          fire[header] = values[index] || '';
        });
        
        // Validate required fields
        if (!fire.latitude || !fire.longitude) {
          invalidRows++;
          continue;
        }
        
        fire.lat = parseFloat(fire.latitude);
        fire.lng = parseFloat(fire.longitude);
        
        if (isNaN(fire.lat) || isNaN(fire.lng)) {
          invalidRows++;
          continue;
        }
        
        // Add enhanced fire information
        fire.locationName = regionName || getSimpleStateFromCoords(fire.lat, fire.lng);
        fire.sizeDescription = getFireSizeDescription(
          fire.frp, 
          fire.confidence, 
          fire.bright_ti4 || fire.bright_ti5 || fire.brightness
        );
        fire.detailedFireInfo = getDetailedFireInfo(
          fire.frp, 
          fire.confidence, 
          fire.bright_ti4 || fire.bright_ti5 || fire.brightness
        );
        fire.riskLevel = getRiskLevel(fire.confidence, fire.bright_ti4 || fire.bright_ti5 || fire.brightness);
        fire.timeDescription = formatDetectionTime(fire.acq_date, fire.acq_time);
        
        fires.push(fire);
      }
      
     
      
      
      return fires;
      
    } catch (error) {
      
      throw new Error(`Failed to parse CSV data: ${error.message}`);
    }
  };

  // Manual retry function
  const handleManualRetry = () => {
    
    setError('');
    fetchFireDataDirect(selectedRegion, 1);
  };

  

  // Enhanced initialization
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
    script.onerror = () => {
      
      setError('Failed to load map library');
      setLoading(false); // Clear loading on error
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

    try {
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
        attribution: 'Tiles &copy; Esri',
        maxZoom: 18
      });

      const streetLayer = window.L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors',
        maxZoom: 18
      });

      // Add default layer
      satelliteLayer.addTo(map);

      // Store layer references
      map.baseLayers = {
        satellite: satelliteLayer,
        street: streetLayer
      };

      mapInstanceRef.current = map;
      

      // Fetch initial fire data
      fetchFireDataDirect();
      
    } catch (error) {
      
      setError(`Failed to initialize map: ${error.message}`);
      setLoading(false); // Clear loading on error
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
    if (conf === 'high' || conf === 'h' || bright > 340) {
      intensityLevel = 'Very High Intensity';
    } else if (conf === 'nominal' || conf === 'n' || bright > 320) {
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
    
    if (conf === 'high' || conf === 'h' || bright > 340) {
      return { level: 'HIGH RISK', color: '#dc2626', description: 'Confirmed active fire - immediate attention needed' };
    } else if (conf === 'nominal' || conf === 'n' || bright > 320) {
      return { level: 'MEDIUM RISK', color: '#ea580c', description: 'Likely fire activity - monitoring recommended' };
    } else {
      return { level: 'LOW RISK', color: '#ca8a04', description: 'Possible fire or heat source - verification needed' };
    }
  };

  // Function to format detection time in user-friendly way
  const formatDetectionTime = (date, time) => {
    try {
      const dateStr = date.replace(/-/g, '/');
      const timeStr = time.toString().padStart(4, '0');
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

  const updateMapMarkers = (fireData) => {
    if (!mapInstanceRef.current || !window.L) {
      
      return;
    }

  

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
      const color = getFireColor(fire.confidence, fire.bright_ti4 || fire.bright_ti5 || fire.brightness);
      const size = getFireSize(fire.confidence, fire.bright_ti4 || fire.bright_ti5 || fire.brightness);
      
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
    const conf = confidence;
    const bright = parseFloat(brightness) || 0;
    
    if (conf === 'high' || conf === 'h' || bright > 330) {
      return '#dc2626'; // red-600 - High risk
    } else if (conf === 'nominal' || conf === 'n' || bright > 310) {
      return '#ea580c'; // orange-600 - Medium risk
    } else {
      return '#ca8a04'; // yellow-600 - Low risk
    }
  };

  const getFireSize = (confidence, brightness) => {
    const conf = confidence;
    const bright = parseFloat(brightness) || 0;
    
    if (conf === 'high' || conf === 'h' || bright > 330) {
      return 16;
    } else if (conf === 'nominal' || conf === 'n' || bright > 310) {
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

  return (
    <div className="w-full h-screen bg-gray-100 relative overflow-hidden">
    

      {/* Enhanced Header */}
      {!topPanelCollapsed && (
        <div className="absolute top-0 left-0 w-full bg-gradient-to-r from-red-900 to-orange-800 text-white shadow-2xl z-[1001]">
          <div className="px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Flame className="w-8 h-8 text-yellow-300" />
                <div>
                  <h1 className="text-2xl font-bold">US Wildfire Monitor</h1>
                  <p className="text-red-100 text-sm">Real-time fire detection across America</p>
                  {fires.length > 0 && (
                    <p className="text-green-200 text-sm">✅ Showing {fires.length} active fire{fires.length !== 1 ? 's' : ''}</p>
                  )}
                </div>
              </div>
              
              <div className="flex items-center gap-2">
               
                
                <button
                  onClick={handleManualRetry}
                  className="flex items-center gap-1 bg-blue-600 hover:bg-blue-500 px-3 py-1 rounded text-sm"
                  disabled={loading}
                >
                  <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                  Retry
                </button>
                
                
              </div>
            </div>
            
            {error && (
              <div className="mt-3 p-3 bg-red-600 bg-opacity-80 rounded-lg flex items-center gap-2">
                <AlertTriangle className="w-5 h-5" />
                <div className="flex-1">
                  <span className="text-sm">{error}</span>
                  <button 
                    onClick={handleManualRetry}
                    className="ml-2 underline hover:no-underline text-sm"
                  >
                    Try Again
                  </button>
                </div>
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

      {/* Map Container */}
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

      {/* Loading Overlay - Only show when actually loading */}
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

      {/* Enhanced Left Panel */}
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
              <div className="text-xs text-gray-500">
                API Calls: {apiCallCount}
              </div>
              {lastUpdate && (
                <div className="text-xs text-gray-500">
                  Updated: {lastUpdate}
                </div>
              )}
              {!loading && fires.length === 0 && (
                <div className="text-xs text-yellow-600 pt-2">
                  No fires currently detected. Try refreshing or check a different region.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Panel Collapse Buttons */}
      <button
        onClick={() => setLeftPanelCollapsed(!leftPanelCollapsed)}
        className="absolute bottom-4 left-2 bg-[#E32121] hover:bg-[#e32121dc] text-white p-2 rounded-full shadow-lg z-[1001] transition-all duration-200"
        style={{ transform: leftPanelCollapsed ? 'translateX(0)' : 'translateX(225px)' }}
      >
        {leftPanelCollapsed ? <ChevronRight/> : <ChevronLeft/>}
      </button>

      {/* Right Panel - Fire Risk Guide */}
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

      <button
        onClick={() => setRightPanelCollapsed(!rightPanelCollapsed)}
        className="absolute bottom-4 right-2 bg-[#E32121] hover:bg-[#e32121dc] text-white p-2 rounded-full shadow-lg z-[1001] transition-all duration-200"
        style={{ transform: rightPanelCollapsed ? 'translateX(0)' : 'translateX(-300px)' }}
      >
        {rightPanelCollapsed ? <ChevronLeft /> : <ChevronRight />}
      </button>

      
    </div>
  );
};

export default InteractiveWildfireMap;