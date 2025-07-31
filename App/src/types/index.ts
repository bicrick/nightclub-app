export interface ComponentProps {
  testID?: string;
  style?: any;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  profileImage?: string;
}

export interface Venue {
  id: string;
  name: string;
  address: string;
  rating: number;
  imageUrl: string;
  priceRange: string;
  category: string;
  description: string;
  capacity: number;
  minSpend: number;
  features: string[];
  openHours: string;
  dresscode: string;
}

export interface Booking {
  id: string;
  venueId: string;
  userId: string;
  date: string;
  partySize: number;
  totalAmount: number;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
} 