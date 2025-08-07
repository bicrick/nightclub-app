import { User } from 'firebase/auth';

export interface AuthUser extends User {
  // Add any additional user properties we might need
}

export interface AuthState {
  user: AuthUser | null;
  isLoading: boolean;
  isAuthenticated: boolean;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface SignUpCredentials extends LoginCredentials {
  confirmPassword: string;
}

export type AuthProvider = 'email' | 'google' | 'apple';

export interface AuthError {
  code: string;
  message: string;
} 