import { colors } from './colors';

export const typography = {
  // Font sizes
  largeTitle: {
    fontSize: 28,
    fontWeight: '700' as const,
    color: colors.text,
    lineHeight: 34,
  },
  
  title: {
    fontSize: 20,
    fontWeight: '600' as const,
    color: colors.text,
    lineHeight: 26,
  },
  
  headline: {
    fontSize: 18,
    fontWeight: '600' as const,
    color: colors.text,
    lineHeight: 24,
  },
  
  body: {
    fontSize: 16,
    fontWeight: '400' as const,
    color: colors.text,
    lineHeight: 22,
  },
  
  bodySecondary: {
    fontSize: 16,
    fontWeight: '400' as const,
    color: colors.textSecondary,
    lineHeight: 22,
  },
  
  caption: {
    fontSize: 14,
    fontWeight: '400' as const,
    color: colors.textSecondary,
    lineHeight: 20,
  },
  
  small: {
    fontSize: 12,
    fontWeight: '400' as const,
    color: colors.textMuted,
    lineHeight: 16,
  },
  
  // Special styles
  accent: {
    fontSize: 16,
    fontWeight: '600' as const,
    color: colors.accent,
    lineHeight: 22,
  },
}; 