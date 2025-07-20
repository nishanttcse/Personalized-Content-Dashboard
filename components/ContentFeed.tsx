
'use client';

import { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/lib/store';
import { fetchContent, reorderContent } from '@/lib/slices/contentSlice';
import DraggableContentGrid from './DraggableContentGrid';
import LoadingSpinner from './LoadingSpinner';

export default function ContentFeed() {
  const dispatch = useDispatch();
  const { items, loading, error, hasMore, page } = useSelector((state: RootState) => state.content);
  const { selectedCategories } = useSelector((state: RootState) => state.preferences);

  const loadContent = useCallback((pageNum: number) => {
    dispatch(fetchContent({ categories: selectedCategories, page: pageNum }) as any);
  }, [dispatch, selectedCategories]);

  useEffect(() => {
    loadContent(1);
  }, [loadContent]);

  const handleLoadMore = () => {
    if (!loading && hasMore) {
      loadContent(page + 1);
    }
  };

  const handleReorder = (newOrder: any[]) => {
    dispatch(reorderContent(newOrder));
  };

  if (error) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 flex items-center justify-center bg-red-50 dark:bg-red-900/20 rounded-full mx-auto mb-4">
          <i className="ri-error-warning-line text-2xl text-red-500"></i>
        </div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Something went wrong</h3>
        <p className="text-gray-600 dark:text-gray-400 mb-4">{error}</p>
        <button
          onClick={() => loadContent(1)}
          className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors cursor-pointer whitespace-nowrap"
        >
          <i className="ri-refresh-line mr-2"></i>
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Drag and Drop Info */}
      {items.length > 0 && (
        <div className="hidden md:flex items-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg" data-testid="drag-drop-hint">
          <div className="w-8 h-8 flex items-center justify-center bg-blue-100 dark:bg-blue-800 rounded-lg mr-3">
            <i className="ri-drag-move-line text-blue-600 dark:text-blue-400"></i>
          </div>
          <p className="text-sm text-blue-700 dark:text-blue-300">
            Drag and drop cards to customize your feed order
          </p>
        </div>
      )}

      {/* Content Grid */}
      <div data-testid="content-feed">
        <DraggableContentGrid items={items} onReorder={handleReorder} />
      </div>

      {/* Loading State */}
      {loading && (
        <div className="flex justify-center py-8">
          <LoadingSpinner />
        </div>
      )}

      {/* Load More Button */}
      {!loading && hasMore && items.length > 0 && (
        <div className="text-center py-6">
          <button
            onClick={handleLoadMore}
            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors cursor-pointer whitespace-nowrap"
            data-testid="load-more-button"
          >
            <i className="ri-add-line mr-2"></i>
            Load More Content
          </button>
        </div>
      )}

      {/* No More Content */}
      {!loading && !hasMore && items.length > 0 && (
        <div className="text-center py-6">
          <div className="w-12 h-12 flex items-center justify-center bg-gray-100 dark:bg-gray-800 rounded-full mx-auto mb-3">
            <i className="ri-check-line text-xl text-gray-500 dark:text-gray-400"></i>
          </div>
          <p className="text-gray-500 dark:text-gray-400">You've reached the end of your personalized feed</p>
        </div>
      )}

      {/* Empty State */}
      {!loading && items.length === 0 && (
        <div className="text-center py-12" data-testid="empty-state">
          <div className="w-16 h-16 flex items-center justify-center bg-gray-100 dark:bg-gray-800 rounded-full mx-auto mb-4">
            <i className="ri-inbox-line text-2xl text-gray-500 dark:text-gray-400"></i>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2" data-testid="empty-state-title">
            No content found
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Try adjusting your preferences to see more personalized content
          </p>
        </div>
      )}
    </div>
  );
}
