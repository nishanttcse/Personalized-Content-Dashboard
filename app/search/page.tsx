'use client';

import { useState, Suspense } from 'react';
import { Provider, useSelector } from 'react-redux';
import { store, RootState } from '@/lib/store';
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import SearchBar from '@/components/SearchBar';
import ContentCard from '@/components/ContentCard';
import LoadingSpinner from '@/components/LoadingSpinner';

function SearchResults() {
  const { searchResults, searchLoading, searchQuery } = useSelector((state: RootState) => state.content);

  if (searchLoading) {
    return (
      <div className="flex justify-center py-12">
        <LoadingSpinner />
      </div>
    );
  }

  if (!searchQuery) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 flex items-center justify-center bg-gray-100 dark:bg-gray-800 rounded-full mx-auto mb-4">
          <i className="ri-search-line text-2xl text-gray-500 dark:text-gray-400"></i>
        </div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Start searching</h3>
        <p className="text-gray-600 dark:text-gray-400">
          Enter keywords to find news, movies, music, and social content
        </p>
      </div>
    );
  }

  if (searchResults.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 flex items-center justify-center bg-gray-100 dark:bg-gray-800 rounded-full mx-auto mb-4">
          <i className="ri-search-line text-2xl text-gray-500 dark:text-gray-400"></i>
        </div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">No results found</h3>
        <p className="text-gray-600 dark:text-gray-400">
          Try different keywords or check your spelling
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Search Results for "{searchQuery}"
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Found {searchResults.length} results
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {searchResults.map((item) => (
          <ContentCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}

function SearchPageContent() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      <div className="flex-1 lg:ml-64">
        <Header onMenuClick={() => setSidebarOpen(true)} />
        
        <main className="px-6 py-8">
          <div className="max-w-7xl mx-auto">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                Search Content
              </h1>
              <div className="max-w-2xl">
                <SearchBar />
              </div>
            </div>
            
            <Suspense fallback={<LoadingSpinner />}>
              <SearchResults />
            </Suspense>
          </div>
        </main>
      </div>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Provider store={store}>
      <SearchPageContent />
    </Provider>
  );
}