import { useState, useEffect } from 'react';

export const useClock = () => {
  const [currentTime, setCurrentTime] = useState('00:00:00');

  useEffect(() => {
    const clockTimer = setInterval(() => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString([], { 
        hour: '2-digit', 
        minute: '2-digit', 
        second: '2-digit' 
      }));
    }, 1000);

    return () => clearInterval(clockTimer);
  }, []);

  return currentTime;
};