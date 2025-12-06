import React from 'react';
import { Activity, Wifi, Clock } from 'lucide-react';
import ClearGlassCard from '../common/ClearGlassCard';
import ClearGlassBadge from '../common/ClearGlassBadge';

const Header = ({ currentTime }) => {
  return (
    <header className="sticky top-0 z-50">
      <ClearGlassCard className="rounded-none border-x-0 border-t-0" hoverEffect={false}>
        <div className="container mx-auto px-6 py-5 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="absolute inset-0 bg-white/40 rounded-xl blur-md"></div>
              <div 
                className="relative w-12 h-12 rounded-xl flex items-center justify-center"
                style={{
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.35), rgba(255,255,255,0.15))',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.5)'
                }}
              >
                <Activity className="text-white" size={24} />
              </div>
            </div>
            
            <div>
              <h1 className="text-4xl font-bold text-white drop-shadow-lg">GamaSense</h1>
              <p className="text-white/80 text-sm">Clear Air Quality Monitoring Dashboard</p>
            </div>
          </div>
          
          <div className="flex items-center gap-6">
            <ClearGlassBadge>
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="absolute inset-0 bg-green-400 rounded-full blur animate-pulse"></div>
                  <div className="relative w-2 h-2 bg-green-300 rounded-full"></div>
                </div>
                <span className="text-white font-medium">Connected</span>
                <Wifi size={14} className="text-green-300" />
              </div>
            </ClearGlassBadge>
            
            <div 
              className="flex items-center gap-3 px-4 py-2 rounded-xl"
              style={{
                background: 'rgba(255, 255, 255, 0.22)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(255, 255, 255, 0.35)'
              }}
            >
              <Clock className="text-white" size={18} />
              <span className="text-white font-mono font-bold">{currentTime}</span>
            </div>
          </div>
        </div>
      </ClearGlassCard>
    </header>
  );
};

export default Header;