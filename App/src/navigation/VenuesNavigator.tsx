import React from 'react';
import { createStackNavigator, StackScreenProps } from '@react-navigation/stack';
import { VenuesScreen } from '../screens/VenuesScreen';
import { VenueDetailScreen } from '../screens/VenueDetailScreen';
import { Venue } from '../types';

export type VenuesStackParamList = {
  VenuesList: undefined;
  VenueDetail: { venue: Venue };
};

const Stack = createStackNavigator<VenuesStackParamList>();

type VenueDetailProps = StackScreenProps<VenuesStackParamList, 'VenueDetail'>;

const VenueDetailWrapper: React.FC<VenueDetailProps> = ({ route, navigation }) => {
  const { venue } = route.params;
  
  const handleBack = () => {
    navigation.goBack();
  };
  
  const handleBookTable = (venue: Venue) => {
    // TODO: Navigate to booking flow
    console.log('Book table at:', venue.name);
  };
  
  return (
    <VenueDetailScreen 
      venue={venue} 
      onBack={handleBack} 
      onBookTable={handleBookTable} 
    />
  );
};

export const VenuesNavigator: React.FC = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        gestureEnabled: true,
        gestureDirection: 'horizontal',
      }}
    >
      <Stack.Screen name="VenuesList" component={VenuesScreen} />
      <Stack.Screen name="VenueDetail" component={VenueDetailWrapper} />
    </Stack.Navigator>
  );
}; 