import React from 'react';
import { BarChart3, AlertCircle, TrendingUp, TrendingDown } from 'lucide-react';
import ClearGlassCard from '../common/ClearGlassCard';
import AQITrendChart from './AQITrendChart';
import PollutantChart from './PollutantChart';

const ChartCard = ({ title, subtitle, iconType, color, status }) => {
  const getIcon = () => {
    if (iconType === 'trend') return <BarChart3 className="text-white" size={24} />;
    if (iconType === 'pollutant') return <AlertCircle className="text-white" size={24} />;
    return null;
  };

  const getColorStyle = () => {
    if (color === 'cyan') return 'rgba(14, 165, 233, 0.25)';
    if (color === 'purple') return 'rgba(139, 92, 246, 0.25)';
    return 'rgba(255, 255, 255, 0.25)';
  };

  const getChartComponent = () => {
    if (title === 'AQI Trend') return <AQITrendChart />;
    if (title === 'Pollutant Levels') return <PollutantChart />;
    return null;
  };

  return (
    <ClearGlassCard>
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div 
              className="p-2 rounded-lg"
              style={{
                background: getColorStyle(),
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.4)'
              }}
            >
              {getIcon()}
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white">{title}</h3>
              <p className="text-white/80 text-sm">{subtitle}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${
              status === 'Live' ? 'bg-green-400 animate-pulse' : 
              'bg-blue-400'
            }`}></div>
            <span className="text-sm text-white/80">{status}</span>
          </div>
        </div>
        
        {/* Real Chart */}
        <div className="rounded-xl overflow-hidden">
          {getChartComponent()}
        </div>
        
        {/* Chart Stats */}
        <div className="flex items-center justify-between mt-6 pt-4 border-t border-white/10">
          <div className="text-white/60 text-sm">
            {title === 'AQI Trend' && '24h average: 68 AQI'}
            {title === 'Pollutant Levels' && 'Total pollutants: 5 monitored'}
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              {title === 'AQI Trend' ? (
                <>
                  <TrendingDown className="w-4 h-4 text-green-400" />
                  <span className="text-green-400 text-sm">-2.3% today</span>
                </>
              ) : (
                <>
                  <TrendingUp className="w-4 h-4 text-yellow-400" />
                  <span className="text-yellow-400 text-sm">+1.5% today</span>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </ClearGlassCard>
  );
};

export default ChartCard;