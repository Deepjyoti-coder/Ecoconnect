import { z } from 'zod';

// User validation schemas
export const userSchema = z.object({
  email: z.string().email('Invalid email address'),
  displayName: z.string().min(2, 'Name must be at least 2 characters'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
});

// Vendor rating schema
export const vendorRatingSchema = z.object({
  rating: z.number().min(1).max(5),
  comment: z.string().optional(),
});

// Profile update schema
export const profileUpdateSchema = z.object({
  displayName: z.string().min(2, 'Name must be at least 2 characters'),
  photoURL: z.string().url().optional(),
});

// Notification preferences schema
export const notificationPreferencesSchema = z.object({
  achievements: z.boolean(),
  challenges: z.boolean(),
  reminders: z.boolean(),
  marketing: z.boolean(),
});

// Camera settings schema
export const cameraSettingsSchema = z.object({
  quality: z.enum(['low', 'medium', 'high']),
  autoAnalyze: z.boolean(),
  saveToGallery: z.boolean(),
});

// Validation helper functions
export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePhoneNumber = (phone: string): boolean => {
  const phoneRegex = /^[+]?[1-9][\d\s\-\(\)]{7,15}$/;
  return phoneRegex.test(phone);
};

export const validateImageUri = (uri: string): boolean => {
  const imageRegex = /\.(jpg|jpeg|png|gif|webp)$/i;
  return imageRegex.test(uri) || uri.startsWith('data:image/');
};