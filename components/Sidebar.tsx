
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

const NAVIGATION_ITEMS = [
  { href: '/', label: 'Dashboard', icon: 'ri-dashboard-line' },
  { href: '/preferences', label: 'Preferences', icon: 'ri-settings-line' },
  { href: '/saved', label: 'Saved Items', icon: 'ri-heart-line' },
  { href: '/trending', label: 'Trending', icon: 'ri-fire-line' },
  { href: '/search', label: 'Search', icon: 'ri-search-line' },
];

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname();

  const navigation = [
    { name: 'Dashboard', href: '/', icon: 'ri-dashboard-line', testId: 'sidebar-dashboard' },
    { name: 'Preferences', href: '/preferences', icon: 'ri-settings-3-line', testId: 'sidebar-preferences' },
    { name: 'Saved Items', href: '/saved', icon: 'ri-heart-line', testId: 'sidebar-saved' },
    { name: 'Trending', href: '/trending', icon: 'ri-fire-line', testId: 'sidebar-trending' },
    { name: 'Search', href: '/search', icon: 'ri-search-line', testId: 'sidebar-search' },
  ];

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      }`} data-testid="sidebar">
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center px-6 py-5 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center mr-3">
                <i className="ri-dashboard-3-line text-white"></i>
              </div>
              <span className="text-xl font-bold text-gray-900 dark:text-white" style={{ fontFamily: 'Pacifico, serif' }}>
                Dashboard
              </span>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-2">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={onClose}
                className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                  pathname === item.href
                    ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
                data-testid={item.testId}
              >
                <div className="w-5 h-5 flex items-center justify-center mr-3">
                  <i className={`${item.icon} text-lg`}></i>
                </div>
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-gray-200 dark:border-gray-700">
            <div className="text-xs text-gray-500 dark:text-gray-400 text-center">
              2024 Personalized Dashboard
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
