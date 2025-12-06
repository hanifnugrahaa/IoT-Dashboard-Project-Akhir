import React from 'react';
import { motion } from 'framer-motion';
import { 
  Thermometer, Droplets, Wind, AlertCircle,
  TrendingUp, TrendingDown, Minus, RefreshCw
} from 'lucide-react';
import ClearGlassCard from '../common/ClearGlassCard';

const SensorValueCard = ({ 
  title, 
  sensorData,
  onRefresh,
  className = ''
}) => {
  
  if (!sensorData) {
    return (
      <ClearGlassCard className={className}>
        <div className="p-6">
          <div className="text-white/70 text-sm mb-1">{title}</div>
          <div className="text-white/40 text-sm">Loading data...</div>
        </div>
      </ClearGlassCard>
    );
  }
  
  const { value, unit, status, trend, description } = sensorData;
  
  const getIcon = () => {
    const iconProps = { className: "text-white", size: 32 };
    switch(title.toLowerCase()) {
      case 'air quality':
      case 'aqi':
        return <Wind {...iconProps} />;
      case 'carbon monoxide':
      case 'co':
        return <AlertCircle {...iconProps} />;
      case 'temperature':
        return <Thermometer {...iconProps} />;
      case 'humidity':
        return <Droplets {...iconProps} />;
      default:
        return <Wind {...iconProps} />;
    }
  };

  const getTrendIcon = () => {
    switch(trend.trend) {
      case 'up': 
        return <TrendingUp className="w-4 h-4 text-red-400" />;
      case 'down': 
        return <TrendingDown className="w-4 h-4 text-green-400" />;
      default: 
        return <Minus className="w-4 h-4 text-gray-400" />;
    }
  };

  const getTrendText = () => {
    if (trend.change === 0) return 'No change';
    return `${trend.trend === 'up' ? '+' : '-'}${trend.change.toFixed(1)}${unit}`;
  };

  const getColor = () => {
    switch(title.toLowerCase()) {
      case 'air quality': return '#3B82F6';
      case 'carbon monoxide': return '#EF4444';
      case 'temperature': return '#F97316';
      case 'humidity': return '#06B6D4';
      default: return '#0ea5e9';
    }
  };

  const color = getColor();

  return (
    <ClearGlassCard className={`hover:scale-[1.02] transition-all duration-300 ${className}`}>
      <div className="p-6">
        {/* Header */}
        <div className="flex justify-between items-start mb-6">
          <div>
            <div className="text-white/70 text-sm font-medium mb-1 flex items-center gap-2">
              {title}
              <span 
                className="text-xs px-2 py-0.5 rounded-full text-white"
                style={{ 
                  background: `${status.color}40`,
                  border: `1px solid ${status.color}60`
                }}
              >
                {status.status.toUpperCase()}
              </span>
            </div>
            <div className="flex items-baseline gap-2">
              <div className="text-5xl font-bold text-white">
                {typeof value === 'number' ? value.toFixed(title === 'temperature' ? 1 : 0) : value}
              </div>
              <div className="text-white/60 text-lg">{unit}</div>
            </div>
            <div className="flex items-center gap-2 mt-2">
              <span className="text-2xl">{status.emoji}</span>
              <span className="text-white/80 text-sm">{description}</span>
            </div>
          </div>
          
          {/* Icon Container */}
          <div className="relative">
            <div className="absolute inset-0 bg-white/20 rounded-xl blur-md"></div>
            <div 
              className="relative p-3 rounded-xl backdrop-blur-sm"
              style={{
                background: `linear-gradient(135deg, ${color}40, ${color}20)`,
                border: `1px solid ${color}60`,
                boxShadow: `0 0 20px ${color}30`
              }}
            >
              {getIcon()}
            </div>
          </div>
        </div>

        {/* Trend Indicator */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            {getTrendIcon()}
            <span className={`text-sm ${
              trend.trend === 'up' ? 'text-red-400' : 
              trend.trend === 'down' ? 'text-green-400' : 
              'text-gray-400'
            }`}>
              {getTrendText()}
            </span>
            <span className="text-white/40 text-xs">last hour</span>
          </div>
          <button
            onClick={onRefresh}
            className="p-1.5 rounded-lg hover:bg-white/10 transition-colors"
            title="Refresh data"
          >
            <RefreshCw className="w-4 h-4 text-white/60" />
          </button>
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent my-4"></div>

        {/* Status Details */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-white/60 text-sm">Status Level</span>
            <div className="flex items-center gap-2">
              <div 
                className="w-2 h-2 rounded-full animate-pulse" 
                style={{ background: status.color }}
              />
              <span className="text-white text-sm font-medium">{status.status}</span>
            </div>
          </div>
          
          {/* Status Bar */}
          <div className="h-1.5 rounded-full overflow-hidden bg-white/10">
            <motion.div
              className="h-full rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${getStatusPercentage(title, value)}%` }}
              transition={{ duration: 1, ease: "easeOut" }}
              style={{
                background: `linear-gradient(90deg, ${status.color}, ${color})`,
                boxShadow: `0 0 10px ${status.color}50`
              }}
            />
          </div>
          
          <div className="text-white/40 text-xs text-right">
            {getRangeText(title)}
          </div>
        </div>
      </div>
    </ClearGlassCard>
  );
};

// Helper functions
const getStatusPercentage = (title, value) => {
  switch(title.toLowerCase()) {
    case 'air quality':
      return Math.min(100, (value / 150) * 100); // Max 150 for visualization
    case 'carbon monoxide':
      return Math.min(100, (value / 35) * 100); // Max 35 ppm
    case 'temperature':
      return ((value - 22) / (34 - 22)) * 100; // 22-34°C range
    case 'humidity':
      return ((value - 35) / (85 - 35)) * 100; // 35-85% range
    default:
      return 50;
  }
};

const getRangeText = (title) => {
  switch(title.toLowerCase()) {
    case 'air quality':
      return 'Good: 0-50 | Moderate: 51-100 | Unhealthy: 101-150';
    case 'carbon monoxide':
      return 'Excellent: ≤9ppm | Good: ≤25ppm | Warning: >25ppm';
    case 'temperature':
      return 'Cool: ≤25°C | Comfortable: ≤30°C | Hot: >30°C';
    case 'humidity':
      return 'Dry: ≤40% | Comfortable: ≤70% | Humid: >70%';
    default:
      return '';
  }
};

export default SensorValueCard;