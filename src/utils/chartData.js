// Generate dummy data untuk 24 jam terakhir
export const generateAQIData = () => {
  const hours = Array.from({ length: 24 }, (_, i) => {
    const hour = i;
    const time = `${hour.toString().padStart(2, '0')}:00`;
    
    // Pattern: rendah pagi, naik siang, turun malam
    let aqi = 30 + Math.sin(hour * 0.3) * 20;
    
    // Tambahkan random variance
    aqi += (Math.random() - 0.5) * 15;
    
    // Pastikan dalam range yang wajar
    aqi = Math.max(20, Math.min(120, aqi));
    
    return {
      time,
      hour,
      aqi: Math.round(aqi),
      co: Math.round(5 + Math.sin(hour * 0.4) * 10 + (Math.random() * 5)),
      pm25: Math.round(15 + Math.sin(hour * 0.5) * 15 + (Math.random() * 10)),
      temperature: Math.round(22 + Math.sin(hour * 0.2) * 8 + (Math.random() * 3)),
      humidity: Math.round(50 + Math.cos(hour * 0.3) * 20 + (Math.random() * 10))
    };
  });
  
  return hours;
};

// Generate pollutant concentration data
export const generatePollutantData = () => {
  const pollutants = [
    {
      name: 'PM2.5',
      value: 42,
      unit: 'μg/m³',
      color: '#3B82F6',
      safeLimit: 35,
      trend: 'up',
      dailyAvg: 38,
      hourlyData: Array.from({ length: 12 }, (_, i) => ({
        hour: i * 2,
        value: 30 + Math.sin(i * 0.5) * 15 + (Math.random() * 10)
      }))
    },
    {
      name: 'CO',
      value: 24.5,
      unit: 'ppm',
      color: '#EF4444',
      safeLimit: 25,
      trend: 'stable',
      dailyAvg: 22,
      hourlyData: Array.from({ length: 12 }, (_, i) => ({
        hour: i * 2,
        value: 15 + Math.sin(i * 0.3) * 10 + (Math.random() * 5)
      }))
    },
    {
      name: 'NO₂',
      value: 31,
      unit: 'μg/m³',
      color: '#8B5CF6',
      safeLimit: 40,
      trend: 'down',
      dailyAvg: 35,
      hourlyData: Array.from({ length: 12 }, (_, i) => ({
        hour: i * 2,
        value: 25 + Math.cos(i * 0.4) * 10 + (Math.random() * 8)
      }))
    },
    {
      name: 'O₃',
      value: 28,
      unit: 'μg/m³',
      color: '#10B981',
      safeLimit: 50,
      trend: 'up',
      dailyAvg: 25,
      hourlyData: Array.from({ length: 12 }, (_, i) => ({
        hour: i * 2,
        value: 20 + Math.sin(i * 0.6) * 8 + (Math.random() * 6)
      }))
    },
    {
      name: 'SO₂',
      value: 12,
      unit: 'μg/m³',
      color: '#F59E0B',
      safeLimit: 20,
      trend: 'stable',
      dailyAvg: 11,
      hourlyData: Array.from({ length: 12 }, (_, i) => ({
        hour: i * 2,
        value: 8 + Math.cos(i * 0.2) * 4 + (Math.random() * 3)
      }))
    }
  ];
  
  return pollutants;
};

// Generate AQI level distribution
export const generateAQILevels = () => {
  return [
    { level: 'Good', range: '0-50', value: 65, color: '#10B981' },
    { level: 'Moderate', range: '51-100', value: 25, color: '#F59E0B' },
    { level: 'Unhealthy', range: '101-150', value: 8, color: '#EF4444' },
    { level: 'Very Unhealthy', range: '151-200', value: 2, color: '#8B5CF6' },
    { level: 'Hazardous', range: '201+', value: 0, color: '#7C3AED' }
  ];
};