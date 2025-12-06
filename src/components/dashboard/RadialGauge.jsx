import React from 'react';
import { RadialBarChart, RadialBar, ResponsiveContainer } from 'recharts';
import ClearGlassCard from '../common/ClearGlassCard';

const RadialGauge = ({
  title,
  value,
  max = 100,
  unit = '',
  colors = ['#0ea5e9', '#8b5cf6'],
  showNeedle = true
}) => {
  const percentage = (value / max) * 100;
  
  const data = [
    { name: 'value', value: percentage, fill: colors[0] },
    { name: 'remaining', value: 100 - percentage, fill: 'rgba(255, 255, 255, 0.1)' }
  ];

  const needleAngle = 180 * (percentage / 100);
  
  return (
    <ClearGlassCard>
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <div className="text-white/80 text-sm">{title}</div>
            <div className="text-2xl font-bold text-white mt-1">
              {value}
              <span className="text-lg text-white/70 ml-1">{unit}</span>
            </div>
          </div>
          <div className="text-3xl">
            {percentage >= 70 ? '🔥' : percentage >= 30 ? '🌡️' : '❄️'}
          </div>
        </div>
        
        <div className="relative h-48">
          <ResponsiveContainer width="100%" height="100%">
            <RadialBarChart
              innerRadius="60%"
              outerRadius="90%"
              data={data}
              startAngle={180}
              endAngle={0}
              barSize={20}
              barGap={0}
            >
              <RadialBar
                dataKey="value"
                background={{ fill: 'rgba(255, 255, 255, 0.05)' }}
                cornerRadius={10}
                className="transition-all duration-1000"
              />
            </RadialBarChart>
          </ResponsiveContainer>
          
          {/* Needle */}
          {showNeedle && (
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2"
              style={{
                width: '2px',
                height: '60px',
                background: '#ffffff',
                transformOrigin: 'bottom center',
                transform: `translateX(-50%) rotate(${needleAngle - 90}deg)`,
                transition: 'transform 1s ease-out',
              }}
            >
              <div className="absolute -top-1 -left-1 w-3 h-3 rounded-full bg-white"></div>
            </div>
          )}
          
          {/* Center Label */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
            <div className="text-3xl font-bold text-white">
              {Math.round(percentage)}%
            </div>
            <div className="text-white/50 text-xs mt-1">Level</div>
          </div>
        </div>
        
        {/* Scale */}
        <div className="flex justify-between mt-6 text-white/50 text-xs">
          <span>0{unit}</span>
          <span>{Math.round(max/2)}{unit}</span>
          <span>{max}{unit}</span>
        </div>
      </div>
    </ClearGlassCard>
  );
};

export default RadialGauge;