import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  RefreshControl, 
  Pressable 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ComponentProps } from '../types';
import { colors } from '../styles/colors';
import { spacing } from '../styles/spacing';
import { typography } from '../styles/typography';
import { BookingCard } from '../components/booking/BookingCard';
import { 
  mockBookings, 
  getUpcomingBookings, 
  getPastBookings,
  DetailedBooking 
} from '../utils/mockBookingData';

interface Props extends ComponentProps {}

export const BookingsScreen: React.FC<Props> = () => {
  const [refreshing, setRefreshing] = useState(false);
  const [activeTab, setActiveTab] = useState<'upcoming' | 'past'>('upcoming');

  const upcomingBookings = getUpcomingBookings();
  const pastBookings = getPastBookings();

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    // Simulate API call
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }, []);

  const handleBookingPress = (booking: DetailedBooking) => {
    console.log('View booking details:', booking.id);
    // TODO: Navigate to booking detail screen
  };

  const handleCheckIn = (booking: DetailedBooking) => {
    console.log('Check in to:', booking.venueName);
    // TODO: Implement check-in functionality
  };

  const handleModify = (booking: DetailedBooking) => {
    console.log('Modify booking:', booking.id);
    // TODO: Navigate to modify booking screen
  };

  const handleCancel = (booking: DetailedBooking) => {
    console.log('Cancel booking:', booking.id);
    // TODO: Implement cancel booking functionality
  };

  const EmptyState: React.FC<{ type: 'upcoming' | 'past' }> = ({ type }) => (
    <View style={styles.emptyState}>
      <View style={styles.emptyIconContainer}>
        <Ionicons 
          name={type === 'upcoming' ? 'calendar-outline' : 'time-outline'} 
          size={64} 
          color={colors.textMuted} 
        />
      </View>
      <Text style={styles.emptyTitle}>
        {type === 'upcoming' ? 'No Upcoming Bookings' : 'No Past Bookings'}
      </Text>
      <Text style={styles.emptyDescription}>
        {type === 'upcoming' 
          ? 'Ready to plan your next night out? Find the perfect venue and book your table.'
          : 'Your booking history will appear here once you start making reservations.'
        }
      </Text>
      {type === 'upcoming' && (
        <Pressable style={styles.emptyActionButton}>
          <Ionicons name="add" size={20} color={colors.text} />
          <Text style={styles.emptyActionText}>Find Venues</Text>
        </Pressable>
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>My Bookings</Text>
        <View style={styles.headerActions}>
          <Pressable style={styles.searchButton}>
            <Ionicons name="search" size={24} color={colors.text} />
          </Pressable>
          <Pressable style={styles.filterButton}>
            <Ionicons name="filter" size={24} color={colors.text} />
          </Pressable>
        </View>
      </View>

      {/* Tab Navigation */}
      <View style={styles.tabContainer}>
        <Pressable 
          style={[
            styles.tab,
            activeTab === 'upcoming' && styles.activeTab
          ]}
          onPress={() => setActiveTab('upcoming')}
        >
          <Text style={[
            styles.tabText,
            activeTab === 'upcoming' && styles.activeTabText
          ]}>
            Upcoming
          </Text>
          {upcomingBookings.length > 0 && (
            <View style={styles.tabBadge}>
              <Text style={styles.tabBadgeText}>{upcomingBookings.length}</Text>
            </View>
          )}
        </Pressable>

        <Pressable 
          style={[
            styles.tab,
            activeTab === 'past' && styles.activeTab
          ]}
          onPress={() => setActiveTab('past')}
        >
          <Text style={[
            styles.tabText,
            activeTab === 'past' && styles.activeTabText
          ]}>
            Past
          </Text>
          {pastBookings.length > 0 && (
            <View style={styles.tabBadge}>
              <Text style={styles.tabBadgeText}>{pastBookings.length}</Text>
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
        {activeTab === 'upcoming' && (
          <View style={styles.bookingsSection}>
            {upcomingBookings.length > 0 ? (
              <>
                {/* Quick Stats for Upcoming */}
                <View style={styles.quickStats}>
                  <View style={styles.statCard}>
                    <Ionicons name="calendar" size={20} color={colors.accent} />
                    <Text style={styles.statNumber}>
                      {upcomingBookings.filter(b => b.status === 'confirmed').length}
                    </Text>
                    <Text style={styles.statLabel}>Confirmed</Text>
                  </View>
                  <View style={styles.statCard}>
                    <Ionicons name="time" size={20} color={colors.warning} />
                    <Text style={styles.statNumber}>
                      {upcomingBookings.filter(b => b.status === 'pending').length}
                    </Text>
                    <Text style={styles.statLabel}>Pending</Text>
                  </View>
                  <View style={styles.statCard}>
                    <Ionicons name="people" size={20} color={colors.success} />
                    <Text style={styles.statNumber}>
                      {upcomingBookings.reduce((sum, b) => sum + b.groupSize, 0)}
                    </Text>
                    <Text style={styles.statLabel}>Total People</Text>
                  </View>
                </View>

                {/* Upcoming Bookings List */}
                <View style={styles.bookingsList}>
                  {upcomingBookings.map((booking) => (
                    <BookingCard
                      key={booking.id}
                      booking={booking}
                      onPress={() => handleBookingPress(booking)}
                      onCheckIn={() => handleCheckIn(booking)}
                      onModify={() => handleModify(booking)}
                      onCancel={() => handleCancel(booking)}
                    />
                  ))}
                </View>
              </>
            ) : (
              <EmptyState type="upcoming" />
            )}
          </View>
        )}

        {activeTab === 'past' && (
          <View style={styles.bookingsSection}>
            {pastBookings.length > 0 ? (
              <>
                {/* Quick Stats for Past */}
                <View style={styles.quickStats}>
                  <View style={styles.statCard}>
                    <Ionicons name="checkmark-done" size={20} color={colors.success} />
                    <Text style={styles.statNumber}>
                      {pastBookings.filter(b => b.status === 'completed').length}
                    </Text>
                    <Text style={styles.statLabel}>Completed</Text>
                  </View>
                  <View style={styles.statCard}>
                    <Ionicons name="close-circle" size={20} color={colors.error} />
                    <Text style={styles.statNumber}>
                      {pastBookings.filter(b => b.status === 'cancelled').length}
                    </Text>
                    <Text style={styles.statLabel}>Cancelled</Text>
                  </View>
                  <View style={styles.statCard}>
                    <Ionicons name="cash" size={20} color={colors.accent} />
                    <Text style={styles.statNumber}>
                      ${pastBookings.reduce((sum, b) => sum + b.totalAmount, 0).toLocaleString()}
                    </Text>
                    <Text style={styles.statLabel}>Total Spent</Text>
                  </View>
                </View>

                {/* Past Bookings List */}
                <View style={styles.bookingsList}>
                  {pastBookings.map((booking) => (
                    <BookingCard
                      key={booking.id}
                      booking={booking}
                      onPress={() => handleBookingPress(booking)}
                    />
                  ))}
                </View>
              </>
            ) : (
              <EmptyState type="past" />
            )}
          </View>
        )}

        {/* Bottom spacing for tab bar */}
        <View style={styles.bottomSpacing} />
      </ScrollView>

      {/* Floating Action Button */}
      {activeTab === 'upcoming' && (
        <Pressable style={styles.fab}>
          <Ionicons name="add" size={24} color={colors.text} />
        </Pressable>
      )}
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
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.xxxl + spacing.lg,
    paddingBottom: spacing.lg,
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
    padding: spacing.sm,
  },
  filterButton: {
    padding: spacing.sm,
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: colors.backgroundCard,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  tab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.md,
    gap: spacing.xs,
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: colors.accent,
  },
  tabText: {
    ...typography.body,
    fontWeight: '600',
    color: colors.textSecondary,
  },
  activeTabText: {
    color: colors.accent,
  },
  tabBadge: {
    backgroundColor: colors.accent,
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.xs,
  },
  tabBadgeText: {
    ...typography.small,
    color: colors.text,
    fontWeight: '600',
    fontSize: 12,
  },
  content: {
    flex: 1,
  },
  bookingsSection: {
    padding: spacing.lg,
  },
  quickStats: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginBottom: spacing.lg,
  },
  statCard: {
    flex: 1,
    backgroundColor: colors.backgroundCard,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
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
  bookingsList: {
    gap: spacing.sm,
  },
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.xxxl,
    paddingHorizontal: spacing.xl,
  },
  emptyIconContainer: {
    width: 120,
    height: 120,
    backgroundColor: colors.backgroundCard,
    borderRadius: 60,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.lg,
    borderWidth: 1,
    borderColor: colors.border,
  },
  emptyTitle: {
    ...typography.title,
    marginBottom: spacing.sm,
    textAlign: 'center',
  },
  emptyDescription: {
    ...typography.bodySecondary,
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: spacing.xl,
    maxWidth: 280,
  },
  emptyActionButton: {
    backgroundColor: colors.accent,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderRadius: 25,
    gap: spacing.xs,
  },
  emptyActionText: {
    ...typography.body,
    color: colors.text,
    fontWeight: '600',
  },
  fab: {
    position: 'absolute',
    bottom: spacing.xl + 80, // Account for tab bar
    right: spacing.lg,
    width: 56,
    height: 56,
    backgroundColor: colors.accent,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 8,
    shadowColor: colors.accent,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  bottomSpacing: {
    height: spacing.xxxl,
  },
}); 