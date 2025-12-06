import React from 'react';
import { Wifi } from 'lucide-react';
import ClearGlassCard from '../common/ClearGlassCard';

const Footer = () => {
  return (
    <ClearGlassCard>
      <div className="p-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div 
              className="p-2 rounded-lg"
              style={{
                background: 'rgba(34, 197, 94, 0.25)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.4)'
              }}
            >
              <Wifi className="text-white" size={20} />
            </div>
            <div>
              <div className="text-white font-medium">IoT Data Pipeline</div>
              <div className="text-white/70 text-sm">ESP32 → MQTT → Node-RED → React</div>
            </div>
          </div>
          
          <div className="text-center">
            <div className="text-white/80 text-sm mb-1">GamaSense</div>
            <div className="text-white font-bold">v1.0</div>
          </div>
          
          <div className="text-white/70 text-sm">
            © {new Date().getFullYear()} • Hanip n Friends
          </div>
        </div>
      </div>
    </ClearGlassCard>
  );
};

export default Footer;