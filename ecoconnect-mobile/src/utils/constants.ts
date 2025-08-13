// App constants
export const APP_NAME = 'EcoConnect';
export const APP_VERSION = '1.0.0';

// Light theme colors
export const LIGHT_COLORS = {
  primary: '#10b981', // eco-green
  secondary: '#3b82f6', // eco-blue
  accent: '#f59e0b', // eco-yellow
  success: '#10b981',
  warning: '#f59e0b',
  error: '#ef4444',
  background: '#f8fafc',
  surface: '#ffffff',
  text: {
    primary: '#1f2937',
    secondary: '#6b7280',
    light: '#9ca3af',
  },
  border: '#e5e7eb',
};

// Dark theme colors
export const DARK_COLORS = {
  primary: '#34d399', // brighter eco-green for dark mode
  secondary: '#60a5fa', // brighter eco-blue for dark mode
  accent: '#fbbf24', // brighter eco-yellow for dark mode
  success: '#34d399',
  warning: '#fbbf24',
  error: '#f87171',
  background: '#0f172a', // dark slate
  surface: '#1e293b', // lighter dark slate
  text: {
    primary: '#f1f5f9',
    secondary: '#cbd5e1',
    light: '#94a3b8',
  },
  border: '#334155',
};

// Default colors (light theme)
export const COLORS = LIGHT_COLORS;

// Spacing
export const SPACING = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

// Typography
export const FONT_SIZES = {
  xs: 12,
  sm: 14,
  md: 16,
  lg: 18,
  xl: 20,
  xxl: 24,
  xxxl: 32,
};

// API endpoints
export const API_BASE_URL = __DEV__ 
  ? 'http://localhost:3000/api' 
  : 'https://ecoconnect.app/api';

// Storage keys
export const STORAGE_KEYS = {
  USER_TOKEN: '@ecoconnect/user_token',
  USER_DATA: '@ecoconnect/user_data',
  OFFLINE_QUEUE: '@ecoconnect/offline_queue',
  CACHED_VENDORS: '@ecoconnect/cached_vendors',
  APP_PREFERENCES: '@ecoconnect/app_preferences',
};

// Waste type colors
export const WASTE_TYPE_COLORS = {
  organic: '#10b981',
  recyclable: '#3b82f6',
  hazardous: '#ef4444',
  electronic: '#f59e0b',
  medical: '#8b5cf6',
  other: '#6b7280',
};

// Achievement levels
export const ACHIEVEMENT_LEVELS = {
  BEGINNER: { min: 0, max: 100, name: 'Eco Beginner' },
  ENTHUSIAST: { min: 101, max: 500, name: 'Eco Enthusiast' },
  CHAMPION: { min: 501, max: 1000, name: 'Eco Champion' },
  HERO: { min: 1001, max: 5000, name: 'Eco Hero' },
  LEGEND: { min: 5001, max: Infinity, name: 'Eco Legend' },
};