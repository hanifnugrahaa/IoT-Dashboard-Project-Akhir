import { useState, useEffect } from 'react';

// Simple dummy data generator
const generateDummySensorData = () => {
  return {
    aqi: { value: 78, unit: 'AQI', status: 'good' },
    co: { value: 24.5, unit: 'ppm', status: 'normal' },
    temperature: { value: 26.8, unit: '°C', status: 'comfortable' },
    humidity: { value: 65, unit: '%', status: 'comfortable' }
  };
};

export const useSensorData = () => {
  const [sensorData, setSensorData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Initial load
    const timer = setTimeout(() => {
      const data = generateDummySensorData();
      setSensorData(data);
      setIsLoading(false);
    }, 500);

    // Auto-update setiap 10 detik
    const interval = setInterval(() => {
      const newData = generateDummySensorData();
      setSensorData(newData);
    }, 10000);

    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, []);

  // Legacy format untuk compatibility
  const legacyData = sensorData ? {
    aqi: sensorData.aqi.value,
    co: sensorData.co.value,
    air_quality: 342,
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
    refreshData: () => {
      const newData = generateDummySensorData();
      setSensorData(newData);
    }
  };
};