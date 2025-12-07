//PollutantChart.jsx
import React from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ResponsiveContainer, Cell,
  ReferenceLine, LabelList
} from 'recharts';
import { generatePollutantData } from '../../utils/chartData';

const PollutantChart = () => {
  const data = generatePollutantData();
  
  // Custom Tooltip untuk bar chart
  const CustomBarTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const item = payload[0].payload;
      return (
        <div className="bg-gray-900/90 backdrop-blur-sm border border-white/20 rounded-lg p-4 min-w-[200px]">
          <div className="flex items-center gap-3 mb-3">
            <div 
              className="w-4 h-4 rounded-full" 
              style={{ background: item.color }}
            />
            <div>
              <p className="text-white font-bold">{item.name}</p>
              <p className="text-white/70 text-sm">{item.unit}</p>
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-white/70">Current Level</span>
              <span className="text-white font-bold">{item.value} {item.unit}</span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-white/70">Safe Limit</span>
              <span className="text-white">{item.safeLimit} {item.unit}</span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-white/70">Daily Average</span>
              <span className="text-white">{item.dailyAvg} {item.unit}</span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-white/70">Trend</span>
              <span className={`font-bold ${
                item.trend === 'up' ? 'text-red-400' :
                item.trend === 'down' ? 'text-green-400' : 'text-yellow-400'
              }`}>
                {item.trend === 'up' ? '↗ Increasing' :
                 item.trend === 'down' ? '↘ Decreasing' : '→ Stable'}
              </span>
            </div>
            
            {/* Progress Bar */}
            <div className="mt-3">
              <div className="flex justify-between text-white/60 text-xs mb-1">
                <span>0{item.unit}</span>
                <span>Safe: {item.safeLimit}{item.unit}</span>
              </div>
              <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                <div 
                  className="h-full rounded-full"
                  style={{ 
                    width: `${(item.value / item.safeLimit) * 100}%`,
                    background: item.value > item.safeLimit 
                      ? 'linear-gradient(90deg, #EF4444, #F97316)' 
                      : 'linear-gradient(90deg, #10B981, #0ea5e9)'
                  }}
                />
              </div>
              <div className="text-right text-white/60 text-xs mt-1">
                {Math.round((item.value / item.safeLimit) * 100)}% of limit
              </div>
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

  // Custom Bar Label
  const renderCustomBarLabel = ({ x, y, width, value, index }) => {
    const item = data[index];
    const isAboveLimit = item.value > item.safeLimit;
    
    return (
      <g>
        <text
          x={x + width / 2}
          y={y - 10}
          fill={isAboveLimit ? "#EF4444" : "#ffffff"}
          textAnchor="middle"
          fontSize={12}
          fontWeight="bold"
        >
          {value}{item.unit === 'ppm' ? '' : item.unit}
        </text>
        {isAboveLimit && (
          <text
            x={x + width / 2}
            y={y - 25}
            fill="#EF4444"
            textAnchor="middle"
            fontSize={10}
          >
            ⚠️ Exceeds
          </text>
        )}
      </g>
    );
  };

  return (
    <div className="h-80">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          layout="vertical"
          margin={{ top: 20, right: 40, left: 100, bottom: 20 }}
        >
          {/* Grid */}
          <CartesianGrid 
            stroke="rgba(255,255,255,0.1)" 
            strokeDasharray="3 3"
            horizontal={false}
          />
          
          {/* Axes */}
          <XAxis 
            type="number"
            stroke="rgba(255,255,255,0.5)"
            tick={{ fill: 'rgba(255,255,255,0.7)', fontSize: 12 }}
            axisLine={{ stroke: 'rgba(255,255,255,0.2)' }}
            tickLine={{ stroke: 'rgba(255,255,255,0.2)' }}
          />
          <YAxis 
            type="category"
            dataKey="name"
            stroke="rgba(255,255,255,0.5)"
            tick={{ fill: 'rgba(255,255,255,0.7)', fontSize: 12 }}
            axisLine={{ stroke: 'rgba(255,255,255,0.2)' }}
            tickLine={{ stroke: 'rgba(255,255,255,0.2)' }}
          />
          
          {/* Reference Lines for safe limits */}
          {data.map((item, index) => (
            <ReferenceLine
              key={`ref-${index}`}
              x={item.safeLimit}
              stroke="#ffffff"
              strokeDasharray="3 3"
              strokeOpacity={0.3}
              label={{
                value: `Safe Limit`,
                position: 'right',
                fill: '#ffffff',
                fontSize: 10,
                opacity: 0.7
              }}
            />
          ))}
          
          {/* Tooltip */}
          <Tooltip content={<CustomBarTooltip />} />
          
          {/* Bars */}
          <Bar
            dataKey="value"
            radius={[0, 8, 8, 0]}
            animationDuration={1800}
            animationEasing="ease-out"
            label={renderCustomBarLabel}
          >
            {data.map((entry, index) => (
              <Cell 
                key={`cell-${index}`}
                fill={entry.color}
                opacity={0.8}
                stroke={entry.value > entry.safeLimit ? "#EF4444" : entry.color}
                strokeWidth={entry.value > entry.safeLimit ? 2 : 0}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
      
      {/* Chart Info */}
      <div className="mt-6">
        <div className="text-white/70 text-sm mb-3">Pollutant Concentration Overview</div>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          {data.map((item, index) => (
            <div 
              key={index}
              className="p-3 rounded-lg backdrop-blur-sm"
              style={{
                background: 'rgba(255, 255, 255, 0.05)',
                border: `1px solid ${item.color}40`
              }}
            >
              <div className="flex items-center gap-2 mb-2">
                <div 
                  className="w-3 h-3 rounded-full" 
                  style={{ background: item.color }}
                />
                <span className="text-white/90 text-sm font-medium">{item.name}</span>
              </div>
              <div className="text-2xl font-bold text-white mb-1">
                {item.value}
                <span className="text-sm text-white/70 ml-1">{item.unit}</span>
              </div>
              <div className="text-white/60 text-xs">
                {item.value > item.safeLimit ? '⚠️ Above limit' : '✅ Within limit'}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PollutantChart;