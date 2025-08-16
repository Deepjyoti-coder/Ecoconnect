import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { LoginScreen, SignUpScreen, ForgotPasswordScreen } from '@/components/screens/auth';
import { COLORS } from '@/utils/constants';

type AuthScreen = 'login' | 'signup' | 'forgot-password';

export const AuthNavigator: React.FC = () => {
  const [currentScreen, setCurrentScreen] = useState<AuthScreen>('login');

  const renderScreen = () => {
    switch (currentScreen) {
      case 'login':
        return (
          <LoginScreen
            onNavigateToSignUp={() => setCurrentScreen('signup')}
            onNavigateToForgotPassword={() => setCurrentScreen('forgot-password')}
          />
        );
      case 'signup':
        return (
          <SignUpScreen
            onNavigateToLogin={() => setCurrentScreen('login')}
          />
        );
      case 'forgot-password':
        return (
          <ForgotPasswordScreen
            onNavigateToLogin={() => setCurrentScreen('login')}
          />
        );
      default:
        return (
          <LoginScreen
            onNavigateToSignUp={() => setCurrentScreen('signup')}
            onNavigateToForgotPassword={() => setCurrentScreen('forgot-password')}
          />
        );
    }
  };

  return (
    <View style={styles.container}>
      {renderScreen()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
});