import React from 'react';

const ParticleBackground = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    {[
      { size: 25, duration: 18, x: 10, y: 15 },
      { size: 18, duration: 22, x: 30, y: 25 },
      { size: 32, duration: 25, x: 50, y: 20 },
      { size: 20, duration: 20, x: 70, y: 30 },
      { size: 28, duration: 24, x: 85, y: 15 },
      { size: 22, duration: 19, x: 20, y: 60 },
      { size: 30, duration: 21, x: 40, y: 70 },
      { size: 24, duration: 23, x: 60, y: 65 },
      { size: 26, duration: 26, x: 80, y: 55 },
      { size: 19, duration: 17, x: 15, y: 85 },
      { size: 35, duration: 28, x: 45, y: 90 },
      { size: 21, duration: 22, x: 75, y: 80 }
    ].map((particle, i) => (
      <div
        key={i}
        className="absolute rounded-full bg-gradient-to-br from-white/15 to-transparent"
        style={{
          width: `${particle.size}px`,
          height: `${particle.size}px`,
          left: `${particle.x}%`,
          top: `${particle.y}%`,
          animation: `natural-float ${particle.duration}s ease-in-out infinite`,
          animationDelay: `${i * 0.3}s`,
          filter: 'blur(8px)',
          opacity: 0.4,
          transform: 'translateZ(0)',
          willChange: 'transform, opacity'
        }}
      />
    ))}
  </div>
);

export default ParticleBackground;