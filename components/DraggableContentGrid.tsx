'use client';

import { useState } from 'react';
import { ContentItem } from '@/lib/slices/contentSlice';
import ContentCard from './ContentCard';

interface DraggableContentGridProps {
  items: ContentItem[];
  onReorder?: (newOrder: ContentItem[]) => void;
}

export default function DraggableContentGrid({ items, onReorder }: DraggableContentGridProps) {
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);

  const handleDragStart = (e: React.DragEvent, itemId: string) => {
    setDraggedItem(itemId);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    setDragOverIndex(index);
  };

  const handleDragLeave = () => {
    setDragOverIndex(null);
  };

  const handleDrop = (e: React.DragEvent, dropIndex: number) => {
    e.preventDefault();
    
    if (!draggedItem) return;

    const draggedIndex = items.findIndex(item => item.id === draggedItem);
    if (draggedIndex === dropIndex) return;

    const newItems = [...items];
    const [removed] = newItems.splice(draggedIndex, 1);
    newItems.splice(dropIndex, 0, removed);

    onReorder?.(newItems);
    setDraggedItem(null);
    setDragOverIndex(null);
  };

  const handleDragEnd = () => {
    setDraggedItem(null);
    setDragOverIndex(null);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {items.map((item, index) => (
        <div
          key={item.id}
          draggable
          onDragStart={(e) => handleDragStart(e, item.id)}
          onDragOver={(e) => handleDragOver(e, index)}
          onDragLeave={handleDragLeave}
          onDrop={(e) => handleDrop(e, index)}
          onDragEnd={handleDragEnd}
          className={`transition-all duration-200 cursor-move ${
            draggedItem === item.id ? 'opacity-50 scale-95' : ''
          } ${
            dragOverIndex === index ? 'transform scale-105' : ''
          }`}
        >
          <div className="relative group">
            <div className="absolute -top-2 -right-2 w-6 h-6 bg-blue-500 text-white rounded-full items-center justify-center text-xs z-10 opacity-0 group-hover:opacity-100 transition-opacity hidden md:flex" data-testid="drag-handle">
              <i className="ri-drag-move-line"></i>
            </div>
            <ContentCard item={item} />
          </div>
        </div>
      ))}
    </div>
  );
}
