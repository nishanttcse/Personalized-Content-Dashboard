
'use client';

import { useState, useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { searchContent } from '@/lib/slices/contentSlice';

interface SearchBarProps {
  onSearch?: (query: string) => void;
}

export default function SearchBar({ onSearch }: SearchBarProps) {
  const [query, setQuery] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);
  const dispatch = useDispatch();

  const debouncedSearch = useCallback(
    debounce((searchQuery: string) => {
      if (searchQuery.trim()) {
        dispatch(searchContent(searchQuery) as any);
        onSearch?.(searchQuery);
      }
    }, 300),
    [dispatch, onSearch]
  );

  useEffect(() => {
    debouncedSearch(query);
  }, [query, debouncedSearch]);

  return (
    <div className="relative">
      <div className={`flex items-center transition-all duration-300 ${isExpanded ? 'w-80' : 'w-64'}`} data-testid="search-container">
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 w-10 h-10 flex items-center justify-center">
            <i className="ri-search-line text-gray-400"></i>
          </div>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setIsExpanded(true)}
            onBlur={() => setIsExpanded(false)}
            placeholder="Search news, movies, music..."
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm"
            data-testid="search-input"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="absolute inset-y-0 right-0 w-8 h-8 flex items-center justify-center cursor-pointer"
              data-testid="clear-search"
            >
              <i className="ri-close-line text-gray-400 hover:text-gray-600"></i>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(null, args), wait);
  };
}
