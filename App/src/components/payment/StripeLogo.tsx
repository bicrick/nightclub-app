import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface Props {
  width?: number;
  height?: number;
  color?: string;
}

export const StripeLogo: React.FC<Props> = ({ 
  width = 50, 
  height = 20, 
  color = '#635BFF' 
}) => {
  const fontSize = height * 0.6; // Scale font size to height

  return (
    <View style={[styles.container, { width, height }]}>
      <Text style={[styles.stripeText, { color, fontSize }]}>
        Stripe
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  stripeText: {
    fontWeight: '600',
    letterSpacing: 0.8,
    fontFamily: 'System', // Clean system font
    textAlign: 'center',
    includeFontPadding: false, // Remove extra padding on Android
  },
}); 