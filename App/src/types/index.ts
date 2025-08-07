import { ViewStyle, TextStyle } from 'react-native';

export interface ComponentProps {
  style?: ViewStyle;
  testID?: string;
}

export interface TextComponentProps {
  style?: TextStyle;
  testID?: string;
}

// Re-export auth types
export * from './auth'; 