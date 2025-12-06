import React from 'react';
import SensorValueCard from './SensorValueCard';
import AQICard from './AQICard';

const SensorGrid = ({ sensorData, onRefresh }) => {
  // Fallback data jika sensorData null
  const fallbackData = {
    aqi: { value: 78, unit: 'AQI', status: { status: 'good', emoji: '🙂', color: '#3B82F6' } },
    co: { value: 24.5, unit: 'ppm', status: { status: 'normal', emoji: '👍', color: '#3B82F6' } },
    temperature: { value: 26.8, unit: '°C', status: { status: 'comfortable', emoji: '😊', color: '#10B981' } },
    humidity: { value: 65, unit: '%', status: { status: 'comfortable', emoji: '😊', color: '#10B981' } }
  };

  const data = sensorData || fallbackData;

  return (
    <>
      {/* AQI Card */}
      <div className="mb-8">
        <AQICard aqi={data.aqi.value} />
      </div>

      {/* Sensor Value Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <SensorValueCard
          title="Air Quality"
          sensorData={data.aqi}
          onRefresh={onRefresh}
        />
        
        <SensorValueCard
          title="Carbon Monoxide"
          sensorData={data.co}
          onRefresh={onRefresh}
        />
        
        <SensorValueCard
          title="Temperature"
          sensorData={data.temperature}
          onRefresh={onRefresh}
        />
        
        <SensorValueCard
          title="Humidity"
          sensorData={data.humidity}
          onRefresh={onRefresh}
        />
      </div>
    </>
  );
};

export default SensorGrid;