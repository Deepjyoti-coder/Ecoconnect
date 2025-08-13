import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAuthStore } from '@/store/authStore';
import { Button, LoadingSpinner, Card } from '@/components/ui';
import { COLORS, FONT_SIZES, SPACING } from '@/utils/constants';
import { validateEmail } from '@/utils/validation';

export const EditProfileScreen: React.FC = () => {
  const navigation = useNavigation();
  const { user, userProfile, updateUserProfile } = useAuthStore();
  
  const [formData, setFormData] = useState({
    displayName: user?.displayName || '',
    email: user?.email || '',
    bio: '',
    location: '',
  });
  
  const [preferences, setPreferences] = useState({
    notifications: {
      achievements: userProfile?.preferences?.notifications?.achievements ?? true,
      challenges: userProfile?.preferences?.notifications?.challenges ?? true,
      reminders: userProfile?.preferences?.notifications?.reminders ?? true,
      marketing: userProfile?.preferences?.notifications?.marketing ?? false,
    },
    locationSharing: userProfile?.preferences?.locationSharing ?? true,
  });
  
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({
    displayName: '',
    email: '',
  });

  const validateForm = (): boolean => {
    let isValid = true;
    const newErrors = { displayName: '', email: '' };

    if (!formData.displayName.trim()) {
      newErrors.displayName = 'Name is required';
      isValid = false;
    } else if (formData.displayName.trim().length < 2) {
      newErrors.displayName = 'Name must be at least 2 characters';
      isValid = false;
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
      isValid = false;
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSave = async () => {
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      const updates = {
        displayName: formData.displayName.trim(),
        preferences: {
          ...preferences,
          cameraSettings: userProfile?.preferences?.cameraSettings || {
            quality: 'medium' as const,
            autoAnalyze: true,
            saveToGallery: false,
          },
        },
      };

      const success = await updateUserProfile(updates);
      
      if (success) {
        Alert.alert('Success', 'Profile updated successfully!', [
          { text: 'OK', onPress: () => navigation.goBack() }
        ]);
      } else {
        Alert.alert('Error', 'Failed to update profile. Please try again.');
      }
    } catch (error) {
      Alert.alert('Error', 'An unexpected error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const updateFormData = (field: keyof typeof formData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field as keyof typeof errors]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const toggleNotificationPreference = (key: keyof typeof preferences.notifications) => {
    setPreferences(prev => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [key]: !prev.notifications[key],
      },
    }));
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <LoadingSpinner text="Updating profile..." />
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={styles.content}>
        {/* Profile Picture Section */}
        <Card style={styles.avatarCard}>
          <Text style={styles.sectionTitle}>Profile Picture</Text>
          <View style={styles.avatarSection}>
            <View style={styles.avatarPlaceholder}>
              <Text style={styles.avatarText}>
                {formData.displayName?.charAt(0)?.toUpperCase() || 'U'}
              </Text>
            </View>
            <View style={styles.avatarActions}>
              <TouchableOpacity style={styles.avatarButton}>
                <Text style={styles.avatarButtonText}>📷 Change Photo</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.avatarButton}>
                <Text style={styles.avatarButtonText}>🗑️ Remove</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Card>

        {/* Basic Information */}
        <Card style={styles.formCard}>
          <Text style={styles.sectionTitle}>Basic Information</Text>
          
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Display Name</Text>
            <TextInput
              style={[styles.input, errors.displayName ? styles.inputError : null]}
              value={formData.displayName}
              onChangeText={(value) => updateFormData('displayName', value)}
              placeholder="Enter your display name"
              placeholderTextColor={COLORS.text.light}
            />
            {errors.displayName ? (
              <Text style={styles.errorText}>{errors.displayName}</Text>
            ) : null}
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Email</Text>
            <TextInput
              style={[styles.input, styles.inputDisabled]}
              value={formData.email}
              editable={false}
              placeholder="Email address"
              placeholderTextColor={COLORS.text.light}
            />
            <Text style={styles.helperText}>
              Email cannot be changed. Contact support if needed.
            </Text>
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Bio (Optional)</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              value={formData.bio}
              onChangeText={(value) => updateFormData('bio', value)}
              placeholder="Tell us about your eco journey..."
              placeholderTextColor={COLORS.text.light}
              multiline
              numberOfLines={3}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Location (Optional)</Text>
            <TextInput
              style={styles.input}
              value={formData.location}
              onChangeText={(value) => updateFormData('location', value)}
              placeholder="City, Country"
              placeholderTextColor={COLORS.text.light}
            />
          </View>
        </Card>

        {/* Notification Preferences */}
        <Card style={styles.preferencesCard}>
          <Text style={styles.sectionTitle}>Notification Preferences</Text>
          
          <View style={styles.preferenceItem}>
            <View style={styles.preferenceInfo}>
              <Text style={styles.preferenceLabel}>🏆 Achievements</Text>
              <Text style={styles.preferenceDescription}>
                Get notified when you earn badges and reach milestones
              </Text>
            </View>
            <TouchableOpacity
              style={[
                styles.toggle,
                preferences.notifications.achievements && styles.toggleActive
              ]}
              onPress={() => toggleNotificationPreference('achievements')}
            >
              <View style={[
                styles.toggleThumb,
                preferences.notifications.achievements && styles.toggleThumbActive
              ]} />
            </TouchableOpacity>
          </View>

          <View style={styles.preferenceItem}>
            <View style={styles.preferenceInfo}>
              <Text style={styles.preferenceLabel}>🎯 Challenges</Text>
              <Text style={styles.preferenceDescription}>
                Reminders about new challenges and deadlines
              </Text>
            </View>
            <TouchableOpacity
              style={[
                styles.toggle,
                preferences.notifications.challenges && styles.toggleActive
              ]}
              onPress={() => toggleNotificationPreference('challenges')}
            >
              <View style={[
                styles.toggleThumb,
                preferences.notifications.challenges && styles.toggleThumbActive
              ]} />
            </TouchableOpacity>
          </View>

          <View style={styles.preferenceItem}>
            <View style={styles.preferenceInfo}>
              <Text style={styles.preferenceLabel}>⏰ Reminders</Text>
              <Text style={styles.preferenceDescription}>
                Daily eco-tips and activity reminders
              </Text>
            </View>
            <TouchableOpacity
              style={[
                styles.toggle,
                preferences.notifications.reminders && styles.toggleActive
              ]}
              onPress={() => toggleNotificationPreference('reminders')}
            >
              <View style={[
                styles.toggleThumb,
                preferences.notifications.reminders && styles.toggleThumbActive
              ]} />
            </TouchableOpacity>
          </View>

          <View style={styles.preferenceItem}>
            <View style={styles.preferenceInfo}>
              <Text style={styles.preferenceLabel}>📢 Marketing</Text>
              <Text style={styles.preferenceDescription}>
                Updates about new features and eco-news
              </Text>
            </View>
            <TouchableOpacity
              style={[
                styles.toggle,
                preferences.notifications.marketing && styles.toggleActive
              ]}
              onPress={() => toggleNotificationPreference('marketing')}
            >
              <View style={[
                styles.toggleThumb,
                preferences.notifications.marketing && styles.toggleThumbActive
              ]} />
            </TouchableOpacity>
          </View>
        </Card>

        {/* Privacy Settings */}
        <Card style={styles.preferencesCard}>
          <Text style={styles.sectionTitle}>Privacy Settings</Text>
          
          <View style={styles.preferenceItem}>
            <View style={styles.preferenceInfo}>
              <Text style={styles.preferenceLabel}>📍 Location Sharing</Text>
              <Text style={styles.preferenceDescription}>
                Share your location to find nearby recycling centers
              </Text>
            </View>
            <TouchableOpacity
              style={[
                styles.toggle,
                preferences.locationSharing && styles.toggleActive
              ]}
              onPress={() => setPreferences(prev => ({
                ...prev,
                locationSharing: !prev.locationSharing
              }))}
            >
              <View style={[
                styles.toggleThumb,
                preferences.locationSharing && styles.toggleThumbActive
              ]} />
            </TouchableOpacity>
          </View>
        </Card>

        {/* Save Button */}
        <Button
          title="Save Changes"
          onPress={handleSave}
          style={styles.saveButton}
          disabled={isLoading}
        />
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
  content: {
    padding: SPACING.md,
  },
  sectionTitle: {
    fontSize: FONT_SIZES.lg,
    fontWeight: '600',
    color: COLORS.text.primary,
    marginBottom: SPACING.md,
  },
  avatarCard: {
    marginBottom: SPACING.lg,
  },
  avatarSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarPlaceholder: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: SPACING.md,
  },
  avatarText: {
    fontSize: FONT_SIZES.xxl,
    fontWeight: 'bold',
    color: 'white',
  },
  avatarActions: {
    flex: 1,
  },
  avatarButton: {
    backgroundColor: COLORS.background,
    padding: SPACING.sm,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: SPACING.xs,
  },
  avatarButtonText: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.text.primary,
    textAlign: 'center',
  },
  formCard: {
    marginBottom: SPACING.lg,
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
  inputDisabled: {
    backgroundColor: COLORS.background,
    color: COLORS.text.light,
  },
  textArea: {
    height: 80,
    textAlignVertical: 'top',
  },
  errorText: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.error,
    marginTop: SPACING.xs,
  },
  helperText: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.text.light,
    marginTop: SPACING.xs,
  },
  preferencesCard: {
    marginBottom: SPACING.lg,
  },
  preferenceItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: SPACING.sm,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  preferenceInfo: {
    flex: 1,
    marginRight: SPACING.md,
  },
  preferenceLabel: {
    fontSize: FONT_SIZES.md,
    fontWeight: '600',
    color: COLORS.text.primary,
    marginBottom: SPACING.xs,
  },
  preferenceDescription: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.text.secondary,
    lineHeight: 18,
  },
  toggle: {
    width: 50,
    height: 30,
    borderRadius: 15,
    backgroundColor: COLORS.border,
    padding: 2,
    justifyContent: 'center',
  },
  toggleActive: {
    backgroundColor: COLORS.primary,
  },
  toggleThumb: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  toggleThumbActive: {
    alignSelf: 'flex-end',
  },
  saveButton: {
    marginBottom: SPACING.lg,
  },
});