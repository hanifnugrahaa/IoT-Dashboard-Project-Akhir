// services/websocket.js
class WebSocketService {
  constructor() {
    // PAKAI RAILWAY URL, BUKAN LOCALHOST!
    this.url = 'wss://iot-airquality-backend-production.up.railway.app/airquality';
    this.ws = null;
    this.subscribers = new Set();
    this.reconnectAttempts = 0;
    this.maxReconnect = 10;
    this.isConnected = false;
  }

  connect() {
    try {
      console.log(`🔌 Connecting to Railway: ${this.url}`);
      this.ws = new WebSocket(this.url);
      
      this.ws.onopen = () => {
        console.log('✅ Connected to Railway WebSocket');
        this.isConnected = true;
        this.reconnectAttempts = 0;
      };

      this.ws.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          console.log('📡 Railway Data:', data);
          this.notifySubscribers(data);
        } catch (err) {
          console.error('Error parsing Railway data:', err);
        }
      };

      this.ws.onclose = () => {
        console.log('🔴 Railway WebSocket disconnected');
        this.isConnected = false;
        this.attemptReconnect();
      };

      this.ws.onerror = (error) => {
        console.error('⚠️ Railway WebSocket error:', error);
        this.isConnected = false;
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
      const delay = Math.min(5000 * this.reconnectAttempts, 30000);
      console.log(`🔄 Reconnecting attempt ${this.reconnectAttempts} in ${delay}ms...`);
      setTimeout(() => this.connect(), delay);
    } else {
      console.error('❌ Max reconnection attempts reached');
    }
  }

  disconnect() {
    if (this.ws) {
      this.ws.close();
      this.ws = null;
    }
  }

  send(data) {
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify(data));
    } else {
      console.warn('⚠️ Cannot send, WebSocket not connected');
    }
  }
}

// Export single instance
export const airQualityWebSocket = new WebSocketService();