import { Booking } from '../types';

export type BookingStatus = 'confirmed' | 'pending' | 'completed' | 'cancelled' | 'checked_in';

export interface DetailedBooking extends Booking {
  venueName: string;
  venueImage: string;
  venueAddress: string;
  bookingTime: string;
  tableType: string;
  groupSize: number;
  specialRequests?: string;
  confirmationCode: string;
  groupMembers: GroupMember[];
  paymentStatus: 'paid' | 'pending' | 'partial';
  depositAmount: number;
  remainingAmount: number;
  checkInTime?: string;
}

export interface GroupMember {
  id: string;
  name: string;
  avatar?: string;
  status: 'confirmed' | 'pending' | 'declined';
  paymentStatus: 'paid' | 'pending' | 'overdue';
  amountOwed: number;
}

export const mockBookings: DetailedBooking[] = [
  // ACTIVE/UPCOMING BOOKINGS
  {
    id: 'booking-001',
    venueId: '1',
    userId: '1',
    date: '2024-03-22',
    partySize: 6,
    totalAmount: 680,
    status: 'confirmed',
    venueName: 'Cloud Nine Rooftop',
    venueImage: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&h=300&fit=crop',
    venueAddress: '123 Sky Avenue, Downtown',
    bookingTime: '9:00 PM',
    tableType: 'VIP Table',
    groupSize: 6,
    specialRequests: 'Birthday celebration - please prepare cake service',
    confirmationCode: 'CN2024-001',
    paymentStatus: 'partial',
    depositAmount: 200,
    remainingAmount: 480,
    groupMembers: [
      {
        id: 'gm1',
        name: 'Alex Chen',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop&crop=face',
        status: 'confirmed',
        paymentStatus: 'paid',
        amountOwed: 113,
      },
      {
        id: 'gm2', 
        name: 'Sarah Johnson',
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=50&h=50&fit=crop&crop=face',
        status: 'confirmed',
        paymentStatus: 'paid',
        amountOwed: 113,
      },
      {
        id: 'gm3',
        name: 'Mike Rodriguez',
        status: 'confirmed',
        paymentStatus: 'pending',
        amountOwed: 113,
      },
      {
        id: 'gm4',
        name: 'Emma Davis',
        status: 'pending',
        paymentStatus: 'pending',
        amountOwed: 113,
      },
      {
        id: 'gm5',
        name: 'David Kim',
        status: 'confirmed',
        paymentStatus: 'overdue',
        amountOwed: 113,
      },
      {
        id: 'gm6',
        name: 'Lisa Park',
        status: 'confirmed',
        paymentStatus: 'paid',
        amountOwed: 115,
      },
    ],
  },
  
  {
    id: 'booking-002',
    venueId: '2',
    userId: '1',
    date: '2024-03-28',
    partySize: 4,
    totalAmount: 320,
    status: 'pending',
    venueName: 'Underground Pulse',
    venueImage: 'https://images.unsplash.com/photo-1571266028243-d220c9b2e8f8?w=400&h=300&fit=crop',
    venueAddress: '456 Bass Street, Arts District',
    bookingTime: '10:30 PM',
    tableType: 'Standard Table',
    groupSize: 4,
    confirmationCode: 'UP2024-002',
    paymentStatus: 'pending',
    depositAmount: 100,
    remainingAmount: 220,
    groupMembers: [
      {
        id: 'gm7',
        name: 'Alex Chen',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop&crop=face',
        status: 'confirmed',
        paymentStatus: 'pending',
        amountOwed: 80,
      },
      {
        id: 'gm8',
        name: 'Jordan Lee',
        status: 'pending',
        paymentStatus: 'pending',
        amountOwed: 80,
      },
      {
        id: 'gm9',
        name: 'Taylor Swift',
        status: 'pending',
        paymentStatus: 'pending',
        amountOwed: 80,
      },
      {
        id: 'gm10',
        name: 'Chris Evans',
        status: 'pending',
        paymentStatus: 'pending',
        amountOwed: 80,
      },
    ],
  },

  // PAST BOOKINGS (COMPLETED)
  {
    id: 'booking-003',
    venueId: '3',
    userId: '1',
    date: '2024-03-15',
    partySize: 8,
    totalAmount: 950,
    status: 'completed',
    venueName: 'Neon Dreams',
    venueImage: 'https://images.unsplash.com/photo-1571337173019-90b9f84fcf61?w=400&h=300&fit=crop',
    venueAddress: '789 Electric Boulevard, Midtown',
    bookingTime: '8:00 PM',
    tableType: 'Premium VIP',
    groupSize: 8,
    specialRequests: 'Corporate team celebration',
    confirmationCode: 'ND2024-003',
    paymentStatus: 'paid',
    depositAmount: 300,
    remainingAmount: 0,
    checkInTime: '8:15 PM',
    groupMembers: [
      {
        id: 'gm11',
        name: 'Alex Chen',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop&crop=face',
        status: 'confirmed',
        paymentStatus: 'paid',
        amountOwed: 118,
      },
      {
        id: 'gm12',
        name: 'Team Lead',
        status: 'confirmed',
        paymentStatus: 'paid',
        amountOwed: 118,
      },
      // ... other team members
    ],
  },

  {
    id: 'booking-004',
    venueId: '1',
    userId: '1',
    date: '2024-03-08',
    partySize: 5,
    totalAmount: 425,
    status: 'completed',
    venueName: 'Cloud Nine Rooftop',
    venueImage: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&h=300&fit=crop',
    venueAddress: '123 Sky Avenue, Downtown',
    bookingTime: '9:30 PM',
    tableType: 'Standard Table',
    groupSize: 5,
    confirmationCode: 'CN2024-004',
    paymentStatus: 'paid',
    depositAmount: 125,
    remainingAmount: 0,
    checkInTime: '9:45 PM',
    groupMembers: [
      {
        id: 'gm13',
        name: 'Alex Chen',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop&crop=face',
        status: 'confirmed',
        paymentStatus: 'paid',
        amountOwed: 85,
      },
      // ... other members
    ],
  },

  {
    id: 'booking-005',
    venueId: '4',
    userId: '1',
    date: '2024-02-28',
    partySize: 3,
    totalAmount: 180,
    status: 'cancelled',
    venueName: 'Skyline Lounge',
    venueImage: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=400&h=300&fit=crop',
    venueAddress: '321 High Street, Financial District',
    bookingTime: '7:00 PM',
    tableType: 'Standard Table',
    groupSize: 3,
    confirmationCode: 'SL2024-005',
    paymentStatus: 'paid', // Refunded
    depositAmount: 60,
    remainingAmount: 0,
    groupMembers: [
      {
        id: 'gm14',
        name: 'Alex Chen',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop&crop=face',
        status: 'confirmed',
        paymentStatus: 'paid',
        amountOwed: 60,
      },
    ],
  },
];

// Helper functions
export const getUpcomingBookings = () => {
  const today = new Date();
  return mockBookings.filter(booking => {
    const bookingDate = new Date(booking.date);
    return bookingDate >= today && (booking.status === 'confirmed' || booking.status === 'pending');
  });
};

export const getPastBookings = () => {
  const today = new Date();
  return mockBookings.filter(booking => {
    const bookingDate = new Date(booking.date);
    return bookingDate < today || booking.status === 'completed' || booking.status === 'cancelled';
  });
};

export const getBookingsByStatus = (status: BookingStatus) => {
  return mockBookings.filter(booking => booking.status === status);
}; 