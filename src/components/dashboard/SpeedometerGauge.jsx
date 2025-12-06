import React from 'react';
import ClearGlassCard from '../common/ClearGlassCard';

const SpeedometerGauge = ({
  title,
  value,
  min = 0,
  max = 100,
  unit = '',
  colors = ['#00FF00', '#FFFF00', '#FF0000'],
  segments = 5,
  size = 200
}) => {
  const percentage = ((value - min) / (max - min)) * 100;
  const angle = 180 * (percentage / 100);
  const segmentAngle = 180 / segments;
  
  const getNeedleColor = () => {
    if (percentage < 33) return colors[0];
    if (percentage < 66) return colors[1];
    return colors[2];
  };

  return (
    <ClearGlassCard>
      <div className="p-6">
        <div className="text-white/80 text-sm text-center mb-4">{title}</div>
        
        <div className="relative mx-auto" style={{ width: size, height: size / 2 }}>
          {/* Gauge Background */}
          <div className="absolute inset-0 overflow-hidden">
            {/* Segments */}
            {Array.from({ length: segments + 1 }).map((_, i) => {
              const segmentPercentage = (i / segments) * 100;
              const segmentColor = 
                segmentPercentage < 33 ? colors[0] :
                segmentPercentage < 66 ? colors[1] : colors[2];
              
              return (
                <div
                  key={i}
                  className="absolute bottom-0 left-1/2 origin-bottom"
                  style={{
                    width: '2px',
                    height: '40%',
                    background: `linear-gradient(to top, ${segmentColor}, transparent)`,
                    transform: `translateX(-50%) rotate(${-90 + (i * segmentAngle)}deg)`,
                    opacity: 0.6
                  }}
                />
              );
            })}
            
            {/* Arc Background */}
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-full h-full">
              <div className="absolute inset-0 rounded-t-full"
                style={{
                  border: '20px solid transparent',
                  borderTopColor: 'rgba(255, 255, 255, 0.1)',
                  borderRightColor: 'rgba(255, 255, 255, 0.1)',
                  borderLeftColor: 'rgba(255, 255, 255, 0.1)',
                }}
              />
            </div>
          </div>
          
          {/* Needle */}
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2"
            style={{
              width: '2px',
              height: '45%',
              background: getNeedleColor(),
              transformOrigin: 'bottom center',
              transform: `translateX(-50%) rotate(${-90 + angle}deg)`,
              transition: 'transform 1s cubic-bezier(0.34, 1.56, 0.64, 1)',
            }}
          >
            {/* Needle Head */}
            <div className="absolute -top-2 -left-1.5 w-3 h-3 rounded-full"
              style={{ background: getNeedleColor() }}
            />
          </div>
          
          {/* Center Dot */}
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 w-4 h-4 rounded-full bg-white"></div>
          
          {/* Value Display */}
          <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-center">
            <div className="text-2xl font-bold text-white">
              {value}
              <span className="text-lg text-white/70 ml-1">{unit}</span>
            </div>
            <div className="text-white/50 text-xs mt-1">
              {Math.round(percentage)}% capacity
            </div>
          </div>
        </div>
        
        {/* Min/Max Labels */}
        <div className="flex justify-between mt-12 text-white/50 text-xs">
          <span>{min}{unit}</span>
          <span>{max}{unit}</span>
        </div>
      </div>
    </ClearGlassCard>
  );
};

export default SpeedometerGauge;