'use client';

import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/lib/store';
import { setLanguage, languages, Language } from '@/lib/i18n';

export default function LanguageSelector() {
  const dispatch = useDispatch();
  const { currentLanguage } = useSelector((state: RootState) => state.i18n);
  const [isOpen, setIsOpen] = useState(false);

  const handleLanguageChange = (lang: Language) => {
    dispatch(setLanguage(lang));
    setIsOpen(false);
  };

  const currentLang = languages.find(lang => lang.code === currentLanguage);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors cursor-pointer"
      >
        <span className="text-lg mr-2">{currentLang?.flag}</span>
        <span className="hidden sm:inline">{currentLang?.name}</span>
        <div className="w-4 h-4 flex items-center justify-center ml-1">
          <i className={`ri-arrow-${isOpen ? 'up' : 'down'}-s-line text-xs`}></i>
        </div>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-50">
          <div className="py-2">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => handleLanguageChange(lang.code as Language)}
                className={`w-full flex items-center px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors cursor-pointer ${
                  currentLanguage === lang.code
                    ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300'
                    : 'text-gray-700 dark:text-gray-300'
                }`}
              >
                <span className="text-lg mr-3">{lang.flag}</span>
                <span>{lang.name}</span>
                {currentLanguage === lang.code && (
                  <div className="w-4 h-4 flex items-center justify-center ml-auto">
                    <i className="ri-check-line text-blue-600 dark:text-blue-400"></i>
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>
      )}

      {isOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
}