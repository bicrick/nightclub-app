# Google Authentication Setup Guide

Follow these steps to get Google Sign-In working with Firebase.

## 🔧 Step 1: Google Cloud Console Setup

### A. Create OAuth 2.0 Web Client

1. **Go to Google Cloud Console** → [APIs & Services → Credentials](https://console.cloud.google.com/apis/credentials)

2. **Click "Create Credentials" → "OAuth 2.0 Client IDs"**

3. **Configure OAuth 2.0 Client ID**:
   - **Application type**: `Web application`
   - **Name**: `NightCrew Web`
   - **Authorized redirect URIs**: Add this URL:
     ```
     https://auth.expo.io/@YOUR_EXPO_USERNAME/YOUR_APP_SLUG
     ```
     Replace with your actual Expo username and app slug

4. **Save and copy the Client ID** (looks like: `123456789-abc...xyz.apps.googleusercontent.com`)

### B. Enable Google Sign-In API

1. Go to **APIs & Services → Library**
2. Search for "Google Sign-In API" 
3. Click it and press **"Enable"**

---

## 🔧 Step 2: Firebase Console Setup

1. **Go to Firebase Console** → Your project → **Authentication → Sign-in method**

2. **Click on "Google"**

3. **Enable Google Sign-In**

4. **Add your Web Client ID** from Step 1 above

5. **Save**

---

## 🔧 Step 3: Update Your App Configuration

### A. Update Firebase Config

1. **Open**: `src/config/firebase.ts`
2. **Replace** the placeholder values with your actual Firebase configuration

### B. Update Google Auth Config

1. **Open**: `src/config/googleAuth.ts`
2. **Replace**:
   ```typescript
   export const GOOGLE_WEB_CLIENT_ID = 'YOUR_ACTUAL_CLIENT_ID.apps.googleusercontent.com';
   export const FIREBASE_PROJECT_ID = 'your-firebase-project-id';
   ```

---

## 🔧 Step 4: Find Your Expo Details

To get your redirect URI, you need:

### A. Your Expo Username
```bash
npx expo whoami
```

### B. Your App Slug
Check your `app.json` file - look for the `"slug"` field.

### C. Complete Redirect URI
Format: `https://auth.expo.io/@YOUR_USERNAME/YOUR_SLUG`

Example: `https://auth.expo.io/@johndoe/nightcrew-app`

---

## 🔧 Step 5: Update Google Cloud Console (Final)

1. **Go back to Google Cloud Console** → Credentials
2. **Edit your OAuth 2.0 Web Client**
3. **Update the Authorized redirect URIs** with your actual Expo redirect URI
4. **Save**

---

## ✅ Testing

1. **Restart your Expo dev server**: `npm start`
2. **Test Google Sign-In** button
3. **Should open a web browser** for Google authentication
4. **After signing in**, should return to your app

---

## 🐛 Troubleshooting

### "Error 400: redirect_uri_mismatch"
- Check that your redirect URI in Google Cloud Console exactly matches your Expo URL
- Make sure you're using the web client ID, not iOS client ID

### "Google Sign-In is not ready"
- Verify your `GOOGLE_WEB_CLIENT_ID` is correct
- Check that the Google Sign-In API is enabled in Google Cloud Console

### "Firebase auth error"
- Ensure Google is enabled in Firebase Authentication
- Verify the web client ID is added to Firebase

### "Expo AuthSession issues"
- Try clearing Expo cache: `npx expo start --clear`
- Make sure expo-auth-session and expo-web-browser are installed

---

## 📝 Current Configuration Files to Update

1. `src/config/firebase.ts` - Your Firebase project config
2. `src/config/googleAuth.ts` - Your Google client ID

Once you complete these steps, Google Sign-In should work! 