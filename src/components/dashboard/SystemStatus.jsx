import React from 'react';
import { Cpu, Shield, Zap, Activity, Database } from 'lucide-react';
import ClearGlassCard from '../common/ClearGlassCard';

const SystemStatus = () => {
  const statusItems = [
    { icon: <Shield className="w-8 h-8 text-white" />, label: 'Data Accuracy', value: '98.7%' },
    { icon: <Zap className="w-8 h-8 text-white" />, label: 'Uptime', value: '99.9%' },
    { icon: <Activity className="w-8 h-8 text-white" />, label: 'Response Time', value: '< 100ms' },
    { icon: <Database className="w-8 h-8 text-white" />, label: 'Data Points', value: '1,247' }
  ];

  return (
    <ClearGlassCard>
      <div className="p-6">
        <div className="flex items-center gap-3 mb-8">
          <Cpu className="text-white" size={24} />
          <h3 className="text-xl font-semibold text-white">System Intelligence</h3>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {statusItems.map((item, index) => (
            <div 
              key={index} 
              className="text-center p-4 rounded-xl"
              style={{
                background: 'rgba(255, 255, 255, 0.15)',
                backdropFilter: 'blur(15px)',
                border: '1px solid rgba(255, 255, 255, 0.25)'
              }}
            >
              <div 
                className="inline-flex p-2 rounded-lg mb-3"
                style={{
                  background: 'rgba(255, 255, 255, 0.25)',
                  border: '1px solid rgba(255, 255, 255, 0.4)'
                }}
              >
                {item.icon}
              </div>
              <div className="text-white/80 text-sm mb-1">{item.label}</div>
              <div className="text-2xl font-bold text-white">{item.value}</div>
            </div>
          ))}
        </div>
      </div>
    </ClearGlassCard>
  );
};

export default SystemStatus;