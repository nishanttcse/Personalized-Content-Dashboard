import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ContentItem } from './slices/contentSlice';

interface RealtimeState {
  isConnected: boolean;
  liveUpdates: ContentItem[];
  notifications: Notification[];
  lastUpdated: string | null;
}

interface Notification {
  id: string;
  type: 'new_content' | 'trending' | 'system';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
}

const initialState: RealtimeState = {
  isConnected: false,
  liveUpdates: [],
  notifications: [],
  lastUpdated: null,
};

class RealtimeService {
  private eventSource: EventSource | null = null;
  private dispatch: any;
  private reconnectTimer: NodeJS.Timeout | null = null;

  constructor(dispatch: any) {
    this.dispatch = dispatch;
  }

  connect() {
    // Mock Server-Sent Events connection
    this.dispatch(realtimeSlice.actions.setConnectionStatus(true));
    
    // Simulate periodic updates
    const updateInterval = setInterval(() => {
      this.simulateUpdate();
    }, 30000); // Every 30 seconds

    // Store interval for cleanup
    (this as any).updateInterval = updateInterval;

    // Simulate connection status changes
    this.simulateConnectionEvents();
  }

  disconnect() {
    if (this.eventSource) {
      this.eventSource.close();
      this.eventSource = null;
    }

    if (this.reconnectTimer) {
      clearTimeout(this.reconnectTimer);
      this.reconnectTimer = null;
    }

    if ((this as any).updateInterval) {
      clearInterval((this as any).updateInterval);
    }

    this.dispatch(realtimeSlice.actions.setConnectionStatus(false));
  }

  private simulateUpdate() {
    // Simulate new content updates
    const mockUpdates: ContentItem[] = [
      {
        id: `live-${Date.now()}`,
        type: 'news',
        title: 'Breaking: Latest Development in Technology',
        description: 'Real-time update about emerging technology trends affecting global markets.',
        imageUrl: 'https://readdy.ai/api/search-image?query=breaking%20news%20technology%20update%20with%20live%20news%20studio%20background%20urgent%20important%20information%20broadcast&width=400&height=250&seq=live-update-1&orientation=landscape',
        category: 'technology',
        publishedAt: new Date().toISOString(),
        source: 'Live News Feed',
      },
    ];

    this.dispatch(realtimeSlice.actions.addLiveUpdate(mockUpdates[0]));

    // Add notification
    const notification: Notification = {
      id: `notif-${Date.now()}`,
      type: 'new_content',
      title: 'New Content Available',
      message: 'Fresh content matching your interests has been added to your feed.',
      timestamp: new Date().toISOString(),
      read: false,
    };

    this.dispatch(realtimeSlice.actions.addNotification(notification));
  }

  private simulateConnectionEvents() {
    // Simulate occasional disconnections
    setTimeout(() => {
      this.dispatch(realtimeSlice.actions.setConnectionStatus(false));
      
      // Reconnect after 3 seconds
      this.reconnectTimer = setTimeout(() => {
        this.dispatch(realtimeSlice.actions.setConnectionStatus(true));
      }, 3000);
    }, 120000); // Disconnect after 2 minutes
  }

  // WebSocket alternative implementation
  connectWebSocket() {
    // Mock WebSocket connection
    const ws = {
      onopen: () => {
        this.dispatch(realtimeSlice.actions.setConnectionStatus(true));
      },
      onmessage: (event: any) => {
        const data = JSON.parse(event.data);
        
        switch (data.type) {
          case 'content_update':
            this.dispatch(realtimeSlice.actions.addLiveUpdate(data.payload));
            break;
          case 'notification':
            this.dispatch(realtimeSlice.actions.addNotification(data.payload));
            break;
          case 'trending_update':
            this.dispatch(realtimeSlice.actions.updateTrendingData(data.payload));
            break;
        }
      },
      onclose: () => {
        this.dispatch(realtimeSlice.actions.setConnectionStatus(false));
        // Attempt to reconnect
        this.reconnectTimer = setTimeout(() => {
          this.connectWebSocket();
        }, 5000);
      },
      onerror: (error: any) => {
        console.error('WebSocket error:', error);
        this.dispatch(realtimeSlice.actions.setConnectionStatus(false));
      },
    };

    // Simulate WebSocket events
    setTimeout(() => ws.onopen(), 100);
    
    // Simulate periodic messages
    setInterval(() => {
      if (Math.random() > 0.7) { // 30% chance of new content
        ws.onmessage({
          data: JSON.stringify({
            type: 'content_update',
            payload: {
              id: `ws-${Date.now()}`,
              type: 'social',
              title: 'Trending Discussion: Real-time Topic',
              description: 'Live discussion gaining traction across social platforms.',
              imageUrl: 'https://readdy.ai/api/search-image?query=trending%20social%20media%20discussion%20with%20diverse%20people%20engaging%20in%20conversation%20modern%20digital%20communication%20vibrant%20colors&width=400&height=250&seq=ws-update-1&orientation=landscape',
              category: 'social',
              publishedAt: new Date().toISOString(),
              source: 'Social Feed',
            },
          }),
        });
      }
    }, 45000); // Every 45 seconds
  }
}

const realtimeSlice = createSlice({
  name: 'realtime',
  initialState,
  reducers: {
    setConnectionStatus: (state, action: PayloadAction<boolean>) => {
      state.isConnected = action.payload;
    },
    addLiveUpdate: (state, action: PayloadAction<ContentItem>) => {
      state.liveUpdates.unshift(action.payload);
      
      // Keep only last 10 updates
      if (state.liveUpdates.length > 10) {
        state.liveUpdates = state.liveUpdates.slice(0, 10);
      }
      
      state.lastUpdated = new Date().toISOString();
    },
    addNotification: (state, action: PayloadAction<Notification>) => {
      state.notifications.unshift(action.payload);
      
      // Keep only last 20 notifications
      if (state.notifications.length > 20) {
        state.notifications = state.notifications.slice(0, 20);
      }
    },
    markNotificationAsRead: (state, action: PayloadAction<string>) => {
      const notification = state.notifications.find(n => n.id === action.payload);
      if (notification) {
        notification.read = true;
      }
    },
    clearNotifications: (state) => {
      state.notifications = [];
    },
    updateTrendingData: (state, action: PayloadAction<any>) => {
      // Handle trending data updates
      state.lastUpdated = new Date().toISOString();
    },
    clearLiveUpdates: (state) => {
      state.liveUpdates = [];
    },
  },
});

export const {
  setConnectionStatus,
  addLiveUpdate,
  addNotification,
  markNotificationAsRead,
  clearNotifications,
  updateTrendingData,
  clearLiveUpdates,
} = realtimeSlice.actions;

export { RealtimeService };
export type { Notification };
export default realtimeSlice.reducer;