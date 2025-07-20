'use client';

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/lib/store';
import { RealtimeService, markNotificationAsRead } from '@/lib/realtime';
import { t } from '@/lib/i18n';

export default function RealtimeIndicator() {
  const dispatch = useDispatch();
  const { isConnected, liveUpdates, notifications } = useSelector((state: RootState) => state.realtime);
  const [showNotifications, setShowNotifications] = useState(false);
  const [realtimeService] = useState(() => new RealtimeService(dispatch));

  useEffect(() => {
    realtimeService.connect();
    
    return () => {
      realtimeService.disconnect();
    };
  }, [realtimeService]);

  const unreadNotifications = notifications.filter(n => !n.read);
  const hasNewUpdates = liveUpdates.length > 0;

  const handleNotificationClick = (notificationId: string) => {
    dispatch(markNotificationAsRead(notificationId));
  };

  return (
    <div className="flex items-center space-x-3">
      {/* Connection Status */}
      <div className="flex items-center space-x-2">
        <div className={`w-2 h-2 rounded-full ${isConnected ? 'bg-green-500' : 'bg-red-500'}`}></div>
        <span className="text-xs text-gray-500 dark:text-gray-400 hidden sm:inline">
          {isConnected ? t('realtime.connected') : t('realtime.disconnected')}
        </span>
      </div>

      {/* Live Updates Indicator */}
      {hasNewUpdates && (
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
          <span className="text-xs text-blue-600 dark:text-blue-400 hidden sm:inline">
            {liveUpdates.length} live updates
          </span>
        </div>
      )}

      {/* Notifications */}
      <div className="relative">
        <button
          onClick={() => setShowNotifications(!showNotifications)}
          className="relative p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white cursor-pointer"
        >
          <div className="w-5 h-5 flex items-center justify-center">
            <i className="ri-notification-3-line"></i>
          </div>
          {unreadNotifications.length > 0 && (
            <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
              {unreadNotifications.length}
            </span>
          )}
        </button>

        {showNotifications && (
          <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-50">
            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
              <h3 className="font-semibold text-gray-900 dark:text-white">
                Notifications
              </h3>
            </div>
            
            <div className="max-h-96 overflow-y-auto">
              {notifications.length === 0 ? (
                <div className="p-4 text-center text-gray-500 dark:text-gray-400">
                  No notifications yet
                </div>
              ) : (
                notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`p-4 border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer ${
                      !notification.read ? 'bg-blue-50 dark:bg-blue-900/10' : ''
                    }`}
                    onClick={() => handleNotificationClick(notification.id)}
                  >
                    <div className="flex items-start space-x-3">
                      <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center">
                        <i className={`ri-${notification.type === 'new_content' ? 'newspaper' : 'fire'}-line text-blue-600 dark:text-blue-400`}></i>
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900 dark:text-white text-sm">
                          {notification.title}
                        </h4>
                        <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                          {notification.message}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                          {new Date(notification.timestamp).toLocaleTimeString()}
                        </p>
                      </div>
                      {!notification.read && (
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}
      </div>

      {/* Close dropdown when clicking outside */}
      {showNotifications && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setShowNotifications(false)}
        />
      )}
    </div>
  );
}