import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { COLORS, SPACING } from '@/utils/constants';

interface CardProps {
  children: React.ReactNode;
  style?: ViewStyle;
  padding?: keyof typeof SPACING;
}

export const Card: React.FC<CardProps> = ({ 
  children, 
  style, 
  padding = 'md' 
}) => {
  return (
    <View style={[styles.card, { padding: SPACING[padding] }, style]}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.surface,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
});