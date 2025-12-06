import { useState, useEffect } from 'react';

export const useClock = () => {
  const [currentTime, setCurrentTime] = useState('--:-- --');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      
      // Format ke AM/PM tanpa detik
      let hours = now.getHours();
      const minutes = now.getMinutes().toString().padStart(2, '0');
      const ampm = hours >= 12 ? 'PM' : 'AM';
      
      // Convert 24h ke 12h format
      hours = hours % 12;
      hours = hours ? hours : 12; // 0 jam jadi 12
      hours = hours.toString().padStart(2, '0');
      
      // Format: "HH:MM AM/PM" - TANPA DETIK
      setCurrentTime(`${hours}:${minutes} ${ampm}`);
    };

    // Update immediately
    updateTime();
    
    // Update every second
    const timer = setInterval(updateTime, 1000);

    return () => clearInterval(timer);
  }, []);

  return currentTime;
};