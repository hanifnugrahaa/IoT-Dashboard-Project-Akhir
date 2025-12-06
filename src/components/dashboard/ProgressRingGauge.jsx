import React from 'react';
import ClearGlassCard from '../common/ClearGlassCard';

const ProgressRingGauge = ({
  title,
  value,
  max = 100,
  unit = '',
  size = 140,
  strokeWidth = 12,
  colors = ['#0ea5e9', '#8b5cf6'],
  children
}) => {
  const percentage = (value / max) * 100;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <ClearGlassCard>
      <div className="p-6">
        <div className="text-white/80 text-sm text-center mb-4">{title}</div>
        
        <div className="relative mx-auto" style={{ width: size, height: size }}>
          {/* Background Circle */}
          <svg width={size} height={size} className="transform -rotate-90">
            <circle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              stroke="rgba(255, 255, 255, 0.1)"
              strokeWidth={strokeWidth}
              fill="transparent"
            />
            {/* Progress Circle */}
            <circle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              stroke={`url(#gradient-${title})`}
              strokeWidth={strokeWidth}
              fill="transparent"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              className="transition-all duration-1000 ease-out"
            />
            <defs>
              <linearGradient id={`gradient-${title}`} x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor={colors[0]} />
                <stop offset="100%" stopColor={colors[1]} />
              </linearGradient>
            </defs>
          </svg>
          
          {/* Center Content */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            {children || (
              <>
                <div className="text-2xl font-bold text-white">
                  {value}
                  <span className="text-lg text-white/70">{unit}</span>
                </div>
                <div className="text-white/50 text-xs mt-1">
                  {Math.round(percentage)}%
                </div>
              </>
            )}
          </div>
          
          {/* Glow Effect */}
          <div className="absolute inset-0 rounded-full"
            style={{
              background: `radial-gradient(circle at center, ${colors[0]}20 0%, transparent 70%)`,
              filter: 'blur(10px)',
              opacity: 0.5
            }}
          />
        </div>
        
        {/* Status Indicator */}
        <div className="mt-6 flex items-center justify-center gap-2">
          <div className="flex gap-1">
            {[0, 25, 50, 75, 100].map((point) => (
              <div
                key={point}
                className={`w-1 h-1 rounded-full ${percentage >= point ? 'bg-white' : 'bg-white/30'}`}
              />
            ))}
          </div>
          <span className="text-white/60 text-xs">
            {percentage >= 70 ? 'High' : percentage >= 30 ? 'Medium' : 'Low'}
          </span>
        </div>
      </div>
    </ClearGlassCard>
  );
};

export default ProgressRingGauge;