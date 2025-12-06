import { useState, useEffect } from 'react';

// Simple dummy data generator dengan format konsisten
const generateSensorData = () => {
  return {
    timestamp: new Date().toISOString(),
    aqi: { 
      value: Math.floor(Math.random() * 50) + 50, // 50-100
      unit: 'AQI', 
      status: { 
        status: 'good', 
        emoji: '🙂', 
        color: '#3B82F6',
        description: 'Air quality is acceptable'
      },
      trend: { trend: 'stable', change: 0 }
    },
    co: { 
      value: Math.random() * 15 + 10, // 10-25
      unit: 'ppm', 
      status: { 
        status: 'normal', 
        emoji: '👍', 
        color: '#3B82F6',
        description: 'Normal CO level'
      },
      trend: { trend: 'stable', change: 0 }
    },
    temperature: { 
      value: Math.random() * 8 + 24, // 24-32
      unit: '°C', 
      status: { 
        status: 'comfortable', 
        emoji: '😊', 
        color: '#10B981',
        description: 'Comfortable temperature'
      },
      trend: { trend: 'stable', change: 0 }
    },
    humidity: { 
      value: Math.random() * 30 + 50, // 50-80
      unit: '%', 
      status: { 
        status: 'comfortable', 
        emoji: '😊', 
        color: '#10B981',
        description: 'Comfortable humidity'
      },
      trend: { trend: 'stable', change: 0 }
    }
  };
};

export const useSensorData = () => {
  const [sensorData, setSensorData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    console.log('useSensorData: Initializing...');
    
    // Simulate 2 second loading for loading screen
    const loadingTimer = setTimeout(() => {
      const initialData = generateSensorData();
      console.log('useSensorData: Data loaded', initialData);
      setSensorData(initialData);
      setIsLoading(false);
    }, 10000);

    // Auto-refresh setiap 30 detik
    const refreshInterval = setInterval(() => {
      if (!isLoading) {
        const updatedData = generateSensorData();
        console.log('useSensorData: Auto-refresh', updatedData);
        setSensorData(updatedData);
      }
    }, 30000);

    return () => {
      clearTimeout(loadingTimer);
      clearInterval(refreshInterval);
    };
  }, []);

  const refreshData = () => {
    console.log('useSensorData: Manual refresh triggered');
    const newData = generateSensorData();
    setSensorData(newData);
  };

  // Legacy format untuk backward compatibility
  const legacyData = sensorData ? {
    aqi: sensorData.aqi.value,
    co: sensorData.co.value,
    air_quality: Math.round(sensorData.aqi.value * 4.38),
    temperature: sensorData.temperature.value,
    humidity: sensorData.humidity.value
  } : {
    aqi: 78,
    co: 24.5,
    air_quality: 342,
    temperature: 26.8,
    humidity: 65
  };

  return { 
    sensorData, 
    isLoading, 
    legacyData,
    refreshData,
    lastUpdated: new Date()
  };
};