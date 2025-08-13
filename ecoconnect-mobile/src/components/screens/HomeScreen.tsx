import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { useAuthStore } from '@/store/authStore';
import { Card, Button } from '@/components/ui';

import { COLORS, FONT_SIZES, SPACING } from '@/utils/constants';
import { AppStackParamList } from '@/navigation';

type HomeScreenNavigationProp = StackNavigationProp<AppStackParamList> & BottomTabNavigationProp<any>;

export const HomeScreen: React.FC = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const { user, userProfile } = useAuthStore();

  const handleNavigateToVendors = () => {
    navigation.navigate('Vendors');
  };

  const handleNavigateToChallenges = () => {
    navigation.navigate('Challenges');
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.greeting}>
          Hello, {user?.displayName || 'Eco Warrior'}! 👋
        </Text>
        <Text style={styles.subtitle}>Ready to make a difference today?</Text>
      </View>

      {/* Stats Cards */}
      <View style={styles.statsContainer}>
        <Card style={styles.statCard}>
          <Text style={styles.statNumber}>{userProfile?.greenPoints || 0}</Text>
          <Text style={styles.statLabel}>Green Points</Text>
        </Card>
        <Card style={styles.statCard}>
          <Text style={styles.statNumber}>{userProfile?.level || 1}</Text>
          <Text style={styles.statLabel}>Level</Text>
        </Card>
        <Card style={styles.statCard}>
          <Text style={styles.statNumber}>{userProfile?.carbonOffset || 0}</Text>
          <Text style={styles.statLabel}>CO₂ Saved</Text>
        </Card>
      </View>

      {/* Quick Actions */}
      <Card style={styles.quickActionsCard}>
        <Text style={styles.sectionTitle}>Quick Actions</Text>
        <View style={styles.quickActions}>
          <TouchableOpacity 
            style={styles.quickAction}
            onPress={() => navigation.navigate('MainTabs', { screen: 'Camera' })}
            accessibilityLabel="Scan waste with camera"
            accessibilityHint="Opens camera to scan and classify waste items"
          >
            <Text style={styles.quickActionIcon}>📷</Text>
            <Text style={styles.quickActionText}>Scan Waste</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.quickAction} 
            onPress={handleNavigateToVendors}
            accessibilityLabel="Find recycling centers"
            accessibilityHint="Opens map to find nearby recycling centers"
          >
            <Text style={styles.quickActionIcon}>🗺️</Text>
            <Text style={styles.quickActionText}>Find Centers</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.quickAction} 
            onPress={handleNavigateToChallenges}
            accessibilityLabel="View eco challenges"
            accessibilityHint="Opens challenges screen to participate in eco activities"
          >
            <Text style={styles.quickActionIcon}>🎯</Text>
            <Text style={styles.quickActionText}>Challenges</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.quickAction}
            accessibilityLabel="Learn about recycling"
            accessibilityHint="Opens learning resources about waste management"
          >
            <Text style={styles.quickActionIcon}>📚</Text>
            <Text style={styles.quickActionText}>Learn</Text>
          </TouchableOpacity>
        </View>
      </Card>

      {/* Today's Challenge */}
      <Card style={styles.challengeCard}>
        <Text style={styles.sectionTitle}>Today's Challenge</Text>
        <Text style={styles.challengeTitle}>🌱 Plastic-Free Day</Text>
        <Text style={styles.challengeDescription}>
          Avoid single-use plastics for the entire day and earn 50 green points!
        </Text>
        <Button
          title="Accept Challenge"
          onPress={handleNavigateToChallenges}
          style={styles.challengeButton}
        />
      </Card>

      {/* Recent Activity */}
      <Card style={styles.activityCard}>
        <Text style={styles.sectionTitle}>Recent Activity</Text>
        <View style={styles.activityItem}>
          <Text style={styles.activityIcon}>♻️</Text>
          <View style={styles.activityContent}>
            <Text style={styles.activityText}>Recycled plastic bottle</Text>
            <Text style={styles.activityTime}>2 hours ago</Text>
          </View>
          <Text style={styles.activityPoints}>+15 pts</Text>
        </View>
        <View style={styles.activityItem}>
          <Text style={styles.activityIcon}>🌿</Text>
          <View style={styles.activityContent}>
            <Text style={styles.activityText}>Completed eco-challenge</Text>
            <Text style={styles.activityTime}>Yesterday</Text>
          </View>
          <Text style={styles.activityPoints}>+25 pts</Text>
        </View>
      </Card>


    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  content: {
    padding: SPACING.md,
  },
  header: {
    marginBottom: SPACING.lg,
  },
  greeting: {
    fontSize: FONT_SIZES.xxl,
    fontWeight: 'bold',
    color: COLORS.text.primary,
    marginBottom: SPACING.xs,
  },
  subtitle: {
    fontSize: FONT_SIZES.md,
    color: COLORS.text.secondary,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: SPACING.lg,
  },
  statCard: {
    flex: 1,
    alignItems: 'center',
    marginHorizontal: SPACING.xs,
    padding: SPACING.md,
  },
  statNumber: {
    fontSize: FONT_SIZES.xl,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginBottom: SPACING.xs,
  },
  statLabel: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.text.secondary,
    textAlign: 'center',
  },
  quickActionsCard: {
    marginBottom: SPACING.lg,
  },
  sectionTitle: {
    fontSize: FONT_SIZES.lg,
    fontWeight: '600',
    color: COLORS.text.primary,
    marginBottom: SPACING.md,
  },
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  quickAction: {
    alignItems: 'center',
    flex: 1,
  },
  quickActionIcon: {
    fontSize: 32,
    marginBottom: SPACING.xs,
  },
  quickActionText: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.text.secondary,
    textAlign: 'center',
  },
  challengeCard: {
    marginBottom: SPACING.lg,
    backgroundColor: COLORS.primary + '10',
    borderColor: COLORS.primary + '30',
    borderWidth: 1,
  },
  challengeTitle: {
    fontSize: FONT_SIZES.lg,
    fontWeight: '600',
    color: COLORS.text.primary,
    marginBottom: SPACING.xs,
  },
  challengeDescription: {
    fontSize: FONT_SIZES.md,
    color: COLORS.text.secondary,
    marginBottom: SPACING.md,
    lineHeight: 20,
  },
  challengeButton: {
    alignSelf: 'flex-start',
  },
  activityCard: {
    marginBottom: SPACING.lg,
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: SPACING.sm,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  activityIcon: {
    fontSize: 24,
    marginRight: SPACING.md,
  },
  activityContent: {
    flex: 1,
  },
  activityText: {
    fontSize: FONT_SIZES.md,
    color: COLORS.text.primary,
    marginBottom: SPACING.xs,
  },
  activityTime: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.text.light,
  },
  activityPoints: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.primary,
    fontWeight: '600',
  },
});