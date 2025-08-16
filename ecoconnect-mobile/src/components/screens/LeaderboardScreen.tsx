import React, { useState } from 'react';
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
import { Card } from '@/components/ui';
import { COLORS, FONT_SIZES, SPACING } from '@/utils/constants';
import { formatPoints } from '@/utils/helpers';
import { AppStackParamList } from '@/navigation';

// Mock leaderboard data
const mockLeaderboardData = [
  {
    id: '1',
    name: 'Sarah Green',
    points: 2450,
    level: 15,
    avatar: null,
    rank: 1,
    weeklyPoints: 320,
    achievements: 12,
  },
  {
    id: '2',
    name: 'Mike Eco',
    points: 2180,
    level: 14,
    avatar: null,
    rank: 2,
    weeklyPoints: 280,
    achievements: 10,
  },
  {
    id: '3',
    name: 'Emma Nature',
    points: 1950,
    level: 13,
    avatar: null,
    rank: 3,
    weeklyPoints: 250,
    achievements: 9,
  },
  {
    id: '4',
    name: 'John Recycle',
    points: 1720,
    level: 12,
    avatar: null,
    rank: 4,
    weeklyPoints: 200,
    achievements: 8,
  },
  {
    id: '5',
    name: 'Lisa Planet',
    points: 1580,
    level: 11,
    avatar: null,
    rank: 5,
    weeklyPoints: 180,
    achievements: 7,
  },
];

type LeaderboardPeriod = 'weekly' | 'monthly' | 'allTime';
type LeaderboardScreenNavigationProp = StackNavigationProp<AppStackParamList>;

export const LeaderboardScreen: React.FC = () => {
  const navigation = useNavigation<LeaderboardScreenNavigationProp>();
  const { user, userProfile } = useAuthStore();
  const [selectedPeriod, setSelectedPeriod] = useState<LeaderboardPeriod>('weekly');

  const currentUserRank = 8; // Mock current user rank
  const currentUserData = {
    name: user?.displayName || 'You',
    points: userProfile?.greenPoints || 0,
    level: userProfile?.level || 1,
    weeklyPoints: 150,
    achievements: 5,
  };

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1: return '🥇';
      case 2: return '🥈';
      case 3: return '🥉';
      default: return `#${rank}`;
    }
  };

  const getRankColor = (rank: number) => {
    switch (rank) {
      case 1: return '#FFD700'; // Gold
      case 2: return '#C0C0C0'; // Silver
      case 3: return '#CD7F32'; // Bronze
      default: return COLORS.text.secondary;
    }
  };

  const periods = [
    { key: 'weekly' as const, label: 'This Week' },
    { key: 'monthly' as const, label: 'This Month' },
    { key: 'allTime' as const, label: 'All Time' },
  ];

  const handleUserPress = (userId: string, userName: string) => {
    if (userId === user?.uid) {
      navigation.navigate('MainTabs', { screen: 'Profile' });
    } else {
      Alert.alert(
        'User Profile',
        `View ${userName}'s profile?`,
        [
          { text: 'Cancel', style: 'cancel' },
          { 
            text: 'View Profile', 
            onPress: () => navigation.navigate('UserProfile', { userId })
          }
        ]
      );
    }
  };

  const handleViewMyRank = () => {
    navigation.navigate('MainTabs', { screen: 'Profile' });
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>🏆 Leaderboard</Text>
        <Text style={styles.subtitle}>See how you rank among eco-warriors</Text>
      </View>

      {/* Period Selector */}
      <Card style={styles.periodCard}>
        <View style={styles.periodSelector}>
          {periods.map((period) => (
            <TouchableOpacity
              key={period.key}
              style={[
                styles.periodButton,
                selectedPeriod === period.key && styles.periodButtonActive
              ]}
              onPress={() => setSelectedPeriod(period.key)}
            >
              <Text style={[
                styles.periodButtonText,
                selectedPeriod === period.key && styles.periodButtonTextActive
              ]}>
                {period.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </Card>

      {/* Top 3 Podium */}
      <Card style={styles.podiumCard}>
        <Text style={styles.sectionTitle}>🎖️ Top Performers</Text>
        <View style={styles.podium}>
          {/* Second Place */}
          {mockLeaderboardData[1] && (
            <View style={[styles.podiumPosition, styles.secondPlace]}>
              <View style={styles.podiumAvatar}>
                <Text style={styles.podiumAvatarText}>
                  {mockLeaderboardData[1].name.charAt(0)}
                </Text>
              </View>
              <Text style={styles.podiumRank}>🥈</Text>
              <Text style={styles.podiumName}>{mockLeaderboardData[1].name}</Text>
              <Text style={styles.podiumPoints}>
                {formatPoints(mockLeaderboardData[1].points)}
              </Text>
            </View>
          )}

          {/* First Place */}
          {mockLeaderboardData[0] && (
            <View style={[styles.podiumPosition, styles.firstPlace]}>
              <View style={styles.podiumAvatar}>
                <Text style={styles.podiumAvatarText}>
                  {mockLeaderboardData[0].name.charAt(0)}
                </Text>
              </View>
              <Text style={styles.podiumRank}>🥇</Text>
              <Text style={styles.podiumName}>{mockLeaderboardData[0].name}</Text>
              <Text style={styles.podiumPoints}>
                {formatPoints(mockLeaderboardData[0].points)}
              </Text>
            </View>
          )}

          {/* Third Place */}
          {mockLeaderboardData[2] && (
            <View style={[styles.podiumPosition, styles.thirdPlace]}>
              <View style={styles.podiumAvatar}>
                <Text style={styles.podiumAvatarText}>
                  {mockLeaderboardData[2].name.charAt(0)}
                </Text>
              </View>
              <Text style={styles.podiumRank}>🥉</Text>
              <Text style={styles.podiumName}>{mockLeaderboardData[2].name}</Text>
              <Text style={styles.podiumPoints}>
                {formatPoints(mockLeaderboardData[2].points)}
              </Text>
            </View>
          )}
        </View>
      </Card>

      {/* Your Rank */}
      <Card style={styles.userRankCard}>
        <Text style={styles.sectionTitle}>Your Ranking</Text>
        <TouchableOpacity 
          style={styles.userRankItem}
          onPress={handleViewMyRank}
        >
          <View style={styles.rankBadge}>
            <Text style={styles.rankNumber}>#{currentUserRank}</Text>
          </View>
          <View style={styles.userAvatar}>
            <Text style={styles.userAvatarText}>
              {currentUserData.name.charAt(0).toUpperCase()}
            </Text>
          </View>
          <View style={styles.userInfo}>
            <Text style={styles.userName}>{currentUserData.name}</Text>
            <Text style={styles.userLevel}>Level {currentUserData.level}</Text>
          </View>
          <View style={styles.userStats}>
            <Text style={styles.userPoints}>
              {formatPoints(currentUserData.points)}
            </Text>
            <Text style={styles.userWeeklyPoints}>
              +{currentUserData.weeklyPoints} this week
            </Text>
          </View>
        </TouchableOpacity>
      </Card>

      {/* Full Leaderboard */}
      <Card style={styles.leaderboardCard}>
        <Text style={styles.sectionTitle}>📊 Full Rankings</Text>
        <View style={styles.leaderboardList}>
          {mockLeaderboardData.map((user) => (
            <TouchableOpacity 
              key={user.id} 
              style={styles.leaderboardItem}
              onPress={() => handleUserPress(user.id, user.name)}
            >
              <View style={styles.rankContainer}>
                <Text style={[
                  styles.rankText,
                  { color: getRankColor(user.rank) }
                ]}>
                  {getRankIcon(user.rank)}
                </Text>
              </View>
              <View style={styles.userAvatarSmall}>
                <Text style={styles.userAvatarTextSmall}>
                  {user.name.charAt(0)}
                </Text>
              </View>
              <View style={styles.userInfoSmall}>
                <Text style={styles.userNameSmall}>{user.name}</Text>
                <Text style={styles.userLevelSmall}>Level {user.level}</Text>
              </View>
              <View style={styles.userStatsSmall}>
                <Text style={styles.userPointsSmall}>
                  {formatPoints(user.points)}
                </Text>
                <Text style={styles.userWeeklyPointsSmall}>
                  +{user.weeklyPoints}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </Card>

      {/* Community Stats */}
      <Card style={styles.communityCard}>
        <Text style={styles.sectionTitle}>🌍 Community Impact</Text>
        <View style={styles.communityStats}>
          <View style={styles.communityStat}>
            <Text style={styles.communityStatIcon}>👥</Text>
            <Text style={styles.communityStatValue}>1,247</Text>
            <Text style={styles.communityStatLabel}>Active Users</Text>
          </View>
          <View style={styles.communityStat}>
            <Text style={styles.communityStatIcon}>♻️</Text>
            <Text style={styles.communityStatValue}>15.2K</Text>
            <Text style={styles.communityStatLabel}>Items Recycled</Text>
          </View>
          <View style={styles.communityStat}>
            <Text style={styles.communityStatIcon}>🌳</Text>
            <Text style={styles.communityStatValue}>2.8K</Text>
            <Text style={styles.communityStatLabel}>Trees Saved</Text>
          </View>
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
    alignItems: 'center',
  },
  title: {
    fontSize: FONT_SIZES.xxl,
    fontWeight: 'bold',
    color: COLORS.text.primary,
    marginBottom: SPACING.xs,
  },
  subtitle: {
    fontSize: FONT_SIZES.md,
    color: COLORS.text.secondary,
    textAlign: 'center',
  },
  periodCard: {
    marginBottom: SPACING.lg,
  },
  periodSelector: {
    flexDirection: 'row',
    backgroundColor: COLORS.background,
    borderRadius: 8,
    padding: SPACING.xs,
  },
  periodButton: {
    flex: 1,
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.md,
    borderRadius: 6,
    alignItems: 'center',
  },
  periodButtonActive: {
    backgroundColor: COLORS.primary,
  },
  periodButtonText: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.text.secondary,
    fontWeight: '600',
  },
  periodButtonTextActive: {
    color: 'white',
  },
  podiumCard: {
    marginBottom: SPACING.lg,
  },
  sectionTitle: {
    fontSize: FONT_SIZES.lg,
    fontWeight: '600',
    color: COLORS.text.primary,
    marginBottom: SPACING.md,
  },
  podium: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
    height: 200,
  },
  podiumPosition: {
    alignItems: 'center',
    marginHorizontal: SPACING.sm,
    flex: 1,
  },
  firstPlace: {
    marginBottom: 0,
  },
  secondPlace: {
    marginBottom: 20,
  },
  thirdPlace: {
    marginBottom: 40,
  },
  podiumAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: SPACING.sm,
  },
  podiumAvatarText: {
    fontSize: FONT_SIZES.lg,
    fontWeight: 'bold',
    color: 'white',
  },
  podiumRank: {
    fontSize: 32,
    marginBottom: SPACING.xs,
  },
  podiumName: {
    fontSize: FONT_SIZES.sm,
    fontWeight: '600',
    color: COLORS.text.primary,
    textAlign: 'center',
    marginBottom: SPACING.xs,
  },
  podiumPoints: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.primary,
    fontWeight: 'bold',
  },
  userRankCard: {
    marginBottom: SPACING.lg,
    backgroundColor: COLORS.primary + '10',
    borderColor: COLORS.primary + '30',
    borderWidth: 1,
  },
  userRankItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rankBadge: {
    backgroundColor: COLORS.primary,
    borderRadius: 20,
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: SPACING.md,
  },
  rankNumber: {
    fontSize: FONT_SIZES.sm,
    fontWeight: 'bold',
    color: 'white',
  },
  userAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: SPACING.md,
  },
  userAvatarText: {
    fontSize: FONT_SIZES.md,
    fontWeight: 'bold',
    color: 'white',
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: FONT_SIZES.md,
    fontWeight: '600',
    color: COLORS.text.primary,
    marginBottom: SPACING.xs,
  },
  userLevel: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.text.secondary,
  },
  userStats: {
    alignItems: 'flex-end',
  },
  userPoints: {
    fontSize: FONT_SIZES.md,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginBottom: SPACING.xs,
  },
  userWeeklyPoints: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.success,
  },
  leaderboardCard: {
    marginBottom: SPACING.lg,
  },
  leaderboardList: {
    gap: SPACING.sm,
  },
  leaderboardItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: SPACING.sm,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  rankContainer: {
    width: 40,
    alignItems: 'center',
    marginRight: SPACING.sm,
  },
  rankText: {
    fontSize: FONT_SIZES.md,
    fontWeight: 'bold',
  },
  userAvatarSmall: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: SPACING.md,
  },
  userAvatarTextSmall: {
    fontSize: FONT_SIZES.sm,
    fontWeight: 'bold',
    color: 'white',
  },
  userInfoSmall: {
    flex: 1,
  },
  userNameSmall: {
    fontSize: FONT_SIZES.md,
    fontWeight: '600',
    color: COLORS.text.primary,
    marginBottom: SPACING.xs,
  },
  userLevelSmall: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.text.secondary,
  },
  userStatsSmall: {
    alignItems: 'flex-end',
  },
  userPointsSmall: {
    fontSize: FONT_SIZES.sm,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginBottom: SPACING.xs,
  },
  userWeeklyPointsSmall: {
    fontSize: FONT_SIZES.xs,
    color: COLORS.success,
  },
  communityCard: {
    marginBottom: SPACING.lg,
  },
  communityStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  communityStat: {
    alignItems: 'center',
    flex: 1,
  },
  communityStatIcon: {
    fontSize: 32,
    marginBottom: SPACING.xs,
  },
  communityStatValue: {
    fontSize: FONT_SIZES.lg,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginBottom: SPACING.xs,
  },
  communityStatLabel: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.text.secondary,
    textAlign: 'center',
  },
});