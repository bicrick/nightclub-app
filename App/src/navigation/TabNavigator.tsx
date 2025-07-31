import React from 'react';
import { Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HomeScreen } from '../screens/HomeScreen';
import { VenuesScreen } from '../screens/VenuesScreen';
import { BookingsScreen } from '../screens/BookingsScreen';
import { ProfileScreen } from '../screens/ProfileScreen';
import { colors } from '../styles/colors';

const Tab = createBottomTabNavigator();

export const TabNavigator: React.FC = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: colors.backgroundSecondary,
          borderTopColor: colors.borderColor,
          borderTopWidth: 1,
        },
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textMuted,
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '500',
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <HomeIcon color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Venues"
        component={VenuesScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <VenuesIcon color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Bookings"
        component={BookingsScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <BookingsIcon color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <ProfileIcon color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

// Simple icon components (we'll replace these with proper icons later)
const HomeIcon: React.FC<{ color: string }> = ({ color }) => (
  <Text style={{ color, fontSize: 24 }}>🏠</Text>
);

const VenuesIcon: React.FC<{ color: string }> = ({ color }) => (
  <Text style={{ color, fontSize: 24 }}>🏢</Text>
);

const BookingsIcon: React.FC<{ color: string }> = ({ color }) => (
  <Text style={{ color, fontSize: 24 }}>📅</Text>
);

const ProfileIcon: React.FC<{ color: string }> = ({ color }) => (
  <Text style={{ color, fontSize: 24 }}>👤</Text>
); 