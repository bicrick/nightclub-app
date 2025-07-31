# NightCrew iOS App - Framework Guide

## Project Overview

**NightCrew** is a React Native iOS application for premium nightclub table reservations, group coordination, and bill splitting. This document serves as the definitive technical reference for the project.

---

## Technology Stack

### **Core Framework**
- **React Native 0.73+** with **Expo 50+**
- **TypeScript** for type safety
- **Metro** bundler for development
- **Flipper** for debugging (optional)

### **State Management**
```typescript
// Primary: Redux Toolkit + React Query
- @reduxjs/toolkit: Global state management
- react-query: Server state & caching
- @reduxjs/toolkit/query: API layer (alternative to react-query)
- react-redux: React bindings for Redux
```

### **Navigation**
```typescript
// React Navigation v6
- @react-navigation/native: Core navigation
- @react-navigation/stack: Stack navigation
- @react-navigation/bottom-tabs: Tab navigation
- @react-navigation/drawer: Side drawer (if needed)
```

### **UI Framework & Styling**
```typescript
// UI Components
- react-native-elements: Base UI components
- react-native-vector-icons: Icon library
- react-native-paper: Material Design components (alternative)

// Styling & Animation
- react-native-reanimated: Advanced animations
- react-native-gesture-handler: Touch gestures
- react-native-linear-gradient: Gradient backgrounds
- lottie-react-native: Complex animations
- styled-components/native: CSS-in-JS styling
```

### **Backend & Database**
```typescript
// Firebase Integration
- @react-native-firebase/app: Core Firebase
- @react-native-firebase/auth: Authentication
- @react-native-firebase/firestore: Real-time database
- @react-native-firebase/storage: File storage
- @react-native-firebase/functions: Cloud functions
- @react-native-firebase/messaging: Push notifications

// HTTP Client
- axios: HTTP requests
- react-native-config: Environment variables
```

### **Feature-Specific Libraries**
```typescript
// Payments
- @stripe/stripe-react-native: Payment processing
- react-native-apple-pay: Apple Pay integration

// Location & Maps
- react-native-maps: Map components
- @react-native-community/geolocation: Location services
- react-native-geocoding: Address conversion

// Camera & QR
- react-native-camera: Camera access
- react-native-qrcode-scanner: QR code scanning
- react-native-qrcode-svg: QR code generation

// Social & Communication
- react-native-contacts: Contact access
- react-native-share: Social sharing
- socket.io-client: Real-time communication

// Utilities
- react-native-keychain: Secure storage
- @react-native-async-storage/async-storage: Local storage
- react-native-device-info: Device information
- react-native-permissions: Permission handling
```

---

## Project Setup

### **Installation Commands**

```bash
# 1. Create Expo project
npx create-expo-app NightCrewApp --template blank-typescript
cd NightCrewApp

# 2. Install core dependencies
npm install @react-navigation/native @react-navigation/stack @react-navigation/bottom-tabs
npm install @reduxjs/toolkit react-redux react-query
npm install react-native-reanimated react-native-gesture-handler

# 3. Install UI libraries
npm install react-native-elements react-native-vector-icons
npm install react-native-linear-gradient lottie-react-native
npm install styled-components

# 4. Install Firebase
npm install @react-native-firebase/app @react-native-firebase/auth
npm install @react-native-firebase/firestore @react-native-firebase/functions

# 5. Install feature libraries
npm install @stripe/stripe-react-native react-native-maps
npm install react-native-camera react-native-qrcode-scanner
npm install socket.io-client axios react-native-config

# 6. Install development dependencies
npm install --save-dev @types/react @types/react-native
npm install --save-dev eslint prettier @typescript-eslint/parser
npm install --save-dev jest @testing-library/react-native
```

### **Package.json Scripts**

```json
{
  "scripts": {
    "start": "expo start",
    "ios": "expo start --ios",
    "android": "expo start --android",
    "web": "expo start --web",
    "ios-sim": "expo run:ios",
    "ios-device": "expo run:ios --device",
    "build:ios": "eas build --platform ios",
    "build:ios-sim": "eas build --platform ios --profile development",
    "test": "jest",
    "test:watch": "jest --watch",
    "lint": "eslint . --ext .js,.jsx,.ts,.tsx",
    "lint:fix": "eslint . --ext .js,.jsx,.ts,.tsx --fix",
    "format": "prettier --write \"**/*.{js,jsx,ts,tsx,json,md}\"",
    "type-check": "tsc --noEmit",
    "clean": "expo r -c",
    "prebuild": "expo prebuild --clean"
  }
}
```

---

## Project Structure

```
NightCrewApp/
├── package.json
├── app.json                 # Expo configuration
├── eas.json                 # EAS Build configuration
├── tsconfig.json           # TypeScript configuration
├── babel.config.js         # Babel configuration
├── metro.config.js         # Metro bundler configuration
├── App.tsx                 # Root component
├── src/
│   ├── components/         # Reusable UI components
│   │   ├── common/         # Generic components
│   │   │   ├── Button.tsx
│   │   │   ├── Card.tsx
│   │   │   ├── Input.tsx
│   │   │   └── LoadingSpinner.tsx
│   │   ├── venue/          # Venue-specific components
│   │   │   ├── VenueCard.tsx
│   │   │   ├── VenueList.tsx
│   │   │   └── VenueMap.tsx
│   │   ├── booking/        # Booking components
│   │   │   ├── BookingCard.tsx
│   │   │   ├── BookingFlow.tsx
│   │   │   └── QRCode.tsx
│   │   ├── payment/        # Payment components
│   │   │   ├── PaymentForm.tsx
│   │   │   ├── BillSplitter.tsx
│   │   │   └── PaymentPool.tsx
│   │   └── group/          # Group management
│   │       ├── GroupCreator.tsx
│   │       ├── MemberList.tsx
│   │       └── InviteFlow.tsx
│   ├── screens/            # Screen components
│   │   ├── auth/
│   │   │   ├── LoginScreen.tsx
│   │   │   ├── SignupScreen.tsx
│   │   │   └── ForgotPasswordScreen.tsx
│   │   ├── venues/
│   │   │   ├── VenuesScreen.tsx
│   │   │   ├── VenueDetailScreen.tsx
│   │   │   └── MapScreen.tsx
│   │   ├── booking/
│   │   │   ├── BookingScreen.tsx
│   │   │   ├── BookingDetailScreen.tsx
│   │   │   └── QRScreen.tsx
│   │   ├── groups/
│   │   │   ├── GroupsScreen.tsx
│   │   │   ├── GroupDetailScreen.tsx
│   │   │   └── CreateGroupScreen.tsx
│   │   ├── payments/
│   │   │   ├── PaymentScreen.tsx
│   │   │   ├── BillSplitScreen.tsx
│   │   │   └── PaymentHistoryScreen.tsx
│   │   └── profile/
│   │       ├── ProfileScreen.tsx
│   │       ├── SettingsScreen.tsx
│   │       └── NotificationsScreen.tsx
│   ├── navigation/         # Navigation configuration
│   │   ├── AppNavigator.tsx
│   │   ├── AuthNavigator.tsx
│   │   ├── TabNavigator.tsx
│   │   └── types.ts
│   ├── store/              # Redux store configuration
│   │   ├── index.ts        # Store configuration
│   │   ├── slices/         # Redux slices
│   │   │   ├── authSlice.ts
│   │   │   ├── venuesSlice.ts
│   │   │   ├── bookingsSlice.ts
│   │   │   ├── groupsSlice.ts
│   │   │   └── paymentsSlice.ts
│   │   └── middleware/     # Custom middleware
│   │       └── logger.ts
│   ├── services/           # API and external services
│   │   ├── api/            # API clients
│   │   │   ├── client.ts   # Axios configuration
│   │   │   ├── auth.ts     # Authentication API
│   │   │   ├── venues.ts   # Venues API
│   │   │   ├── bookings.ts # Bookings API
│   │   │   ├── groups.ts   # Groups API
│   │   │   └── payments.ts # Payments API
│   │   ├── firebase/       # Firebase services
│   │   │   ├── config.ts   # Firebase configuration
│   │   │   ├── auth.ts     # Firebase Auth
│   │   │   ├── firestore.ts # Firestore operations
│   │   │   └── functions.ts # Cloud Functions
│   │   ├── stripe/         # Stripe payment services
│   │   │   ├── config.ts
│   │   │   └── payments.ts
│   │   └── notifications/  # Push notification services
│   │       ├── config.ts
│   │       └── handlers.ts
│   ├── hooks/              # Custom React hooks
│   │   ├── useAuth.ts
│   │   ├── useVenues.ts
│   │   ├── useBookings.ts
│   │   ├── useGroups.ts
│   │   ├── usePayments.ts
│   │   └── useLocation.ts
│   ├── utils/              # Utility functions
│   │   ├── constants.ts    # App constants
│   │   ├── helpers.ts      # Helper functions
│   │   ├── validators.ts   # Form validation
│   │   ├── formatters.ts   # Data formatters
│   │   └── permissions.ts  # Permission helpers
│   ├── types/              # TypeScript type definitions
│   │   ├── auth.ts
│   │   ├── venues.ts
│   │   ├── bookings.ts
│   │   ├── groups.ts
│   │   ├── payments.ts
│   │   └── navigation.ts
│   └── styles/             # Styling and themes
│       ├── theme.ts        # App theme configuration
│       ├── colors.ts       # Color palette
│       ├── typography.ts   # Typography styles
│       └── spacing.ts      # Spacing constants
├── assets/                 # Static assets
│   ├── images/
│   ├── icons/
│   ├── fonts/
│   └── animations/
├── __tests__/              # Test files
│   ├── components/
│   ├── screens/
│   ├── services/
│   └── utils/
└── docs/                   # Documentation
    ├── API.md
    ├── DEPLOYMENT.md
    └── TESTING.md
```

---

## Development Workflow

### **Daily Development Commands**

```bash
# Start development server
npm start

# Run iOS simulator
npm run ios

# Run on physical iOS device
npm run ios-device

# Run tests
npm test

# Type checking
npm run type-check

# Linting and formatting
npm run lint
npm run format

# Clean cache (when things break)
npm run clean
```

### **Git Workflow**

```bash
# Branch naming convention
feature/venue-discovery
bugfix/payment-validation
hotfix/critical-auth-issue

# Commit message format
feat: add venue search functionality
fix: resolve payment processing error
docs: update API documentation
style: format code with prettier
refactor: extract payment logic to service
test: add unit tests for auth service
```

---

## Configuration Files

### **app.json (Expo Configuration)**

```json
{
  "expo": {
    "name": "NightCrew",
    "slug": "nightcrew-app",
    "version": "1.0.0",
    "orientation": "portrait",
    "icon": "./assets/images/icon.png",
    "userInterfaceStyle": "dark",
    "splash": {
      "image": "./assets/images/splash.png",
      "resizeMode": "contain",
      "backgroundColor": "#0a0a0a"
    },
    "assetBundlePatterns": ["**/*"],
    "ios": {
      "supportsTablet": false,
      "bundleIdentifier": "com.nightcrew.app",
      "buildNumber": "1.0.0",
      "infoPlist": {
        "NSCameraUsageDescription": "NightCrew uses camera to scan QR codes for venue entry",
        "NSLocationWhenInUseUsageDescription": "NightCrew uses location to find nearby venues",
        "NSContactsUsageDescription": "NightCrew accesses contacts to invite friends to groups"
      }
    },
    "plugins": [
      "expo-camera",
      "expo-location",
      "expo-contacts",
      "@react-native-firebase/app",
      [
        "expo-build-properties",
        {
          "ios": {
            "useFrameworks": "static"
          }
        }
      ]
    ],
    "extra": {
      "eas": {
        "projectId": "your-project-id"
      }
    }
  }
}
```

### **TypeScript Configuration**

```json
{
  "extends": "expo/tsconfig.base",
  "compilerOptions": {
    "strict": true,
    "baseUrl": "./",
    "paths": {
      "@/*": ["src/*"],
      "@/components/*": ["src/components/*"],
      "@/screens/*": ["src/screens/*"],
      "@/services/*": ["src/services/*"],
      "@/utils/*": ["src/utils/*"],
      "@/types/*": ["src/types/*"],
      "@/hooks/*": ["src/hooks/*"],
      "@/store/*": ["src/store/*"]
    }
  },
  "include": [
    "**/*.ts",
    "**/*.tsx",
    ".expo/types/**/*.ts",
    "expo-env.d.ts"
  ]
}
```

---

## Architecture Patterns

### **Component Structure**
```typescript
// Standard component template
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ComponentProps } from '@/types';

interface Props extends ComponentProps {
  // Component-specific props
}

export const ComponentName: React.FC<Props> = ({ 
  // destructured props 
}) => {
  // Component logic

  return (
    <View style={styles.container}>
      {/* Component JSX */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // styles
  },
});
```

### **Service Layer Pattern**
```typescript
// API service template
class VenueService {
  private baseURL = '/api/venues';

  async getVenues(params?: VenueParams): Promise<Venue[]> {
    // Implementation
  }

  async getVenue(id: string): Promise<Venue> {
    // Implementation
  }

  async createBooking(venueId: string, booking: BookingData): Promise<Booking> {
    // Implementation
  }
}

export const venueService = new VenueService();
```

### **Redux Slice Pattern**
```typescript
// Redux slice template
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface StateType {
  // State shape
}

const initialState: StateType = {
  // Initial state
};

const sliceName = createSlice({
  name: 'sliceName',
  initialState,
  reducers: {
    // Synchronous actions
  },
  extraReducers: (builder) => {
    // Async actions
  },
});

export const { actions } = sliceName;
export default sliceName.reducer;
```

---

## Development Guidelines

### **Code Style**
- Use TypeScript for all new files
- Follow ESLint and Prettier configurations
- Use functional components with hooks
- Prefer const assertions for type safety
- Use descriptive variable and function names

### **State Management Rules**
- Use Redux for global state (user, auth, app settings)
- Use React Query for server state (API data)
- Use local state for component-specific state
- Avoid prop drilling beyond 2-3 levels

### **Performance Guidelines**
- Use React.memo for expensive components
- Implement lazy loading for screens
- Optimize images and use appropriate formats
- Use FlatList for long lists
- Implement proper error boundaries

### **Testing Strategy**
- Unit tests for utilities and services
- Component tests for UI components
- Integration tests for critical flows
- E2E tests for main user journeys

---

## Environment Configuration

### **.env Files**
```bash
# .env.development
EXPO_PUBLIC_API_BASE_URL=http://localhost:3000/api
EXPO_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
EXPO_PUBLIC_FIREBASE_API_KEY=your_firebase_key

# .env.production
EXPO_PUBLIC_API_BASE_URL=https://api.nightcrew.com
EXPO_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...
EXPO_PUBLIC_FIREBASE_API_KEY=your_production_firebase_key
```

---

## Deployment

### **Build Profiles (eas.json)**
```json
{
  "cli": {
    "version": ">= 5.9.0"
  },
  "build": {
    "development": {
      "developmentClient": true,
      "distribution": "internal",
      "ios": {
        "resourceClass": "m1-medium"
      }
    },
    "preview": {
      "distribution": "internal",
      "ios": {
        "simulator": true
      }
    },
    "production": {
      "ios": {
        "resourceClass": "m1-medium"
      }
    }
  }
}
```

### **Build Commands**
```bash
# Development build for testing
npm run build:ios-sim

# Production build for App Store
npm run build:ios

# Submit to App Store
eas submit --platform ios
```

---

## Troubleshooting

### **Common Issues**
1. **Metro bundler cache issues**: Run `npm run clean`
2. **iOS simulator not starting**: Check Xcode installation
3. **TypeScript errors**: Run `npm run type-check`
4. **Build failures**: Check `eas.json` configuration
5. **Permission issues**: Update `app.json` permissions

### **Debug Tools**
- **Flipper**: React Native debugging
- **React DevTools**: Component inspection
- **Redux DevTools**: State debugging
- **Network Inspector**: API debugging
- **Xcode Debugger**: Native debugging

---

This framework guide should be referenced throughout development and updated as the project evolves. All team members should familiarize themselves with these conventions and patterns. 