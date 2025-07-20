import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type Language = 'en' | 'es' | 'fr' | 'de' | 'zh' | 'ja' | 'ko' | 'pt';

interface I18nState {
  currentLanguage: Language;
  isLoading: boolean;
  error: string | null;
}

const initialState: I18nState = {
  currentLanguage: 'en',
  isLoading: false,
  error: null,
};

// Translation dictionaries
const translations = {
  en: {
    // Navigation
    'nav.dashboard': 'Dashboard',
    'nav.preferences': 'Preferences',
    'nav.saved': 'Saved',
    'nav.trending': 'Trending',
    'nav.search': 'Search',
    
    // Dashboard
    'dashboard.title': 'Your Personalized Dashboard',
    'dashboard.subtitle': 'Discover content tailored to your interests from multiple sources',
    'dashboard.personal_feed': 'Personal Feed',
    'dashboard.trending': 'Trending',
    'dashboard.favorites': 'Favorites',
    
    // Content
    'content.read_more': 'Read More',
    'content.watch_now': 'Watch Now',
    'content.listen': 'Listen',
    'content.view_post': 'View Post',
    'content.save': 'Save',
    'content.saved': 'Saved',
    'content.load_more': 'Load More Content',
    'content.no_content': 'No content found',
    'content.no_content_desc': 'Try adjusting your preferences to see more personalized content',
    'content.end_of_feed': "You've reached the end of your personalized feed",
    'content.drag_hint': 'Drag and drop cards to customize your feed order',
    
    // Search
    'search.placeholder': 'Search news, movies, music...',
    'search.title': 'Search Content',
    'search.results_for': 'Search Results for',
    'search.found_results': 'Found {count} results',
    'search.no_results': 'No results found',
    'search.no_results_desc': 'Try different keywords or check your spelling',
    'search.start_searching': 'Start searching',
    'search.start_searching_desc': 'Enter keywords to find news, movies, music, and social content',
    
    // Preferences
    'preferences.title': 'Customize Your Experience',
    'preferences.subtitle': 'Personalize your dashboard by selecting your interests and preferences',
    'preferences.categories': 'Content Categories',
    'preferences.categories_desc': 'Choose the topics you\'re interested in to personalize your feed',
    'preferences.content_types': 'Content Types',
    'preferences.content_types_desc': 'Select the types of content you want to see in your dashboard',
    'preferences.summary': 'Your Preferences Summary',
    'preferences.selected_categories': 'Selected Categories',
    'preferences.selected_content_types': 'Content Types',
    'preferences.none': 'None',
    
    // Categories
    'category.technology': 'Technology',
    'category.finance': 'Finance',
    'category.sports': 'Sports',
    'category.lifestyle': 'Lifestyle',
    'category.entertainment': 'Entertainment',
    'category.health': 'Health',
    'category.science': 'Science',
    'category.travel': 'Travel',
    
    // Content Types
    'content_type.news': 'News Articles',
    'content_type.movie': 'Movie Recommendations',
    'content_type.music': 'Music Discovery',
    'content_type.social': 'Social Trends',
    'content_type.news_desc': 'Latest articles and breaking news',
    'content_type.movie_desc': 'Personalized movie suggestions',
    'content_type.music_desc': 'New releases and playlists',
    'content_type.social_desc': 'Trending topics and discussions',
    
    // Auth
    'auth.sign_in': 'Sign In',
    'auth.sign_up': 'Sign Up',
    'auth.create_account': 'Create Account',
    'auth.full_name': 'Full Name',
    'auth.email': 'Email Address',
    'auth.password': 'Password',
    'auth.processing': 'Processing...',
    'auth.no_account': "Don't have an account?",
    'auth.have_account': 'Already have an account?',
    'auth.demo_account': 'Demo Account',
    'auth.demo_email': 'Email: demo@example.com',
    'auth.demo_password': 'Password: password',
    
    // Profile
    'profile.title': 'Profile Settings',
    'profile.account_info': 'Account Information',
    'profile.member_since': 'Member since',
    'profile.saved_items': 'Saved items',
    'profile.edit_profile': 'Edit Profile',
    'profile.sign_out': 'Sign Out',
    'profile.save_changes': 'Save Changes',
    'profile.cancel': 'Cancel',
    
    // Errors
    'error.something_wrong': 'Something went wrong',
    'error.try_again': 'Try Again',
    'error.login_failed': 'Login failed',
    'error.signup_failed': 'Signup failed',
    'error.update_failed': 'Update failed',
    'error.invalid_credentials': 'Invalid credentials',
    
    // Loading
    'loading.content': 'Loading content...',
    'loading.search': 'Searching...',
    'loading.trending': 'Loading trending content...',
    
    // Realtime
    'realtime.connected': 'Connected',
    'realtime.disconnected': 'Disconnected',
    'realtime.new_content': 'New Content Available',
    'realtime.new_content_desc': 'Fresh content matching your interests has been added to your feed.',
    'realtime.view_updates': 'View Updates',
    'realtime.dismiss': 'Dismiss',
    
    // Common
    'common.close': 'Close',
    'common.save': 'Save',
    'common.cancel': 'Cancel',
    'common.loading': 'Loading',
    'common.error': 'Error',
    'common.success': 'Success',
    'common.warning': 'Warning',
    'common.info': 'Info',
  },
  es: {
    // Navigation
    'nav.dashboard': 'Panel de Control',
    'nav.preferences': 'Preferencias',
    'nav.saved': 'Guardado',
    'nav.trending': 'Tendencias',
    'nav.search': 'Buscar',
    
    // Dashboard
    'dashboard.title': 'Tu Panel Personalizado',
    'dashboard.subtitle': 'Descubre contenido adaptado a tus intereses de múltiples fuentes',
    'dashboard.personal_feed': 'Feed Personal',
    'dashboard.trending': 'Tendencias',
    'dashboard.favorites': 'Favoritos',
    
    // Content
    'content.read_more': 'Leer Más',
    'content.watch_now': 'Ver Ahora',
    'content.listen': 'Escuchar',
    'content.view_post': 'Ver Publicación',
    'content.save': 'Guardar',
    'content.saved': 'Guardado',
    'content.load_more': 'Cargar Más Contenido',
    'content.no_content': 'No se encontró contenido',
    'content.no_content_desc': 'Intenta ajustar tus preferencias para ver más contenido personalizado',
    'content.end_of_feed': 'Has llegado al final de tu feed personalizado',
    'content.drag_hint': 'Arrastra y suelta las tarjetas para personalizar el orden de tu feed',
    
    // Search
    'search.placeholder': 'Buscar noticias, películas, música...',
    'search.title': 'Buscar Contenido',
    'search.results_for': 'Resultados de Búsqueda para',
    'search.found_results': '{count} resultados encontrados',
    'search.no_results': 'No se encontraron resultados',
    'search.no_results_desc': 'Intenta con diferentes palabras clave o verifica la ortografía',
    'search.start_searching': 'Comenzar búsqueda',
    'search.start_searching_desc': 'Ingresa palabras clave para encontrar noticias, películas, música y contenido social',
    
    // Add more Spanish translations as needed...
  },
  fr: {
    // Navigation
    'nav.dashboard': 'Tableau de Bord',
    'nav.preferences': 'Préférences',
    'nav.saved': 'Enregistré',
    'nav.trending': 'Tendances',
    'nav.search': 'Rechercher',
    
    // Dashboard
    'dashboard.title': 'Votre Tableau de Bord Personnalisé',
    'dashboard.subtitle': 'Découvrez du contenu adapté à vos intérêts provenant de sources multiples',
    'dashboard.personal_feed': 'Flux Personnel',
    'dashboard.trending': 'Tendances',
    'dashboard.favorites': 'Favoris',
    
    // Add more French translations as needed...
  },
  // Add more languages as needed...
};

// Translation function
export const t = (key: string, params?: { [key: string]: string | number }): string => {
  const currentLang = getCurrentLanguage();
  const translation = translations[currentLang]?.[key] || translations.en[key] || key;
  
  if (params) {
    return Object.entries(params).reduce((str, [paramKey, value]) => {
      return str.replace(new RegExp(`{${paramKey}}`, 'g'), String(value));
    }, translation);
  }
  
  return translation;
};

// Get current language from localStorage or default
export const getCurrentLanguage = (): Language => {
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem('dashboard_language');
    if (stored && Object.keys(translations).includes(stored)) {
      return stored as Language;
    }
    
    // Detect browser language
    const browserLang = navigator.language.split('-')[0];
    if (Object.keys(translations).includes(browserLang)) {
      return browserLang as Language;
    }
  }
  
  return 'en';
};

// Available languages
export const languages = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
  { code: 'zh', name: '中文', flag: '🇨🇳' },
  { code: 'ja', name: '日本語', flag: '🇯🇵' },
  { code: 'ko', name: '한국어', flag: '🇰🇷' },
  { code: 'pt', name: 'Português', flag: '🇵🇹' },
];

const i18nSlice = createSlice({
  name: 'i18n',
  initialState,
  reducers: {
    setLanguage: (state, action: PayloadAction<Language>) => {
      state.currentLanguage = action.payload;
      if (typeof window !== 'undefined') {
        localStorage.setItem('dashboard_language', action.payload);
      }
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    loadLanguageFromStorage: (state) => {
      if (typeof window !== 'undefined') {
        const stored = localStorage.getItem('dashboard_language');
        if (stored && Object.keys(translations).includes(stored)) {
          state.currentLanguage = stored as Language;
        }
      }
    },
  },
});

export const { setLanguage, setLoading, setError, loadLanguageFromStorage } = i18nSlice.actions;
export default i18nSlice.reducer;