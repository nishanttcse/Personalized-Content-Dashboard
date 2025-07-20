'use client';

import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/lib/store';
import { toggleCategory, toggleContentType, savePreferencesToStorage } from '@/lib/slices/preferencesSlice';
import { resetContent } from '@/lib/slices/contentSlice';

const CATEGORIES = [
  { id: 'technology', label: 'Technology', icon: 'ri-computer-line' },
  { id: 'finance', label: 'Finance', icon: 'ri-money-dollar-circle-line' },
  { id: 'sports', label: 'Sports', icon: 'ri-football-line' },
  { id: 'lifestyle', label: 'Lifestyle', icon: 'ri-leaf-line' },
  { id: 'entertainment', label: 'Entertainment', icon: 'ri-movie-2-line' },
  { id: 'health', label: 'Health', icon: 'ri-heart-pulse-line' },
  { id: 'science', label: 'Science', icon: 'ri-test-tube-line' },
  { id: 'travel', label: 'Travel', icon: 'ri-plane-line' },
];

const CONTENT_TYPES = [
  { id: 'news', label: 'News Articles', icon: 'ri-newspaper-line' },
  { id: 'movie', label: 'Movie Recommendations', icon: 'ri-movie-line' },
  { id: 'music', label: 'Music Discovery', icon: 'ri-music-line' },
  { id: 'social', label: 'Social Trends', icon: 'ri-chat-3-line' },
];

export default function PreferencesPanel() {
  const dispatch = useDispatch();
  const { selectedCategories, contentTypes } = useSelector((state: RootState) => state.preferences);

  const handleCategoryToggle = (category: string) => {
    dispatch(toggleCategory(category));
    dispatch(resetContent());
    dispatch(savePreferencesToStorage());
  };

  const handleContentTypeToggle = (type: string) => {
    dispatch(toggleContentType(type));
    dispatch(resetContent());
    dispatch(savePreferencesToStorage());
  };

  return (
    <div className="space-y-8">
      {/* Categories Section */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Content Categories</h3>
        <p className="text-gray-600 mb-6">Choose the topics you're interested in to personalize your feed</p>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {CATEGORIES.map((category) => (
            <button
              key={category.id}
              onClick={() => handleCategoryToggle(category.id)}
              className={`p-4 rounded-xl border-2 transition-all cursor-pointer ${
                selectedCategories.includes(category.id)
                  ? 'border-blue-500 bg-blue-50 text-blue-700'
                  : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300'
              }`}
            >
              <div className="w-8 h-8 flex items-center justify-center mx-auto mb-2">
                <i className={`${category.icon} text-xl`}></i>
              </div>
              <span className="text-sm font-medium whitespace-nowrap">{category.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Content Types Section */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Content Types</h3>
        <p className="text-gray-600 mb-6">Select the types of content you want to see in your dashboard</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {CONTENT_TYPES.map((type) => (
            <button
              key={type.id}
              onClick={() => handleContentTypeToggle(type.id)}
              className={`p-4 rounded-xl border-2 transition-all cursor-pointer ${
                contentTypes.includes(type.id)
                  ? 'border-green-500 bg-green-50 text-green-700'
                  : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center">
                <div className="w-10 h-10 flex items-center justify-center bg-white rounded-lg mr-4">
                  <i className={`${type.icon} text-xl`}></i>
                </div>
                <div className="text-left">
                  <h4 className="font-medium whitespace-nowrap">{type.label}</h4>
                  <p className="text-xs opacity-75">
                    {type.id === 'news' && 'Latest articles and breaking news'}
                    {type.id === 'movie' && 'Personalized movie suggestions'}
                    {type.id === 'music' && 'New releases and playlists'}
                    {type.id === 'social' && 'Trending topics and discussions'}
                  </p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Summary */}
      <div className="bg-gray-50 rounded-xl p-6">
        <h4 className="font-medium text-gray-900 mb-3">Your Preferences Summary</h4>
        <div className="space-y-2">
          <p className="text-sm text-gray-600">
            <strong>Selected Categories:</strong> {selectedCategories.length > 0 ? selectedCategories.join(', ') : 'None'}
          </p>
          <p className="text-sm text-gray-600">
            <strong>Content Types:</strong> {contentTypes.length > 0 ? contentTypes.join(', ') : 'None'}
          </p>
        </div>
      </div>
    </div>
  );
}