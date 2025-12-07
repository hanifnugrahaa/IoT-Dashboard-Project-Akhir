//AQITrendChart.jsx
import React from 'react';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, 
  Tooltip, Legend, ResponsiveContainer, Area,
  ReferenceLine
} from 'recharts';
import { generateAQIData } from '../../utils/chartData';

const AQITrendChart = () => {
  const data = generateAQIData();
  
  // Custom Tooltip
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-gray-900/90 backdrop-blur-sm border border-white/20 rounded-lg p-4">
          <p className="text-white font-bold mb-2">{label}</p>
          <div className="space-y-1">
            {payload.map((entry, index) => (
              <div key={index} className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ background: entry.color }}
                  />
                  <span className="text-white/80 text-sm">{entry.dataKey}</span>
                </div>
                <span className="text-white font-mono font-bold">
                  {entry.dataKey === 'temperature' ? `${entry.value}°C` : 
                   entry.dataKey === 'humidity' ? `${entry.value}%` : 
                   entry.value}
                </span>
              </div>
            ))}
          </div>
        </div>
      );
    }
    return null;
  };

  // Custom Legend
  const renderLegend = (props) => {
    const { payload } = props;
    return (
      <div className="flex flex-wrap gap-4 justify-center mt-4">
        {payload.map((entry, index) => (
          <div key={`item-${index}`} className="flex items-center gap-2">
            <div 
              className="w-3 h-3 rounded-full" 
              style={{ backgroundColor: entry.color }}
            />
            <span className="text-white/70 text-sm">{entry.value}</span>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="h-80">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
        >
          {/* Gradient Background */}
          <defs>
            <linearGradient id="colorAqi" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0}/>
            </linearGradient>
          </defs>
          
          {/* Grid */}
          <CartesianGrid 
            strokeDasharray="3 3" 
            stroke="rgba(255,255,255,0.1)" 
            vertical={false}
          />
          
          {/* Axes */}
          <XAxis 
            dataKey="time"
            stroke="rgba(255,255,255,0.5)"
            tick={{ fill: 'rgba(255,255,255,0.7)', fontSize: 12 }}
            axisLine={{ stroke: 'rgba(255,255,255,0.2)' }}
            tickLine={{ stroke: 'rgba(255,255,255,0.2)' }}
            interval={3}
          />
          <YAxis 
            stroke="rgba(255,255,255,0.5)"
            tick={{ fill: 'rgba(255,255,255,0.7)', fontSize: 12 }}
            axisLine={{ stroke: 'rgba(255,255,255,0.2)' }}
            tickLine={{ stroke: 'rgba(255,255,255,0.2)' }}
            domain={[0, 150]}
            label={{ 
              value: 'AQI', 
              angle: -90, 
              position: 'insideLeft',
              fill: 'rgba(255,255,255,0.7)'
            }}
          />
          
          {/* Reference Lines */}
          <ReferenceLine 
            y={50} 
            stroke="#10B981" 
            strokeDasharray="3 3" 
            strokeOpacity={0.5}
            label={{ 
              value: 'Good', 
              position: 'right',
              fill: '#10B981',
              fontSize: 12 
            }}
          />
          <ReferenceLine 
            y={100} 
            stroke="#F59E0B" 
            strokeDasharray="3 3" 
            strokeOpacity={0.5}
            label={{ 
              value: 'Moderate', 
              position: 'right',
              fill: '#F59E0B',
              fontSize: 12 
            }}
          />
          
          {/* Tooltip */}
          <Tooltip content={<CustomTooltip />} />
          <Legend content={renderLegend} />
          
          {/* AQI Line */}
          <Line
            type="monotone"
            dataKey="aqi"
            name="AQI Index"
            stroke="#0ea5e9"
            strokeWidth={3}
            dot={{ 
              r: 3, 
              strokeWidth: 2, 
              stroke: '#0ea5e9', 
              fill: '#ffffff' 
            }}
            activeDot={{ r: 6, stroke: '#ffffff', strokeWidth: 2 }}
            animationDuration={1500}
            animationEasing="ease-out"
          />
          
          {/* Area under line */}
          <Area
            type="monotone"
            dataKey="aqi"
            fill="url(#colorAqi)"
            stroke="transparent"
          />
          
          {/* Secondary Line - PM2.5 */}
          <Line
            type="monotone"
            dataKey="pm25"
            name="PM2.5"
            stroke="#8b5cf6"
            strokeWidth={2}
            strokeDasharray="5 5"
            dot={false}
            activeDot={{ r: 4, stroke: '#8b5cf6', strokeWidth: 2 }}
            animationDuration={2000}
            animationEasing="ease-out"
          />
        </LineChart>
      </ResponsiveContainer>
      
      {/* Chart Info */}
      <div className="flex justify-between items-center mt-4 text-white/60 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-[#0ea5e9]"></div>
          <span>AQI Index</span>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 border-2 border-[#10B981] rounded-full"></div>
            <span>Good (≤50)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 border-2 border-[#F59E0B] rounded-full"></div>
            <span>Moderate (≤100)</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AQITrendChart;