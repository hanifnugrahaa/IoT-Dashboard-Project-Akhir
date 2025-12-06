import React from 'react';
import ClearGlassCard from '../common/ClearGlassCard';

const SensorCard = ({ sensor }) => {
  const { name, value, unit, icon, bgColor } = sensor;

  return (
    <ClearGlassCard className="hover:scale-[1.02] transition-transform duration-300">
      <div className="p-6">
        <div className="flex justify-between items-start mb-6">
          <div>
            <div className="text-white/90 text-sm font-medium mb-2">{name}</div>
            <div className="text-4xl font-bold text-white">{value}</div>
            <div className="text-white/70 text-sm mt-1">{unit}</div>
          </div>
          <div 
            className="p-3 rounded-xl"
            style={{
              background: bgColor,
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.4)'
            }}
          >
            {icon}
          </div>
        </div>
        
        {/* Progress Bar */}
        <div 
          className="relative h-2 rounded-full overflow-hidden mb-4"
          style={{
            background: 'rgba(255, 255, 255, 0.15)',
            border: '1px solid rgba(255, 255, 255, 0.2)'
          }}
        >
          <div className="absolute inset-0" style={{ background: bgColor, opacity: 0.5 }}></div>
          <div 
            className="relative h-full" 
            style={{ 
              background: bgColor,
              width: '75%' 
            }}
          >
            <div className="absolute right-0 top-0 bottom-0 w-4 bg-white/60 blur-sm"></div>
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <span className="text-white/70 text-sm">Status</span>
          <span className="text-green-300 font-medium flex items-center gap-2">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            Normal
          </span>
        </div>
      </div>
    </ClearGlassCard>
  );
};

export default SensorCard;