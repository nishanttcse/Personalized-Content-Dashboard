
'use client';

import { ContentItem } from '@/lib/slices/contentSlice';
import { useDispatch, useSelector } from 'react-redux';
import { toggleSaveItem } from '@/lib/slices/contentSlice';
import { RootState } from '@/lib/store';

interface ContentCardProps {
  item: ContentItem;
}

export default function ContentCard({ item }: ContentCardProps) {
  const dispatch = useDispatch();
  const { savedItems } = useSelector((state: RootState) => state.content);

  const isSaved = savedItems.some(saved => saved.id === item.id);

  const handleSave = () => {
    dispatch(toggleSaveItem(item.id));
  };

  const getActionText = () => {
    switch (item.type) {
      case 'news':
        return 'Read More';
      case 'movie':
        return 'Watch Now';
      case 'music':
        return 'Listen';
      case 'social':
        return 'View Post';
      default:
        return 'Learn More';
    }
  };

  const getTypeIcon = () => {
    switch (item.type) {
      case 'news':
        return 'ri-newspaper-line';
      case 'movie':
        return 'ri-movie-line';
      case 'music':
        return 'ri-music-line';
      case 'social':
        return 'ri-chat-3-line';
      default:
        return 'ri-article-line';
    }
  };

  const getTypeColor = () => {
    switch (item.type) {
      case 'news':
        return 'text-blue-600 bg-blue-50';
      case 'movie':
        return 'text-purple-600 bg-purple-50';
      case 'music':
        return 'text-green-600 bg-green-50';
      case 'social':
        return 'text-orange-600 bg-orange-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  const handleReadMore = () => {
    if (item.url) {
      window.open(item.url, '_blank');
    }
  };

  const handleActionClick = () => {
    if (item.url) {
      window.open(item.url, '_blank', 'noopener,noreferrer');
    }
  };

  const handleCardClick = (e: React.MouseEvent) => {
    // Prevent card click when clicking on save button
    if ((e.target as HTMLElement).closest('[data-testid="save-button"]')) {
      return;
    }
    handleActionClick();
  };

  return (
    <div
      className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
      data-testid="content-card"
      onClick={handleCardClick}
    >
      <div className="aspect-video relative overflow-hidden">
        <img
          src={item.imageUrl}
          alt={item.title}
          className="w-full h-full object-cover object-top"
          onError={(e) => {
            e.currentTarget.src = 'https://via.placeholder.com/400x250?text=No+Image';
          }}
        />
        <div className="absolute top-3 right-3">
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleSave();
            }}
            className={`w-8 h-8 flex items-center justify-center rounded-full transition-colors cursor-pointer ${
              isSaved
                ? 'bg-red-500 text-white'
                : 'bg-white/80 text-gray-600 hover:bg-white'
            }`}
            data-testid="save-button"
          >
            <i className={`ri-heart-${isSaved ? 'fill' : 'line'} text-sm`}></i>
          </button>
        </div>
      </div>

      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-medium text-blue-600 dark:text-blue-400 uppercase tracking-wide">
            {item.category}
          </span>
          <span className="text-xs text-gray-500 dark:text-gray-400">
            {new Date(item.publishedAt).toLocaleDateString()}
          </span>
        </div>

        <h3 className="font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2" data-testid="card-title">
          {item.title}
        </h3>

        <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-2" data-testid="card-description">
          {item.description}
        </p>

        <div className="flex items-center justify-between">
          <span className="text-xs text-gray-500 dark:text-gray-400" data-testid="card-source">
            {item.source}
          </span>

          <button
            onClick={(e) => {
              e.stopPropagation();
              handleActionClick();
            }}
            className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors cursor-pointer whitespace-nowrap flex items-center gap-1"
            data-testid="card-action-button"
          >
            {getActionText()}
            <i className="ri-external-link-line text-xs"></i>
          </button>
        </div>
      </div>
    </div>
  );
}
