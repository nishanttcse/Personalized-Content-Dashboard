'use client';

import { Provider } from 'react-redux';
import { store } from '@/lib/store';
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import TrendingSection from '@/components/TrendingSection';
import { useState } from 'react';

function TrendingPageContent() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      <div className="flex-1 lg:ml-64">
        <Header onMenuClick={() => setSidebarOpen(true)} />
        
        <main className="px-6 py-8">
          <div className="max-w-7xl mx-auto">
            <TrendingSection />
          </div>
        </main>
      </div>
    </div>
  );
}

export default function TrendingPage() {
  return (
    <Provider store={store}>
      <TrendingPageContent />
    </Provider>
  );
}