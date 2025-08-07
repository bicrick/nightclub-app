import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { ComponentProps, LoginCredentials, SignUpCredentials } from '../../types';
import { colors } from '../../styles/colors';
import { spacing } from '../../styles/spacing';
import { Button } from '../../components/common/Button';
import { TextInput } from '../../components/common/TextInput';
import { AppleSignInButton } from '../../components/auth/AppleSignInButton';
import { GoogleSignInButton } from '../../components/auth/GoogleSignInButton';
import { AuthService } from '../../services/auth/authService';

interface Props extends ComponentProps {}

type AuthMode = 'signin' | 'signup';

export const AuthScreen: React.FC<Props> = () => {
  const [authMode, setAuthMode] = useState<AuthMode>('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{
    email?: string;
    password?: string;
    confirmPassword?: string;
  }>({});

  const validateForm = (): boolean => {
    const newErrors: typeof errors = {};
    
    if (!email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Please enter a valid email';
    }
    
    if (!password.trim()) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    if (authMode === 'signup') {
      if (!confirmPassword.trim()) {
        newErrors.confirmPassword = 'Please confirm your password';
      } else if (password !== confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleEmailAuth = async () => {
    if (!validateForm()) return;
    
    setLoading(true);
    try {
      if (authMode === 'signin') {
        const credentials: LoginCredentials = { email, password };
        await AuthService.signInWithEmail(credentials);
        // Navigation handled automatically by auth context
      } else {
        const credentials: SignUpCredentials = { email, password, confirmPassword };
        await AuthService.signUpWithEmail(credentials);
        // Navigation handled automatically by auth context
      }
    } catch (error: any) {
      Alert.alert('Error', error.message || 'Authentication failed');
    } finally {
      setLoading(false);
    }
  };

  const handleSocialAuthSuccess = () => {
    // Navigation handled automatically by auth context
  };

  const handleSocialAuthError = (error: string) => {
    Alert.alert('Error', error);
  };

  const toggleAuthMode = () => {
    setAuthMode(authMode === 'signin' ? 'signup' : 'signin');
    setErrors({});
    setEmail('');
    setPassword('');
    setConfirmPassword('');
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
    >
      <StatusBar style="dark" />
      <ScrollView 
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.header}>
          <Text style={styles.title}>NightCrew</Text>
          <Text style={styles.subtitle}>
            {authMode === 'signin' ? 'Welcome back!' : 'Join the crew!'}
          </Text>
        </View>

                 <View style={styles.socialContainer}>
           <AppleSignInButton
             onSuccess={handleSocialAuthSuccess}
             onError={handleSocialAuthError}
             style={styles.socialButton}
           />
           
           <GoogleSignInButton
             onSuccess={handleSocialAuthSuccess}
             onError={handleSocialAuthError}
           />
         </View>

        <View style={styles.dividerContainer}>
          <View style={styles.divider} />
          <Text style={styles.dividerText}>or</Text>
          <View style={styles.divider} />
        </View>

        <View style={styles.formContainer}>
          <TextInput
            label="Email"
            placeholder="Enter your email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
            error={errors.email}
          />

          <TextInput
            label="Password"
            placeholder="Enter your password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            error={errors.password}
          />

          {authMode === 'signup' && (
            <TextInput
              label="Confirm Password"
              placeholder="Confirm your password"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry
              error={errors.confirmPassword}
            />
          )}

          <Button
            title={authMode === 'signin' ? 'Sign In' : 'Sign Up'}
            onPress={handleEmailAuth}
            loading={loading}
            style={styles.authButton}
          />
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>
            {authMode === 'signin' 
              ? "Don't have an account? " 
              : "Already have an account? "
            }
          </Text>
          <Button
            title={authMode === 'signin' ? 'Sign Up' : 'Sign In'}
            onPress={toggleAuthMode}
            variant="outline"
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.xl,
    paddingBottom: spacing.xl,
    minHeight: '100%',
  },
  header: {
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: colors.primary,
    marginBottom: spacing.xs,
  },
  subtitle: {
    fontSize: 16,
    color: colors.text.secondary,
    textAlign: 'center',
  },
  socialContainer: {
    marginBottom: spacing.lg,
  },
  socialButton: {
    marginBottom: spacing.sm,
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: spacing.lg,
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: colors.divider,
  },
  dividerText: {
    paddingHorizontal: spacing.lg,
    color: colors.text.secondary,
    fontSize: 14,
    fontWeight: '500',
  },
  formContainer: {
    marginBottom: spacing.lg,
  },
  authButton: {
    marginTop: spacing.lg,
  },
  footer: {
    alignItems: 'center',
    paddingTop: spacing.md,
  },
  footerText: {
    fontSize: 14,
    color: colors.text.secondary,
    marginBottom: spacing.lg,
    textAlign: 'center',
  },
}); 