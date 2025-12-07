//AQICard.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { Activity, Wind, AlertTriangle, CheckCircle } from 'lucide-react';
import ClearGlassCard from '../common/ClearGlassCard';

const AQICard = ({ aqi }) => {
  // Ensure aqi is a number
  const aqiValue = typeof aqi === 'object' 
    ? (aqi?.value || aqi?.aqi || 78) 
    : (aqi || 78);
  
  // AQI Levels
  const aqiLevels = [
    { range: [0, 50], label: 'Good', color: '#10B981', emoji: '😊', desc: 'Air quality is satisfactory' },
    { range: [51, 100], label: 'Moderate', color: '#F59E0B', emoji: '😐', desc: 'Acceptable quality' },
    { range: [101, 150], label: 'Unhealthy for Sensitive', color: '#F97316', emoji: '😷', desc: 'Sensitive groups affected' },
    { range: [151, 200], label: 'Unhealthy', color: '#EF4444', emoji: '🤢', desc: 'Everyone may be affected' },
    { range: [201, 300], label: 'Very Unhealthy', color: '#8B5CF6', emoji: '😵', desc: 'Health alert' },
    { range: [301, 500], label: 'Hazardous', color: '#7C3AED', emoji: '☠️', desc: 'Emergency conditions' }
  ];

  const currentLevel = aqiLevels.find(level => aqiValue >= level.range[0] && aqiValue <= level.range[1]) || aqiLevels[0];

  const calculateCOPercentage = (coValue) => {
  const value = coValue || 0;
  
  if (value <= 1) return (value / 1) * 20;
  if (value <= 9) return 20 + ((value - 1) / 8) * 40;
  if (value <= 35) return 60 + ((value - 9) / 26) * 40;
  return 100;
};

const coPercentage = 75;

  return (
    <ClearGlassCard>
      <div className="p-8">
        <div className="flex flex-col lg:flex-row items-start justify-between gap-8">
          {/* Left Side - Main AQI */}
          <div className="flex-1">
            <div className="flex items-center gap-4 mb-6">
              <div className="relative">
                <div className="absolute inset-0 bg-white/30 rounded-xl blur-lg"></div>
                <div 
                  className="relative p-4 rounded-xl backdrop-blur-md"
                  style={{
                    background: `linear-gradient(135deg, ${currentLevel.color}40, ${currentLevel.color}20)`,
                    border: `1px solid ${currentLevel.color}60`,
                    boxShadow: `0 0 30px ${currentLevel.color}30`
                  }}
                >
                  <Activity className="text-white" size={36} />
                </div>
              </div>
              <div>
                <div className="text-white/80 text-sm uppercase tracking-wider">Air Quality Index</div>
                <div className="text-6xl md:text-7xl font-bold text-white mt-2 drop-shadow-lg">
                  {aqiValue}
                </div>
                <div className="text-2xl mt-3 flex items-center gap-3">
                  <span className={currentLevel.label === 'Good' ? 'text-emerald-400' : 
                                  currentLevel.label === 'Moderate' ? 'text-yellow-400' : 
                                  'text-red-400 font-bold'}>
                    {currentLevel.emoji} {currentLevel.label}
                  </span>
                  <div className="w-3 h-3 rounded-full animate-pulse" style={{ background: currentLevel.color }}></div>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <p className="text-white/90 text-lg max-w-2xl">
                {currentLevel.desc}. {aqiValue < 100 
                  ? 'Normal outdoor activities can continue without restrictions.' 
                  : 'Consider reducing prolonged or heavy exertion.'}
              </p>
              
              {/* Recommendations */}
              <div className="flex items-start gap-3 p-4 rounded-xl"
                style={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.1)'
                }}
              >
                {aqiValue < 100 ? (
                  <CheckCircle className="text-emerald-400 mt-0.5 flex-shrink-0" size={20} />
                ) : (
                  <AlertTriangle className="text-yellow-400 mt-0.5 flex-shrink-0" size={20} />
                )}
                <div className="text-white/80 text-sm">
                  {aqiValue < 50 ? 'Perfect day for outdoor activities!' :
                   aqiValue < 100 ? 'Good air quality. Enjoy your day!' :
                   aqiValue < 150 ? 'Sensitive individuals should limit prolonged outdoor exertion.' :
                   'Everyone should reduce prolonged or heavy exertion outdoors.'}
                </div>
              </div>
            </div>
          </div>
          
          {/* Right Side - AQI Meter (BUKAN CO) */}
          <div className="lg:w-96 space-y-6">
            <div className="text-center">
              <div className="text-white/80 text-sm mb-2 flex items-center justify-center gap-2">
                <Wind size={16} />
                Primary Pollutant
              </div>
              <div className="text-2xl font-bold text-white mb-1">CO</div>
            </div>
            
            {/* AQI Progress Bar */}
            <div className="space-y-4">
              {/* Main AQI Progress Bar */}
              <div className="relative">
                {/* Background Track dengan Gradient */}
                <div className="h-3 rounded-full overflow-hidden"
                  style={{
                    background: 'linear-gradient(90deg, #10B981 0%, #F59E0B 33%, #EF4444 66%, #8B5CF6 100%)',
                    opacity: 0.2
                  }}
                />
                
                {/* Glow Effect di Bawah */}
                <div className="absolute inset-0 h-3 rounded-full blur-md"
                  style={{
                    background: 'linear-gradient(90deg, #10B981 0%, #F59E0B 33%, #EF4444 66%, #8B5CF6 100%)',
                    opacity: 0.1
                  }}
                />
                
                {/* Progress Fill dengan Glass Effect */}
                <motion.div
                  className="absolute top-0 left-0 h-3 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${(aqiValue / 500) * 100}%` }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                  style={{
                    background: `linear-gradient(90deg, 
                      rgba(255, 255, 255, 0.9) 0%,
                      rgba(255, 255, 255, 0.7) 50%,
                      rgba(255, 255, 255, 0.9) 100%)`,
                    boxShadow: '0 0 10px rgba(255, 255, 255, 0.5)',
                  }}
                >
                  {/* Shimmer Effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent animate-shimmer"></div>
                </motion.div>
                
                {/* Current Position Indicator */}
                <motion.div
                  className="absolute top-1/2 w-4 h-4 rounded-full border-2 border-white"
                  initial={{ left: 0 }}
                  animate={{ left: `${(aqiValue / 500) * 100}%` }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                  style={{
                    background: currentLevel.color,
                    transform: 'translate(-50%, -50%)',
                    boxShadow: `0 0 20px ${currentLevel.color}`
                  }}
                >
                  <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 whitespace-nowrap text-xs font-bold text-white">
                    AQI {aqiValue}
                  </div>
                </motion.div>
              </div>
              
              {/* AQI Level Labels */}
              <div className="flex justify-between text-sm text-white/70 px-1">
                <span className="text-emerald-400">Good</span>
                <span className="text-yellow-400">Moderate</span>
                <span className="text-orange-500">Unhealthy</span>
                <span className="text-purple-400">Hazardous</span>
              </div>
              
              {/* Pollutant Contribution */}
              <div className="space-y-3 mt-6">
                <div className="text-white/80 text-sm mb-2">Pollutant Contribution to AQI</div>
                
                {/* CO Contribution */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-[#EF4444]"></div>
                    <span className="text-white/70 text-sm">Carbon Monoxide</span>
                  </div>
                  <div className="flex items-center gap-3">
                    {/* Mini Progress Bar */}
                    <div className="w-24 h-1.5 rounded-full overflow-hidden bg-white/10">
                      <div 
                        className="h-full rounded-full bg-[#EF4444]"
                        style={{ width: `${coPercentage}%` }}
                      />
                    </div>
                    <span className="text-white text-sm font-mono">{coPercentage}%</span>
                  </div>
                </div>
                
                {/* Info Box */}
                <div className="p-3 rounded-lg mt-4"
                  style={{
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(255, 255, 255, 0.1)'
                  }}
                >
                  <div className="text-white/80 text-sm">
                    AQI calculation is based on the highest concentration among measured pollutants. 
                    Currently CO levels.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ClearGlassCard>
  );
};

export default AQICard;