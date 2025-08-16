import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useAuthStore } from '@/store/authStore';
import { Button, LoadingSpinner } from '@/components/ui';
import { COLORS, SPACING, FONT_SIZES } from '@/utils/constants';
import { validateEmail } from '@/utils/validation';
import { isFirebaseConfigured } from '@/services/firebase';

interface SignUpScreenProps {
  onNavigateToLogin: () => void;
}

export const SignUpScreen: React.FC<SignUpScreenProps> = ({ onNavigateToLogin }) => {
  const [formData, setFormData] = useState({
    displayName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState({
    displayName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [acceptedTerms, setAcceptedTerms] = useState(false);

  const { signUp, signInWithGoogle, isLoading, error, clearError } = useAuthStore();

  const updateFormData = (field: keyof typeof formData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = (): boolean => {
    let isValid = true;
    const newErrors = {
      displayName: '',
      email: '',
      password: '',
      confirmPassword: '',
    };

    clearError();

    // Validate display name
    if (!formData.displayName.trim()) {
      newErrors.displayName = 'Name is required';
      isValid = false;
    } else if (formData.displayName.trim().length < 2) {
      newErrors.displayName = 'Name must be at least 2 characters';
      isValid = false;
    }

    // Validate email
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
      isValid = false;
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
      isValid = false;
    }

    // Validate password
    if (!formData.password) {
      newErrors.password = 'Password is required';
      isValid = false;
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
      isValid = false;
    }

    // Validate confirm password
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
      isValid = false;
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
      isValid = false;
    }

    // Check terms acceptance
    if (!acceptedTerms) {
      Alert.alert('Terms Required', 'Please accept the terms and conditions to continue.');
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSignUp = async () => {
    if (!validateForm()) return;

    const success = await signUp(
      formData.email.trim(),
      formData.password,
      formData.displayName.trim()
    );

    if (!success && error) {
      Alert.alert('Sign Up Failed', error);
    }
  };

  const handleGoogleSignUp = async () => {
    if (!acceptedTerms) {
      Alert.alert('Terms Required', 'Please accept the terms and conditions to continue.');
      return;
    }

    const success = await signInWithGoogle();
    if (!success && error) {
      Alert.alert('Google Sign Up Failed', error);
    }
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <LoadingSpinner text="Creating your account..." />
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <StatusBar style="dark" />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Demo Mode Notice */}
        {!isFirebaseConfigured && (
          <View style={styles.demoNotice}>
            <Text style={styles.demoNoticeText}>
              🚧 Demo Mode - Create any account to test the app
            </Text>
          </View>
        )}

        <View style={styles.header}>
          <Text style={styles.logo}>🌱</Text>
          <Text style={styles.title}>Join EcoConnect</Text>
          <Text style={styles.subtitle}>Start your sustainable journey today</Text>
        </View>

        <View style={styles.form}>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Full Name</Text>
            <TextInput
              style={[styles.input, errors.displayName ? styles.inputError : null]}
              value={formData.displayName}
              onChangeText={(value) => updateFormData('displayName', value)}
              placeholder="Enter your full name"
              placeholderTextColor={COLORS.text.light}
              autoCapitalize="words"
              autoCorrect={false}
            />
            {errors.displayName ? <Text style={styles.errorText}>{errors.displayName}</Text> : null}
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Email</Text>
            <TextInput
              style={[styles.input, errors.email ? styles.inputError : null]}
              value={formData.email}
              onChangeText={(value) => updateFormData('email', value)}
              placeholder="Enter your email"
              placeholderTextColor={COLORS.text.light}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
            />
            {errors.email ? <Text style={styles.errorText}>{errors.email}</Text> : null}
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Password</Text>
            <TextInput
              style={[styles.input, errors.password ? styles.inputError : null]}
              value={formData.password}
              onChangeText={(value) => updateFormData('password', value)}
              placeholder="Create a password"
              placeholderTextColor={COLORS.text.light}
              secureTextEntry
              autoCapitalize="none"
              autoCorrect={false}
            />
            {errors.password ? <Text style={styles.errorText}>{errors.password}</Text> : null}
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Confirm Password</Text>
            <TextInput
              style={[styles.input, errors.confirmPassword ? styles.inputError : null]}
              value={formData.confirmPassword}
              onChangeText={(value) => updateFormData('confirmPassword', value)}
              placeholder="Confirm your password"
              placeholderTextColor={COLORS.text.light}
              secureTextEntry
              autoCapitalize="none"
              autoCorrect={false}
            />
            {errors.confirmPassword ? <Text style={styles.errorText}>{errors.confirmPassword}</Text> : null}
          </View>

          <TouchableOpacity
            style={styles.termsContainer}
            onPress={() => setAcceptedTerms(!acceptedTerms)}
          >
            <View style={[styles.checkbox, acceptedTerms && styles.checkboxChecked]}>
              {acceptedTerms && <Text style={styles.checkmark}>✓</Text>}
            </View>
            <Text style={styles.termsText}>
              I agree to the{' '}
              <Text style={styles.termsLink}>Terms of Service</Text>
              {' '}and{' '}
              <Text style={styles.termsLink}>Privacy Policy</Text>
            </Text>
          </TouchableOpacity>

          <Button
            title="Create Account"
            onPress={handleSignUp}
            style={styles.signUpButton}
            disabled={isLoading}
          />

          <View style={styles.divider}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>or</Text>
            <View style={styles.dividerLine} />
          </View>

          <Button
            title="Continue with Google"
            onPress={handleGoogleSignUp}
            variant="outline"
            style={styles.googleButton}
            disabled={isLoading}
          />
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Already have an account? </Text>
          <TouchableOpacity onPress={onNavigateToLogin}>
            <Text style={styles.loginLink}>Sign In</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  loadingContainer: {
    flex: 1,
    backgroundColor: COLORS.background,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: SPACING.lg,
  },
  header: {
    alignItems: 'center',
    marginBottom: SPACING.xl,
  },
  logo: {
    fontSize: 64,
    marginBottom: SPACING.md,
  },
  title: {
    fontSize: FONT_SIZES.xxxl,
    fontWeight: 'bold',
    color: COLORS.text.primary,
    marginBottom: SPACING.xs,
  },
  subtitle: {
    fontSize: FONT_SIZES.md,
    color: COLORS.text.secondary,
    textAlign: 'center',
  },
  form: {
    marginBottom: SPACING.xl,
  },
  inputContainer: {
    marginBottom: SPACING.md,
  },
  label: {
    fontSize: FONT_SIZES.md,
    fontWeight: '600',
    color: COLORS.text.primary,
    marginBottom: SPACING.xs,
  },
  input: {
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 8,
    padding: SPACING.md,
    fontSize: FONT_SIZES.md,
    backgroundColor: COLORS.surface,
    color: COLORS.text.primary,
  },
  inputError: {
    borderColor: COLORS.error,
  },
  errorText: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.error,
    marginTop: SPACING.xs,
  },
  termsContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: SPACING.lg,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderColor: COLORS.border,
    borderRadius: 4,
    marginRight: SPACING.sm,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 2,
  },
  checkboxChecked: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  checkmark: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  termsText: {
    flex: 1,
    fontSize: FONT_SIZES.sm,
    color: COLORS.text.secondary,
    lineHeight: 20,
  },
  termsLink: {
    color: COLORS.primary,
    fontWeight: '600',
  },
  signUpButton: {
    marginBottom: SPACING.lg,
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.lg,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: COLORS.border,
  },
  dividerText: {
    marginHorizontal: SPACING.md,
    fontSize: FONT_SIZES.sm,
    color: COLORS.text.secondary,
  },
  googleButton: {
    borderColor: COLORS.border,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  footerText: {
    fontSize: FONT_SIZES.md,
    color: COLORS.text.secondary,
  },
  loginLink: {
    fontSize: FONT_SIZES.md,
    color: COLORS.primary,
    fontWeight: '600',
  },
});