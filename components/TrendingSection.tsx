
'use client';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/lib/store';
import { fetchTrendingContent } from '@/lib/slices/contentSlice';
import ContentCard from './ContentCard';
import LoadingSpinner from './LoadingSpinner';

export default function TrendingSection() {
  const dispatch = useDispatch();
  const { trendingItems, trendingLoading } = useSelector((state: RootState) => state.content);

  useEffect(() => {
    dispatch(fetchTrendingContent() as any);
  }, [dispatch]);

  if (trendingLoading) {
    return (
      <div className="flex justify-center py-8">
        <LoadingSpinner />
      </div>
    );
  }

  const handleCardClick = (item: ContentItem, e: React.MouseEvent) => {
    // Prevent card click when clicking on save button
    if ((e.target as HTMLElement).closest('[data-save-button]')) {
      return;
    }
    
    if (item.url) {
      window.open(item.url, '_blank', 'noopener,noreferrer');
    }
  };

  const handleActionClick = (item: ContentItem, e: React.MouseEvent) => {
    e.stopPropagation();
    
    if (item.url) {
      window.open(item.url, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Trending Now</h2>
          <p className="text-gray-600">Popular content across all categories</p>
        </div>
        <div className="w-8 h-8 flex items-center justify-center">
          <i className="ri-fire-line text-xl text-orange-500"></i>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {trendingItems.slice(0, 4).map((item, index) => (
          <div key={item.id} className="relative">
            <div className="absolute -top-2 -left-2 w-6 h-6 bg-orange-500 text-white rounded-full flex items-center justify-center text-xs font-bold z-10">
              {index + 1}
            </div>
            <ContentCard 
              item={item} 
              onClick={(e) => handleCardClick(item, e)}
            />
            {/* Action Buttons */}
            <div className="flex items-center justify-between mt-4">
              <div className="flex items-center space-x-4">
                {item.type === 'news' && (
                  <button 
                    onClick={(e) => handleActionClick(item, e)}
                    className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors cursor-pointer whitespace-nowrap flex items-center gap-1"
                    data-testid="card-action-button"
                  >
                    Read More
                    <i className="ri-external-link-line text-xs"></i>
                  </button>
                )}
                {item.type === 'movie' && (
                  <button 
                    onClick={(e) => handleActionClick(item, e)}
                    className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors cursor-pointer whitespace-nowrap flex items-center gap-1"
                    data-testid="card-action-button"
                  >
                    Watch
                    <i className="ri-external-link-line text-xs"></i>
                  </button>
                )}
                {item.type === 'music' && (
                  <button 
                    onClick={(e) => handleActionClick(item, e)}
                    className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors cursor-pointer whitespace-nowrap flex items-center gap-1"
                    data-testid="card-action-button"
                  >
                    Listen
                    <i className="ri-external-link-line text-xs"></i>
                  </button>
                )}
                {item.type === 'social' && (
                  <button 
                    onClick={(e) => handleActionClick(item, e)}
                    className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors cursor-pointer whitespace-nowrap flex items-center gap-1"
                    data-testid="card-action-button"
                  >
                    Join Discussion
                    <i className="ri-external-link-line text-xs"></i>
                  </button>
                )}
              </div>
              
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  dispatch(toggleSaveItem(item.id));
                }}
                className={`p-2 rounded-full transition-all cursor-pointer ${
                  item.isSaved
                    ? 'text-red-500 hover:text-red-600 bg-red-50 dark:bg-red-900/20'
                    : 'text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20'
                }`}
                data-save-button
                data-testid="save-button"
              >
                <div className="w-5 h-5 flex items-center justify-center">
                  <i className={item.isSaved ? 'ri-heart-fill' : 'ri-heart-line'}></i>
                </div>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
