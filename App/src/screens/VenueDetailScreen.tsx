import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ComponentProps, Venue } from '../types';
import { colors } from '../styles/colors';
import { spacing } from '../styles/spacing';
import { typography } from '../styles/typography';

interface Props extends ComponentProps {
  venue: Venue;
  onBack: () => void;
  onBookTable: (venue: Venue) => void;
}

export const VenueDetailScreen: React.FC<Props> = ({ venue, onBack, onBookTable }) => {
  return (
    <View style={styles.container}>
      {/* Header Image */}
      <View style={styles.imageContainer}>
        <Image 
          source={{ uri: venue.imageUrl }} 
          style={styles.heroImage}
          resizeMode="cover"
        />
        <View style={styles.imageOverlay}>
          <Pressable style={styles.backButton} onPress={onBack}>
            <Ionicons name="arrow-back" size={24} color={colors.text} />
          </Pressable>
          <View style={styles.categoryBadge}>
            <Text style={styles.categoryText}>{venue.category}</Text>
          </View>
        </View>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Venue Header */}
        <View style={styles.header}>
          <View style={styles.titleRow}>
            <Text style={styles.venueName}>{venue.name}</Text>
            <View style={styles.priceContainer}>
              <Text style={styles.priceRange}>{venue.priceRange}</Text>
            </View>
          </View>
          
          <View style={styles.locationRow}>
            <Ionicons name="location" size={16} color={colors.textMuted} />
            <Text style={styles.address}>{venue.address}</Text>
          </View>
          
          <View style={styles.ratingRow}>
            <View style={styles.rating}>
              <Ionicons name="star" size={16} color={colors.warning} />
              <Text style={styles.ratingText}>{venue.rating}</Text>
              <Text style={styles.ratingCount}>• {venue.capacity} capacity</Text>
            </View>
            <View style={styles.hoursContainer}>
              <Ionicons name="time" size={16} color={colors.textMuted} />
              <Text style={styles.hoursText}>{venue.openHours}</Text>
            </View>
          </View>
        </View>

        {/* Description */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>About</Text>
          <Text style={styles.description}>{venue.description}</Text>
        </View>

        {/* Features */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Features</Text>
          <View style={styles.featuresGrid}>
            {venue.features.map((feature, index) => (
              <View key={index} style={styles.featureItem}>
                <Ionicons name="checkmark-circle" size={16} color={colors.success} />
                <Text style={styles.featureText}>{feature}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Details */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Details</Text>
          
          <View style={styles.detailRow}>
            <View style={styles.detailItem}>
              <Ionicons name="people" size={20} color={colors.accent} />
              <View style={styles.detailContent}>
                <Text style={styles.detailLabel}>Capacity</Text>
                <Text style={styles.detailValue}>{venue.capacity} people</Text>
              </View>
            </View>
          </View>
          
          <View style={styles.detailRow}>
            <View style={styles.detailItem}>
              <Ionicons name="card" size={20} color={colors.accent} />
              <View style={styles.detailContent}>
                <Text style={styles.detailLabel}>Minimum Spend</Text>
                <Text style={styles.detailValue}>${venue.minSpend} per table</Text>
              </View>
            </View>
          </View>
          
          <View style={styles.detailRow}>
            <View style={styles.detailItem}>
              <Ionicons name="shirt" size={20} color={colors.accent} />
              <View style={styles.detailContent}>
                <Text style={styles.detailLabel}>Dress Code</Text>
                <Text style={styles.detailValue}>{venue.dresscode}</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Bottom spacing for floating button */}
        <View style={styles.bottomSpacing} />
      </ScrollView>

      {/* Floating Book Button */}
      <View style={styles.bookingContainer}>
        <View style={styles.bookingInfo}>
          <Text style={styles.bookingLabel}>Starting from</Text>
          <Text style={styles.bookingPrice}>${venue.minSpend}</Text>
        </View>
        <Pressable 
          style={({ pressed }) => [
            styles.bookButton,
            pressed && styles.bookButtonPressed,
          ]}
          onPress={() => onBookTable(venue)}
        >
          <Text style={styles.bookButtonText}>Reserve Table</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  imageContainer: {
    height: 280,
    position: 'relative',
  },
  heroImage: {
    width: '100%',
    height: '100%',
  },
  imageOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    padding: spacing.lg,
    paddingTop: spacing.xxxl + spacing.lg,
  },
  backButton: {
    width: 40,
    height: 40,
    backgroundColor: colors.background + 'CC',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  categoryBadge: {
    backgroundColor: colors.accent + 'CC',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: 8,
  },
  categoryText: {
    ...typography.caption,
    color: colors.text,
    fontWeight: '600',
  },
  content: {
    flex: 1,
  },
  header: {
    padding: spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: spacing.sm,
  },
  venueName: {
    ...typography.largeTitle,
    flex: 1,
    marginRight: spacing.md,
  },
  priceContainer: {
    backgroundColor: colors.backgroundCard,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
  },
  priceRange: {
    ...typography.caption,
    fontWeight: '600',
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    marginBottom: spacing.sm,
  },
  address: {
    ...typography.bodySecondary,
  },
  ratingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  rating: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  ratingText: {
    ...typography.body,
    fontWeight: '600',
  },
  ratingCount: {
    ...typography.bodySecondary,
  },
  hoursContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  hoursText: {
    ...typography.caption,
  },
  section: {
    padding: spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  sectionTitle: {
    ...typography.title,
    marginBottom: spacing.md,
  },
  description: {
    ...typography.body,
    lineHeight: 24,
  },
  featuresGrid: {
    gap: spacing.sm,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  featureText: {
    ...typography.body,
  },
  detailRow: {
    marginBottom: spacing.md,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  detailContent: {
    flex: 1,
  },
  detailLabel: {
    ...typography.caption,
    marginBottom: spacing.xs,
  },
  detailValue: {
    ...typography.body,
    fontWeight: '600',
  },
  bottomSpacing: {
    height: 100,
  },
  bookingContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: colors.backgroundCard,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    padding: spacing.lg,
    paddingBottom: spacing.lg + spacing.lg,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  bookingInfo: {
    flex: 1,
  },
  bookingLabel: {
    ...typography.caption,
    marginBottom: spacing.xs,
  },
  bookingPrice: {
    ...typography.title,
    color: colors.accent,
  },
  bookButton: {
    backgroundColor: colors.accent,
    borderRadius: 12,
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.md,
  },
  bookButtonPressed: {
    opacity: 0.8,
  },
  bookButtonText: {
    ...typography.body,
    color: colors.text,
    fontWeight: '600',
  },
}); 