import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Firebase configuration from GoogleService-Info.plist
const firebaseConfig = {
  apiKey: "AIzaSyCfMGJPnz6sCGdnpfZdhqSXbfs_aduO6ZA",
  authDomain: "nightclub-app-810f0.firebaseapp.com",
  projectId: "nightclub-app-810f0",
  storageBucket: "nightclub-app-810f0.firebasestorage.app",
  messagingSenderId: "757393661570",
  appId: "1:757393661570:ios:3a7104ea12383a481f5e9b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);

export default app; 