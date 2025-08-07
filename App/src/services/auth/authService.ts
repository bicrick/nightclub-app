import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  User,
  GoogleAuthProvider,
  signInWithCredential,
  OAuthProvider,
} from 'firebase/auth';
import { auth } from '../../config/firebase';
import { LoginCredentials, SignUpCredentials, AuthError } from '../../types';

export class AuthService {
  static async signInWithEmail({ email, password }: LoginCredentials): Promise<User> {
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      return result.user;
    } catch (error: any) {
      throw this.handleAuthError(error);
    }
  }

  static async signUpWithEmail({ email, password }: SignUpCredentials): Promise<User> {
    try {
      const result = await createUserWithEmailAndPassword(auth, email, password);
      return result.user;
    } catch (error: any) {
      throw this.handleAuthError(error);
    }
  }

  // Note: Google Sign-In is now handled directly in GoogleSignInButton component

  static async signInWithApple(identityToken: string, nonce: string): Promise<User> {
    try {
      const appleProvider = new OAuthProvider('apple.com');
      const credential = appleProvider.credential({
        idToken: identityToken,
        rawNonce: nonce,
      });
      const result = await signInWithCredential(auth, credential);
      return result.user;
    } catch (error: any) {
      throw this.handleAuthError(error);
    }
  }

  static async signOut(): Promise<void> {
    try {
      await signOut(auth);
    } catch (error: any) {
      throw this.handleAuthError(error);
    }
  }

  static getCurrentUser(): User | null {
    return auth.currentUser;
  }

  private static handleAuthError(error: any): AuthError {
    return {
      code: error.code || 'unknown',
      message: error.message || 'An unknown error occurred',
    };
  }
} 