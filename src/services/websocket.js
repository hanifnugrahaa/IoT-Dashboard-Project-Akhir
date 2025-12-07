// services/websocket.js
class WebSocketService {
  constructor(url) {
    this.url = url;
    this.ws = null;
    this.subscribers = new Set();
    this.reconnectAttempts = 0;
    this.maxReconnect = 5;
  }

  connect() {
    try {
      console.log(`🔌 Connecting to ${this.url}`);
      this.ws = new WebSocket(this.url);
      
      this.ws.onopen = () => {
        console.log('✅ Connected to Node-RED WebSocket');
        this.reconnectAttempts = 0;
      };

      this.ws.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          console.log('📦 Raw WebSocket data:', data);
          this.notifySubscribers(data);
        } catch (err) {
          console.error('❌ Error parsing WebSocket data:', err);
        }
      };

      this.ws.onclose = () => {
        console.log('🔴 WebSocket disconnected');
        this.attemptReconnect();
      };

      this.ws.onerror = (error) => {
        console.error('⚠️ WebSocket error:', error);
      };
    } catch (error) {
      console.error('💥 Failed to create WebSocket:', error);
    }
  }

  subscribe(callback) {
    this.subscribers.add(callback);
    // Auto connect if not connected
    if (!this.ws || this.ws.readyState !== WebSocket.OPEN) {
      this.connect();
    }
    return () => this.subscribers.delete(callback);
  }

  notifySubscribers(data) {
    this.subscribers.forEach(callback => callback(data));
  }

  attemptReconnect() {
    if (this.reconnectAttempts < this.maxReconnect) {
      this.reconnectAttempts++;
      const delay = Math.min(3000 * this.reconnectAttempts, 10000);
      console.log(`🔄 Reconnecting attempt ${this.reconnectAttempts} in ${delay}ms...`);
      setTimeout(() => this.connect(), delay);
    }
  }

  disconnect() {
    if (this.ws) {
      this.ws.close();
    }
  }

  send(data) {
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify(data));
    }
  }
}

// GANTI URL INI DENGAN NODE-RED LU
// Contoh: ws://192.168.1.100:1880/airquality
// Atau: ws://localhost:1880/airquality
export const airQualityWebSocket = new WebSocketService('ws://localhost:1880/airquality');