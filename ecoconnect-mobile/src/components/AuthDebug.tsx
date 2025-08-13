import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useAuthStore } from '@/store/authStore';
import { COLORS, SPACING, FONT_SIZES } from '@/utils/constants';

export const AuthDebug: React.FC = () => {
  const { signUp, signIn, signOut, user, isAuthenticated, isLoading, error } = useAuthStore();
  const [testResult, setTestResult] = useState<string>('');

  const testSignUp = async () => {
    setTestResult('Testing signup...');
    const success = await signUp('test@example.com', 'password123', 'Test User');
    setTestResult(success ? 'Signup successful!' : `Signup failed: ${error}`);
  };

  const testSignIn = async () => {
    setTestResult('Testing signin...');
    const success = await signIn('test@example.com', 'password123');
    setTestResult(success ? 'Signin successful!' : `Signin failed: ${error}`);
  };

  const testSignOut = async () => {
    setTestResult('Testing signout...');
    await signOut();
    setTestResult('Signout completed');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Auth Debug Panel</Text>
      
      <Text style={styles.status}>
        Status: {isLoading ? 'Loading...' : isAuthenticated ? 'Authenticated' : 'Not Authenticated'}
      </Text>
      
      {user && (
        <Text style={styles.user}>
          User: {user.email} ({user.displayName})
        </Text>
      )}
      
      {error && (
        <Text style={styles.error}>Error: {error}</Text>
      )}
      
      <Text style={styles.result}>{testResult}</Text>
      
      <TouchableOpacity style={styles.button} onPress={testSignUp}>
        <Text style={styles.buttonText}>Test Sign Up</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.button} onPress={testSignIn}>
        <Text style={styles.buttonText}>Test Sign In</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.button} onPress={testSignOut}>
        <Text style={styles.buttonText}>Test Sign Out</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: SPACING.lg,
    backgroundColor: COLORS.background,
  },
  title: {
    fontSize: FONT_SIZES.xl,
    fontWeight: 'bold',
    marginBottom: SPACING.lg,
    textAlign: 'center',
  },
  status: {
    fontSize: FONT_SIZES.md,
    marginBottom: SPACING.sm,
  },
  user: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.primary,
    marginBottom: SPACING.sm,
  },
  error: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.error,
    marginBottom: SPACING.sm,
  },
  result: {
    fontSize: FONT_SIZES.sm,
    marginBottom: SPACING.lg,
    fontStyle: 'italic',
  },
  button: {
    backgroundColor: COLORS.primary,
    padding: SPACING.md,
    borderRadius: 8,
    marginBottom: SPACING.sm,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: '600',
  },
});