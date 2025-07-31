import React from 'react';
import { View, Text, StyleSheet, Pressable, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Venue } from '../../types';
import { colors } from '../../styles/colors';
import { spacing } from '../../styles/spacing';
import { typography } from '../../styles/typography';

interface Props {
  venue: Venue;
  onPress: (venue: Venue) => void;
}

export const VenueCard: React.FC<Props> = ({ venue, onPress }) => {
  return (
    <Pressable 
      style={({ pressed }) => [
        styles.container,
        pressed && styles.pressed,
      ]}
      onPress={() => onPress(venue)}
    >
      <View style={styles.imageContainer}>
        <Image 
          source={{ uri: venue.imageUrl }} 
          style={styles.image}
          resizeMode="cover"
        />
        <View style={styles.overlay}>
          <View style={styles.categoryBadge}>
            <Text style={styles.categoryText}>{venue.category}</Text>
          </View>
          <View style={styles.priceContainer}>
            <Text style={styles.priceText}>{venue.priceRange}</Text>
          </View>
        </View>
      </View>
      
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.venueName} numberOfLines={1}>
            {venue.name}
          </Text>
          <View style={styles.rating}>
            <Ionicons name="star" size={14} color={colors.warning} />
            <Text style={styles.ratingText}>{venue.rating}</Text>
          </View>
        </View>
        
        <View style={styles.details}>
          <View style={styles.addressContainer}>
            <Ionicons name="location" size={14} color={colors.textMuted} />
            <Text style={styles.addressText} numberOfLines={1}>
              {venue.address}
            </Text>
          </View>
          
          <View style={styles.minSpendContainer}>
            <Text style={styles.minSpendLabel}>From </Text>
            <Text style={styles.minSpendAmount}>${venue.minSpend}</Text>
          </View>
        </View>
        
        <Text style={styles.description} numberOfLines={2}>
          {venue.description}
        </Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.backgroundCard,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: spacing.md,
    overflow: 'hidden',
  },
  pressed: {
    opacity: 0.8,
  },
  imageContainer: {
    height: 160,
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    padding: spacing.sm,
  },
  categoryBadge: {
    backgroundColor: colors.background + 'CC',
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: 6,
  },
  categoryText: {
    ...typography.small,
    color: colors.text,
    fontWeight: '600',
  },
  priceContainer: {
    backgroundColor: colors.accent + 'CC',
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: 6,
  },
  priceText: {
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
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  venueName: {
    ...typography.headline,
    flex: 1,
    marginRight: spacing.sm,
  },
  rating: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  ratingText: {
    ...typography.caption,
    color: colors.textSecondary,
    fontWeight: '600',
  },
  details: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  addressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    gap: 4,
  },
  addressText: {
    ...typography.caption,
    flex: 1,
  },
  minSpendContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  minSpendLabel: {
    ...typography.caption,
  },
  minSpendAmount: {
    ...typography.caption,
    color: colors.accent,
    fontWeight: '600',
  },
  description: {
    ...typography.caption,
    lineHeight: 18,
  },
}); 