import React from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ComponentProps } from '../types';
import { colors } from '../styles/colors';
import { spacing } from '../styles/spacing';
import { typography } from '../styles/typography';

interface Props extends ComponentProps {
  // Home screen specific props can go here
}

export const HomeScreen: React.FC<Props> = () => {
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Text style={styles.logo}>NightCrew</Text>
        <Text style={styles.subtitle}>Your VIP nightlife awaits</Text>
      </View>
      
      <View style={styles.content}>
        <FeatureCard
          icon="search"
          title="Discover Venues"
          description="Find premium nightclubs and lounges in your area"
        />
        
        <FeatureCard
          icon="people"
          title="Coordinate Groups"
          description="Invite friends and split bills automatically"
        />
        
        <FeatureCard
          icon="star"
          title="VIP Access"
          description="Skip lines with guaranteed table reservations"
        />
        
        <View style={styles.statusCard}>
          <Ionicons name="checkmark-circle" size={20} color={colors.success} />
          <Text style={styles.statusText}>
            MVP Version - Basic Navigation Ready
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

interface FeatureCardProps {
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description }) => {
  return (
    <Pressable 
      style={({ pressed }) => [
        styles.card,
        pressed && styles.cardPressed,
      ]}
    >
      <View style={styles.cardContent}>
        <View style={styles.cardIcon}>
          <Ionicons name={icon} size={24} color={colors.accent} />
        </View>
        <View style={styles.cardText}>
          <Text style={styles.cardTitle}>{title}</Text>
          <Text style={styles.cardDescription}>{description}</Text>
        </View>
        <Ionicons name="chevron-forward" size={20} color={colors.textMuted} />
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    alignItems: 'center',
    paddingTop: spacing.xxxl + spacing.lg,
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.xl,
  },
  logo: {
    ...typography.largeTitle,
    color: colors.accent,
    marginBottom: spacing.xs,
  },
  subtitle: {
    ...typography.bodySecondary,
    textAlign: 'center',
  },
  content: {
    padding: spacing.lg,
  },
  card: {
    backgroundColor: colors.backgroundCard,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    marginBottom: spacing.md,
  },
  cardPressed: {
    opacity: 0.8,
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.lg,
  },
  cardIcon: {
    width: 40,
    height: 40,
    backgroundColor: colors.accentMuted,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  cardText: {
    flex: 1,
  },
  cardTitle: {
    ...typography.headline,
    marginBottom: spacing.xs,
  },
  cardDescription: {
    ...typography.caption,
  },
  statusCard: {
    backgroundColor: colors.backgroundCard,
    borderWidth: 1,
    borderColor: colors.success,
    borderRadius: 12,
    padding: spacing.lg,
    marginTop: spacing.lg,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  statusText: {
    ...typography.body,
    color: colors.success,
    marginLeft: spacing.sm,
  },
}); 