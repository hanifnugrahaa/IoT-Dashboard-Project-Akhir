import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import LogoScene from '../3d/LogoScene';

const LoadingScreen = ({ onLoadingComplete }) => {
  const [progress, setProgress] = useState(0);
  const [remainingTime, setRemainingTime] = useState(10);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    const totalDuration = 14500; // 10 detik dalam milidetik
    const startTime = Date.now();
    const endTime = startTime + totalDuration;
    let animationFrameId;

    const updateProgress = () => {
      const now = Date.now();
      const elapsed = now - startTime;
      const timeLeft = Math.max(0, (endTime - now) / 1000);
      
      const currentProgress = Math.min(100, (elapsed / totalDuration) * 100);
      
      setProgress(currentProgress);
      setRemainingTime(parseFloat(timeLeft.toFixed(1)));

      if (now < endTime) {
        animationFrameId = requestAnimationFrame(updateProgress);
      } else {
        // Selesaikan di 100%
        setProgress(100);
        setRemainingTime(0);
        setIsComplete(true);
        
        // Beri delay 500ms sebelum panggil callback
        setTimeout(() => {
          if (onLoadingComplete) onLoadingComplete();
        }, 500);
      }
    };

    animationFrameId = requestAnimationFrame(updateProgress);

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [onLoadingComplete]);

  const getLoadingText = () => {
    if (progress < 20) return "Loading visualization...";
    if (progress < 40) return "Initializing sensor modules...";
    if (progress < 60) return "Connecting to IoT network...";
    if (progress < 80) return "Calibrating air quality sensors...";
    return "Starting monitoring dashboard...";
  };

  // Jika loading sudah selesai, tunggu animasi exit
  if (isComplete && progress === 100) {
    return (
      <motion.div
        initial={{ opacity: 1 }}
        animate={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="fixed inset-0 z-50 overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, #0a0a0a 0%, #111827 30%, #000000 70%, #0f172a 100%)'
        }}
      />
    );
  }

  return (
    <motion.div
      initial={{ opacity: 1 }}
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

        {/* 3D Text Logo Container */}
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
            }}
          />
          
          {/* Border Ring dengan Gradient */}
          <div className="absolute inset-0 rounded-full"
            style={{
              border: '1px solid transparent',
              background: 'linear-gradient(135deg, rgba(14, 165, 233, 0.3), rgba(139, 92, 246, 0.3)) border-box',
              mask: 'linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0)',
              maskComposite: 'exclude',
              animation: `borderRotate ${20 + (progress / 100) * 10}s linear infinite`,
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
            <div className="text-white/40 text-sm">
              {progress < 100 ? "Please wait while we prepare your dashboard..." : "Loading complete!"}
            </div>
          </motion.div>

          {/* Progress Info */}
          <div className="flex items-center justify-between text-white/60 text-sm mb-4 px-2">
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full animate-pulse"></div>
              <span className="tracking-widest">LOADING..</span>
            </div>
            <div className="flex items-center gap-3">
              {/* <div className="text-white/40 text-xs">
                Stage {Math.floor(progress / 20)}/5
              </div> */}
              <div className="font-mono font-bold text-white bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent text-lg">
                {Math.round(progress)}%
              </div>
            </div>
          </div>

          {/* Animated Progress Bar */}
          <div className="relative h-2.5 bg-white/10 rounded-full overflow-hidden mb-3">
            <motion.div
              className="h-full relative"
              initial={{ width: "0%" }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.1 }}
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
              {[0, 25, 50, 75, 100].map((point) => (
                <div key={point} className="relative">
                  <div className={`absolute -inset-1 rounded-full ${progress >= point ? 'bg-white/30 blur-sm' : 'bg-white/10 blur-xs'}`}></div>
                  <div className={`relative w-2 h-2 rounded-full ${progress >= point ? 'bg-white' : 'bg-white/40'}`}></div>
                </div>
              ))}
            </div>
          </div>

          {/* Time Indicator */}
          <div className="text-center text-white/30 text-xs mb-6">
            {remainingTime > 0 
              ? `Estimated time remaining: ${remainingTime.toFixed(1)} seconds`
              : "Ready to launch..."}
          </div>

          {/* Stage Indicators dengan Icons */}
          <div className="grid grid-cols-5 gap-2 mt-6 mb-8">
            {[
              { label: 'VISUAL', icon: '👁️' },
              { label: 'MODULES', icon: '⚙️' },
              { label: 'NETWORK', icon: '🌐' },
              { label: 'SENSORS', icon: '📡' },
              { label: 'DASHBOARD', icon: '📊' }
            ].map((stage, index) => (
              <motion.div 
                key={stage.label} 
                className="text-center"
                animate={{ 
                  scale: progress >= (index + 1) * 20 ? 1.1 : 1,
                  opacity: progress >= (index + 1) * 20 ? 1 : 0.3
                }}
                transition={{ duration: 0.3 }}
              >
                <div className="text-2xl mb-1">
                  {stage.icon}
                </div>
                <div className={`text-xs ${progress >= (index + 1) * 20 ? 'text-cyan-300' : 'text-white/30'}`}>
                  {stage.label}
                </div>
              </motion.div>
            ))}
          </div>

          {/* System Status */}
          <div className="grid grid-cols-3 gap-4 mb-10">
            {[
              { 
                label: '3D Engine', 
                status: progress > 10 ? 'ACTIVE' : '...', 
                color: progress > 10 ? 'text-green-400' : 'text-blue-400' 
              },
              { 
                label: 'IoT Connection', 
                status: progress > 60 ? 'CONNECTED' : '...', 
                color: progress > 60 ? 'text-green-400' : 'text-blue-400' 
              },
              { 
                label: 'Data Stream', 
                status: progress > 90 ? 'LIVE' : '...', 
                color: progress > 90 ? 'text-green-400' : 'text-blue-400' 
              }
            ].map((item) => (
              <motion.div 
                key={item.label} 
                className="text-center p-3 rounded-lg bg-white/5 backdrop-blur-sm"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                <div className="text-white/60 text-xs mb-1">{item.label}</div>
                <div className={`font-mono text-sm font-bold ${item.color}`}>
                  {item.status}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Footer dengan Logo */}
          {/* <motion.div
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
          </motion.div> */}
        </div>
      </div>

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes gridMove {
          0% { background-position: 0 0; }
          100% { background-position: 50px 50px; }
        }
        
        @keyframes particleFloat {
          0%, 100% { transform: translateY(0) translateX(0); }
          50% { transform: translateY(-20px) translateX(10px); }
        }
        
        @keyframes glowPulse {
          0%, 100% { opacity: 0.7; }
          50% { opacity: 1; }
        }
        
        @keyframes innerPulse {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.5; }
        }
        
        @keyframes borderRotate {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        @keyframes shimmerFast {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        
        .animate-shimmerFast {
          animation: shimmerFast 0.5s infinite;
        }
      `}</style>
    </motion.div>
  );
};

export default LoadingScreen;