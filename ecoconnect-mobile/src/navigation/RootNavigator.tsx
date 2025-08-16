import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { useAuthStore } from '@/store/authStore';
import { AuthNavigator } from './AuthNavigator';
import { AppNavigator } from './AppNavigator';
import { LoadingSpinner } from '@/components/ui';
import { View, StyleSheet } from 'react-native';
import { COLORS } from '@/utils/constants';

export const RootNavigator: React.FC = () => {
  const { isAuthenticated, isLoading } = useAuthStore();

  // Show loading screen while checking authentication
  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <LoadingSpinner text="Loading EcoConnect..." />
      </View>
    );
  }

  return (
    <NavigationContainer>
      {isAuthenticated ? <AppNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    backgroundColor: COLORS.background,
    justifyContent: 'center',
    alignItems: 'center',
  },
});