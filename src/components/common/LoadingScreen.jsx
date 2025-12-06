import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import LogoScene from '../3d/LogoScene';

const LoadingScreen = () => {
  const [progress, setProgress] = useState(0);
  const [remainingTime, setRemainingTime] = useState(10);

  useEffect(() => {
    const duration = 9500; // 10 detik
    const interval = 50;
    const steps = duration / interval;
    const increment = 100 / steps;

    let currentProgress = 0;
    let startTime = Date.now();

    const timer = setInterval(() => {
      currentProgress += increment;
      const elapsed = (Date.now() - startTime) / 1000;
      setRemainingTime(Math.max(0, 10 - elapsed));

      if (currentProgress >= 100) {
        setProgress(100);
        setRemainingTime(0);
        clearInterval(timer);
      } else {
        setProgress(currentProgress);
      }
    }, interval);

    return () => clearInterval(timer);
  }, []);

  const getLoadingText = () => {
    if (progress < 20) return "Loading visualization...";
    if (progress < 40) return "Initializing sensor modules...";
    if (progress < 60) return "Connecting to IoT network...";
    if (progress < 80) return "Calibrating air quality sensors...";
    return "Starting monitoring dashboard...";
  };

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.5 } }}
      className="fixed inset-0 z-50 overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #0a0a0a 0%, #111827 30%, #000000 70%, #0f172a 100%)'
      }}
    >
      {/* Animated Grid Pattern */}
      <div className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `
            linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px),
            linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
          animation: 'gridMove 20s linear infinite',
        }}
      />

      {/* Radial Vignette */}
      <div className="absolute inset-0"
        style={{
          background: 'radial-gradient(circle at 50% 50%, transparent 30%, rgba(0,0,0,0.8) 70%, rgba(0,0,0,0.95) 100%)',
        }}
      />

      {/* Floating Particles Background */}
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 15 }).map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-gradient-to-r from-cyan-500/10 to-purple-500/10"
            style={{
              width: `${Math.random() * 80 + 40}px`,
              height: `${Math.random() * 80 + 40}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `particleFloat ${Math.random() * 15 + 10}s ease-in-out ${i * 0.5}s infinite`,
              filter: 'blur(30px)',
              opacity: 0.15,
            }}
          />
        ))}
      </div>

      <div className="relative h-full flex flex-col items-center justify-center p-8">
        {/* Timer & Debug Info */}
        <div className="absolute top-6 right-6 flex items-center gap-4">
          <div className="text-xs text-white/30 font-mono bg-black/20 px-3 py-1.5 rounded-full">
            {remainingTime.toFixed(1)}s
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-xs text-white/40">3D ACTIVE</span>
          </div>
        </div>

        {/* 3D Text Logo Container - LEBIH BESAR */}
        <div className="relative w-[600px] h-[500px] mb-12">
          {/* Outer Glow dengan Gradient */}
          <div className="absolute inset-0"
  style={{
    background: 'radial-gradient(circle at center, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 50%, transparent 70%)',
    filter: 'blur(40px)',
    animation: 'glowPulse 3s ease-in-out infinite',
  }}
/>

{/* Border Ring - PUTIH */}
<div className="absolute inset-0 rounded-full"
  style={{
    border: '1px solid rgba(255, 255, 255, 0.2)',
    // animation: 'borderRotate 20s linear infinite',
  }}
/>
          
          {/* Border Ring dengan Gradient */}
          <div className="absolute inset-0 rounded-full"
            style={{
              border: '1px solid transparent',
              background: 'linear-gradient(135deg, rgba(14, 165, 233, 0.3), rgba(139, 92, 246, 0.3)) border-box',
              mask: 'linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0)',
              maskComposite: 'exclude',
              // animation: 'borderRotate 10s linear infinite',
            }}
          />
          
          {/* Inner Glow Ring */}
          <div className="absolute inset-10 rounded-full"
            style={{
              background: 'radial-gradient(circle at center, rgba(255,255,255,0.05) 0%, transparent 70%)',
              filter: 'blur(20px)',
              animation: 'innerPulse 3s ease-in-out infinite',
            }}
          />
          
          {/* 3D Text Scene */}
          <LogoScene />
        </div>

        {/* Progress Section */}
        <div className="w-full max-w-2xl">
          {/* Loading Text dengan Animation */}
          <motion.div
            key={Math.floor(progress / 20)}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="text-center mb-8"
          >
            <div className="text-white/80 text-xl font-light mb-2">
              {getLoadingText()}
            </div>
          </motion.div>

          {/* Progress Info */}
          <div className="flex items-center justify-between text-white/60 text-sm mb-4 px-2">
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full animate-pulse"></div>
              <span className="tracking-widest">SYSTEM INITIALIZATION</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="text-white/40 text-xs">
                Stage {Math.floor(progress / 20)}/5
              </div>
              <div className="font-mono font-bold text-white bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent text-lg">
                {Math.round(progress)}%
              </div>
            </div>
          </div>

          {/* Animated Progress Bar */}
          <div className="relative h-2.5 bg-white/10 rounded-full overflow-hidden mb-3">
  {/* Progress Fill - PUTIH */}
  <motion.div
    className="h-full relative"
    initial={{ width: "0%" }}
    animate={{ width: `${progress}%` }}
    transition={{ type: "spring", stiffness: 100, damping: 25 }}
  >
    {/* Main Color - PUTIH */}
    <div className="absolute inset-0 bg-white"></div>
    
    {/* Shimmer Effect - PUTIH */}
    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/70 to-transparent animate-shimmerFast"></div>
    
    {/* Edge Glow */}
    <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-white to-transparent opacity-40"></div>
  </motion.div>
  
  {/* Progress Dots - PUTIH */}
  <div className="absolute inset-0 flex justify-between items-center px-1">
    {[15, 25, 50, 75, 100].map((point) => (
      <div key={point} className="relative">
        <div className={`absolute -inset-1 rounded-full ${progress >= point ? 'bg-white/30 blur-sm' : 'bg-white/10 blur-xs'}`}></div>
        <div className={`relative w-2 h-2 rounded-full ${progress >= point ? 'bg-white' : 'bg-white/40'}`}></div>
      </div>
    ))}
  </div>
</div>

          {/* Stage Indicators dengan Icons */}
          <div className="grid grid-cols-5 gap-2 mt-6 mb-8">
            {[
              { label: 'VISUAL'},
              { label: 'MODULES'},
              { label: 'NETWORK'},
              { label: 'SENSORS'},
              { label: 'DASHBOARD' }
            ].map((stage, index) => (
              <div key={stage.label} className="text-center">
                <div className={`text-2xl mb-1 ${progress >= (index + 1) * 20 ? 'opacity-100' : 'opacity-30'}`}>
                  {stage.icon}
                </div>
                <div className={`text-xs ${progress >= (index + 1) * 20 ? 'text-cyan-300' : 'text-white/30'}`}>
                  {stage.label}
                </div>
              </div>
            ))}
          </div>

          {/* System Status */}
          <div className="grid grid-cols-3 gap-4 mb-10">
            {[
              { label: '3D Engine', status: 'ACTIVE', color: 'text-green-400' },
              { label: 'IoT Connection', status: progress > 60 ? 'CONNECTED' : 'PENDING', color: progress > 60 ? 'text-green-400' : 'text-yellow-400' },
              { label: 'Data Stream', status: progress > 80 ? 'LIVE' : 'STANDBY', color: progress > 80 ? 'text-green-400' : 'text-blue-400' }
            ].map((item) => (
              <div key={item.label} className="text-center p-3 rounded-lg bg-white/5 backdrop-blur-sm">
                <div className="text-white/60 text-xs mb-1">{item.label}</div>
                <div className={`font-mono text-sm font-bold ${item.color}`}>{item.status}</div>
              </div>
            ))}
          </div>

          {/* Footer dengan Logo */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 0.6, y: 0 }}
            transition={{ delay: 1.5 }}
            className="text-center"
          >
            <div className="flex items-center justify-center gap-3 mb-2">
              <div className="w-1 h-1 bg-cyan-400 rounded-full"></div>
              <div className="text-white/30 text-xs tracking-[0.3em]">GAMASENSE MONITORING SYSTEM</div>
              <div className="w-1 h-1 bg-purple-400 rounded-full"></div>
            </div>
            <div className="text-white/10 text-[10px] tracking-widest">
              VERSION 1.0 • REAL-TIME IOT DASHBOARD • © {new Date().getFullYear()}
            </div>
          </motion.div>
        </div>
      </div>

      {/* CSS Animations */}
      
    </motion.div>
  );
};

export default LoadingScreen;