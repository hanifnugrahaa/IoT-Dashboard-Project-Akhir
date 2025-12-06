import React from 'react';

const ClearGlassBadge = ({ children, hoverEffect = true }) => (
  <div className="relative">
    <div className="absolute -inset-1 backdrop-blur-xl rounded-full opacity-20"
      style={{
        background: 'linear-gradient(45deg, rgba(255,255,255,0.3), transparent)',
        border: '1px solid rgba(255, 255, 255, 0.2)'
      }}
    />
    <div className="relative backdrop-blur-2xl rounded-full border px-4 py-2"
      style={{
        background: 'rgba(255, 255, 255, 0.18)',
        borderColor: 'rgba(255, 255, 255, 0.4)',
        transition: hoverEffect ? 'all 0.3s ease' : 'none'
      }}
    >
      {children}
    </div>
  </div>
);

export default ClearGlassBadge;