import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, Platform } from 'react-native';
import * as AppleAuthentication from 'expo-apple-authentication';
import * as Crypto from 'expo-crypto';
import { ComponentProps } from '../../types';
import { colors } from '../../styles/colors';
import { spacing } from '../../styles/spacing';
import { AuthService } from '../../services/auth/authService';
import { AppleIcon } from '../common/icons';

interface Props extends ComponentProps {
  onSuccess?: () => void;
  onError?: (error: string) => void;
}

export const AppleSignInButton: React.FC<Props> = ({
  onSuccess,
  onError,
  style,
}) => {
  const handleAppleSignIn = async () => {
    try {
      if (Platform.OS !== 'ios') {
        Alert.alert('Error', 'Apple Sign In is only available on iOS');
        return;
      }

      // Generate nonce for security
      const nonce = Math.random().toString(36).substring(2, 15);
      const hashedNonce = await Crypto.digestStringAsync(
        Crypto.CryptoDigestAlgorithm.SHA256,
        nonce,
        { encoding: Crypto.CryptoEncoding.HEX }
      );

      const credential = await AppleAuthentication.signInAsync({
        requestedScopes: [
          AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
          AppleAuthentication.AppleAuthenticationScope.EMAIL,
        ],
        nonce: hashedNonce,
      });

      if (credential.identityToken) {
        await AuthService.signInWithApple(credential.identityToken, nonce);
        onSuccess?.();
      } else {
        throw new Error('No identity token received');
      }
    } catch (error: any) {
      console.error('Apple Sign In Error:', error);
      onError?.(error.message || 'Apple Sign In failed');
    }
  };

  if (Platform.OS !== 'ios') {
    return null;
  }

  return (
    <TouchableOpacity 
      style={[styles.button, style]} 
      onPress={handleAppleSignIn}
    >
      <View style={styles.iconContainer}>
        <AppleIcon size={20} color={colors.white} />
      </View>
      <Text style={styles.buttonText}>Sign in with Apple</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.black,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    borderRadius: 8,
    minHeight: 48,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  iconContainer: {
    marginRight: spacing.sm,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: '600',
  },
}); 