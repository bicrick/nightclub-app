import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  RefreshControl, 
  Pressable,
  Image,
  TextInput,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ComponentProps } from '../types';
import { colors } from '../styles/colors';
import { spacing } from '../styles/spacing';
import { typography } from '../styles/typography';
import { borderRadius } from '../styles/spacing';
import { 
  mockFriends,
  mockFriendRequests,
  getActiveFriends,
  getCloseFriends,
  getFriendsCurrentlyOut,
  getFriendsPlanning,
  getRecentActivity,
  getPendingFriendRequests,
  formatLastActivity,
  getStatusDisplay,
  getActivityTypeDisplay,
  Friend,
  FriendRequest,
  FriendActivity
} from '../utils/mockFriendsData';

interface Props extends ComponentProps {}

export const FriendsScreen: React.FC<Props> = () => {
  const [refreshing, setRefreshing] = useState(false);
  const [activeTab, setActiveTab] = useState<'activity' | 'friends' | 'requests'>('activity');
  const [searchQuery, setSearchQuery] = useState('');

  const activeFriends = getActiveFriends();
  const closeFriends = getCloseFriends();
  const friendsOut = getFriendsCurrentlyOut();
  const friendsPlanning = getFriendsPlanning();
  const recentActivity = getRecentActivity();
  const pendingRequests = getPendingFriendRequests();

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    // Simulate API call
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }, []);

  const handleFriendPress = (friend: Friend) => {
    console.log('View friend profile:', friend.name);
    // TODO: Navigate to friend profile screen
  };

  const handleJoinEvent = (friend: Friend) => {
    console.log('Ask to join event with:', friend.name);
    // TODO: Implement join event functionality
  };

  const handleInviteFriend = (friend: Friend) => {
    console.log('Invite friend:', friend.name);
    // TODO: Navigate to create invitation screen
  };

  const handleAcceptRequest = (request: FriendRequest) => {
    console.log('Accept friend request from:', request.fromUserName);
    // TODO: Implement accept friend request
  };

  const handleDeclineRequest = (request: FriendRequest) => {
    console.log('Decline friend request from:', request.fromUserName);
    // TODO: Implement decline friend request
  };

  const FriendActivityCard: React.FC<{ activity: any }> = ({ activity }) => {
    const activityDisplay = getActivityTypeDisplay(activity.type.replace('_event', '').replace('_venue', '').replace('_group', '_event') as any);
    
    return (
      <Pressable style={styles.activityCard}>
        <View style={styles.activityHeader}>
          <View style={styles.friendInfo}>
            {activity.friendAvatar ? (
              <Image source={{ uri: activity.friendAvatar }} style={styles.activityAvatar} />
            ) : (
              <View style={styles.activityAvatarPlaceholder}>
                <Text style={styles.activityAvatarText}>
                  {activity.friendName.charAt(0).toUpperCase()}
                </Text>
              </View>
            )}
            <View style={styles.activityText}>
              <Text style={styles.activityUserName}>{activity.friendName}</Text>
              <View style={styles.activityTypeRow}>
                <Ionicons 
                  name={activityDisplay.icon as any} 
                  size={14} 
                  color={colors.accent} 
                />
                <Text style={styles.activityType}>{activityDisplay.text}</Text>
                <Text style={styles.activityTime}>
                  {formatLastActivity(activity.timestamp)}
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Activity Content */}
        <View style={styles.activityContent}>
          {activity.venueName && (
            <View style={styles.venueInfo}>
              <Ionicons name="location" size={16} color={colors.textSecondary} />
              <Text style={styles.venueName}>{activity.venueName}</Text>
            </View>
          )}
          
          {activity.eventTitle && (
            <Text style={styles.eventTitle}>{activity.eventTitle}</Text>
          )}
          
          {activity.message && (
            <Text style={styles.activityMessage}>"{activity.message}"</Text>
          )}
          
          {activity.rating && (
            <View style={styles.ratingRow}>
              {[...Array(5)].map((_, i) => (
                <Ionicons
                  key={i}
                  name={i < activity.rating ? "star" : "star-outline"}
                  size={14}
                  color={i < activity.rating ? colors.warning : colors.textMuted}
                />
              ))}
            </View>
          )}
        </View>

        {/* Quick Actions */}
        <View style={styles.activityActions}>
          <Pressable style={styles.activityActionButton}>
            <Ionicons name="chatbubble" size={16} color={colors.textSecondary} />
            <Text style={styles.activityActionText}>Comment</Text>
          </Pressable>
          <Pressable style={styles.activityActionButton}>
            <Ionicons name="person-add" size={16} color={colors.accent} />
            <Text style={styles.activityActionText}>Ask to Join</Text>
          </Pressable>
        </View>
      </Pressable>
    );
  };

  const FriendListItem: React.FC<{ friend: Friend }> = ({ friend }) => {
    const statusInfo = getStatusDisplay(friend);
    
    return (
      <Pressable 
        style={styles.friendItem}
        onPress={() => handleFriendPress(friend)}
      >
        <View style={styles.friendItemContent}>
          <View style={styles.friendAvatarContainer}>
            {friend.avatar ? (
              <Image source={{ uri: friend.avatar }} style={styles.friendAvatar} />
            ) : (
              <View style={styles.friendAvatarPlaceholder}>
                <Text style={styles.friendAvatarText}>
                  {friend.name.charAt(0).toUpperCase()}
                </Text>
              </View>
            )}
            {/* Status indicator */}
            <View style={[
              styles.friendStatusIndicator,
              { backgroundColor: statusInfo.color }
            ]} />
          </View>
          
          <View style={styles.friendDetails}>
            <View style={styles.friendNameRow}>
              <Text style={styles.friendName}>{friend.name}</Text>
              {friend.isClose && (
                <Ionicons name="heart" size={14} color={colors.error} />
              )}
            </View>
            <Text style={styles.friendUsername}>{friend.username}</Text>
            <Text style={[styles.friendStatus, { color: statusInfo.color }]}>
              {statusInfo.text}
            </Text>
          </View>
        </View>

        {/* Action Buttons */}
        <View style={styles.friendActions}>
          {friend.status === 'planning' && friend.upcomingPlans && (
            <Pressable 
              style={styles.joinButton}
              onPress={() => handleJoinEvent(friend)}
            >
              <Text style={styles.joinButtonText}>Ask to Join</Text>
            </Pressable>
          )}
          <Pressable 
            style={styles.inviteButton}
            onPress={() => handleInviteFriend(friend)}
          >
            <Ionicons name="send" size={16} color={colors.accent} />
          </Pressable>
        </View>
      </Pressable>
    );
  };

  const FriendRequestItem: React.FC<{ request: FriendRequest }> = ({ request }) => (
    <View style={styles.requestItem}>
      <View style={styles.requestContent}>
        {request.fromUserAvatar ? (
          <Image source={{ uri: request.fromUserAvatar }} style={styles.requestAvatar} />
        ) : (
          <View style={styles.requestAvatarPlaceholder}>
            <Text style={styles.requestAvatarText}>
              {request.fromUserName.charAt(0).toUpperCase()}
            </Text>
          </View>
        )}
        
        <View style={styles.requestDetails}>
          <Text style={styles.requestName}>{request.fromUserName}</Text>
          <Text style={styles.requestMutual}>
            {request.mutualFriends} mutual friends
          </Text>
          <Text style={styles.requestTime}>
            {formatLastActivity(request.requestedAt)}
          </Text>
        </View>
      </View>

      <View style={styles.requestActions}>
        <Pressable 
          style={styles.acceptButton}
          onPress={() => handleAcceptRequest(request)}
        >
          <Text style={styles.acceptButtonText}>Accept</Text>
        </Pressable>
        <Pressable 
          style={styles.declineButton}
          onPress={() => handleDeclineRequest(request)}
        >
          <Text style={styles.declineButtonText}>Decline</Text>
        </Pressable>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Friends</Text>
        <View style={styles.headerActions}>
          <Pressable style={styles.searchButton}>
            <Ionicons name="search" size={24} color={colors.text} />
          </Pressable>
          <Pressable style={styles.addFriendButton}>
            <Ionicons name="person-add" size={24} color={colors.text} />
          </Pressable>
        </View>
      </View>

      {/* Tab Navigation */}
      <View style={styles.tabContainer}>
        <Pressable 
          style={[
            styles.tab,
            activeTab === 'activity' && styles.activeTab
          ]}
          onPress={() => setActiveTab('activity')}
        >
          <Text style={[
            styles.tabText,
            activeTab === 'activity' && styles.activeTabText
          ]}>
            Activity
          </Text>
        </Pressable>

        <Pressable 
          style={[
            styles.tab,
            activeTab === 'friends' && styles.activeTab
          ]}
          onPress={() => setActiveTab('friends')}
        >
          <Text style={[
            styles.tabText,
            activeTab === 'friends' && styles.activeTabText
          ]}>
            Friends
          </Text>
          <View style={styles.tabBadge}>
            <Text style={styles.tabBadgeText}>{mockFriends.length}</Text>
          </View>
        </Pressable>

        <Pressable 
          style={[
            styles.tab,
            activeTab === 'requests' && styles.activeTab
          ]}
          onPress={() => setActiveTab('requests')}
        >
          <Text style={[
            styles.tabText,
            activeTab === 'requests' && styles.activeTabText
          ]}>
            Requests
          </Text>
          {pendingRequests.length > 0 && (
            <View style={styles.tabBadge}>
              <Text style={styles.tabBadgeText}>{pendingRequests.length}</Text>
            </View>
          )}
        </Pressable>
      </View>

      {/* Content */}
      <ScrollView 
        style={styles.content}
        refreshControl={
          <RefreshControl 
            refreshing={refreshing} 
            onRefresh={onRefresh}
            tintColor={colors.accent}
          />
        }
        showsVerticalScrollIndicator={false}
      >
        {activeTab === 'activity' && (
          <View style={styles.section}>
            {/* Quick Stats */}
            <View style={styles.quickStats}>
              <View style={styles.statCard}>
                <Ionicons name="people" size={20} color={colors.success} />
                <Text style={styles.statNumber}>{activeFriends.length}</Text>
                <Text style={styles.statLabel}>Online</Text>
              </View>
              <View style={styles.statCard}>
                <Ionicons name="location" size={20} color={colors.accent} />
                <Text style={styles.statNumber}>{friendsOut.length}</Text>
                <Text style={styles.statLabel}>Out Now</Text>
              </View>
              <View style={styles.statCard}>
                <Ionicons name="calendar" size={20} color={colors.warning} />
                <Text style={styles.statNumber}>{friendsPlanning.length}</Text>
                <Text style={styles.statLabel}>Planning</Text>
              </View>
            </View>

            {/* Activity Feed */}
            <View style={styles.activityFeed}>
              <Text style={styles.sectionHeader}>Recent Activity</Text>
              {recentActivity.map((activity) => (
                <FriendActivityCard key={activity.id} activity={activity} />
              ))}
            </View>
          </View>
        )}

        {activeTab === 'friends' && (
          <View style={styles.section}>
            {/* Close Friends */}
            {closeFriends.length > 0 && (
              <>
                <Text style={styles.sectionHeader}>Close Friends</Text>
                {closeFriends.map((friend) => (
                  <FriendListItem key={friend.id} friend={friend} />
                ))}
              </>
            )}

            {/* All Friends */}
            <Text style={styles.sectionHeader}>All Friends</Text>
            {mockFriends.map((friend) => (
              <FriendListItem key={friend.id} friend={friend} />
            ))}
          </View>
        )}

        {activeTab === 'requests' && (
          <View style={styles.section}>
            {pendingRequests.length > 0 ? (
              <>
                <Text style={styles.sectionHeader}>Friend Requests</Text>
                {pendingRequests.map((request) => (
                  <FriendRequestItem key={request.id} request={request} />
                ))}
              </>
            ) : (
              <View style={styles.emptyState}>
                <Ionicons name="people-outline" size={64} color={colors.textMuted} />
                <Text style={styles.emptyTitle}>No Friend Requests</Text>
                <Text style={styles.emptyDescription}>
                  When people send you friend requests, they'll appear here.
                </Text>
              </View>
            )}
          </View>
        )}

        {/* Bottom spacing for tab bar */}
        <View style={styles.bottomSpacing} />
      </ScrollView>

      {/* Floating Action Button */}
      <Pressable style={styles.fab}>
        <Ionicons name="person-add" size={24} color={colors.text} />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingTop: spacing.xl,
    paddingBottom: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  title: {
    ...typography.largeTitle,
  },
  headerActions: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  searchButton: {
    padding: spacing.xs,
  },
  addFriendButton: {
    padding: spacing.xs,
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: colors.backgroundCard,
    marginHorizontal: spacing.md,
    marginTop: spacing.md,
    borderRadius: borderRadius.sm,
    padding: spacing.xs,
  },
  tab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.sm,
    gap: spacing.xs,
  },
  activeTab: {
    backgroundColor: colors.accent,
  },
  tabText: {
    ...typography.body,
    color: colors.textSecondary,
    fontWeight: '600',
  },
  activeTabText: {
    color: colors.text,
  },
  tabBadge: {
    backgroundColor: colors.error,
    borderRadius: spacing.sm,
    minWidth: spacing.md,
    height: spacing.md,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.xs,
  },
  tabBadgeText: {
    ...typography.small,
    color: colors.text,
    fontWeight: '600',
  },
  content: {
    flex: 1,
    paddingHorizontal: spacing.md,
  },
  section: {
    paddingTop: spacing.md,
  },
  quickStats: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginBottom: spacing.lg,
  },
  statCard: {
    flex: 1,
    backgroundColor: colors.backgroundCard,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    alignItems: 'center',
    gap: spacing.xs,
  },
  statNumber: {
    ...typography.headline,
    color: colors.accent,
  },
  statLabel: {
    ...typography.small,
    color: colors.textSecondary,
  },
  sectionHeader: {
    ...typography.headline,
    color: colors.text,
    fontWeight: '700',
    marginBottom: spacing.md,
    marginTop: spacing.lg,
  },
  activityFeed: {
    gap: spacing.sm,
  },
  activityCard: {
    backgroundColor: colors.backgroundCard,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  activityHeader: {
    marginBottom: spacing.sm,
  },
  friendInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  activityAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: spacing.sm,
  },
  activityAvatarPlaceholder: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.accent,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.sm,
  },
  activityAvatarText: {
    ...typography.body,
    color: colors.text,
    fontWeight: '600',
  },
  activityText: {
    flex: 1,
  },
  activityUserName: {
    ...typography.body,
    fontWeight: '600',
    marginBottom: spacing.xs,
  },
  activityTypeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  activityType: {
    ...typography.caption,
    color: colors.accent,
    fontWeight: '600',
  },
  activityTime: {
    ...typography.caption,
    color: colors.textMuted,
  },
  activityContent: {
    marginBottom: spacing.sm,
  },
  venueInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    marginBottom: spacing.xs,
  },
  venueName: {
    ...typography.body,
    color: colors.textSecondary,
  },
  eventTitle: {
    ...typography.body,
    fontWeight: '600',
    marginBottom: spacing.xs,
  },
  activityMessage: {
    ...typography.body,
    fontStyle: 'italic',
    color: colors.textSecondary,
    marginBottom: spacing.xs,
  },
  ratingRow: {
    flexDirection: 'row',
    gap: spacing.xs,
  },
  activityActions: {
    flexDirection: 'row',
    gap: spacing.md,
    paddingTop: spacing.sm,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  activityActionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    paddingVertical: spacing.xs,
  },
  activityActionText: {
    ...typography.caption,
    color: colors.textSecondary,
  },
  friendItem: {
    backgroundColor: colors.backgroundCard,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    marginBottom: spacing.sm,
    borderWidth: 1,
    borderColor: colors.border,
  },
  friendItemContent: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  friendAvatarContainer: {
    position: 'relative',
    marginRight: spacing.sm,
  },
  friendAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  friendAvatarPlaceholder: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: colors.accent,
    alignItems: 'center',
    justifyContent: 'center',
  },
  friendAvatarText: {
    ...typography.body,
    color: colors.text,
    fontWeight: '600',
  },
  friendStatusIndicator: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    width: 12,
    height: 12,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: colors.backgroundCard,
  },
  friendDetails: {
    flex: 1,
  },
  friendNameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    marginBottom: spacing.xs,
  },
  friendName: {
    ...typography.body,
    fontWeight: '600',
  },
  friendUsername: {
    ...typography.caption,
    color: colors.textMuted,
    marginBottom: spacing.xs,
  },
  friendStatus: {
    ...typography.caption,
    fontWeight: '600',
  },
  friendActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  joinButton: {
    backgroundColor: colors.accent,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.sm,
  },
  joinButtonText: {
    ...typography.caption,
    color: colors.text,
    fontWeight: '600',
  },
  inviteButton: {
    backgroundColor: colors.backgroundSecondary,
    borderWidth: 1,
    borderColor: colors.accent,
    padding: spacing.xs,
    borderRadius: borderRadius.sm,
  },
  requestItem: {
    backgroundColor: colors.backgroundCard,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    marginBottom: spacing.sm,
    borderWidth: 1,
    borderColor: colors.border,
  },
  requestContent: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  requestAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: spacing.sm,
  },
  requestAvatarPlaceholder: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: colors.accent,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.sm,
  },
  requestAvatarText: {
    ...typography.body,
    color: colors.text,
    fontWeight: '600',
  },
  requestDetails: {
    flex: 1,
  },
  requestName: {
    ...typography.body,
    fontWeight: '600',
    marginBottom: spacing.xs,
  },
  requestMutual: {
    ...typography.caption,
    color: colors.textSecondary,
    marginBottom: spacing.xs,
  },
  requestTime: {
    ...typography.caption,
    color: colors.textMuted,
  },
  requestActions: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  acceptButton: {
    flex: 1,
    backgroundColor: colors.success,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.sm,
    alignItems: 'center',
  },
  acceptButtonText: {
    ...typography.body,
    color: colors.text,
    fontWeight: '600',
  },
  declineButton: {
    flex: 1,
    backgroundColor: colors.backgroundSecondary,
    borderWidth: 1,
    borderColor: colors.error,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.sm,
    alignItems: 'center',
  },
  declineButtonText: {
    ...typography.body,
    color: colors.error,
    fontWeight: '600',
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: spacing.xxxl,
  },
  emptyTitle: {
    ...typography.headline,
    marginTop: spacing.md,
    marginBottom: spacing.sm,
  },
  emptyDescription: {
    ...typography.body,
    color: colors.textSecondary,
    textAlign: 'center',
    paddingHorizontal: spacing.lg,
  },
  fab: {
    position: 'absolute',
    bottom: spacing.xl,
    right: spacing.md,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.accent,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: colors.accent,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  bottomSpacing: {
    height: spacing.xxxl,
  },
}); 