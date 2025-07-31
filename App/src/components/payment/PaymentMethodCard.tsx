import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { PaymentMethod } from '../../utils/mockUserData';
import { colors } from '../../styles/colors';
import { spacing } from '../../styles/spacing';
import { typography } from '../../styles/typography';
import { StripeLogo } from './StripeLogo';

interface Props {
  paymentMethod: PaymentMethod;
  onPress?: () => void;
  showActions?: boolean;
}

export const PaymentMethodCard: React.FC<Props> = ({ 
  paymentMethod, 
  onPress, 
  showActions = true 
}) => {
  const getCardIcon = () => {
    switch (paymentMethod.logo) {
      case 'visa':
        return <VisaLogo />;
      case 'mastercard':
        return <MastercardLogo />;
      case 'apple_pay':
        return <ApplePayLogo />;
      default:
        return <Ionicons name="card" size={24} color={colors.textMuted} />;
    }
  };

  const getProviderInfo = () => {
    if (paymentMethod.provider === 'stripe') {
      return (
        <View style={styles.providerContainer}>
          <Text style={styles.providerText}>Powered by</Text>
          <StripeLogo width={40} height={16} color="#ff0000" />
        </View>
      );
    }
    return null;
  };

  const getDisplayText = () => {
    if (paymentMethod.type === 'card') {
      return `•••• •••• •••• ${paymentMethod.last4}`;
    } else if (paymentMethod.type === 'apple_pay') {
      return 'Apple Pay';
    }
    return 'Payment Method';
  };

  return (
    <Pressable 
      style={({ pressed }) => [
        styles.container,
        pressed && styles.pressed,
        paymentMethod.isDefault && styles.defaultBorder,
      ]}
      onPress={onPress}
    >
      <View style={styles.content}>
        <View style={styles.cardInfo}>
          <View style={styles.iconContainer}>
            {getCardIcon()}
          </View>
          
          <View style={styles.details}>
            <View style={styles.cardRow}>
              <Text style={styles.cardNumber}>{getDisplayText()}</Text>
              {paymentMethod.isDefault && (
                <View style={styles.defaultBadge}>
                  <Text style={styles.defaultText}>Default</Text>
                </View>
              )}
            </View>
            
            {paymentMethod.brand && (
              <Text style={styles.cardBrand}>{paymentMethod.brand}</Text>
            )}
            
            {getProviderInfo()}
          </View>
        </View>

        {showActions && (
          <View style={styles.actions}>
            <Ionicons name="chevron-forward" size={20} color={colors.textMuted} />
          </View>
        )}
      </View>
    </Pressable>
  );
};

// Official Stripe Logo Component imported from StripeLogo.tsx

// Card Brand Logo Components
const VisaLogo: React.FC = () => (
  <View style={[styles.cardLogo, { backgroundColor: '#1A1F71' }]}>
    <Text style={styles.cardLogoText}>VISA</Text>
  </View>
);

const MastercardLogo: React.FC = () => (
  <View style={styles.mastercardContainer}>
    <View style={[styles.mastercardCircle, { backgroundColor: '#EB001B' }]} />
    <View style={[styles.mastercardCircle, styles.mastercardOverlap, { backgroundColor: '#F79E1B' }]} />
  </View>
);

const ApplePayLogo: React.FC = () => (
  <View style={[styles.cardLogo, { backgroundColor: '#000000' }]}>
    <Text style={styles.cardLogoText}> Pay</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.backgroundCard,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: spacing.sm,
  },
  pressed: {
    opacity: 0.8,
  },
  defaultBorder: {
    borderColor: colors.accent,
    borderWidth: 2,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.md,
  },
  cardInfo: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: 48,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  details: {
    flex: 1,
  },
  cardRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.xs,
  },
  cardNumber: {
    ...typography.body,
    fontFamily: 'Courier',
    letterSpacing: 1,
  },
  cardBrand: {
    ...typography.caption,
    marginBottom: spacing.xs,
  },
  defaultBadge: {
    backgroundColor: colors.accent,
    paddingHorizontal: spacing.sm,
    paddingVertical: 2,
    borderRadius: 4,
  },
  defaultText: {
    ...typography.small,
    color: colors.text,
    fontWeight: '600',
  },
  providerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  providerText: {
    ...typography.small,
    color: colors.textMuted,
  },
  actions: {
    padding: spacing.xs,
  },
  
  // Card Logo Styles
  cardLogo: {
    width: 40,
    height: 24,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardLogoText: {
    fontSize: 10,
    fontWeight: '700',
    color: 'white',
    letterSpacing: 0.5,
  },
  
  // Mastercard specific styles
  mastercardContainer: {
    width: 40,
    height: 24,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mastercardCircle: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  mastercardOverlap: {
    marginLeft: -6,
  },
}); 