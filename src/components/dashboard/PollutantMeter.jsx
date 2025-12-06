import React from 'react';

const PollutantMeter = () => {
  return (
    <div className="lg:w-96 space-y-6">
            <div className="text-center">
              <div className="text-white/80 text-sm mb-2 flex items-center justify-center gap-2">
                <Wind size={16} />
                Primary Pollutant
              </div>
              <div className="text-2xl font-bold text-white mb-1">{primaryPollutant.name}</div>
              <div className="text-white/60 text-sm">
                {primaryPollutant.level} {primaryPollutant.name === 'CO' ? 'ppm' : 'μg/m³'}
              </div>
            </div>
            
            {/* Aesthetic Progress Bar */}
            <div className="space-y-4">
              {/* Main Progress Bar */}
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
                  animate={{ width: `${(aqi / 500) * 100}%` }}
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
                  animate={{ left: `${(aqi / 500) * 100}%` }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                  style={{
                    background: currentLevel.color,
                    transform: 'translate(-50%, -50%)',
                    boxShadow: `0 0 20px ${currentLevel.color}`
                  }}
                >
                  <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 whitespace-nowrap text-xs font-bold text-white">
                    AQI {aqi}
                  </div>
                </motion.div>
              </div>
              
              {/* Labels */}
              <div className="flex justify-between text-sm text-white/70 px-1">
                <span className="text-emerald-400">Good</span>
                <span className="text-yellow-400">Moderate</span>
                <span className="text-orange-500">Unhealthy</span>
                <span className="text-purple-400">Hazardous</span>
              </div>
              
              {/* Pollutant Breakdown */}
              <div className="space-y-3 mt-6">
                <div className="text-white/80 text-sm mb-2">Pollutant Levels</div>
                {pollutants.map((pollutant) => (
                  <div key={pollutant.name} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full" style={{ background: pollutant.color }}></div>
                      <span className="text-white/70 text-sm">{pollutant.name}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      {/* Mini Progress Bar */}
                      <div className="w-24 h-1.5 rounded-full overflow-hidden bg-white/10">
                        <div 
                          className="h-full rounded-full"
                          style={{ 
                            width: `${(pollutant.level / pollutant.max) * 100}%`,
                            background: pollutant.color
                          }}
                        />
                      </div>
                      <span className="text-white text-sm font-mono">{pollutant.level}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
  );
};

export default PollutantMeter;