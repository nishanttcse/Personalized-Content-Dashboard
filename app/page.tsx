'use client';

import { useEffect, useState } from 'react';
import { Provider } from 'react-redux';
import { store } from '@/lib/store';
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import ContentFeed from '@/components/ContentFeed';
import TrendingSection from '@/components/TrendingSection';
import FavoritesSection from '@/components/FavoritesSection';
import { useDispatch } from 'react-redux';
import { loadPreferencesFromStorage } from '@/lib/slices/preferencesSlice';

function DashboardContent() {
  const dispatch = useDispatch();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<'feed' | 'trending' | 'favorites'>('feed');

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
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                Your Personalized Dashboard
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Discover content tailored to your interests from multiple sources
              </p>
            </div>

            {/* Section Navigation */}
            <div className="mb-8">
              <div className="flex space-x-1 bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
                <button
                  onClick={() => setActiveSection('feed')}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors cursor-pointer whitespace-nowrap ${
                    activeSection === 'feed'
                      ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm'
                      : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                  }`}
                >
                  <i className="ri-newspaper-line mr-2"></i>
                  Personal Feed
                </button>
                <button
                  onClick={() => setActiveSection('trending')}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors cursor-pointer whitespace-nowrap ${
                    activeSection === 'trending'
                      ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm'
                      : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                  }`}
                >
                  <i className="ri-fire-line mr-2"></i>
                  Trending
                </button>
                <button
                  onClick={() => setActiveSection('favorites')}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors cursor-pointer whitespace-nowrap ${
                    activeSection === 'favorites'
                      ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm'
                      : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                  }`}
                >
                  <i className="ri-heart-line mr-2"></i>
                  Favorites
                </button>
              </div>
            </div>
            
            {/* Content Sections */}
            {activeSection === 'feed' && <ContentFeed />}
            {activeSection === 'trending' && <TrendingSection />}
            {activeSection === 'favorites' && <FavoritesSection />}
          </div>
        </main>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <Provider store={store}>
      <DashboardContent />
    </Provider>
  );
}