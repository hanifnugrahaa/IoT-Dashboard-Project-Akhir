import React from 'react';
import ParticleBackground from './ParticleBackground';

const ClearGlassCard = ({ children, className = '', hoverEffect = true }) => (
  <div className={`relative rounded-2xl overflow-hidden group ${className}`}>
    {/* Clear Glass Layer dengan Border Putih */}
    <div 
      className="relative backdrop-blur-3xl rounded-2xl border"
      style={{
        background: 'rgba(255, 255, 255, 0.12)',
        backdropFilter: 'blur(40px) saturate(200%)',
        borderColor: 'rgba(255, 255, 255, 0.35)',
        boxShadow: `
          0 8px 32px rgba(255, 255, 255, 0.15),
          inset 0 1px 0 rgba(255, 255, 255, 0.25),
          inset 0 -1px 0 rgba(255, 255, 255, 0.1)
        `,
        transition: hoverEffect ? 'all 0.3s ease' : 'none'
      }}
    >
      {/* Inner Glow */}
      <div 
        className="absolute inset-0 rounded-2xl"
        style={{
          background: 'radial-gradient(circle at 50% 0%, rgba(255, 255, 255, 0.15) 0%, transparent 70%)',
          pointerEvents: 'none'
        }}
      />
      
      {/* Content */}
      <div className="relative">
        {children}
      </div>
    </div>
    
    {/* Particle Background */}
    <ParticleBackground />
  </div>
);

export default ClearGlassCard;