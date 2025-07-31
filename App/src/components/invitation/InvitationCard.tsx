import React from 'react';
import { View, Text, StyleSheet, Image, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Invitation, getConfirmedCount, getPendingCount, getPaymentProgress } from '../../utils/mockInvitationData';
import { colors } from '../../styles/colors';
import { spacing } from '../../styles/spacing';
import { typography } from '../../styles/typography';
import { borderRadius } from '../../styles/spacing';

interface Props {
  invitation: Invitation;
  onPress?: () => void;
  onAccept?: () => void;
  onDecline?: () => void;
  onMaybe?: () => void;
}

export const InvitationCard: React.FC<Props> = ({
  invitation,
  onPress,
  onAccept,
  onDecline,
  onMaybe,
}) => {
  const confirmedCount = getConfirmedCount(invitation);
  const pendingCount = getPendingCount(invitation);
  const paymentProgress = getPaymentProgress(invitation);

  const getUrgencyColor = () => {
    switch (invitation.urgency) {
      case 'tonight':
        return colors.error;
      case 'tomorrow':
        return colors.warning;
      case 'this_weekend':
        return colors.accent;
      default:
        return colors.success;
    }
  };

  const getUrgencyText = () => {
    switch (invitation.urgency) {
      case 'tonight':
        return 'Tonight!';
      case 'tomorrow':
        return 'Tomorrow';
      case 'this_weekend':
        return 'This Weekend';
      default:
        return formatTimeUntil(invitation.date);
    }
  };

  const formatTimeUntil = (dateString: string) => {
    const eventDate = new Date(dateString);
    const now = new Date();
    const diffTime = eventDate.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Tomorrow';
    if (diffDays <= 7) return `In ${diffDays} days`;
    return eventDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const getEventTypeEmoji = () => {
    switch (invitation.eventType) {
      case 'birthday':
        return '🎂';
      case 'celebration':
        return '🎉';
      case 'casual':
        return '🍻';
      case 'corporate':
        return '🏢';
      default:
        return '🎊';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const isReceived = invitation.type === 'received';
  const isPending = invitation.status === 'pending';
  const showActions = isReceived && isPending;

  return (
    <Pressable 
      style={({ pressed }) => [
        styles.container,
        pressed && styles.pressed,
        invitation.urgency === 'tonight' && styles.urgentBorder,
      ]}
      onPress={onPress}
    >
      {/* Host Info Header */}
      <View style={styles.hostHeader}>
        <View style={styles.hostInfo}>
          {invitation.hostAvatar ? (
            <Image source={{ uri: invitation.hostAvatar }} style={styles.hostAvatar} />
          ) : (
            <View style={styles.hostAvatarPlaceholder}>
              <Text style={styles.hostAvatarText}>
                {invitation.hostName.charAt(0).toUpperCase()}
              </Text>
            </View>
          )}
          <View style={styles.hostText}>
            <Text style={styles.hostMessage}>
              {isReceived ? `${invitation.hostName} invited you!` : `Your Event`}
            </Text>
            {invitation.eventTitle && (
              <Text style={styles.eventTitle}>{invitation.eventTitle}</Text>
            )}
          </View>
        </View>
        
        {/* Urgency Badge */}
        <View style={[styles.urgencyBadge, { backgroundColor: getUrgencyColor() }]}>
          <Text style={styles.urgencyText}>{getUrgencyText()}</Text>
        </View>
      </View>

      {/* Venue Image */}
      <Image source={{ uri: invitation.venueImage }} style={styles.venueImage} />
      
      {/* Event Type Badge */}
      <View style={styles.eventTypeBadge}>
        <Text style={styles.eventTypeEmoji}>{getEventTypeEmoji()}</Text>
        <Text style={styles.eventTypeText}>{invitation.eventType}</Text>
      </View>

      {/* Content */}
      <View style={styles.content}>
        {/* Venue & Date */}
        <Text style={styles.venueName}>{invitation.venueName}</Text>
        <View style={styles.dateTimeRow}>
          <Ionicons name="calendar" size={16} color={colors.accent} />
          <Text style={styles.dateTimeText}>
            {formatDate(invitation.date)} • {invitation.time}
          </Text>
        </View>

        {/* Personal Message */}
        {invitation.personalMessage && (
          <View style={styles.messageContainer}>
            <Text style={styles.personalMessage}>"{invitation.personalMessage}"</Text>
          </View>
        )}

        {/* Response Status */}
        <View style={styles.statusRow}>
          <View style={styles.responseStatus}>
            <View style={styles.responseItem}>
              <Ionicons name="people" size={16} color={colors.success} />
              <Text style={styles.responseText}>
                {confirmedCount} confirmed
              </Text>
            </View>
            {pendingCount > 0 && (
              <View style={styles.responseItem}>
                <Ionicons name="time" size={16} color={colors.warning} />
                <Text style={styles.responseText}>
                  {pendingCount} pending
                </Text>
              </View>
            )}
          </View>
          
          <View style={styles.costInfo}>
            <Text style={styles.costLabel}>Cost</Text>
            <Text style={styles.costAmount}>${invitation.costPerPerson}</Text>
          </View>
        </View>

        {/* Payment Progress (for sent invitations) */}
        {invitation.type === 'sent' && invitation.paymentRequired && (
          <View style={styles.paymentProgress}>
            <View style={styles.paymentHeader}>
              <Text style={styles.paymentLabel}>Payment Progress</Text>
              <Text style={styles.paymentAmount}>
                ${paymentProgress.paidCount * invitation.costPerPerson}/${invitation.totalCost}
              </Text>
            </View>
            <View style={styles.progressBar}>
              <View 
                style={[
                  styles.progressFill, 
                  { width: `${Math.min(paymentProgress.percentage, 100)}%` }
                ]} 
              />
            </View>
            <Text style={styles.progressText}>
              {paymentProgress.paidCount}/{paymentProgress.totalRequired} people paid
            </Text>
          </View>
        )}

        {/* Group Preview */}
        <View style={styles.groupPreview}>
          <View style={styles.avatarRow}>
            {invitation.responses.slice(0, 5).map((response, index) => (
              <View key={response.userId} style={[styles.avatar, { marginLeft: index > 0 ? -8 : 0 }]}>
                {response.userAvatar ? (
                  <Image source={{ uri: response.userAvatar }} style={styles.avatarImage} />
                ) : (
                  <View style={[
                    styles.avatarPlaceholder,
                    response.status === 'accepted' && styles.avatarAccepted,
                    response.status === 'pending' && styles.avatarPending,
                    response.status === 'declined' && styles.avatarDeclined,
                  ]}>
                    <Text style={styles.avatarText}>
                      {response.userName.charAt(0).toUpperCase()}
                    </Text>
                  </View>
                )}
                {/* Status indicator */}
                <View style={[
                  styles.statusIndicator,
                  response.status === 'accepted' && { backgroundColor: colors.success },
                  response.status === 'pending' && { backgroundColor: colors.warning },
                  response.status === 'declined' && { backgroundColor: colors.error },
                  response.status === 'maybe' && { backgroundColor: colors.accent },
                ]} />
              </View>
            ))}
            {invitation.responses.length > 5 && (
              <View style={styles.moreCount}>
                <Text style={styles.moreCountText}>+{invitation.responses.length - 5}</Text>
              </View>
            )}
          </View>
        </View>

        {/* Action Buttons */}
        {showActions && (
          <View style={styles.actionButtons}>
            <Pressable style={styles.acceptButton} onPress={onAccept}>
              <Ionicons name="checkmark" size={18} color={colors.text} />
              <Text style={styles.acceptButtonText}>I'm In!</Text>
            </Pressable>
            
            <Pressable style={styles.maybeButton} onPress={onMaybe}>
              <Ionicons name="help" size={18} color={colors.warning} />
              <Text style={styles.maybeButtonText}>Maybe</Text>
            </Pressable>
            
            <Pressable style={styles.declineButton} onPress={onDecline}>
              <Ionicons name="close" size={18} color={colors.error} />
              <Text style={styles.declineButtonText}>Can't</Text>
            </Pressable>
          </View>
        )}

        {/* Already Responded State */}
        {isReceived && !isPending && (
          <View style={styles.responseStatus}>
            <View style={[
              styles.responseIndicator,
              invitation.status === 'accepted' && { backgroundColor: colors.success + '20' },
              invitation.status === 'declined' && { backgroundColor: colors.error + '20' },
              invitation.status === 'maybe' && { backgroundColor: colors.warning + '20' },
            ]}>
              <Ionicons 
                name={
                  invitation.status === 'accepted' ? 'checkmark-circle' :
                  invitation.status === 'declined' ? 'close-circle' : 'help-circle'
                }
                size={16} 
                color={
                  invitation.status === 'accepted' ? colors.success :
                  invitation.status === 'declined' ? colors.error : colors.warning
                }
              />
              <Text style={[
                styles.responseIndicatorText,
                invitation.status === 'accepted' && { color: colors.success },
                invitation.status === 'declined' && { color: colors.error },
                invitation.status === 'maybe' && { color: colors.warning },
              ]}>
                You {invitation.status === 'accepted' ? 'accepted' : 
                     invitation.status === 'declined' ? 'declined' : 'said maybe'}
              </Text>
            </View>
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
  urgentBorder: {
    borderColor: colors.error,
    borderWidth: 2,
  },
  hostHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: spacing.md,
    paddingBottom: spacing.sm,
  },
  hostInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  hostAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: spacing.sm,
  },
  hostAvatarPlaceholder: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.accent,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.sm,
  },
  hostAvatarText: {
    ...typography.body,
    color: colors.text,
    fontWeight: '600',
  },
  hostText: {
    flex: 1,
  },
  hostMessage: {
    ...typography.body,
    fontWeight: '600',
    marginBottom: spacing.xs,
  },
  eventTitle: {
    ...typography.caption,
    color: colors.textSecondary,
  },
  urgencyBadge: {
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.sm,
  },
  urgencyText: {
    ...typography.small,
    color: colors.text,
    fontWeight: '600',
  },
  venueImage: {
    width: '100%',
    height: 120,
    backgroundColor: colors.backgroundSecondary,
  },
  eventTypeBadge: {
    position: 'absolute',
    top: spacing.xxxl + spacing.lg,
    left: spacing.sm,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.background + 'DD',
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.sm,
    gap: spacing.xs,
  },
  eventTypeEmoji: {
    fontSize: 14,
  },
  eventTypeText: {
    ...typography.small,
    color: colors.text,
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  content: {
    padding: spacing.md,
  },
  venueName: {
    ...typography.headline,
    marginBottom: spacing.sm,
  },
  dateTimeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    marginBottom: spacing.md,
  },
  dateTimeText: {
    ...typography.body,
    color: colors.accent,
    fontWeight: '600',
  },
  messageContainer: {
    backgroundColor: colors.backgroundSecondary,
    padding: spacing.sm,
    borderRadius: borderRadius.sm,
    marginBottom: spacing.md,
    borderLeftWidth: 3,
    borderLeftColor: colors.accent,
  },
  personalMessage: {
    ...typography.body,
    fontStyle: 'italic',
    lineHeight: 20,
  },
  statusRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  responseStatus: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  responseItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  responseText: {
    ...typography.caption,
    fontWeight: '600',
  },
  costInfo: {
    alignItems: 'flex-end',
  },
  costLabel: {
    ...typography.small,
    color: colors.textSecondary,
  },
  costAmount: {
    ...typography.headline,
    color: colors.accent,
  },
  paymentProgress: {
    marginBottom: spacing.md,
  },
  paymentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  paymentLabel: {
    ...typography.caption,
    fontWeight: '600',
  },
  paymentAmount: {
    ...typography.caption,
    color: colors.accent,
    fontWeight: '600',
  },
  progressBar: {
    height: 6,
    backgroundColor: colors.backgroundSecondary,
    borderRadius: 3,
    overflow: 'hidden',
    marginBottom: spacing.xs,
  },
  progressFill: {
    height: '100%',
    backgroundColor: colors.success,
  },
  progressText: {
    ...typography.small,
    color: colors.textSecondary,
  },
  groupPreview: {
    marginBottom: spacing.md,
  },
  avatarRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    position: 'relative',
  },
  avatarImage: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: colors.backgroundCard,
  },
  avatarPlaceholder: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: colors.backgroundCard,
  },
  avatarAccepted: {
    backgroundColor: colors.success,
  },
  avatarPending: {
    backgroundColor: colors.textMuted,
  },
  avatarDeclined: {
    backgroundColor: colors.error,
  },
  avatarText: {
    ...typography.small,
    color: colors.text,
    fontWeight: '600',
  },
  statusIndicator: {
    position: 'absolute',
    bottom: -2,
    right: -2,
    width: 12,
    height: 12,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: colors.backgroundCard,
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
  acceptButton: {
    flex: 2,
    backgroundColor: colors.success,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.sm,
    gap: spacing.xs,
  },
  acceptButtonText: {
    ...typography.body,
    color: colors.text,
    fontWeight: '600',
  },
  maybeButton: {
    flex: 1,
    backgroundColor: colors.backgroundSecondary,
    borderWidth: 1,
    borderColor: colors.warning,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.sm,
    gap: spacing.xs,
  },
  maybeButtonText: {
    ...typography.body,
    color: colors.warning,
    fontWeight: '600',
  },
  declineButton: {
    flex: 1,
    backgroundColor: colors.backgroundSecondary,
    borderWidth: 1,
    borderColor: colors.error,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.sm,
    gap: spacing.xs,
  },
  declineButtonText: {
    ...typography.body,
    color: colors.error,
    fontWeight: '600',
  },
  responseIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.sm,
    gap: spacing.xs,
  },
  responseIndicatorText: {
    ...typography.caption,
    fontWeight: '600',
  },
}); 