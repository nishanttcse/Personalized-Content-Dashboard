'use client';

import { useEffect, useState } from 'react';
import { Provider } from 'react-redux';
import { store } from '@/lib/store';
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import PreferencesPanel from '@/components/PreferencesPanel';
import { useDispatch } from 'react-redux';
import { loadPreferencesFromStorage } from '@/lib/slices/preferencesSlice';

function PreferencesContent() {
  const dispatch = useDispatch();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    dispatch(loadPreferencesFromStorage());
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      <div className="flex-1 lg:ml-64">
        <Header onMenuClick={() => setSidebarOpen(true)} />
        
        <main className="px-6 py-8">
          <div className="max-w-4xl mx-auto">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                Customize Your Experience
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Personalize your dashboard by selecting your interests and preferences
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <PreferencesPanel />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default function PreferencesPage() {
  return (
    <Provider store={store}>
      <PreferencesContent />
    </Provider>
  );
}