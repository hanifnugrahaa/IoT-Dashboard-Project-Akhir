import React from 'react';
import { RadialBarChart, RadialBar, ResponsiveContainer } from 'recharts';
import ClearGlassCard from '../common/ClearGlassCard';

const CircularGauge = ({
  title,
  value,
  max = 100,
  unit = '',
  color = '#0ea5e9',
  icon,
  showValue = true,
  size = 150
}) => {
  const percentage = (value / max) * 100;
  
  const data = [
    { name: 'fill', value: percentage, fill: color },
    { name: 'empty', value: 100 - percentage, fill: 'rgba(255, 255, 255, 0.1)' }
  ];

  return (
    <ClearGlassCard>
      <div className="p-6">
        <div className="flex flex-col items-center">
          {/* Title */}
          <div className="text-white/80 text-sm mb-4">{title}</div>
          
          {/* Circular Gauge */}
          <div className="relative" style={{ width: size, height: size }}>
            <ResponsiveContainer width="100%" height="100%">
              <RadialBarChart
                innerRadius="70%"
                outerRadius="100%"
                data={data}
                startAngle={90}
                endAngle={450}
              >
                <RadialBar
                  background={{ fill: 'rgba(255, 255, 255, 0.05)' }}
                  dataKey="value"
                  cornerRadius={10}
                  className="transition-all duration-1000"
                />
              </RadialBarChart>
            </ResponsiveContainer>
            
            {/* Center Content */}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              {showValue && (
                <>
                  <div className="text-3xl font-bold text-white">
                    {value}
                    <span className="text-lg text-white/70">{unit}</span>
                  </div>
                  <div className="text-white/50 text-xs mt-1">
                    {Math.round(percentage)}% full
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Status Indicator */}
          <div className="mt-6 flex items-center gap-2 px-4 py-2 rounded-full"
            style={{
              background: 'rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(10px)'
            }}
          >
            <div className="w-2 h-2 rounded-full" style={{ background: color }}></div>
            <span className="text-white/80 text-sm">
              {percentage < 30 ? 'Low' : percentage < 70 ? 'Optimal' : 'High'}
            </span>
          </div>
        </div>
      </div>
    </ClearGlassCard>
  );
};

export default CircularGauge;