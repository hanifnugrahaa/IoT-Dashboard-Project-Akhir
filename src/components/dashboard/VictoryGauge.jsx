import React from 'react';
import { VictoryPie, VictoryLabel, VictoryTheme } from 'victory';
import ClearGlassCard from '../common/ClearGlassCard';

const VictoryGauge = ({
  title,
  value,
  max = 100,
  unit = '',
  color = '#0ea5e9',
  size = 160,
  showPercentage = true
}) => {
  const percentage = (value / max) * 100;
  const data = [
    { x: 1, y: percentage },
    { x: 2, y: 100 - percentage }
  ];

  const getStatus = () => {
    if (percentage < 30) return { color: '#10B981', label: 'Low' };
    if (percentage < 70) return { color: '#F59E0B', label: 'Normal' };
    return { color: '#EF4444', label: 'High' };
  };

  const status = getStatus();

  return (
    <ClearGlassCard>
      <div className="p-6">
        <div className="text-white/80 text-sm text-center mb-4">{title}</div>
        
        <div className="relative" style={{ width: size, height: size }}>
          {/* Background Circle */}
          <div className="absolute inset-0 rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)',
              border: '1px solid rgba(255,255,255,0.1)'
            }}
          />
          
          {/* Victory Gauge */}
          <div className="absolute inset-0">
            <VictoryPie
              data={data}
              innerRadius={size * 0.65}
              cornerRadius={10}
              labels={() => null}
              width={size}
              height={size}
              theme={VictoryTheme.material}
              style={{
                data: {
                  fill: ({ datum }) => datum.x === 1 ? color : 'rgba(255, 255, 255, 0.1)',
                  stroke: 'transparent',
                  strokeWidth: 0
                }
              }}
              animate={{
                duration: 1000,
                onLoad: { duration: 500 }
              }}
            />
            
            {/* Center Value */}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <div className="text-2xl font-bold text-white">
                {value}
                <span className="text-lg text-white/70">{unit}</span>
              </div>
              {showPercentage && (
                <div className="text-white/60 text-xs mt-1">
                  {Math.round(percentage)}%
                </div>
              )}
            </div>
          </div>
        </div>
        
        {/* Status */}
        <div className="mt-6 flex items-center justify-center gap-2">
          <div className="w-2 h-2 rounded-full" style={{ background: status.color }}></div>
          <span className="text-white/80 text-sm">{status.label}</span>
        </div>
      </div>
    </ClearGlassCard>
  );
};

export default VictoryGauge;