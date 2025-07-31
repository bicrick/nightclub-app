import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { ComponentProps } from '../types';
import { colors } from '../styles/colors';
import { spacing } from '../styles/spacing';

interface Props extends ComponentProps {
  // Home screen specific props can go here
}

export const HomeScreen: React.FC<Props> = () => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.logo}>NightCrew</Text>
        <Text style={styles.subtitle}>Your VIP nightlife awaits</Text>
      </View>
      
      <View style={styles.content}>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>🎯 Discover Venues</Text>
          <Text style={styles.cardDescription}>
            Find premium nightclubs and lounges in your area
          </Text>
        </View>
        
        <View style={styles.card}>
          <Text style={styles.cardTitle}>👥 Coordinate Groups</Text>
          <Text style={styles.cardDescription}>
            Invite friends and split bills automatically
          </Text>
        </View>
        
        <View style={styles.card}>
          <Text style={styles.cardTitle}>🏆 VIP Access</Text>
          <Text style={styles.cardDescription}>
            Skip lines with guaranteed table reservations
          </Text>
        </View>
        
        <View style={styles.statusCard}>
          <Text style={styles.statusText}>
            🚀 MVP Version - Basic Navigation Ready
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    alignItems: 'center',
    paddingTop: spacing.xxxl,
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.xl,
  },
  logo: {
    fontSize: 32,
    fontWeight: '700',
    color: colors.primary,
    marginBottom: spacing.sm,
  },
  subtitle: {
    fontSize: 16,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  content: {
    padding: spacing.lg,
  },
  card: {
    backgroundColor: colors.cardBackground,
    borderWidth: 1,
    borderColor: colors.borderColor,
    borderRadius: 16,
    padding: spacing.lg,
    marginBottom: spacing.md,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginBottom: spacing.sm,
  },
  cardDescription: {
    fontSize: 14,
    color: colors.textSecondary,
    lineHeight: 20,
  },
  statusCard: {
    backgroundColor: colors.success + '20',
    borderWidth: 1,
    borderColor: colors.success,
    borderRadius: 16,
    padding: spacing.lg,
    marginTop: spacing.lg,
    alignItems: 'center',
  },
  statusText: {
    fontSize: 16,
    color: colors.success,
    fontWeight: '600',
  },
}); 