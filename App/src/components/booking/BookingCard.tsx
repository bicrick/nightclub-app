import React from 'react';
import { View, Text, StyleSheet, Image, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { DetailedBooking, BookingStatus } from '../../utils/mockBookingData';
import { colors } from '../../styles/colors';
import { spacing } from '../../styles/spacing';
import { typography } from '../../styles/typography';
import { borderRadius } from '../../styles/spacing';

interface Props {
  booking: DetailedBooking;
  onPress?: () => void;
  onCheckIn?: () => void;
  onModify?: () => void;
  onCancel?: () => void;
}

export const BookingCard: React.FC<Props> = ({
  booking,
  onPress,
  onCheckIn,
  onModify,
  onCancel,
}) => {
  const getStatusColor = (status: BookingStatus) => {
    switch (status) {
      case 'confirmed':
        return colors.success;
      case 'pending':
        return colors.warning;
      case 'completed':
        return colors.success;
      case 'cancelled':
        return colors.error;
      case 'checked_in':
        return colors.accent;
      default:
        return colors.textMuted;
    }
  };

  const getStatusIcon = (status: BookingStatus) => {
    switch (status) {
      case 'confirmed':
        return 'checkmark-circle';
      case 'pending':
        return 'time';
      case 'completed':
        return 'checkmark-done-circle';
      case 'cancelled':
        return 'close-circle';
      case 'checked_in':
        return 'location';
      default:
        return 'help-circle';
    }
  };

  const getStatusText = (status: BookingStatus) => {
    switch (status) {
      case 'confirmed':
        return 'Confirmed';
      case 'pending':
        return 'Pending';
      case 'completed':
        return 'Completed';
      case 'cancelled':
        return 'Cancelled';
      case 'checked_in':
        return 'Checked In';
      default:
        return status;
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const today = new Date();
    const tomorrow = new Date();
    tomorrow.setDate(today.getDate() + 1);

    if (date.toDateString() === today.toDateString()) {
      return 'Today';
    } else if (date.toDateString() === tomorrow.toDateString()) {
      return 'Tomorrow';
    } else {
      return date.toLocaleDateString('en-US', { 
        weekday: 'short', 
        month: 'short', 
        day: 'numeric' 
      });
    }
  };

  const getPaymentStatusInfo = () => {
    if (booking.paymentStatus === 'paid') {
      return { text: 'Paid', color: colors.success };
    } else if (booking.paymentStatus === 'partial') {
      return { text: `$${booking.remainingAmount} remaining`, color: colors.warning };
    } else {
      return { text: 'Payment pending', color: colors.error };
    }
  };

  const paymentInfo = getPaymentStatusInfo();
  const isUpcoming = ['confirmed', 'pending'].includes(booking.status);
  const canCheckIn = booking.status === 'confirmed' && formatDate(booking.date) === 'Today';

  return (
    <Pressable 
      style={({ pressed }) => [
        styles.container,
        pressed && styles.pressed,
      ]}
      onPress={onPress}
    >
      {/* Venue Image */}
      <Image source={{ uri: booking.venueImage }} style={styles.venueImage} />
      
      {/* Status Badge */}
      <View style={[styles.statusBadge, { backgroundColor: getStatusColor(booking.status) }]}>
        <Ionicons 
          name={getStatusIcon(booking.status) as any} 
          size={12} 
          color={colors.text} 
        />
        <Text style={styles.statusText}>{getStatusText(booking.status)}</Text>
      </View>

      {/* Content */}
      <View style={styles.content}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.venueName}>{booking.venueName}</Text>
          <Text style={styles.confirmationCode}>#{booking.confirmationCode}</Text>
        </View>

        {/* Date & Time */}
        <View style={styles.dateTimeRow}>
          <View style={styles.dateTimeItem}>
            <Ionicons name="calendar" size={16} color={colors.accent} />
            <Text style={styles.dateTimeText}>
              {formatDate(booking.date)} • {booking.bookingTime}
            </Text>
          </View>
        </View>

        {/* Details */}
        <View style={styles.detailsRow}>
          <View style={styles.detailItem}>
            <Ionicons name="people" size={16} color={colors.textSecondary} />
            <Text style={styles.detailText}>{booking.groupSize} people</Text>
          </View>
          <View style={styles.detailItem}>
            <Ionicons name="restaurant" size={16} color={colors.textSecondary} />
            <Text style={styles.detailText}>{booking.tableType}</Text>
          </View>
        </View>

        {/* Payment Info */}
        <View style={styles.paymentRow}>
          <View style={styles.totalAmount}>
            <Text style={styles.totalLabel}>Total</Text>
            <Text style={styles.totalValue}>${booking.totalAmount}</Text>
          </View>
          <View style={[styles.paymentStatus, { backgroundColor: paymentInfo.color + '20' }]}>
            <Text style={[styles.paymentStatusText, { color: paymentInfo.color }]}>
              {paymentInfo.text}
            </Text>
          </View>
        </View>

        {/* Group Members Preview */}
        {booking.groupMembers.length > 0 && (
          <View style={styles.groupPreview}>
            <View style={styles.avatarRow}>
              {booking.groupMembers.slice(0, 4).map((member, index) => (
                <View key={member.id} style={[styles.avatar, { marginLeft: index > 0 ? -8 : 0 }]}>
                  {member.avatar ? (
                    <Image source={{ uri: member.avatar }} style={styles.avatarImage} />
                  ) : (
                    <View style={styles.avatarPlaceholder}>
                      <Text style={styles.avatarText}>
                        {member.name.charAt(0).toUpperCase()}
                      </Text>
                    </View>
                  )}
                </View>
              ))}
              {booking.groupMembers.length > 4 && (
                <View style={styles.moreCount}>
                  <Text style={styles.moreCountText}>+{booking.groupMembers.length - 4}</Text>
                </View>
              )}
            </View>
          </View>
        )}

        {/* Action Buttons */}
        {isUpcoming && (
          <View style={styles.actionButtons}>
            {canCheckIn && (
              <Pressable style={styles.primaryButton} onPress={onCheckIn}>
                <Ionicons name="location" size={16} color={colors.text} />
                <Text style={styles.primaryButtonText}>Check In</Text>
              </Pressable>
            )}
            
            <Pressable style={styles.secondaryButton} onPress={onModify}>
              <Ionicons name="create" size={16} color={colors.accent} />
              <Text style={styles.secondaryButtonText}>Modify</Text>
            </Pressable>
            
            {booking.status === 'pending' && (
              <Pressable style={styles.cancelButton} onPress={onCancel}>
                <Ionicons name="close" size={16} color={colors.error} />
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </Pressable>
            )}
          </View>
        )}
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.backgroundCard,
    borderRadius: borderRadius.md,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: spacing.md,
    overflow: 'hidden',
  },
  pressed: {
    opacity: 0.8,
  },
  venueImage: {
    width: '100%',
    height: 120,
    backgroundColor: colors.backgroundSecondary,
  },
  statusBadge: {
    position: 'absolute',
    top: spacing.sm,
    right: spacing.sm,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.sm,
    gap: spacing.xs,
  },
  statusText: {
    ...typography.small,
    color: colors.text,
    fontWeight: '600',
  },
  content: {
    padding: spacing.md,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: spacing.sm,
  },
  venueName: {
    ...typography.headline,
    flex: 1,
    marginRight: spacing.sm,
  },
  confirmationCode: {
    ...typography.caption,
    color: colors.textMuted,
  },
  dateTimeRow: {
    marginBottom: spacing.sm,
  },
  dateTimeItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  dateTimeText: {
    ...typography.body,
    color: colors.accent,
    fontWeight: '600',
  },
  detailsRow: {
    flexDirection: 'row',
    gap: spacing.lg,
    marginBottom: spacing.sm,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  detailText: {
    ...typography.caption,
  },
  paymentRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  totalAmount: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: spacing.xs,
  },
  totalLabel: {
    ...typography.caption,
  },
  totalValue: {
    ...typography.title,
    color: colors.accent,
  },
  paymentStatus: {
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.sm,
  },
  paymentStatusText: {
    ...typography.small,
    fontWeight: '600',
  },
  groupPreview: {
    marginBottom: spacing.md,
  },
  avatarRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: colors.backgroundCard,
  },
  avatarImage: {
    width: '100%',
    height: '100%',
    borderRadius: 14,
  },
  avatarPlaceholder: {
    width: '100%',
    height: '100%',
    borderRadius: 14,
    backgroundColor: colors.accent,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    ...typography.small,
    color: colors.text,
    fontWeight: '600',
  },
  moreCount: {
    marginLeft: spacing.xs,
  },
  moreCountText: {
    ...typography.caption,
    color: colors.textMuted,
  },
  actionButtons: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  primaryButton: {
    flex: 1,
    backgroundColor: colors.accent,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.sm,
    gap: spacing.xs,
  },
  primaryButtonText: {
    ...typography.body,
    color: colors.text,
    fontWeight: '600',
  },
  secondaryButton: {
    flex: 1,
    backgroundColor: colors.backgroundSecondary,
    borderWidth: 1,
    borderColor: colors.accent,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.sm,
    gap: spacing.xs,
  },
  secondaryButtonText: {
    ...typography.body,
    color: colors.accent,
    fontWeight: '600',
  },
  cancelButton: {
    backgroundColor: colors.backgroundSecondary,
    borderWidth: 1,
    borderColor: colors.error,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.sm,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  cancelButtonText: {
    ...typography.body,
    color: colors.error,
    fontWeight: '600',
  },
}); 