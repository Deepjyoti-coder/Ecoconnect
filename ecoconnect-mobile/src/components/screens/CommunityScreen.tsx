import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
  RefreshControl,
  TextInput,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useAuthStore } from '@/store/authStore';
import { useCommunityStore } from '@/store/communityStore';
import { Card, Button, LoadingSpinner } from '@/components/ui';
import { COLORS, FONT_SIZES, SPACING } from '@/utils/constants';
import { formatDate, formatTime } from '@/utils/helpers';
import { CommunityPost } from '@/types';
import { AppStackParamList } from '@/navigation';

type CommunityScreenNavigationProp = StackNavigationProp<AppStackParamList>;

export const CommunityScreen: React.FC = () => {
  const navigation = useNavigation<CommunityScreenNavigationProp>();
  const { user } = useAuthStore();
  const {
    posts,
    isLoading,
    error,
    loadPosts,
    likePost,
    unlikePost,
    reportPost,
  } = useCommunityStore();

  const [refreshing, setRefreshing] = useState(false);
  const [newPostText, setNewPostText] = useState('');
  const [showCreatePost, setShowCreatePost] = useState(false);

  useEffect(() => {
    loadData();
  }, [loadPosts]);

  const loadData = async () => {
    await loadPosts();
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await loadData();
    setRefreshing(false);
  };

  const handleLikePost = async (post: CommunityPost) => {
    if (!user?.uid) return;

    const isLiked = post.likes.includes(user.uid);
    if (isLiked) {
      await unlikePost(post.id, user.uid);
    } else {
      await likePost(post.id, user.uid);
    }
  };

  const handleCommentPost = (post: CommunityPost) => {
    // navigation.navigate('PostDetails', { postId: post.id });
    Alert.alert('Coming Soon', 'Comments feature will be available soon!');
  };

  const handleReportPost = (post: CommunityPost) => {
    Alert.alert(
      'Report Post',
      'Why are you reporting this post?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Spam', onPress: () => reportPost(post.id, 'spam') },
        { text: 'Inappropriate', onPress: () => reportPost(post.id, 'inappropriate') },
        { text: 'Misleading', onPress: () => reportPost(post.id, 'misleading') },
      ]
    );
  };

  const handleCreatePost = () => {
    if (!newPostText.trim()) {
      Alert.alert('Error', 'Please enter some text for your post.');
      return;
    }

    Alert.alert('Coming Soon', 'Post creation will be available soon!');
    setNewPostText('');
    setShowCreatePost(false);
  };

  const getPostTypeIcon = (type: string) => {
    switch (type) {
      case 'recycling': return '♻️';
      case 'energy_saving': return '⚡';
      case 'water_conservation': return '💧';
      case 'sustainable_transport': return '🚲';
      case 'eco_lifestyle': return '🌱';
      case 'challenge_completion': return '🏆';
      default: return '🌍';
    }
  };

  const getTimeSince = (date: Date): string => {
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    if (diffInHours < 168) return `${Math.floor(diffInHours / 24)}d ago`;
    return formatDate(date);
  };

  if (isLoading && posts.length === 0) {
    return (
      <View style={styles.loadingContainer}>
        <LoadingSpinner text="Loading community feed..." />
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
        <Text style={styles.title}>🌍 Community Feed</Text>
        <Text style={styles.subtitle}>Share your eco-journey with others</Text>
      </View>

      {/* Error Message */}
      {error && (
        <Card style={styles.errorCard}>
          <Text style={styles.errorText}>⚠️ {error}</Text>
        </Card>
      )}

      {/* Create Post Section */}
      <Card style={styles.createPostCard}>
        <TouchableOpacity 
          style={styles.createPostButton}
          onPress={() => setShowCreatePost(!showCreatePost)}
        >
          <View style={styles.createPostHeader}>
            <View style={styles.userAvatar}>
              <Text style={styles.userAvatarText}>
                {user?.displayName?.charAt(0)?.toUpperCase() || 'U'}
              </Text>
            </View>
            <Text style={styles.createPostText}>
              Share your eco-action with the community...
            </Text>
          </View>
        </TouchableOpacity>

        {showCreatePost && (
          <View style={styles.createPostForm}>
            <TextInput
              style={styles.postInput}
              value={newPostText}
              onChangeText={setNewPostText}
              placeholder="What eco-friendly action did you take today?"
              placeholderTextColor={COLORS.text.light}
              multiline
              numberOfLines={3}
            />
            <View style={styles.createPostActions}>
              <TouchableOpacity style={styles.addPhotoButton}>
                <Text style={styles.addPhotoText}>📷 Add Photo</Text>
              </TouchableOpacity>
              <View style={styles.postButtons}>
                <Button
                  title="Cancel"
                  onPress={() => {
                    setShowCreatePost(false);
                    setNewPostText('');
                  }}
                  variant="outline"
                  size="small"
                />
                <Button
                  title="Post"
                  onPress={handleCreatePost}
                  size="small"
                  style={styles.postButton}
                />
              </View>
            </View>
          </View>
        )}
      </Card>

      {/* Posts Feed */}
      <View style={styles.postsContainer}>
        {posts.map((post) => (
          <Card key={post.id} style={styles.postCard}>
            {/* Post Header */}
            <View style={styles.postHeader}>
              <View style={styles.postUserInfo}>
                <View style={styles.postUserAvatar}>
                  <Text style={styles.postUserAvatarText}>
                    {post.userName.charAt(0).toUpperCase()}
                  </Text>
                </View>
                <View style={styles.postUserDetails}>
                  <Text style={styles.postUserName}>{post.userName}</Text>
                  <Text style={styles.postTime}>{getTimeSince(post.createdAt)}</Text>
                </View>
              </View>
              <TouchableOpacity 
                style={styles.postMenuButton}
                onPress={() => handleReportPost(post)}
              >
                <Text style={styles.postMenuIcon}>⋯</Text>
              </TouchableOpacity>
            </View>

            {/* Post Content */}
            <View style={styles.postContent}>
              <View style={styles.postTypeContainer}>
                <Text style={styles.postTypeIcon}>{getPostTypeIcon(post.type)}</Text>
                <Text style={styles.postTypeText}>{post.type.replace('_', ' ')}</Text>
              </View>
              <Text style={styles.postText}>{post.content}</Text>
              
              {post.imageUrl && (
                <View style={styles.postImageContainer}>
                  <Image source={{ uri: post.imageUrl }} style={styles.postImage} />
                </View>
              )}

              {post.pointsEarned > 0 && (
                <View style={styles.pointsBadge}>
                  <Text style={styles.pointsText}>+{post.pointsEarned} Green Points</Text>
                </View>
              )}
            </View>

            {/* Post Actions */}
            <View style={styles.postActions}>
              <TouchableOpacity 
                style={styles.actionButton}
                onPress={() => handleLikePost(post)}
              >
                <Text style={[
                  styles.actionIcon,
                  { color: post.likes.includes(user?.uid || '') ? COLORS.error : COLORS.text.secondary }
                ]}>
                  {post.likes.includes(user?.uid || '') ? '❤️' : '🤍'}
                </Text>
                <Text style={styles.actionText}>{post.likes.length}</Text>
              </TouchableOpacity>

              <TouchableOpacity 
                style={styles.actionButton}
                onPress={() => handleCommentPost(post)}
              >
                <Text style={styles.actionIcon}>💬</Text>
                <Text style={styles.actionText}>{post.comments.length}</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.actionButton}>
                <Text style={styles.actionIcon}>📤</Text>
                <Text style={styles.actionText}>Share</Text>
              </TouchableOpacity>
            </View>

            {/* Recent Comments Preview */}
            {post.comments.length > 0 && (
              <View style={styles.commentsPreview}>
                <Text style={styles.commentsTitle}>Recent comments:</Text>
                {post.comments.slice(0, 2).map((comment, index) => (
                  <View key={index} style={styles.commentItem}>
                    <Text style={styles.commentUser}>{comment.userName}</Text>
                    <Text style={styles.commentText}>{comment.content}</Text>
                  </View>
                ))}
                {post.comments.length > 2 && (
                  <TouchableOpacity onPress={() => handleCommentPost(post)}>
                    <Text style={styles.viewAllComments}>
                      View all {post.comments.length} comments
                    </Text>
                  </TouchableOpacity>
                )}
              </View>
            )}
          </Card>
        ))}
      </View>

      {/* Empty State */}
      {posts.length === 0 && !isLoading && (
        <Card style={styles.emptyCard}>
          <Text style={styles.emptyIcon}>🌍</Text>
          <Text style={styles.emptyTitle}>No Posts Yet</Text>
          <Text style={styles.emptyDescription}>
            Be the first to share your eco-friendly actions with the community!
          </Text>
          <Button
            title="Create First Post"
            onPress={() => setShowCreatePost(true)}
            style={styles.createFirstPostButton}
          />
        </Card>
      )}
    </ScrollView>
  );
};