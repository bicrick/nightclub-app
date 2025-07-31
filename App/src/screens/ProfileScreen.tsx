import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ComponentProps } from '../types';
import { colors } from '../styles/colors';
import { spacing } from '../styles/spacing';
import { typography } from '../styles/typography';
import { PaymentMethodCard } from '../components/payment/PaymentMethodCard';
import { StripeLogo } from '../components/payment/StripeLogo';
import { mockUser, loyaltyTiers, Achievement } from '../utils/mockUserData';
import { mockVenues } from '../utils/mockData';

interface Props extends ComponentProps {}

export const ProfileScreen: React.FC<Props> = () => {
  const currentTier = loyaltyTiers[mockUser.loyaltyTier];
  const progressToNext = currentTier.nextTier ? 
    Math.min((mockUser.bookingCount / currentTier.bookingsRequired) * 100, 100) : 100;

  const getVenueName = (venueId: string) => {
    const venue = mockVenues.find(v => v.id === venueId);
    return venue?.name || 'Unknown Venue';
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Profile Header */}
      <View style={styles.header}>
        <View style={styles.profileSection}>
          <Image 
            source={{ uri: mockUser.profileImage }} 
            style={styles.profileImage}
          />
          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>{mockUser.name}</Text>
            <Text style={styles.memberSince}>Member since {mockUser.memberSince}</Text>
            
            {/* Loyalty Tier Badge */}
            <View style={styles.tierBadge}>
              <Text style={styles.tierIcon}>{currentTier.icon}</Text>
              <Text style={styles.tierText}>{mockUser.loyaltyTier}</Text>
            </View>
          </View>
        </View>

        {/* Quick Stats */}
        <View style={styles.statsRow}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{mockUser.bookingCount}</Text>
            <Text style={styles.statLabel}>Bookings</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{mockUser.friendsCount}</Text>
            <Text style={styles.statLabel}>Friends</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>${mockUser.totalSpent.toLocaleString()}</Text>
            <Text style={styles.statLabel}>Spent</Text>
          </View>
        </View>

        {/* Tier Progress */}
        {currentTier.nextTier && (
          <View style={styles.progressSection}>
            <View style={styles.progressHeader}>
              <Text style={styles.progressLabel}>Progress to {currentTier.nextTier}</Text>
              <Text style={styles.progressText}>
                {mockUser.bookingCount}/{currentTier.bookingsRequired} bookings
              </Text>
            </View>
            <View style={styles.progressBar}>
              <View style={[styles.progressFill, { width: `${progressToNext}%` }]} />
            </View>
          </View>
        )}
      </View>

      {/* Achievement Badges */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Achievements</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={styles.badgesContainer}>
            {mockUser.achievementBadges.map((badge) => (
              <AchievementBadge key={badge.id} achievement={badge} />
            ))}
          </View>
        </ScrollView>
      </View>

      {/* Payment Methods */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Payment Methods</Text>
          <Pressable style={styles.addButton}>
            <Ionicons name="add" size={20} color={colors.accent} />
            <Text style={styles.addButtonText}>Add</Text>
          </Pressable>
        </View>
        
        {mockUser.paymentMethods.map((method) => (
          <PaymentMethodCard 
            key={method.id} 
            paymentMethod={method}
            onPress={() => console.log('Edit payment method:', method.id)}
          />
        ))}
        
        {/* Stripe Info */}
        <View style={styles.stripeInfo}>
                   <View style={styles.stripeRow}>
           <Ionicons name="shield-checkmark" size={16} color={colors.success} />
           <Text style={styles.stripeText}>Payments secured by</Text>
           <StripeLogo width={40} height={16} color="#ff0000" />
         </View>
          <Text style={styles.stripeDescription}>
            Your payment information is encrypted and never stored on our servers
          </Text>
        </View>
      </View>

      {/* Recent Bookings */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Recent Bookings</Text>
        {mockUser.recentBookings.map((booking) => (
          <View key={booking.id} style={styles.bookingCard}>
            <View style={styles.bookingInfo}>
              <Text style={styles.bookingVenue}>{getVenueName(booking.venueId)}</Text>
              <Text style={styles.bookingDate}>{new Date(booking.date).toLocaleDateString()}</Text>
              <Text style={styles.bookingDetails}>
                Party of {booking.partySize} • ${booking.totalAmount}
              </Text>
            </View>
            <View style={styles.bookingStatus}>
              <Ionicons name="checkmark-circle" size={20} color={colors.success} />
              <Text style={styles.statusText}>Completed</Text>
            </View>
          </View>
        ))}
      </View>

      {/* Settings Menu */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Settings</Text>
        
        <SettingItem 
          icon="notifications" 
          title="Notifications" 
          subtitle="Booking reminders & updates"
          onPress={() => console.log('Notifications')}
        />
        
        <SettingItem 
          icon="shield" 
          title="Privacy & Safety" 
          subtitle="Emergency contacts & check-ins"
          onPress={() => console.log('Privacy')}
        />
        
        <SettingItem 
          icon="people" 
          title="Friends & Groups" 
          subtitle="Manage your crew connections"
          onPress={() => console.log('Friends')}
        />
        
        <SettingItem 
          icon="help-circle" 
          title="Help & Support" 
          subtitle="Get help or contact us"
          onPress={() => console.log('Support')}
        />
        
        <SettingItem 
          icon="log-out" 
          title="Sign Out" 
          subtitle=""
          onPress={() => console.log('Sign out')}
          isDestructive
        />
      </View>

      {/* Bottom spacing */}
      <View style={styles.bottomSpacing} />
    </ScrollView>
  );
};

interface AchievementBadgeProps {
  achievement: Achievement;
}

const AchievementBadge: React.FC<AchievementBadgeProps> = ({ achievement }) => (
  <View style={[styles.badgeCard, !achievement.unlocked && styles.badgeCardLocked]}>
    <Text style={styles.badgeIcon}>{achievement.icon}</Text>
    <Text style={[styles.badgeName, !achievement.unlocked && styles.badgeNameLocked]}>
      {achievement.name}
    </Text>
    <Text style={[styles.badgeDescription, !achievement.unlocked && styles.badgeDescriptionLocked]}>
      {achievement.description}
    </Text>
    {!achievement.unlocked && achievement.progress && achievement.target && (
      <View style={styles.badgeProgress}>
        <Text style={styles.badgeProgressText}>
          {achievement.progress}/{achievement.target}
        </Text>
      </View>
    )}
  </View>
);

interface SettingItemProps {
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  subtitle: string;
  onPress: () => void;
  isDestructive?: boolean;
}

const SettingItem: React.FC<SettingItemProps> = ({ 
  icon, 
  title, 
  subtitle, 
  onPress, 
  isDestructive = false 
}) => (
  <Pressable 
    style={({ pressed }) => [
      styles.settingItem,
      pressed && styles.settingItemPressed,
    ]}
    onPress={onPress}
  >
    <View style={styles.settingContent}>
      <Ionicons 
        name={icon} 
        size={24} 
        color={isDestructive ? colors.error : colors.accent} 
      />
      <View style={styles.settingText}>
        <Text style={[styles.settingTitle, isDestructive && styles.destructiveText]}>
          {title}
        </Text>
        {subtitle ? (
          <Text style={styles.settingSubtitle}>{subtitle}</Text>
        ) : null}
      </View>
    </View>
    <Ionicons name="chevron-forward" size={20} color={colors.textMuted} />
  </Pressable>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    padding: spacing.lg,
    paddingTop: spacing.xxxl + spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: spacing.md,
    borderWidth: 2,
    borderColor: colors.accent,
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    ...typography.largeTitle,
    marginBottom: spacing.xs,
  },
  memberSince: {
    ...typography.caption,
    marginBottom: spacing.sm,
  },
  tierBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.backgroundCard,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    alignSelf: 'flex-start',
  },
  tierIcon: {
    fontSize: 16,
    marginRight: spacing.xs,
  },
  tierText: {
    ...typography.caption,
    fontWeight: '600',
    color: loyaltyTiers['Squad Regular'].color,
  },
  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginBottom: spacing.lg,
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statNumber: {
    ...typography.title,
    color: colors.accent,
    marginBottom: spacing.xs,
  },
  statLabel: {
    ...typography.caption,
  },
  statDivider: {
    width: 1,
    height: 40,
    backgroundColor: colors.border,
  },
  progressSection: {
    marginTop: spacing.md,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  progressLabel: {
    ...typography.body,
    fontWeight: '600',
  },
  progressText: {
    ...typography.caption,
  },
  progressBar: {
    height: 6,
    backgroundColor: colors.backgroundCard,
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: colors.accent,
    borderRadius: 3,
  },
  section: {
    padding: spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  sectionTitle: {
    ...typography.title,
    marginBottom: spacing.md,
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  addButtonText: {
    ...typography.body,
    color: colors.accent,
    fontWeight: '600',
  },
  stripeInfo: {
    marginTop: spacing.md,
    padding: spacing.md,
    backgroundColor: colors.backgroundCard,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.border,
  },
  stripeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    marginBottom: spacing.xs,
  },
  stripeText: {
    ...typography.caption,
  },
  stripeDescription: {
    ...typography.small,
    color: colors.textMuted,
    lineHeight: 16,
  },
  badgesContainer: {
    flexDirection: 'row',
    gap: spacing.md,
    paddingRight: spacing.lg,
  },
  badgeCard: {
    width: 120,
    backgroundColor: colors.backgroundCard,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    padding: spacing.md,
    alignItems: 'center',
  },
  badgeCardLocked: {
    opacity: 0.6,
    borderColor: colors.borderLight,
  },
  badgeIcon: {
    fontSize: 32,
    marginBottom: spacing.sm,
  },
  badgeName: {
    ...typography.caption,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: spacing.xs,
  },
  badgeNameLocked: {
    color: colors.textMuted,
  },
  badgeDescription: {
    ...typography.small,
    textAlign: 'center',
    lineHeight: 14,
  },
  badgeDescriptionLocked: {
    color: colors.textMuted,
  },
  badgeProgress: {
    marginTop: spacing.xs,
    backgroundColor: colors.accent + '20',
    paddingHorizontal: spacing.xs,
    paddingVertical: 2,
    borderRadius: 4,
  },
  badgeProgressText: {
    ...typography.small,
    color: colors.accent,
    fontWeight: '600',
  },
  bookingCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.backgroundCard,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    padding: spacing.md,
    marginBottom: spacing.sm,
  },
  bookingInfo: {
    flex: 1,
  },
  bookingVenue: {
    ...typography.body,
    fontWeight: '600',
    marginBottom: spacing.xs,
  },
  bookingDate: {
    ...typography.caption,
    marginBottom: spacing.xs,
  },
  bookingDetails: {
    ...typography.caption,
  },
  bookingStatus: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  statusText: {
    ...typography.caption,
    color: colors.success,
    fontWeight: '600',
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: spacing.md,
    marginBottom: spacing.sm,
    backgroundColor: colors.backgroundCard,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
  },
  settingItemPressed: {
    opacity: 0.8,
  },
  settingContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  settingText: {
    marginLeft: spacing.md,
    flex: 1,
  },
  settingTitle: {
    ...typography.body,
    fontWeight: '600',
    marginBottom: spacing.xs,
  },
  settingSubtitle: {
    ...typography.caption,
  },
  destructiveText: {
    color: colors.error,
  },
  bottomSpacing: {
    height: spacing.xxxl,
  },
}); 