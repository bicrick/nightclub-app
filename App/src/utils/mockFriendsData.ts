export interface Friend {
  id: string;
  name: string;
  avatar?: string;
  username?: string;
  status: 'online' | 'planning' | 'out' | 'offline';
  lastActivity: string;
  activityType: 'checked_in' | 'planning' | 'reviewed' | 'joined_event' | 'invited_friends' | 'offline';
  currentVenue?: string;
  upcomingPlans?: {
    venueName: string;
    date: string;
    time: string;
    groupSize: number;
  };
  recentActivity: FriendActivity[];
  mutualFriends: number;
  friendsSince: string;
  nightsOutTogether: number;
  favoriteVenues: string[];
  isClose: boolean; // Close friend vs acquaintance
}

export interface FriendActivity {
  id: string;
  type: 'checked_in' | 'planned_event' | 'reviewed_venue' | 'joined_group' | 'shared_photo';
  timestamp: string;
  venueName?: string;
  venueImage?: string;
  eventTitle?: string;
  groupSize?: number;
  rating?: number;
  message?: string;
}

export interface FriendRequest {
  id: string;
  fromUserId: string;
  fromUserName: string;
  fromUserAvatar?: string;
  mutualFriends: number;
  requestedAt: string;
  type: 'received' | 'sent';
  status: 'pending' | 'accepted' | 'declined';
}

export const mockFriends: Friend[] = [
  {
    id: 'friend-001',
    name: 'Sarah Johnson',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=50&h=50&fit=crop&crop=face',
    username: '@sarah_j',
    status: 'out',
    lastActivity: '2024-03-24T22:30:00Z',
    activityType: 'checked_in',
    currentVenue: 'Cloud Nine Rooftop',
    recentActivity: [
      {
        id: 'activity-001',
        type: 'checked_in',
        timestamp: '2024-03-24T22:30:00Z',
        venueName: 'Cloud Nine Rooftop',
        venueImage: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=300&h=200&fit=crop',
        message: 'Birthday vibes! 🎉'
      },
      {
        id: 'activity-002',
        type: 'planned_event',
        timestamp: '2024-03-24T15:20:00Z',
        eventTitle: "Sarah's 25th Birthday",
        venueName: 'Cloud Nine Rooftop',
        groupSize: 6,
      },
    ],
    mutualFriends: 12,
    friendsSince: '2023-08-15',
    nightsOutTogether: 8,
    favoriteVenues: ['Cloud Nine Rooftop', 'Neon Dreams'],
    isClose: true,
  },

  {
    id: 'friend-002',
    name: 'Johnny Martinez',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&fit=crop&crop=face',
    username: '@johnny_m',
    status: 'planning',
    lastActivity: '2024-03-24T18:45:00Z',
    activityType: 'planning',
    upcomingPlans: {
      venueName: 'Underground Pulse',
      date: '2024-03-29',
      time: '10:00 PM',
      groupSize: 5,
    },
    recentActivity: [
      {
        id: 'activity-003',
        type: 'planned_event',
        timestamp: '2024-03-24T18:45:00Z',
        eventTitle: 'Weekend Bass Session',
        venueName: 'Underground Pulse',
        groupSize: 5,
      },
      {
        id: 'activity-004',
        type: 'reviewed_venue',
        timestamp: '2024-03-22T14:30:00Z',
        venueName: 'Skyline Lounge',
        rating: 4,
        message: 'Great rooftop views but drinks were pricey'
      },
    ],
    mutualFriends: 8,
    friendsSince: '2023-11-22',
    nightsOutTogether: 5,
    favoriteVenues: ['Underground Pulse', 'Neon Dreams'],
    isClose: true,
  },

  {
    id: 'friend-003',
    name: 'Lisa Park',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=50&h=50&fit=crop&crop=face',
    username: '@lisa_p',
    status: 'online',
    lastActivity: '2024-03-24T20:15:00Z',
    activityType: 'invited_friends',
    recentActivity: [
      {
        id: 'activity-005',
        type: 'planned_event',
        timestamp: '2024-03-24T20:15:00Z',
        eventTitle: 'Last Minute Friday Plans',
        venueName: 'Underground Pulse',
        groupSize: 4,
      },
    ],
    mutualFriends: 6,
    friendsSince: '2024-01-10',
    nightsOutTogether: 3,
    favoriteVenues: ['Underground Pulse'],
    isClose: false,
  },

  {
    id: 'friend-004',
    name: 'Mike Rodriguez',
    username: '@mike_r',
    status: 'offline',
    lastActivity: '2024-03-23T16:20:00Z',
    activityType: 'offline',
    recentActivity: [
      {
        id: 'activity-006',
        type: 'joined_group',
        timestamp: '2024-03-23T16:20:00Z',
        eventTitle: 'Weekend Celebration',
        venueName: 'Neon Dreams',
        groupSize: 5,
      },
      {
        id: 'activity-007',
        type: 'reviewed_venue',
        timestamp: '2024-03-20T21:45:00Z',
        venueName: 'Cloud Nine Rooftop',
        rating: 5,
        message: 'Amazing night! The DJ was incredible 🔥'
      },
    ],
    mutualFriends: 10,
    friendsSince: '2023-06-12',
    nightsOutTogether: 12,
    favoriteVenues: ['Cloud Nine Rooftop', 'Neon Dreams', 'Underground Pulse'],
    isClose: true,
  },

  {
    id: 'friend-005',
    name: 'Emma Davis',
    username: '@emma_d',
    status: 'planning',
    lastActivity: '2024-03-24T14:30:00Z',
    activityType: 'planning',
    upcomingPlans: {
      venueName: 'Skyline Lounge',
      date: '2024-03-26',
      time: '7:00 PM',
      groupSize: 8,
    },
    recentActivity: [
      {
        id: 'activity-008',
        type: 'planned_event',
        timestamp: '2024-03-24T14:30:00Z',
        eventTitle: 'Corporate Happy Hour',
        venueName: 'Skyline Lounge',
        groupSize: 8,
      },
    ],
    mutualFriends: 4,
    friendsSince: '2024-02-28',
    nightsOutTogether: 1,
    favoriteVenues: ['Skyline Lounge'],
    isClose: false,
  },

  {
    id: 'friend-006',
    name: 'David Kim',
    username: '@david_k',
    status: 'online',
    lastActivity: '2024-03-24T19:00:00Z',
    activityType: 'joined_event',
    recentActivity: [
      {
        id: 'activity-009',
        type: 'joined_group',
        timestamp: '2024-03-24T19:00:00Z',
        eventTitle: "Sarah's Birthday Celebration",
        venueName: 'Cloud Nine Rooftop',
        groupSize: 6,
      },
    ],
    mutualFriends: 7,
    friendsSince: '2023-12-05',
    nightsOutTogether: 4,
    favoriteVenues: ['Cloud Nine Rooftop'],
    isClose: false,
  },
];

export const mockFriendRequests: FriendRequest[] = [
  {
    id: 'req-001',
    fromUserId: 'user-nina',
    fromUserName: 'Nina Patel',
    fromUserAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=50&h=50&fit=crop&crop=face',
    mutualFriends: 5,
    requestedAt: '2024-03-24T16:30:00Z',
    type: 'received',
    status: 'pending',
  },
  {
    id: 'req-002',
    fromUserId: 'user-jordan',
    fromUserName: 'Jordan Lee',
    mutualFriends: 3,
    requestedAt: '2024-03-23T20:15:00Z',
    type: 'received',
    status: 'pending',
  },
];

// Helper functions
export const getActiveFriends = () => {
  return mockFriends.filter(friend => friend.status !== 'offline');
};

export const getCloseFriends = () => {
  return mockFriends.filter(friend => friend.isClose);
};

export const getFriendsCurrentlyOut = () => {
  return mockFriends.filter(friend => friend.status === 'out');
};

export const getFriendsPlanning = () => {
  return mockFriends.filter(friend => friend.status === 'planning');
};

export const getRecentActivity = () => {
  const allActivity = mockFriends.flatMap(friend => 
    friend.recentActivity.map(activity => ({
      ...activity,
      friendName: friend.name,
      friendAvatar: friend.avatar,
      friendId: friend.id,
    }))
  );
  
  return allActivity.sort((a, b) => 
    new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  ).slice(0, 10);
};

export const getPendingFriendRequests = () => {
  return mockFriendRequests.filter(req => req.status === 'pending');
};

export const formatLastActivity = (timestamp: string) => {
  const now = new Date();
  const activityTime = new Date(timestamp);
  const diffMs = now.getTime() - activityTime.getTime();
  const diffMins = Math.floor(diffMs / (1000 * 60));
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffMins < 1) return 'Just now';
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 7) return `${diffDays}d ago`;
  return activityTime.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
};

export const getStatusDisplay = (friend: Friend) => {
  switch (friend.status) {
    case 'out':
      return { text: `Currently at ${friend.currentVenue}`, color: '#00ff88' };
    case 'planning':
      return { text: 'Planning something...', color: '#ffd700' };
    case 'online':
      return { text: 'Online', color: '#00ff88' };
    default:
      return { text: `Last seen ${formatLastActivity(friend.lastActivity)}`, color: '#666666' };
  }
};

export const getActivityTypeDisplay = (activityType: Friend['activityType']) => {
  switch (activityType) {
    case 'checked_in':
      return { icon: 'location', text: 'Checked in' };
    case 'planning':
      return { icon: 'calendar', text: 'Planning event' };
    case 'reviewed':
      return { icon: 'star', text: 'Left review' };
    case 'joined_event':
      return { icon: 'people', text: 'Joined event' };
    case 'invited_friends':
      return { icon: 'send', text: 'Sent invites' };
    default:
      return { icon: 'time', text: 'Last seen' };
  }
}; 