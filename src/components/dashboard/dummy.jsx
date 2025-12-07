import React from 'react';
import { AnimatePresence } from 'framer-motion';
import { useSensorData } from './hooks/useSensorData';
import { useClock } from './hooks/useClock';
import LoadingScreen from './components/common/LoadingScreen';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import AQICard from './components/dashboard/AQICard';
import SensorGrid from './components/dashboard/SensorGrid';
import ChartCard from './components/dashboard/ChartCard';
import './styles/animations.css';

function App() {
  const { sensorData, isLoading, refreshData } = useSensorData();
  const currentTime = useClock();
  console.log('App rendering:', { isLoading, sensorData });
  


  return (
    <>
      <AnimatePresence>
        {isLoading && <LoadingScreen />}
      </AnimatePresence>

      {!isLoading && sensorData && (
        <div className="min-h-screen text-gray-800 bg-cover bg-center bg-fixed"
          style={{
            backgroundImage: 'url(/bg11.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center center',
            backgroundAttachment: 'fixed',
            backgroundRepeat: 'no-repeat',
            position: 'relative',
          }}>
          
          {/* Light Overlay */}
          <div className="fixed inset-0 bg-gradient-to-br from-white/15 via-transparent to-white/10 pointer-events-none backdrop-blur-sm"></div>

          <Header currentTime={currentTime} />

          <main className="relative container mx-auto px-4 md:px-6 py-8 z-10 space-y-8">
            {/* FIX: Pass aqi VALUE, not object */}
            <AQICard aqi={sensorData.aqi} />
            
            <SensorGrid 
            sensorData={sensorData.sensorData} 
            onRefresh={refreshData}
            />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <ChartCard 
                title="AQI Trend"
                subtitle="Last 24 hours"
                iconType="trend"
                color="cyan"
                status="Live"
              />
              
              <ChartCard 
                title="Pollutant Levels"
                subtitle="μg/m³ concentration"
                iconType="pollutant"
                color="purple"
                status="Updated now"
              />
            </div>
          
            <Footer />
          </main>
        </div>
      )}

      {/* Fallback jika no data */}
      {!isLoading && !sensorData && (
        <div className="min-h-screen flex items-center justify-center bg-black">
          <div className="text-white text-center p-8">
            <h1 className="text-2xl mb-4">⚠️ No Sensor Data Available</h1>
            <p className="text-gray-400 mb-6">Unable to load sensor data. Please check connection.</p>
            <button 
              onClick={refreshData}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-medium"
            >
              Retry Connection
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default App;