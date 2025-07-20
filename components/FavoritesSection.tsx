'use client';

import { useSelector } from 'react-redux';
import { RootState } from '@/lib/store';
import ContentCard from './ContentCard';

export default function FavoritesSection() {
  const { savedItems } = useSelector((state: RootState) => state.content);

  if (savedItems.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 flex items-center justify-center bg-gray-100 rounded-full mx-auto mb-4">
          <i className="ri-heart-line text-2xl text-gray-500"></i>
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">No favorites yet</h3>
        <p className="text-gray-600">
          Save content by clicking the heart icon on any card
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Your Favorites</h2>
          <p className="text-gray-600">{savedItems.length} saved items</p>
        </div>
        <div className="w-8 h-8 flex items-center justify-center">
          <i className="ri-heart-fill text-xl text-red-500"></i>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {savedItems.map((item) => (
          <ContentCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}