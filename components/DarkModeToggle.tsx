'use client';

import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/lib/store';
import { setTheme, savePreferencesToStorage } from '@/lib/slices/preferencesSlice';
import { useEffect } from 'react';

export default function DarkModeToggle() {
  const dispatch = useDispatch();
  const { theme } = useSelector((state: RootState) => state.preferences);

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    dispatch(setTheme(newTheme));
    dispatch(savePreferencesToStorage());
  };

  return (
    <button
      onClick={toggleTheme}
      className="w-10 h-10 flex items-center justify-center rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors cursor-pointer"
      title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
    >
      <i className={theme === 'light' ? 'ri-moon-line' : 'ri-sun-line'}></i>
    </button>
  );
}