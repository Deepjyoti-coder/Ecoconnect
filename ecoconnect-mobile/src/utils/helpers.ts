import { ACHIEVEMENT_LEVELS, WASTE_TYPE_COLORS } from './constants';
import { WasteType } from '@/types';

/**
 * Format points with appropriate suffix (K, M, etc.)
 */
export const formatPoints = (points: number): string => {
  if (points >= 1000000) {
    return `${(points / 1000000).toFixed(1)}M`;
  }
  if (points >= 1000) {
    return `${(points / 1000).toFixed(1)}K`;
  }
  return points.toString();
};

/**
 * Get user level based on points
 */
export const getUserLevel = (points: number): string => {
  for (const [, level] of Object.entries(ACHIEVEMENT_LEVELS)) {
    if (points >= level.min && points <= level.max) {
      return level.name;
    }
  }
  return ACHIEVEMENT_LEVELS.BEGINNER.name;
};

/**
 * Get color for waste type
 */
export const getWasteTypeColor = (wasteType: WasteType): string => {
  return WASTE_TYPE_COLORS[wasteType] || WASTE_TYPE_COLORS.other;
};

/**
 * Calculate distance between two coordinates
 */
export const calculateDistance = (
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number => {
  const R = 6371; // Radius of the Earth in kilometers
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) *
      Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = R * c; // Distance in kilometers
  return d;
};

const deg2rad = (deg: number): number => {
  return deg * (Math.PI / 180);
};

/**
 * Format distance for display
 */
export const formatDistance = (distance: number): string => {
  if (distance < 1) {
    return `${Math.round(distance * 1000)}m`;
  }
  return `${distance.toFixed(1)}km`;
};

/**
 * Generate unique ID
 */
export const generateId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

/**
 * Debounce function
 */
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

/**
 * Format date for display
 */
export const formatDate = (date: Date): string => {
  return new Intl.DateTimeFormat('en-IN', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(date);
};

/**
 * Format time for display
 */
export const formatTime = (date: Date): string => {
  return new Intl.DateTimeFormat('en-IN', {
    hour: '2-digit',
    minute: '2-digit',
  }).format(date);
};