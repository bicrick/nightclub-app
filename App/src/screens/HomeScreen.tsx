import React from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { ComponentProps } from '../types';
import { colors } from '../styles/colors';
import { spacing } from '../styles/spacing';
import { Button } from '../components/common/Button';
import { AuthService } from '../services/auth/authService';

interface Props extends ComponentProps {}

export const HomeScreen: React.FC<Props> = () => {
  const currentUser = AuthService.getCurrentUser();

  const handleSignOut = async () => {
    try {
      await AuthService.signOut();
      // The auth context will automatically handle navigation
    } catch (error: any) {
      Alert.alert('Error', error.message || 'Sign out failed');
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <View style={styles.header}>
        <Text style={styles.title}>Welcome to NightCrew!</Text>
        {currentUser?.email && (
          <Text style={styles.subtitle}>
            Signed in as: {currentUser.email}
          </Text>
        )}
      </View>
      
      <View style={styles.content}>
        <Text style={styles.description}>
          🎉 Authentication is working! You're ready to start building the rest of your nightclub app.
        </Text>
        
        <Text style={styles.nextSteps}>
          Next steps:{'\n'}
          • Set up Firebase project with your credentials{'\n'}
          • Configure Google Sign In{'\n'}
          • Add navigation{'\n'}
          • Build your nightclub features
        </Text>
      </View>

      <View style={styles.footer}>
        <Button
          title="Sign Out"
          onPress={handleSignOut}
          variant="outline"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.xxxl,
  },
  header: {
    alignItems: 'center',
    marginBottom: spacing.xxxl,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.primary,
    marginBottom: spacing.sm,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: colors.text.secondary,
    textAlign: 'center',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
  },
  description: {
    fontSize: 18,
    color: colors.text.primary,
    textAlign: 'center',
    marginBottom: spacing.xl,
    lineHeight: 26,
  },
  nextSteps: {
    fontSize: 16,
    color: colors.text.secondary,
    lineHeight: 24,
    backgroundColor: colors.surface,
    padding: spacing.lg,
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: colors.primary,
  },
  footer: {
    paddingTop: spacing.xl,
  },
}); 