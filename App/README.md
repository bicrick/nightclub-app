# NightCrew React Native App

A React Native iOS app for premium nightclub table reservations with Firebase authentication.

## Features

- ✅ Email/Password Authentication
- ✅ Apple Sign In (iOS only)
- ⚠️ Google Sign In (requires configuration)
- ✅ Automatic auth state management
- ✅ TypeScript support
- ✅ Modern component architecture

## Prerequisites

- Node.js 18+
- Expo CLI (`npm install -g @expo/cli`)
- iOS Simulator or physical iOS device
- Firebase project

## Setup Instructions

### 1. Firebase Configuration

1. Create a new Firebase project at [Firebase Console](https://console.firebase.google.com)
2. Enable Authentication and add Email/Password provider
3. Get your Firebase config from Project Settings > General > Your apps
4. Replace the placeholder values in `src/config/firebase.ts`:

```typescript
const firebaseConfig = {
  apiKey: "your-api-key",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789",
  appId: "your-app-id"
};
```

### 2. Apple Sign In Setup (iOS)

Apple Sign In is already configured in the app. To enable it:

1. In Firebase Console, go to Authentication > Sign-in method
2. Enable "Apple" provider
3. Add your iOS bundle identifier: `com.nightcrew.app`

### 3. Google Sign In Setup (Optional)

To enable Google Sign In:

1. Follow [Firebase Google Sign-In setup guide](https://firebase.google.com/docs/auth/react-native/google-signin)
2. Download GoogleService-Info.plist and add to your project
3. Update the GoogleSignInButton component implementation

### 4. Install Dependencies

```bash
npm install
```

### 5. Run the App

```bash
# Start the development server
npm start

# Run on iOS simulator
npm run ios

# Run on physical device (scan QR code with Expo Go app)
```

## Project Structure

```
src/
├── components/
│   ├── auth/           # Authentication components
│   └── common/         # Reusable UI components
├── screens/
│   ├── auth/           # Authentication screens
│   └── HomeScreen.tsx  # Main app screen
├── services/
│   └── auth/           # Authentication services
├── contexts/           # React contexts
├── types/              # TypeScript type definitions
├── styles/             # Theme and styling
└── config/             # App configuration
```

## Authentication Flow

1. App starts with loading screen
2. If user is authenticated → HomeScreen
3. If user is not authenticated → AuthScreen
4. AuthScreen supports:
   - Email/Password sign in/up
   - Apple Sign In (iOS only)
   - Google Sign In (requires configuration)

## Next Steps

- Configure Google Sign In credentials
- Add React Navigation for multi-screen navigation
- Implement nightclub-specific features
- Add proper error boundaries
- Set up proper environment configurations
- Add testing setup

## Architecture Notes

- Uses Firebase Auth for authentication
- TypeScript for type safety
- Context API for state management
- Component-based architecture
- Follows React Native best practices

## Troubleshooting

### Firebase Connection Issues
- Verify your Firebase config is correct
- Check that Authentication is enabled in Firebase Console
- Ensure your bundle identifier matches Firebase settings

### Apple Sign In Issues
- Only works on iOS devices/simulator
- Requires proper bundle identifier configuration
- Test with real device for full functionality

### Google Sign In Issues
- Requires additional setup (GoogleService-Info.plist)
- Need to configure OAuth consent screen
- Follow Firebase documentation for complete setup

## Support

For issues or questions, check the Firebase documentation or React Native guides. 