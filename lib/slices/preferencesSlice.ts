import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface PreferencesState {
  selectedCategories: string[];
  contentTypes: string[];
  theme: 'light' | 'dark';
}

const initialState: PreferencesState = {
  selectedCategories: ['technology', 'finance', 'sports'],
  contentTypes: ['news', 'movie', 'music', 'social'],
  theme: 'light',
};

const preferencesSlice = createSlice({
  name: 'preferences',
  initialState,
  reducers: {
    setCategories: (state, action: PayloadAction<string[]>) => {
      state.selectedCategories = action.payload;
    },
    toggleCategory: (state, action: PayloadAction<string>) => {
      const category = action.payload;
      const index = state.selectedCategories.indexOf(category);
      
      if (index >= 0) {
        state.selectedCategories.splice(index, 1);
      } else {
        state.selectedCategories.push(category);
      }
    },
    setContentTypes: (state, action: PayloadAction<string[]>) => {
      state.contentTypes = action.payload;
    },
    toggleContentType: (state, action: PayloadAction<string>) => {
      const type = action.payload;
      const index = state.contentTypes.indexOf(type);
      
      if (index >= 0) {
        state.contentTypes.splice(index, 1);
      } else {
        state.contentTypes.push(type);
      }
    },
    setTheme: (state, action: PayloadAction<'light' | 'dark'>) => {
      state.theme = action.payload;
    },
    loadPreferencesFromStorage: (state) => {
      if (typeof window !== 'undefined') {
        const saved = localStorage.getItem('userPreferences');
        if (saved) {
          const parsed = JSON.parse(saved);
          state.selectedCategories = parsed.selectedCategories || state.selectedCategories;
          state.contentTypes = parsed.contentTypes || state.contentTypes;
          state.theme = parsed.theme || state.theme;
        }
      }
    },
    savePreferencesToStorage: (state) => {
      if (typeof window !== 'undefined') {
        localStorage.setItem('userPreferences', JSON.stringify({
          selectedCategories: state.selectedCategories,
          contentTypes: state.contentTypes,
          theme: state.theme,
        }));
      }
    },
  },
});

export const {
  setCategories,
  toggleCategory,
  setContentTypes,
  toggleContentType,
  setTheme,
  loadPreferencesFromStorage,
  savePreferencesToStorage,
} = preferencesSlice.actions;

export default preferencesSlice.reducer;