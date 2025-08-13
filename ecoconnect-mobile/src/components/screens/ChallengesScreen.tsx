import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  RefreshControl,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useAuthStore } from '@/store/authStore';
import { useChallengesStore } from '@/store/challengesStore';
import { Card, Button, LoadingSpinner } from '@/components/ui';
import { COLORS, FONT_SIZES, SPACING } from '@/utils/constants';
// import { formatDate } from '@/utils/helpers'; // Will be used for challenge dates
import { EcoChallenge, UserChallengeProgress } from '@/types';
import { AppStackParamList } from '@/navigation';

type ChallengesScreenNavigationProp = StackNavigationProp<AppStackParamList>;

type ChallengeFilter = 'all' | 'daily' | 'weekly' | 'monthly' | 'my_challenges';

export const ChallengesScreen: React.FC = () => {
  const navigation = useNavigation<ChallengesScreenNavigationProp>();
  const { user } = useAuthStore();
  const {
    challenges,
    userProgress,
    isLoading,
    error,
    loadChallenges,
    loadUserProgress,
    startChallenge,
    setSelectedChallenge,
  } = useChallengesStore();

  const [selectedFilter, setSelectedFilter] = useState<ChallengeFilter>('all');
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    loadData();
  }, [loadChallenges, loadUserProgress, user?.uid]);

  const loadData = async () => {
    await loadChallenges();
    if (user?.uid) {
      await loadUserProgress(user.uid);
    }
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await loadData();
    setRefreshing(false);
  };

  const handleStartChallenge = async (challenge: EcoChallenge) => {
    if (!user?.uid) return;

    const existingProgress = userProgress.find(p => p.challengeId === challenge.id);
    if (existingProgress) {
      Alert.alert('Already Started', 'You have already started this challenge!');
      return;
    }

    Alert.alert(
      'Start Challenge',
      `Are you ready to start "${challenge.title}"?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Start',
          onPress: async () => {
            const success = await startChallenge(user.uid, challenge.id);
            if (success) {
              Alert.alert('Success', 'Challenge started! Good luck!');
            } else {
              Alert.alert('Error', 'Failed to start challenge. Please try again.');
            }
          },
        },
      ]
    );
  };

  const handleChallengeDetails = (challenge: EcoChallenge) => {
    setSelectedChallenge(challenge);
    // navigation.navigate('ChallengeDetails', { challengeId: challenge.id });
    Alert.alert('Coming Soon', 'Challenge details will be available soon!');
  };

  const getFilteredChallenges = () => {
    switch (selectedFilter) {
      case 'daily':
        return challenges.filter(c => c.type === 'daily');
      case 'weekly':
        return challenges.filter(c => c.type === 'weekly');
      case 'monthly':
        return challenges.filter(c => c.type === 'monthly');
      case 'my_challenges':
        const myChallengeIds = userProgress.map(p => p.challengeId);
        return challenges.filter(c => myChallengeIds.includes(c.id));
      default:
        return challenges;
    }
  };

  const getChallengeProgress = (challengeId: string): UserChallengeProgress | undefined => {
    return userProgress.find(p => p.challengeId === challengeId);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return COLORS.success;
      case 'medium': return COLORS.accent;
      case 'hard': return COLORS.error;
      default: return COLORS.text.secondary;
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'waste': return '♻️';
      case 'energy': return '⚡';
      case 'water': return '💧';
      case 'transport': return '🚲';
      case 'lifestyle': return '🌱';
      default: return '🌍';
    }
  };

  const getProgressPercentage = (progress: UserChallengeProgress): number => {
    if (!progress.progress.length) return 0;
    const completedRequirements = progress.progress.filter(p => p.isCompleted).length;
    return (completedRequirements / progress.progress.length) * 100;
  };

  const filters = [
    { key: 'all' as const, label: 'All', icon: '🌍' },
    { key: 'daily' as const, label: 'Daily', icon: '📅' },
    { key: 'weekly' as const, label: 'Weekly', icon: '📊' },
    { key: 'monthly' as const, label: 'Monthly', icon: '🗓️' },
    { key: 'my_challenges' as const, label: 'My Challenges', icon: '👤' },
  ];

  if (isLoading && challenges.length === 0) {
    return (
      <View style={styles.loadingContainer}>
        <LoadingSpinner text="Loading challenges..." />
      </View>
    );
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
      }
    >
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>🎯 Eco Challenges</Text>
        <Text style={styles.subtitle}>Take on challenges and earn green points!</Text>
      </View>

      {/* Error Message */}
      {error && (
        <Card style={styles.errorCard}>
          <Text style={styles.errorText}>⚠️ {error}</Text>
        </Card>
      )}

      {/* Filter Tabs */}
      <Card style={styles.filterCard}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={styles.filterContainer}>
            {filters.map((filter) => (
              <TouchableOpacity
                key={filter.key}
                style={[
                  styles.filterButton,
                  selectedFilter === filter.key && styles.filterButtonActive
                ]}
                onPress={() => setSelectedFilter(filter.key)}
              >
                <Text style={styles.filterIcon}>{filter.icon}</Text>
                <Text style={[
                  styles.filterText,
                  selectedFilter === filter.key && styles.filterTextActive
                ]}>
                  {filter.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </Card>

      {/* Challenges List */}
      <View style={styles.challengesList}>
        {getFilteredChallenges().map((challenge) => {
          const progress = getChallengeProgress(challenge.id);
          const progressPercentage = progress ? getProgressPercentage(progress) : 0;

          return (
            <Card key={challenge.id} style={styles.challengeCard}>
              <TouchableOpacity
                onPress={() => handleChallengeDetails(challenge)}
                style={styles.challengeContent}
              >
                {/* Challenge Header */}
                <View style={styles.challengeHeader}>
                  <View style={styles.challengeInfo}>
                    <Text style={styles.challengeIcon}>{challenge.icon}</Text>
                    <View style={styles.challengeDetails}>
                      <Text style={styles.challengeTitle}>{challenge.title}</Text>
                      <Text style={styles.challengeDescription}>
                        {challenge.description}
                      </Text>
                    </View>
                  </View>
                  <View style={styles.challengeMeta}>
                    <Text style={styles.challengePoints}>+{challenge.pointsReward} pts</Text>
                    <Text style={[
                      styles.challengeDifficulty,
                      { color: getDifficultyColor(challenge.difficulty) }
                    ]}>
                      {challenge.difficulty.toUpperCase()}
                    </Text>
                  </View>
                </View>

                {/* Challenge Stats */}
                <View style={styles.challengeStats}>
                  <View style={styles.statItem}>
                    <Text style={styles.statIcon}>{getCategoryIcon(challenge.category)}</Text>
                    <Text style={styles.statLabel}>{challenge.category}</Text>
                  </View>
                  <View style={styles.statItem}>
                    <Text style={styles.statIcon}>👥</Text>
                    <Text style={styles.statLabel}>{challenge.participantCount}</Text>
                  </View>
                  <View style={styles.statItem}>
                    <Text style={styles.statIcon}>📈</Text>
                    <Text style={styles.statLabel}>
                      {Math.round(challenge.completionRate * 100)}% success
                    </Text>
                  </View>
                  <View style={styles.statItem}>
                    <Text style={styles.statIcon}>⏰</Text>
                    <Text style={styles.statLabel}>
                      {challenge.type}
                    </Text>
                  </View>
                </View>

                {/* Progress Bar (if started) */}
                {progress && (
                  <View style={styles.progressContainer}>
                    <View style={styles.progressHeader}>
                      <Text style={styles.progressLabel}>Progress</Text>
                      <Text style={styles.progressPercentage}>
                        {Math.round(progressPercentage)}%
                      </Text>
                    </View>
                    <View style={styles.progressBar}>
                      <View
                        style={[
                          styles.progressFill,
                          { width: `${progressPercentage}%` }
                        ]}
                      />
                    </View>
                    <Text style={styles.progressStatus}>
                      Status: {progress.status.replace('_', ' ').toUpperCase()}
                    </Text>
                  </View>
                )}

                {/* Requirements Preview */}
                <View style={styles.requirementsContainer}>
                  <Text style={styles.requirementsTitle}>Requirements:</Text>
                  {challenge.requirements.slice(0, 2).map((req, index) => (
                    <View key={req.id} style={styles.requirementItem}>
                      <Text style={styles.requirementBullet}>•</Text>
                      <Text style={styles.requirementText}>
                        {req.description}
                        {req.unit && ` (${req.target} ${req.unit})`}
                      </Text>
                    </View>
                  ))}
                  {challenge.requirements.length > 2 && (
                    <Text style={styles.moreRequirements}>
                      +{challenge.requirements.length - 2} more requirements
                    </Text>
                  )}
                </View>

                {/* Action Button */}
                <View style={styles.challengeActions}>
                  {progress ? (
                    <View style={styles.statusContainer}>
                      {progress.status === 'completed' ? (
                        <View style={styles.completedBadge}>
                          <Text style={styles.completedText}>✅ Completed</Text>
                          <Text style={styles.pointsEarned}>
                            +{progress.pointsEarned} points earned
                          </Text>
                        </View>
                      ) : (
                        <Button
                          title="View Progress"
                          onPress={() => handleChallengeDetails(challenge)}
                          variant="outline"
                          style={styles.progressButton}
                        />
                      )}
                    </View>
                  ) : (
                    <Button
                      title="Start Challenge"
                      onPress={() => handleStartChallenge(challenge)}
                      style={styles.startButton}
                    />
                  )}
                </View>
              </TouchableOpacity>
            </Card>
          );
        })}
      </View>

      {/* Empty State */}
      {getFilteredChallenges().length === 0 && (
        <Card style={styles.emptyCard}>
          <Text style={styles.emptyIcon}>🎯</Text>
          <Text style={styles.emptyTitle}>No Challenges Found</Text>
          <Text style={styles.emptyDescription}>
            {selectedFilter === 'my_challenges'
              ? "You haven't started any challenges yet. Start one above!"
              : "No challenges available for this filter. Try a different category."
            }
          </Text>
        </Card>
      )}
    </ScrollView>
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
  errorCard: {
    marginBottom: SPACING.lg,
    backgroundColor: COLORS.error + '10',
    borderColor: COLORS.error + '30',
    borderWidth: 1,
  },
  errorText: {
    fontSize: FONT_SIZES.md,
    color: COLORS.error,
    textAlign: 'center',
  },
  filterCard: {
    marginBottom: SPACING.lg,
    paddingVertical: SPACING.sm,
  },
  filterContainer: {
    flexDirection: 'row',
    paddingHorizontal: SPACING.sm,
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    marginRight: SPACING.sm,
    borderRadius: 20,
    backgroundColor: COLORS.background,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  filterButtonActive: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  filterIcon: {
    fontSize: 16,
    marginRight: SPACING.xs,
  },
  filterText: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.text.secondary,
    fontWeight: '600',
  },
  filterTextActive: {
    color: 'white',
  },
  challengesList: {
    gap: SPACING.md,
  },
  challengeCard: {
    marginBottom: SPACING.sm,
  },
  challengeContent: {
    padding: 0,
  },
  challengeHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: SPACING.md,
  },
  challengeInfo: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    flex: 1,
    marginRight: SPACING.md,
  },
  challengeIcon: {
    fontSize: 32,
    marginRight: SPACING.md,
  },
  challengeDetails: {
    flex: 1,
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
    lineHeight: 20,
  },
  challengeMeta: {
    alignItems: 'flex-end',
  },
  challengePoints: {
    fontSize: FONT_SIZES.md,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginBottom: SPACING.xs,
  },
  challengeDifficulty: {
    fontSize: FONT_SIZES.xs,
    fontWeight: '600',
  },
  challengeStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: SPACING.md,
    paddingVertical: SPACING.sm,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: COLORS.border,
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statIcon: {
    fontSize: 16,
    marginBottom: SPACING.xs,
  },
  statLabel: {
    fontSize: FONT_SIZES.xs,
    color: COLORS.text.secondary,
    textAlign: 'center',
  },
  progressContainer: {
    marginBottom: SPACING.md,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.xs,
  },
  progressLabel: {
    fontSize: FONT_SIZES.sm,
    fontWeight: '600',
    color: COLORS.text.primary,
  },
  progressPercentage: {
    fontSize: FONT_SIZES.sm,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  progressBar: {
    height: 8,
    backgroundColor: COLORS.border,
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: SPACING.xs,
  },
  progressFill: {
    height: '100%',
    backgroundColor: COLORS.primary,
    borderRadius: 4,
  },
  progressStatus: {
    fontSize: FONT_SIZES.xs,
    color: COLORS.text.secondary,
  },
  requirementsContainer: {
    marginBottom: SPACING.md,
  },
  requirementsTitle: {
    fontSize: FONT_SIZES.sm,
    fontWeight: '600',
    color: COLORS.text.primary,
    marginBottom: SPACING.xs,
  },
  requirementItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: SPACING.xs,
  },
  requirementBullet: {
    fontSize: FONT_SIZES.md,
    color: COLORS.primary,
    marginRight: SPACING.sm,
    marginTop: 2,
  },
  requirementText: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.text.secondary,
    flex: 1,
    lineHeight: 18,
  },
  moreRequirements: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.primary,
    fontStyle: 'italic',
    marginTop: SPACING.xs,
  },
  challengeActions: {
    marginTop: SPACING.sm,
  },
  statusContainer: {
    alignItems: 'center',
  },
  completedBadge: {
    alignItems: 'center',
    padding: SPACING.sm,
    backgroundColor: COLORS.success + '20',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.success + '40',
  },
  completedText: {
    fontSize: FONT_SIZES.md,
    fontWeight: '600',
    color: COLORS.success,
    marginBottom: SPACING.xs,
  },
  pointsEarned: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.success,
  },
  progressButton: {
    borderColor: COLORS.primary,
  },
  startButton: {
    backgroundColor: COLORS.primary,
  },
  emptyCard: {
    alignItems: 'center',
    padding: SPACING.xl,
    marginTop: SPACING.lg,
  },
  emptyIcon: {
    fontSize: 64,
    marginBottom: SPACING.md,
  },
  emptyTitle: {
    fontSize: FONT_SIZES.lg,
    fontWeight: '600',
    color: COLORS.text.primary,
    marginBottom: SPACING.sm,
  },
  emptyDescription: {
    fontSize: FONT_SIZES.md,
    color: COLORS.text.secondary,
    textAlign: 'center',
    lineHeight: 22,
  },
});