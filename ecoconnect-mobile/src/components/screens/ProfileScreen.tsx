import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  Image,
  Alert 
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useAuthStore } from '@/store/authStore';
import { Card, Button } from '@/components/ui';
import { COLORS, FONT_SIZES, SPACING } from '@/utils/constants';
import { formatPoints, getUserLevel, formatDate } from '@/utils/helpers';
import { AppStackParamList } from '@/navigation';

type ProfileScreenNavigationProp = StackNavigationProp<AppStackParamList>;

export const ProfileScreen: React.FC = () => {
  const navigation = useNavigation<ProfileScreenNavigationProp>();
  const { user, userProfile, signOut } = useAuthStore();

  const handleEditProfile = () => {
    navigation.navigate('EditProfile');
  };

  const handleSettings = () => {
    // navigation.navigate('Settings');
    Alert.alert('Coming Soon', 'Settings will be available soon!');
  };

  const handleSignOut = () => {
    Alert.alert(
      'Sign Out',
      'Are you sure you want to sign out?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Sign Out', 
          style: 'destructive',
          onPress: () => signOut()
        }
      ]
    );
  };

  const achievements = [
    { id: '1', name: 'First Steps', description: 'Completed first eco-action', icon: '🌱', earned: true },
    { id: '2', name: 'Recycling Hero', description: 'Recycled 10 items', icon: '♻️', earned: true },
    { id: '3', name: 'Challenge Master', description: 'Completed 5 challenges', icon: '🏆', earned: false },
    { id: '4', name: 'Eco Warrior', description: 'Reached 1000 green points', icon: '⚡', earned: false },
  ];

  const stats = [
    { label: 'Green Points', value: formatPoints(userProfile?.greenPoints || 0), icon: '💚' },
    { label: 'Level', value: userProfile?.level?.toString() || '1', icon: '📊' },
    { label: 'CO₂ Saved', value: `${userProfile?.carbonOffset || 0} kg`, icon: '🌍' },
    { label: 'Challenges', value: '3', icon: '🎯' },
  ];

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Profile Header */}
      <Card style={styles.profileCard}>
        <View style={styles.profileHeader}>
          <View style={styles.avatarContainer}>
            {user?.photoURL ? (
              <Image source={{ uri: user.photoURL }} style={styles.avatar} />
            ) : (
              <View style={styles.avatarPlaceholder}>
                <Text style={styles.avatarText}>
                  {user?.displayName?.charAt(0)?.toUpperCase() || 'U'}
                </Text>
              </View>
            )}
            <TouchableOpacity style={styles.editAvatarButton}>
              <Text style={styles.editAvatarIcon}>📷</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.profileInfo}>
            <Text style={styles.displayName}>{user?.displayName || 'Eco Warrior'}</Text>
            <Text style={styles.email}>{user?.email}</Text>
            <Text style={styles.userLevel}>{getUserLevel(userProfile?.greenPoints || 0)}</Text>
            <Text style={styles.joinDate}>
              Joined {formatDate(userProfile?.joinDate || new Date())}
            </Text>
          </View>
        </View>
        <Button
          title="Edit Profile"
          onPress={handleEditProfile}
          variant="outline"
          style={styles.editButton}
        />
      </Card>

      {/* Stats Grid */}
      <View style={styles.statsContainer}>
        {stats.map((stat, index) => (
          <Card key={index} style={styles.statCard}>
            <Text style={styles.statIcon}>{stat.icon}</Text>
            <Text style={styles.statValue}>{stat.value}</Text>
            <Text style={styles.statLabel}>{stat.label}</Text>
          </Card>
        ))}
      </View>

      {/* Environmental Impact */}
      <Card style={styles.impactCard}>
        <Text style={styles.sectionTitle}>🌍 Environmental Impact</Text>
        <View style={styles.impactItem}>
          <Text style={styles.impactIcon}>🌳</Text>
          <View style={styles.impactContent}>
            <Text style={styles.impactValue}>2.5 trees</Text>
            <Text style={styles.impactLabel}>equivalent CO₂ saved</Text>
          </View>
        </View>
        <View style={styles.impactItem}>
          <Text style={styles.impactIcon}>💧</Text>
          <View style={styles.impactContent}>
            <Text style={styles.impactValue}>150 liters</Text>
            <Text style={styles.impactLabel}>water saved through recycling</Text>
          </View>
        </View>
        <View style={styles.impactItem}>
          <Text style={styles.impactIcon}>⚡</Text>
          <View style={styles.impactContent}>
            <Text style={styles.impactValue}>45 kWh</Text>
            <Text style={styles.impactLabel}>energy saved</Text>
          </View>
        </View>
      </Card>

      {/* Achievements */}
      <Card style={styles.achievementsCard}>
        <Text style={styles.sectionTitle}>🏆 Achievements</Text>
        <View style={styles.achievementsList}>
          {achievements.map((achievement) => (
            <View key={achievement.id} style={[
              styles.achievementItem,
              !achievement.earned && styles.achievementLocked
            ]}>
              <Text style={[
                styles.achievementIcon,
                !achievement.earned && styles.achievementIconLocked
              ]}>
                {achievement.icon}
              </Text>
              <View style={styles.achievementContent}>
                <Text style={[
                  styles.achievementName,
                  !achievement.earned && styles.achievementTextLocked
                ]}>
                  {achievement.name}
                </Text>
                <Text style={[
                  styles.achievementDescription,
                  !achievement.earned && styles.achievementTextLocked
                ]}>
                  {achievement.description}
                </Text>
              </View>
              {achievement.earned && (
                <Text style={styles.achievementCheck}>✓</Text>
              )}
            </View>
          ))}
        </View>
      </Card>

      {/* Recent Activity */}
      <Card style={styles.activityCard}>
        <Text style={styles.sectionTitle}>📈 Recent Activity</Text>
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
        <View style={styles.activityItem}>
          <Text style={styles.activityIcon}>📚</Text>
          <View style={styles.activityContent}>
            <Text style={styles.activityText}>Read sustainability article</Text>
            <Text style={styles.activityTime}>2 days ago</Text>
          </View>
          <Text style={styles.activityPoints}>+5 pts</Text>
        </View>
      </Card>

      {/* Settings & Actions */}
      <Card style={styles.actionsCard}>
        <TouchableOpacity style={styles.actionItem} onPress={handleSettings}>
          <Text style={styles.actionIcon}>⚙️</Text>
          <Text style={styles.actionText}>Settings</Text>
          <Text style={styles.actionArrow}>›</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionItem}>
          <Text style={styles.actionIcon}>🔔</Text>
          <Text style={styles.actionText}>Notifications</Text>
          <Text style={styles.actionArrow}>›</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionItem}>
          <Text style={styles.actionIcon}>❓</Text>
          <Text style={styles.actionText}>Help & Support</Text>
          <Text style={styles.actionArrow}>›</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionItem}>
          <Text style={styles.actionIcon}>📄</Text>
          <Text style={styles.actionText}>Privacy Policy</Text>
          <Text style={styles.actionArrow}>›</Text>
        </TouchableOpacity>
      </Card>

      {/* Sign Out Button */}
      <Button
        title="Sign Out"
        onPress={handleSignOut}
        variant="outline"
        style={styles.signOutButton}
      />
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
  profileCard: {
    marginBottom: SPACING.lg,
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  avatarContainer: {
    position: 'relative',
    marginRight: SPACING.md,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  avatarPlaceholder: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    fontSize: FONT_SIZES.xxl,
    fontWeight: 'bold',
    color: 'white',
  },
  editAvatarButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: COLORS.surface,
    borderRadius: 15,
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: COLORS.border,
  },
  editAvatarIcon: {
    fontSize: 14,
  },
  profileInfo: {
    flex: 1,
  },
  displayName: {
    fontSize: FONT_SIZES.xl,
    fontWeight: 'bold',
    color: COLORS.text.primary,
    marginBottom: SPACING.xs,
  },
  email: {
    fontSize: FONT_SIZES.md,
    color: COLORS.text.secondary,
    marginBottom: SPACING.xs,
  },
  userLevel: {
    fontSize: FONT_SIZES.md,
    color: COLORS.primary,
    fontWeight: '600',
    marginBottom: SPACING.xs,
  },
  joinDate: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.text.light,
  },
  editButton: {
    alignSelf: 'flex-start',
  },
  statsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: SPACING.lg,
  },
  statCard: {
    width: '48%',
    alignItems: 'center',
    padding: SPACING.md,
    marginBottom: SPACING.sm,
  },
  statIcon: {
    fontSize: 32,
    marginBottom: SPACING.xs,
  },
  statValue: {
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
  impactCard: {
    marginBottom: SPACING.lg,
  },
  sectionTitle: {
    fontSize: FONT_SIZES.lg,
    fontWeight: '600',
    color: COLORS.text.primary,
    marginBottom: SPACING.md,
  },
  impactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: SPACING.sm,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  impactIcon: {
    fontSize: 24,
    marginRight: SPACING.md,
  },
  impactContent: {
    flex: 1,
  },
  impactValue: {
    fontSize: FONT_SIZES.md,
    fontWeight: '600',
    color: COLORS.text.primary,
    marginBottom: SPACING.xs,
  },
  impactLabel: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.text.secondary,
  },
  achievementsCard: {
    marginBottom: SPACING.lg,
  },
  achievementsList: {
    gap: SPACING.sm,
  },
  achievementItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: SPACING.sm,
    backgroundColor: COLORS.background,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  achievementLocked: {
    opacity: 0.5,
  },
  achievementIcon: {
    fontSize: 24,
    marginRight: SPACING.md,
  },
  achievementIconLocked: {
    opacity: 0.5,
  },
  achievementContent: {
    flex: 1,
  },
  achievementName: {
    fontSize: FONT_SIZES.md,
    fontWeight: '600',
    color: COLORS.text.primary,
    marginBottom: SPACING.xs,
  },
  achievementDescription: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.text.secondary,
  },
  achievementTextLocked: {
    opacity: 0.7,
  },
  achievementCheck: {
    fontSize: 20,
    color: COLORS.success,
    fontWeight: 'bold',
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
  actionsCard: {
    marginBottom: SPACING.lg,
  },
  actionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: SPACING.md,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  actionIcon: {
    fontSize: 24,
    marginRight: SPACING.md,
  },
  actionText: {
    flex: 1,
    fontSize: FONT_SIZES.md,
    color: COLORS.text.primary,
  },
  actionArrow: {
    fontSize: 20,
    color: COLORS.text.light,
  },
  signOutButton: {
    marginBottom: SPACING.lg,
    borderColor: COLORS.error,
  },
});