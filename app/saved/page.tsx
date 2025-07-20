'use client';

import { useEffect, useState } from 'react';
import { Provider } from 'react-redux';
import { store } from '@/lib/store';
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import FavoritesSection from '@/components/FavoritesSection';
import { useDispatch } from 'react-redux';
import { loadPreferencesFromStorage } from '@/lib/slices/preferencesSlice';

function SavedContent() {
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
          <div className="max-w-7xl mx-auto">
            <FavoritesSection />
          </div>
        </main>
      </div>
    </div>
  );
}

export default function SavedPage() {
  return (
    <Provider store={store}>
      <SavedContent />
    </Provider>
  );
}