//SensorGrid.jsx
import React from 'react';
import SensorValueCard from './SensorValueCard';
import AQICard from './AQICard';

const SensorGrid = ({ sensorData, onRefresh }) => {
  // Safe guard untuk null/undefined data
  console.log('📊 SensorGrid receiving data:', {
    sensorData,
    aqi: sensorData?.aqi,
    co: sensorData?.co,
    temperature: sensorData?.temperature,
    humidity: sensorData?.humidity
  });
  if (!sensorData) {
    return (
      <div className="text-center p-8 text-white/60">
        <p>Waiting for sensor data...</p>
      </div>
    );
  }

  // Destructure dengan default values
  const { 
    aqi = { value: 78, unit: 'AQI', status: {}, trend: {} },
    co = { value: 24.5, unit: 'ppm', status: {}, trend: {} },
    temperature = { value: 26.8, unit: '°C', status: {}, trend: {} },
    humidity = { value: 65, unit: '%', status: {}, trend: {} }
  } = sensorData;

  return (
    <>
      {/* Sensor Value Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <SensorValueCard
          title="Air Quality"
          sensorData={aqi}
          onRefresh={onRefresh}
        />
        
        <SensorValueCard
          title="Carbon Monoxide"
          sensorData={co}
          onRefresh={onRefresh}
        />
        
        <SensorValueCard
          title="Temperature"
          sensorData={temperature}
          onRefresh={onRefresh}
        />
        
        <SensorValueCard
          title="Humidity"
          sensorData={humidity}
          onRefresh={onRefresh}
        />
      </div>
    </>
  );
};

export default SensorGrid;