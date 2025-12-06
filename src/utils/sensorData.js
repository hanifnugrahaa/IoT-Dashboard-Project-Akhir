// Generate realistic sensor data dengan variasi waktu
export const generateSensorData = () => {
  const now = new Date();
  const hour = now.getHours();
  
  // Pattern berdasarkan waktu:
  // - AQI: tinggi siang, rendah pagi/malam
  // - CO: tinggi pagi/sore (rush hour)
  // - Temp: naik siang, turun malam
  // - Humidity: tinggi pagi/sore, rendah siang
  
  const baseData = {
    timestamp: now.toISOString(),
    hour: hour
  };
  
  // AQI (Air Quality Index) - 0-500
  const aqiBase = 50 + Math.sin(hour * 0.26) * 25; // Pattern sinus
  const aqiRandom = (Math.random() - 0.5) * 10;
  const aqi = Math.max(20, Math.min(120, Math.round(aqiBase + aqiRandom)));
  
  // Carbon Monoxide (ppm) - 0-50 ppm normal
  const coBase = 10 + Math.abs(Math.sin(hour * 0.13)) * 15; // Rush hour peaks
  const coRandom = (Math.random() - 0.5) * 3;
  const co = Math.max(5, Math.min(35, Math.round((coBase + coRandom) * 10) / 10));
  
  // Temperature (°C) - Jakarta average: 24-32°C
  const tempBase = 26 + Math.sin(hour * 0.26) * 4; // Hottest at 2pm
  const tempRandom = (Math.random() - 0.5) * 1.5;
  const temperature = Math.max(22, Math.min(34, Math.round((tempBase + tempRandom) * 10) / 10));
  
  // Humidity (%) - 40-80% normal
  const humidityBase = 60 - Math.sin(hour * 0.26) * 15; // Lowest at 2pm
  const humidityRandom = (Math.random() - 0.5) * 5;
  const humidity = Math.max(35, Math.min(85, Math.round(humidityBase + humidityRandom)));
  
  // Status berdasarkan nilai
  const getStatus = (value, type) => {
    switch(type) {
      case 'aqi':
        if (value <= 50) return { status: 'excellent', emoji: '😊', color: '#10B981' };
        if (value <= 100) return { status: 'good', emoji: '🙂', color: '#3B82F6' };
        if (value <= 150) return { status: 'normal', emoji: '😐', color: '#F59E0B' };
        return { status: 'warning', emoji: '😷', color: '#EF4444' };
      
      case 'co':
        if (value <= 9) return { status: 'excellent', emoji: '✅', color: '#10B981' };
        if (value <= 25) return { status: 'good', emoji: '👍', color: '#3B82F6' };
        return { status: 'warning', emoji: '⚠️', color: '#EF4444' };
      
      case 'temperature':
        if (value <= 25) return { status: 'cool', emoji: '❄️', color: '#0EA5E9' };
        if (value <= 30) return { status: 'comfortable', emoji: '😊', color: '#10B981' };
        return { status: 'hot', emoji: '🔥', color: '#EF4444' };
      
      case 'humidity':
        if (value <= 40) return { status: 'dry', emoji: '🏜️', color: '#F59E0B' };
        if (value <= 70) return { status: 'comfortable', emoji: '😊', color: '#10B981' };
        return { status: 'humid', emoji: '💧', color: '#0EA5E9' };
      
      default:
        return { status: 'normal', emoji: '📊', color: '#6B7280' };
    }
  };
  
  // Trend berdasarkan perubahan jam sebelumnya
  const getTrend = (currentValue, baseValue) => {
    const diff = currentValue - baseValue;
    if (diff > 1) return { trend: 'up', change: Math.abs(diff) };
    if (diff < -1) return { trend: 'down', change: Math.abs(diff) };
    return { trend: 'stable', change: 0 };
  };
  
  // Simulasikan data jam sebelumnya untuk trend
  const prevHour = hour === 0 ? 23 : hour - 1;
  const prevAqiBase = 50 + Math.sin(prevHour * 0.26) * 25;
  const prevCoBase = 10 + Math.abs(Math.sin(prevHour * 0.13)) * 15;
  const prevTempBase = 26 + Math.sin(prevHour * 0.26) * 4;
  const prevHumidityBase = 60 - Math.sin(prevHour * 0.26) * 15;
  
  return {
    ...baseData,
    aqi: {
      value: aqi,
      unit: 'AQI',
      status: getStatus(aqi, 'aqi'),
      trend: getTrend(aqi, prevAqiBase),
      description: aqi <= 50 ? 'Air quality is satisfactory' : 
                   aqi <= 100 ? 'Air quality is acceptable' : 
                   'Sensitive groups may experience health effects'
    },
    co: {
      value: co,
      unit: 'ppm',
      status: getStatus(co, 'co'),
      trend: getTrend(co, prevCoBase),
      description: co <= 9 ? 'Very low CO level' : 
                   co <= 25 ? 'Normal CO level' : 
                   'Elevated CO level detected'
    },
    temperature: {
      value: temperature,
      unit: '°C',
      status: getStatus(temperature, 'temperature'),
      trend: getTrend(temperature, prevTempBase),
      description: temperature <= 25 ? 'Cool temperature' : 
                   temperature <= 30 ? 'Comfortable temperature' : 
                   'Hot temperature'
    },
    humidity: {
      value: humidity,
      unit: '%',
      status: getStatus(humidity, 'humidity'),
      trend: getTrend(humidity, prevHumidityBase),
      description: humidity <= 40 ? 'Low humidity' : 
                   humidity <= 70 ? 'Comfortable humidity' : 
                   'High humidity'
    }
  };
};

// Generate historical data untuk chart
export const generateHistoricalData = (hours = 24) => {
  return Array.from({ length: hours }, (_, i) => {
    const hour = (new Date().getHours() - i + 24) % 24;
    const data = generateSensorData();
    
    return {
      time: `${hour.toString().padStart(2, '0')}:00`,
      aqi: Math.max(20, Math.min(150, data.aqi.value + (Math.random() - 0.5) * 20)),
      co: Math.max(5, Math.min(35, data.co.value + (Math.random() - 0.5) * 5)),
      temperature: Math.max(22, Math.min(34, data.temperature.value + (Math.random() - 0.5) * 2)),
      humidity: Math.max(35, Math.min(85, data.humidity.value + (Math.random() - 0.5) * 10))
    };
  }).reverse();
};

// Update data secara real-time (simulasi)
export const updateSensorData = (currentData) => {
  if (!currentData) return generateSensorData();
  
  const updated = { ...currentData };
  const now = new Date();
  const minute = now.getMinutes();
  
  // Update kecil setiap menit
  const fluctuation = (Math.random() - 0.5) * 2;
  
  updated.timestamp = now.toISOString();
  updated.aqi.value = Math.max(20, Math.min(150, updated.aqi.value + fluctuation));
  updated.co.value = Math.max(5, Math.min(35, updated.co.value + (fluctuation * 0.3)));
  updated.temperature.value = Math.max(22, Math.min(34, updated.temperature.value + (fluctuation * 0.1)));
  updated.humidity.value = Math.max(35, Math.min(85, updated.humidity.value + fluctuation));
  
  // Update status jika perlu
  updated.aqi.status = getStatus(updated.aqi.value, 'aqi');
  updated.co.status = getStatus(updated.co.value, 'co');
  updated.temperature.status = getStatus(updated.temperature.value, 'temperature');
  updated.humidity.status = getStatus(updated.humidity.value, 'humidity');
  
  return updated;
};

// Helper function untuk status
const getStatus = (value, type) => {
  switch(type) {
    case 'aqi':
      if (value <= 50) return { status: 'excellent', emoji: '😊', color: '#10B981' };
      if (value <= 100) return { status: 'good', emoji: '🙂', color: '#3B82F6' };
      if (value <= 150) return { status: 'normal', emoji: '😐', color: '#F59E0B' };
      return { status: 'warning', emoji: '😷', color: '#EF4444' };
    
    case 'co':
      if (value <= 9) return { status: 'excellent', emoji: '✅', color: '#10B981' };
      if (value <= 25) return { status: 'good', emoji: '👍', color: '#3B82F6' };
      return { status: 'warning', emoji: '⚠️', color: '#EF4444' };
    
    case 'temperature':
      if (value <= 25) return { status: 'cool', emoji: '❄️', color: '#0EA5E9' };
      if (value <= 30) return { status: 'comfortable', emoji: '😊', color: '#10B981' };
      return { status: 'hot', emoji: '🔥', color: '#EF4444' };
    
    case 'humidity':
      if (value <= 40) return { status: 'dry', emoji: '🏜️', color: '#F59E0B' };
      if (value <= 70) return { status: 'comfortable', emoji: '😊', color: '#10B981' };
      return { status: 'humid', emoji: '💧', color: '#0EA5E9' };
    
    default:
      return { status: 'normal', emoji: '📊', color: '#6B7280' };
  }
};