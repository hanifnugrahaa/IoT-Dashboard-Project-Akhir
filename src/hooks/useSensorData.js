// hooks/useSensorData.js
import { useState, useEffect } from 'react';
import { airQualityWebSocket } from '../services/websocket';

// Helper buat transform data Node-RED ke format UI
const transformNodeRedData = (nodeRedData) => {
  console.log('📦 Processing raw data:', nodeRedData);
  
  // Data dari Node-RED BISA dua format:
  // 1. Format langsung: {aqi: 0, co_ppm: '0.00', ...}
  // 2. Format dengan wrapper: {topic: '...', payload: {...}}
  
  let payload;
  
  if (nodeRedData && typeof nodeRedData === 'object') {
    // Cek apakah ada property 'payload' (format wrapper)
    if (nodeRedData.payload !== undefined) {
      payload = nodeRedData.payload;
    } else {
      // Langsung pakai data sebagai payload
      payload = nodeRedData;
    }
  } else {
    // Fallback ke default
    payload = { aqi: 78, co_ppm: '0.00', temperature: 25, humidity: 65 };
  }
  
  console.log('✅ Extracted payload:', payload);
  
  // Helper buat status color (sama seperti sebelumnya)
  const getAQIStatus = (aqi) => {
    if (aqi <= 50) return { label: 'Good', color: '#10B981', level: 'good' };
    if (aqi <= 100) return { label: 'Moderate', color: '#F59E0B', level: 'moderate' };
    if (aqi <= 150) return { label: 'Unhealthy', color: '#EF4444', level: 'unhealthy' };
    return { label: 'Hazardous', color: '#8B5CF6', level: 'hazardous' };
  };

  const getCOStatus = (co) => {
    const value = parseFloat(co) || 0;
    if (value < 9) return { label: 'Good', color: '#10B981' };
    if (value < 35) return { label: 'Moderate', color: '#F59E0B' };
    return { label: 'Unhealthy', color: '#EF4444' };
  };

  const getTempStatus = (temp) => {
    const value = temp || 25;
    if (value >= 20 && value <= 30) return { label: 'Normal', color: '#3B82F6' };
    if (value > 30) return { label: 'Hot', color: '#EF4444' };
    return { label: 'Cool', color: '#60A5FA' };
  };

  const getHumidityStatus = (hum) => {
    const value = hum || 65;
    if (value >= 40 && value <= 70) return { label: 'Comfortable', color: '#10B981' };
    if (value > 70) return { label: 'High', color: '#F59E0B' };
    return { label: 'Low', color: '#F59E0B' };
  };

  // Format yang di-expect oleh komponen lu
  return {
    // BUAT AQICard (butuh number langsung)
    aqi: payload.aqi || 78,
    
    // BUAT SensorGrid (format lengkap)
    sensorData: {
      aqi: {
        value: payload.aqi || 78,
        unit: 'AQI',
        status: getAQIStatus(payload.aqi || 78),
        trend: { direction: 'stable', value: 0 }
      },
      co: {
        value: parseFloat(payload.co_ppm) || 0.0,
        unit: 'ppm',
        status: getCOStatus(payload.co_ppm || '0.00'),
        trend: { direction: 'stable', value: 0 }
      },
      temperature: {
        value: payload.temperature || 25,
        unit: '°C',
        status: getTempStatus(payload.temperature || 25),
        trend: { direction: 'stable', value: 0 }
      },
      humidity: {
        value: payload.humidity || 65,
        unit: '%',
        status: getHumidityStatus(payload.humidity || 65),
        trend: { direction: 'stable', value: 0 }
      }
    },
    
    // Raw data untuk debugging
    raw: nodeRedData,
    timestamp: new Date().toISOString()
  };
};

export const useSensorData = () => {
  const [sensorData, setSensorData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

  const handleWebSocketData = (rawData) => {
  if (!isMounted) return;
  
  console.log('📡 Received from Node-RED:', rawData);
  
  try {
    // RAW DATA langsung dari WebSocket (tanpa nested payload)
    // Contoh: {aqi: 0, co_ppm: '0.00', temperature: 28, humidity: 75}
    
    const transformed = transformNodeRedData(rawData);
    console.log('🔄 Transformed:', transformed);
    
    setSensorData(transformed);
    setIsLoading(false);
    setError(null);
  } catch (err) {
    console.error('❌ Transformation error:', err, 'Raw data:', rawData);
    setError('Invalid data format: ' + err.message);
  }
};

    // Subscribe ke WebSocket
    const unsubscribe = airQualityWebSocket.subscribe(handleWebSocketData);

    // Fallback timeout
    const timeout = setTimeout(() => {
      if (isMounted && isLoading) {
        console.log('⏰ Connection timeout');
        setError('Not receiving data. Check WebSocket connection.');
        setIsLoading(false);
      }
    }, 8000);

    return () => {
      isMounted = false;
      unsubscribe();
      clearTimeout(timeout);
    };
  }, []);

  const refreshData = () => {
    setIsLoading(true);
    // Request fresh data dari Node-RED
    airQualityWebSocket.send({ 
      type: 'request',
      topic: 'airquality/gamasense',
      timestamp: Date.now()
    });
    
    // Auto reset loading setelah 3 detik
    setTimeout(() => {
      if (isLoading) {
        setIsLoading(false);
      }
    }, 3000);
  };

  return { 
    sensorData, 
    isLoading, 
    error,
    refreshData 
  };
};