
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

export interface ContentItem {
  id: string;
  type: 'news' | 'movie' | 'music' | 'social';
  title: string;
  description: string;
  imageUrl: string;
  url?: string;
  category: string;
  publishedAt: string;
  source: string;
  isSaved?: boolean;
}

interface ContentState {
  items: ContentItem[];
  loading: boolean;
  error: string | null;
  page: number;
  hasMore: boolean;
  savedItems: ContentItem[];
  trendingItems: ContentItem[];
  trendingLoading: boolean;
  searchResults: ContentItem[];
  searchLoading: boolean;
  searchQuery: string;
}

const initialState: ContentState = {
  items: [],
  loading: false,
  error: null,
  page: 1,
  hasMore: true,
  savedItems: [],
  trendingItems: [],
  trendingLoading: false,
  searchResults: [],
  searchLoading: false,
  searchQuery: '',
};

// Mock data generators with proper URLs
const generateNewsContent = (preferences: string[]): ContentItem[] => {
  const newsItems = [
    {
      id: 'news-1',
      title: 'Breaking: Revolutionary AI Technology Breakthrough',
      description: 'Scientists achieve major milestone in artificial intelligence research with new neural network architecture.',
      imageUrl: 'https://readdy.ai/api/search-image?query=artificial%20intelligence%20breakthrough%20technology%20futuristic%20lab%20scientists%20working%20with%20advanced%20computers%20and%20holographic%20displays%2C%20modern%20clean%20laboratory%20setting&width=400&height=250&seq=news1&orientation=landscape',
      category: 'Technology',
      type: 'news' as 'news',
      source: 'Tech News Daily',
      publishedAt: new Date().toISOString(),
      url: 'https://techcrunch.com/ai/breakthrough-neural-networks'
    },
    {
      id: 'news-2',
      title: 'Global Markets Show Strong Recovery Signals',
      description: 'Financial experts report positive trends across major stock exchanges worldwide.',
      imageUrl: 'https://readdy.ai/api/search-image?query=stock%20market%20trading%20floor%20financial%20charts%20graphs%20showing%20upward%20trends%2C%20professional%20business%20environment%20with%20traders%20and%20digital%20displays&width=400&height=250&seq=news2&orientation=landscape',
      category: 'Finance',
      type: 'news' as 'news',
      source: 'Financial Times',
      publishedAt: new Date(Date.now() - 3600000).toISOString(),
      url: 'https://www.ft.com/markets/global-recovery-signals'
    },
    {
      id: 'news-3',
      title: 'Championship Finals Set Historic Viewership Records',
      description: 'Last night\'s championship game attracted the largest television audience in sports history.',
      imageUrl: 'https://readdy.ai/api/search-image?query=championship%20sports%20stadium%20filled%20with%20excited%20fans%20celebrating%20victory%2C%20bright%20stadium%20lights%20and%20scoreboard%20showing%20final%20results&width=400&height=250&seq=news3&orientation=landscape',
      category: 'Sports',
      type: 'news' as 'news',
      source: 'Sports Central',
      publishedAt: new Date(Date.now() - 7200000).toISOString(),
      url: 'https://espn.com/championship-finals-viewership-records'
    },
    {
      id: 'news-4',
      title: 'New Climate Change Initiative Launched',
      description: 'International coalition announces ambitious plan to reduce carbon emissions by 50% within the next decade.',
      imageUrl: 'https://readdy.ai/api/search-image?query=renewable%20energy%20wind%20turbines%20and%20solar%20panels%20in%20green%20landscape%2C%20sustainable%20technology%20environmental%20conservation%20clean%20energy%20future&width=400&height=250&seq=news4&orientation=landscape',
      category: 'Environment',
      type: 'news' as 'news',
      source: 'Green Planet News',
      publishedAt: new Date(Date.now() - 10800000).toISOString(),
      url: 'https://www.nature.com/climate-initiative-2024'
    }
  ];

  // Filter based on selected categories
  return preferences.length > 0 
    ? newsItems.filter(item => preferences.includes(item.category))
    : newsItems;
};

const generateMovieContent = (): ContentItem[] => {
  return [
    {
      id: 'movie-1',
      title: 'Stellar Odyssey: The Final Frontier',
      description: 'An epic space adventure that takes viewers on a journey across the galaxy.',
      imageUrl: 'https://readdy.ai/api/search-image?query=epic%20space%20adventure%20movie%20poster%20with%20spaceship%20traveling%20through%20colorful%20nebula%20and%20distant%20planets%2C%20cinematic%20sci-fi%20aesthetic&width=400&height=250&seq=movie1&orientation=landscape',
      category: 'Sci-Fi',
      type: 'movie' as 'movie',
      source: 'Cinema Plus',
      publishedAt: new Date().toISOString(),
      url: 'https://www.imdb.com/title/stellar-odyssey-final-frontier'
    },
    {
      id: 'movie-2',
      title: 'The Detective\'s Last Case',
      description: 'A gripping thriller about a veteran detective solving one final mystery.',
      imageUrl: 'https://readdy.ai/api/search-image?query=film%20noir%20detective%20thriller%20movie%20poster%20with%20shadowy%20detective%20silhouette%20in%20dark%20city%20street%2C%20vintage%20crime%20aesthetic&width=400&height=250&seq=movie2&orientation=landscape',
      category: 'Thriller',
      type: 'movie' as 'movie',
      source: 'Movie Hub',
      publishedAt: new Date(Date.now() - 86400000).toISOString(),
      url: 'https://www.rottentomatoes.com/m/detectives_last_case'
    }
  ];
};

const generateMusicContent = (): ContentItem[] => {
  return [
    {
      id: 'music-1',
      title: 'Midnight Echoes - New Album Release',
      description: 'The latest album from rising indie artist features dreamy soundscapes and introspective lyrics.',
      imageUrl: 'https://readdy.ai/api/search-image?query=indie%20music%20album%20cover%20art%20with%20dreamy%20midnight%20cityscape%20neon%20lights%20and%20artistic%20typography%2C%20modern%20music%20aesthetic&width=400&height=250&seq=music1&orientation=landscape',
      category: 'Indie',
      type: 'music' as 'music',
      source: 'Music Discovery',
      publishedAt: new Date().toISOString(),
      url: 'https://open.spotify.com/album/midnight-echoes'
    },
    {
      id: 'music-2',
      title: 'Summer Vibes Playlist 2024',
      description: 'The perfect collection of upbeat tracks to soundtrack your summer adventures.',
      imageUrl: 'https://readdy.ai/api/search-image?query=summer%20music%20playlist%20cover%20with%20beach%20sunset%20palm%20trees%20and%20vibrant%20colors%2C%20tropical%20vacation%20aesthetic&width=400&height=250&seq=music2&orientation=landscape',
      category: 'Pop',
      type: 'music' as 'music',
      source: 'Playlist Central',
      publishedAt: new Date(Date.now() - 43200000).toISOString(),
      url: 'https://music.apple.com/playlist/summer-vibes-2024'
    }
  ];
};

const generateSocialContent = (): ContentItem[] => {
  return [
    {
      id: 'social-1',
      title: 'Community Discussion: Future of Remote Work',
      description: 'Join the conversation about hybrid work models and their impact on productivity.',
      imageUrl: 'https://readdy.ai/api/search-image?query=remote%20work%20discussion%20people%20collaborating%20via%20video%20call%20on%20laptops%2C%20modern%20home%20office%20setup%20with%20plants%20and%20natural%20lighting&width=400&height=250&seq=social1&orientation=landscape',
      category: 'Technology',
      type: 'social' as 'social',
      source: 'WorkLife Community',
      publishedAt: new Date().toISOString(),
      url: 'https://linkedin.com/posts/future-of-remote-work-discussion'
    },
    {
      id: 'social-2',
      title: 'Trending: Sustainable Living Tips',
      description: 'Community members share their best eco-friendly lifestyle hacks and green living tips.',
      imageUrl: 'https://readdy.ai/api/search-image?query=sustainable%20living%20eco-friendly%20lifestyle%20with%20reusable%20items%20plants%20and%20zero%20waste%20products%2C%20green%20living%20aesthetic&width=400&height=250&seq=social2&orientation=landscape',
      category: 'Lifestyle',
      type: 'social' as 'social',
      source: 'EcoLife Forum',
      publishedAt: new Date(Date.now() - 21600000).toISOString(),
      url: 'https://reddit.com/r/sustainableliving/tips-green-lifestyle'
    }
  ];
};

export const fetchContent = createAsyncThunk(
  'content/fetchContent',
  async ({ categories, page }: { categories: string[]; page: number }) => {
    // Mock API call - in real implementation, this would call actual APIs
    await new Promise(resolve => setTimeout(resolve, 1000));  
    
    // Generate mock content based on categories
    const newsContent = generateNewsContent(categories);
    const movieContent = generateMovieContent();
    const musicContent = generateMusicContent();
    const socialContent = generateSocialContent();

    const mockContent = [...newsContent, ...movieContent, ...musicContent, ...socialContent];

    // Filter based on selected categories
    const filteredContent = categories.length > 0 
      ? mockContent.filter(item => categories.includes(item.category))
      : mockContent;

    return {
      items: filteredContent,
      hasMore: page < 3 // Mock pagination
    };
  }
);

export const fetchTrendingContent = createAsyncThunk(
  'content/fetchTrendingContent',
  async () => {
    await new Promise(resolve => setTimeout(resolve, 800));  
    
    const trendingContent: ContentItem[] = [
      {
        id: 'trending-1',
        type: 'news' as 'news',
        title: 'Breaking: Major Scientific Discovery',
        description: 'Scientists announce groundbreaking research in quantum computing that could revolutionize technology and solve complex global challenges within the next decade.',
        imageUrl: 'https://readdy.ai/api/search-image?query=major%20scientific%20discovery%20laboratory%20research%20breakthrough%20with%20scientists%20celebrating%20and%20advanced%20quantum%20computing%20equipment%20glowing%20with%20success%20bright%20modern%20setting%20clean%20white%20lab%20environment&width=400&height=250&seq=trending-1&orientation=landscape',
        category: 'Science',
        publishedAt: new Date().toISOString(),
        source: 'Science Today',
        url: 'https://www.nature.com/articles/quantum-computing-breakthrough-2024'
      },
      {
        id: 'trending-2',
        type: 'movie' as 'movie',
        title: 'Blockbuster Hit of the Year',
        description: 'The most anticipated superhero movie release breaks all box office records worldwide, earning over $500 million in its opening weekend across global markets.',
        imageUrl: 'https://readdy.ai/api/search-image?query=blockbuster%20movie%20premiere%20red%20carpet%20with%20celebrities%20and%20bright%20spotlights%20glamorous%20Hollywood%20event%20with%20excited%20crowds%20photographers%20and%20movie%20theater%20marquee%20showing%20success&width=400&height=250&seq=trending-2&orientation=landscape',
        category: 'Entertainment',
        publishedAt: new Date().toISOString(),
        source: 'Entertainment Weekly',
        url: 'https://www.imdb.com/title/blockbuster-superhero-hit-2024'
      },
      {
        id: 'trending-3',
        type: 'music' as 'music',
        title: 'Viral Song Takes Internet by Storm',
        description: 'New track from emerging artist becomes most-streamed song in platform history, reaching 100 million plays in just 48 hours and inspiring countless social media challenges.',
        imageUrl: 'https://readdy.ai/api/search-image?query=viral%20music%20hit%20with%20concert%20stage%20bright%20colorful%20lights%20enthusiastic%20crowd%20dancing%20and%20singing%20along%20energetic%20performance%20with%20dynamic%20stage%20effects%20and%20confetti%20celebration&width=400&height=250&seq=trending-3&orientation=landscape',
        category: 'Music',
        publishedAt: new Date().toISOString(),
        source: 'Music Charts',
        url: 'https://open.spotify.com/track/viral-song-internet-storm-2024'
      },
      {
        id: 'trending-4',
        type: 'social' as 'social',
        title: 'Global Movement Gains Momentum',
        description: 'Environmental sustainability campaign reaches 50 million supporters worldwide, with major corporations pledging carbon neutrality and governments implementing new green policies.',
        imageUrl: 'https://readdy.ai/api/search-image?query=global%20environmental%20movement%20with%20diverse%20people%20holding%20inspiring%20green%20banners%20and%20signs%20peaceful%20climate%20protest%20with%20unity%20hope%20and%20renewable%20energy%20symbols%20bright%20daylight%20positive%20energy&width=400&height=250&seq=trending-4&orientation=landscape',
        category: 'Social Impact',
        publishedAt: new Date().toISOString(),
        source: 'Global Impact Network',
        url: 'https://www.climateaction.org/global-movement-sustainability-2024'
      }
    ];

    return trendingContent;
  }
);

export const searchContent = createAsyncThunk(
  'content/searchContent',
  async (query: string) => {
    await new Promise(resolve => setTimeout(resolve, 500));  
    
    // Mock search results
    const allContent: ContentItem[] = [
      {
        id: 'search-1',
        type: 'news' as 'news',
        title: `Search Result: ${query} in Technology`,
        description: `Latest developments in ${query} technology sector with detailed analysis.`,
        imageUrl: 'https://readdy.ai/api/search-image?query=technology%20search%20results%20with%20digital%20screens%20showing%20data%20analysis%20graphs%20charts%20and%20information%20technology%20office%20environment%20modern%20workplace&width=400&height=250&seq=search-1&orientation=landscape',
        category: 'technology',
        publishedAt: new Date().toISOString(),
        source: 'Tech Search'
      },
      {
        id: 'search-2',
        type: 'movie' as 'movie',
        title: `Movie Results for "${query}"`,
        description: `Top movie recommendations matching your search for ${query}.`,
        imageUrl: 'https://readdy.ai/api/search-image?query=movie%20search%20results%20with%20film%20reels%20cinema%20screens%20and%20movie%20posters%20displayed%20in%20modern%20theater%20lobby%20with%20warm%20ambient%20lighting&width=400&height=250&seq=search-2&orientation=landscape',
        category: 'entertainment',
        publishedAt: new Date().toISOString(),
        source: 'Movie Database'
      }
    ];

    return allContent;
  }
);

const contentSlice = createSlice({
  name: 'content',
  initialState,
  reducers: {
    toggleSaveItem: (state, action: PayloadAction<string>) => {
      const itemId = action.payload;
      const item = state.items.find(item => item.id === itemId) || 
                  state.trendingItems.find(item => item.id === itemId) ||
                  state.searchResults.find(item => item.id === itemId);
      
      if (item) {
        const isCurrentlySaved = state.savedItems.some(saved => saved.id === itemId);
        
        if (isCurrentlySaved) {
          state.savedItems = state.savedItems.filter(saved => saved.id !== itemId);
          item.isSaved = false;
        } else {
          state.savedItems.push({ ...item, isSaved: true });
          item.isSaved = true;
        }
      }
    },
    resetContent: (state) => {
      state.items = [];
      state.page = 1;
      state.hasMore = true;
    },
    reorderContent: (state, action: PayloadAction<ContentItem[]>) => {
      state.items = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
    clearSearch: (state) => {
      state.searchResults = [];
      state.searchQuery = '';
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchContent.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchContent.fulfilled, (state, action) => {
        state.loading = false;
        if (action.meta.arg.page === 1) {
          state.items = action.payload.items;
        } else {
          state.items = [...state.items, ...action.payload.items];
        }
        state.hasMore = action.payload.hasMore;
        state.page = action.meta.arg.page;
      })
      .addCase(fetchContent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch content';
      })
      .addCase(fetchTrendingContent.pending, (state) => {
        state.trendingLoading = true;
      })
      .addCase(fetchTrendingContent.fulfilled, (state, action) => {
        state.trendingLoading = false;
        state.trendingItems = action.payload;
      })
      .addCase(searchContent.pending, (state) => {
        state.searchLoading = true;
      })
      .addCase(searchContent.fulfilled, (state, action) => {
        state.searchLoading = false;
        state.searchResults = action.payload;
        state.searchQuery = action.meta.arg;
      });
  },
});

export const { toggleSaveItem, resetContent, reorderContent, clearError, clearSearch } = contentSlice.actions;
export default contentSlice.reducer;
