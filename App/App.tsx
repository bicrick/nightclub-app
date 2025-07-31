import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { AppNavigator } from './src/navigation/AppNavigator';
import { colors } from './src/styles/colors';

export default function App() {
  return (
    <>
      <StatusBar style="light" backgroundColor={colors.background} />
      <AppNavigator />
    </>
  );
}
