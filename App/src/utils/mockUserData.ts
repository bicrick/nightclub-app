import { User, Booking } from '../types';

export interface UserProfile extends User {
  memberSince: string;
  loyaltyTier: 'Newcomer' | 'Squad Regular' | 'VIP Legends';
  bookingCount: number;
  totalSpent: number;
  friendsCount: number;
  achievementBadges: Achievement[];
  recentBookings: Booking[];
  paymentMethods: PaymentMethod[];
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlocked: boolean;
  progress?: number;
  target?: number;
}

export interface PaymentMethod {
  id: string;
  type: 'card' | 'apple_pay' | 'venmo';
  provider: 'stripe' | 'apple' | 'venmo';
  last4?: string;
  brand?: string;
  isDefault: boolean;
  logo: string;
}

export const mockUser: UserProfile = {
  id: '1',
  name: 'Alex Chen',
  email: 'alex.chen@email.com',
  phone: '+1 (555) 123-4567',
  profileImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
  memberSince: 'March 2024',
  loyaltyTier: 'Squad Regular',
  bookingCount: 7,
  totalSpent: 3250,
  friendsCount: 23,
  achievementBadges: [
    {
      id: '1',
      name: 'No Flake Squad',
      description: '5 bookings, zero cancels',
      icon: '🎯',
      unlocked: true,
    },
    {
      id: '2',
      name: 'Bottle Poppers',
      description: 'Upgraded bottles 3 times',
      icon: '🍾',
      unlocked: true,
    },
    {
      id: '3',
      name: 'Venue Explorer',
      description: 'Tried 10+ different venues',
      icon: '🌟',
      unlocked: false,
      progress: 7,
      target: 10,
    },
    {
      id: '4',
      name: 'Birthday Legend',
      description: 'Celebrated 5 crew birthdays',
      icon: '🎂',
      unlocked: false,
      progress: 2,
      target: 5,
    },
  ],
  recentBookings: [
    {
      id: 'b1',
      venueId: '1',
      userId: '1',
      date: '2024-03-15',
      partySize: 6,
      totalAmount: 450,
      status: 'completed',
    },
    {
      id: 'b2',
      venueId: '3',
      userId: '1',
      date: '2024-03-08',
      partySize: 4,
      totalAmount: 320,
      status: 'completed',
    },
    {
      id: 'b3',
      venueId: '2',
      userId: '1',
      date: '2024-02-28',
      partySize: 8,
      totalAmount: 680,
      status: 'completed',
    },
  ],
  paymentMethods: [
    {
      id: 'pm1',
      type: 'card',
      provider: 'stripe',
      last4: '4242',
      brand: 'Visa',
      isDefault: true,
      logo: 'visa',
    },
    {
      id: 'pm2',
      type: 'apple_pay',
      provider: 'apple',
      isDefault: false,
      logo: 'apple_pay',
    },
    {
      id: 'pm3',
      type: 'card',
      provider: 'stripe',
      last4: '5555',
      brand: 'Mastercard',
      isDefault: false,
      logo: 'mastercard',
    },
  ],
};

export const loyaltyTiers = {
  'Newcomer': {
    icon: '🥉',
    color: '#cd7f32',
    requirement: 'Complete your first booking',
    benefits: ['VIP entry privileges', 'Bill splitting & coordination', '24/7 customer support'],
    nextTier: 'Squad Regular',
    bookingsRequired: 1,
  },
  'Squad Regular': {
    icon: '🥈',
    color: '#c0c0c0',
    requirement: 'Book 3 tables in 2 months',
    benefits: ['All Newcomer benefits', 'Priority table selection', 'Complimentary bottle upgrade', 'Group concierge service'],
    nextTier: 'VIP Legends',
    bookingsRequired: 10,
  },
  'VIP Legends': {
    icon: '🏆',
    color: '#ffd700',
    requirement: '10+ successful bookings',
    benefits: ['All previous benefits', 'Exclusive venue access', 'Personal party coordinator', 'Birthday perks & surprises', 'Early access to new venues'],
    nextTier: null,
    bookingsRequired: 10,
  },
}; 