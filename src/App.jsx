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
import SystemStatus from './components/dashboard/SystemStatus';
import './styles/animations.css';

function App() {
  const { sensorData, isLoading, lastUpdated, legacyData, refreshData } = useSensorData();
  const currentTime = useClock();

  return (
    <>
      <AnimatePresence>
        {isLoading && <LoadingScreen />}
      </AnimatePresence>

      {!isLoading && (
        <div className="min-h-screen text-gray-800 bg-cover bg-center bg-fixed"
          style={{
            backgroundImage: 'url(/bg11.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center center',
            backgroundAttachment: 'fixed',
            backgroundRepeat: 'no-repeat',
            position: 'relative',
          }}>
          
          {/* Light Overlay untuk meningkatkan kontras */}
          <div className="fixed inset-0 bg-gradient-to-br from-white/15 via-transparent to-white/10 pointer-events-none backdrop-blur-sm"></div>

          <Header currentTime={currentTime} />

          <main className="relative container mx-auto px-4 md:px-6 py-8 z-10 space-y-8">
            <AQICard aqi={sensorData} />
            
            <SensorGrid 
            sensorData={sensorData} 
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

          {/* CSS Animations */}
          <style jsx>{`
            @keyframes natural-float {
              0% {
                transform: 
                  translate(0, 0) 
                  rotate(0deg) 
                  scale(1);
                opacity: 0.3;
                animation-timing-function: ease-in-out;
              }
              10% {
                transform: 
                  translate(8px, -6px) 
                  rotate(36deg) 
                  scale(1.05);
                opacity: 0.45;
                animation-timing-function: ease-out;
              }
              30% {
                transform: 
                  translate(12px, 4px) 
                  rotate(108deg) 
                  scale(1.1);
                opacity: 0.5;
                animation-timing-function: ease-in-out;
              }
              50% {
                transform: 
                  translate(-10px, 10px) 
                  rotate(180deg) 
                  scale(0.95);
                opacity: 0.4;
                animation-timing-function: ease-in;
              }
              70% {
                transform: 
                  translate(-6px, -8px) 
                  rotate(252deg) 
                  scale(1.02);
                opacity: 0.35;
                animation-timing-function: ease-in-out;
              }
              90% {
                transform: 
                  translate(4px, 6px) 
                  rotate(324deg) 
                  scale(0.98);
                opacity: 0.42;
                animation-timing-function: ease-out;
              }
              100% {
                transform: 
                  translate(0, 0) 
                  rotate(360deg) 
                  scale(1);
                opacity: 0.3;
                animation-timing-function: ease-in-out;
              }
            }
          `}</style>
        </div>
      )}
    </>
  );
}

export default App;