import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  preferences: {
    categories: string[];
    contentTypes: string[];
    notifications: boolean;
    darkMode: boolean;
  };
  createdAt: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null,
};

// Mock authentication functions
export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (credentials: { email: string; password: string }) => {
    // Mock API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    if (credentials.email === 'demo@example.com' && credentials.password === 'password') {
      const user: User = {
        id: 'user-1',
        email: 'demo@example.com',
        name: 'Demo User',
        avatar: 'https://readdy.ai/api/search-image?query=professional%20user%20avatar%20portrait%20with%20friendly%20smile%20modern%20business%20casual%20attire%20clean%20background%20headshot&width=150&height=150&seq=user-avatar-1&orientation=squarish',
        preferences: {
          categories: ['technology', 'science'],
          contentTypes: ['news', 'movie'],
          notifications: true,
          darkMode: false,
        },
        createdAt: new Date().toISOString(),
      };
      
      // Store in localStorage
      localStorage.setItem('auth_user', JSON.stringify(user));
      localStorage.setItem('auth_token', 'mock-jwt-token');
      
      return user;
    } else {
      throw new Error('Invalid credentials');
    }
  }
);

export const signupUser = createAsyncThunk(
  'auth/signupUser',
  async (userData: { email: string; password: string; name: string }) => {
    // Mock API call
    await new Promise(resolve => setTimeout(resolve, 1200));
    
    const user: User = {
      id: `user-${Date.now()}`,
      email: userData.email,
      name: userData.name,
      avatar: `https://readdy.ai/api/search-image?query=new%20user%20avatar%20portrait%20with%20welcoming%20expression%20modern%20casual%20style%20clean%20professional%20background%20headshot&width=150&height=150&seq=user-avatar-${Date.now()}&orientation=squarish`,
      preferences: {
        categories: [],
        contentTypes: ['news'],
        notifications: true,
        darkMode: false,
      },
      createdAt: new Date().toISOString(),
    };
    
    // Store in localStorage
    localStorage.setItem('auth_user', JSON.stringify(user));
    localStorage.setItem('auth_token', 'mock-jwt-token');
    
    return user;
  }
);

export const logoutUser = createAsyncThunk(
  'auth/logoutUser',
  async () => {
    // Mock API call
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Clear localStorage
    localStorage.removeItem('auth_user');
    localStorage.removeItem('auth_token');
    
    return null;
  }
);

export const loadUserFromStorage = createAsyncThunk(
  'auth/loadUserFromStorage',
  async () => {
    const token = localStorage.getItem('auth_token');
    const userStr = localStorage.getItem('auth_user');
    
    if (token && userStr) {
      const user = JSON.parse(userStr);
      return user;
    }
    
    return null;
  }
);

export const updateUserProfile = createAsyncThunk(
  'auth/updateUserProfile',
  async (updates: Partial<User>) => {
    // Mock API call
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const userStr = localStorage.getItem('auth_user');
    if (userStr) {
      const user = JSON.parse(userStr);
      const updatedUser = { ...user, ...updates };
      
      localStorage.setItem('auth_user', JSON.stringify(updatedUser));
      return updatedUser;
    }
    
    throw new Error('User not found');
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    updateUserPreferences: (state, action: PayloadAction<Partial<User['preferences']>>) => {
      if (state.user) {
        state.user.preferences = { ...state.user.preferences, ...action.payload };
        localStorage.setItem('auth_user', JSON.stringify(state.user));
      }
    },
  },
  extraReducers: (builder) => {
    builder
      // Login
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Login failed';
      })
      // Signup
      .addCase(signupUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signupUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Signup failed';
      })
      // Logout
      .addCase(logoutUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.loading = false;
        state.user = null;
        state.isAuthenticated = false;
      })
      // Load from storage
      .addCase(loadUserFromStorage.fulfilled, (state, action) => {
        if (action.payload) {
          state.user = action.payload;
          state.isAuthenticated = true;
        }
      })
      // Update profile
      .addCase(updateUserProfile.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Update failed';
      });
  },
});

export const { clearError, updateUserPreferences } = authSlice.actions;
export default authSlice.reducer;