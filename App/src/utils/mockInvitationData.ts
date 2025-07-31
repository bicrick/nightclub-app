export interface Invitation {
  id: string;
  type: 'received' | 'sent'; // Are you invited or did you invite others?
  hostId: string;
  hostName: string;
  hostAvatar?: string;
  eventTitle?: string;
  venueName: string;
  venueImage: string;
  venueAddress: string;
  date: string;
  time: string;
  totalInvited: number;
  responses: InviteResponse[];
  costPerPerson: number;
  totalCost: number;
  personalMessage?: string;
  eventType: 'birthday' | 'celebration' | 'casual' | 'corporate' | 'just_because';
  createdAt: string;
  expiresAt?: string;
  urgency: 'tonight' | 'tomorrow' | 'this_weekend' | 'upcoming';
  status: 'pending' | 'accepted' | 'declined' | 'maybe' | 'expired';
  paymentRequired: boolean;
  paymentStatus?: 'not_required' | 'pending' | 'paid';
}

export interface InviteResponse {
  userId: string;
  userName: string;
  userAvatar?: string;
  status: 'pending' | 'accepted' | 'declined' | 'maybe';
  respondedAt?: string;
  paymentStatus?: 'not_required' | 'pending' | 'paid' | 'overdue';
  message?: string;
}

export const mockInvitations: Invitation[] = [
  // RECEIVED INVITATIONS (You're invited)
  {
    id: 'invite-001',
    type: 'received',
    hostId: 'user-johnny',
    hostName: 'Johnny Martinez',
    hostAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&fit=crop&crop=face',
    eventTitle: "Sarah's Birthday Celebration",
    venueName: 'Cloud Nine Rooftop',
    venueImage: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&h=300&fit=crop',
    venueAddress: '123 Sky Avenue, Downtown',
    date: '2024-03-29', // 5 days from now
    time: '9:00 PM',
    totalInvited: 6,
    costPerPerson: 115,
    totalCost: 690,
    personalMessage: "Sarah's turning 25! Let's make it epic 🥳 Who's ready for rooftop vibes?",
    eventType: 'birthday',
    createdAt: '2024-03-24T10:30:00Z',
    urgency: 'upcoming',
    status: 'pending',
    paymentRequired: true,
    paymentStatus: 'pending',
    responses: [
      {
        userId: 'user-alex',
        userName: 'Alex Chen', // You
        status: 'pending',
        paymentStatus: 'pending',
      },
      {
        userId: 'user-sarah',
        userName: 'Sarah Johnson',
        userAvatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=50&h=50&fit=crop&crop=face',
        status: 'accepted',
        respondedAt: '2024-03-24T11:15:00Z',
        paymentStatus: 'paid',
        message: "Can't wait! Thanks for organizing Johnny! 🎉"
      },
      {
        userId: 'user-mike',
        userName: 'Mike Rodriguez',
        status: 'accepted',
        respondedAt: '2024-03-24T14:22:00Z',
        paymentStatus: 'paid',
      },
      {
        userId: 'user-lisa',
        userName: 'Lisa Park',
        userAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=50&h=50&fit=crop&crop=face',
        status: 'accepted',
        respondedAt: '2024-03-24T16:45:00Z',
        paymentStatus: 'pending',
      },
      {
        userId: 'user-emma',
        userName: 'Emma Davis',
        status: 'pending',
        paymentStatus: 'pending',
      },
      {
        userId: 'user-david',
        userName: 'David Kim',
        status: 'maybe',
        respondedAt: '2024-03-24T18:30:00Z',
        paymentStatus: 'pending',
        message: "Might have work stuff, but really want to come!"
      },
    ],
  },

  {
    id: 'invite-002',
    type: 'received',
    hostId: 'user-lisa',
    hostName: 'Lisa Park',
    hostAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=50&h=50&fit=crop&crop=face',
    eventTitle: 'Friday Night Out',
    venueName: 'Underground Pulse',
    venueImage: 'https://images.unsplash.com/photo-1571266028243-d220c9b2e8f8?w=400&h=300&fit=crop',
    venueAddress: '456 Bass Street, Arts District',
    date: '2024-03-25', // Tomorrow
    time: '10:30 PM',
    totalInvited: 4,
    costPerPerson: 85,
    totalCost: 340,
    personalMessage: "Last-minute plans! Who's up for some underground beats? 🎶",
    eventType: 'casual',
    createdAt: '2024-03-24T20:15:00Z',
    urgency: 'tomorrow',
    status: 'pending',
    paymentRequired: true,
    paymentStatus: 'pending',
    responses: [
      {
        userId: 'user-alex',
        userName: 'Alex Chen', // You
        status: 'pending',
        paymentStatus: 'pending',
      },
      {
        userId: 'user-mike',
        userName: 'Mike Rodriguez',
        status: 'accepted',
        respondedAt: '2024-03-24T20:45:00Z',
        paymentStatus: 'paid',
        message: "I'm so ready! Love this place 🔥"
      },
      {
        userId: 'user-jordan',
        userName: 'Jordan Lee',
        status: 'declined',
        respondedAt: '2024-03-24T21:10:00Z',
        message: "Can't tomorrow, but have fun!"
      },
      {
        userId: 'user-taylor',
        userName: 'Taylor Swift',
        status: 'pending',
        paymentStatus: 'pending',
      },
    ],
  },

  // SENT INVITATIONS (You're hosting)
  {
    id: 'invite-003',
    type: 'sent',
    hostId: 'user-alex', // You're the host
    hostName: 'Alex Chen',
    hostAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop&crop=face',
    eventTitle: 'Weekend Celebration',
    venueName: 'Neon Dreams',
    venueImage: 'https://images.unsplash.com/photo-1571337173019-90b9f84fcf61?w=400&h=300&fit=crop',
    venueAddress: '789 Electric Boulevard, Midtown',
    date: '2024-03-30', // This weekend
    time: '8:30 PM',
    totalInvited: 5,
    costPerPerson: 120,
    totalCost: 600,
    personalMessage: "Time to celebrate! Let's hit up the best light show in the city 💫",
    eventType: 'celebration',
    createdAt: '2024-03-23T15:20:00Z',
    urgency: 'this_weekend',
    status: 'accepted', // You auto-accept your own events
    paymentRequired: true,
    paymentStatus: 'paid', // Host already paid
    responses: [
      {
        userId: 'user-alex',
        userName: 'Alex Chen', // You (host)
        status: 'accepted',
        respondedAt: '2024-03-23T15:20:00Z',
        paymentStatus: 'paid',
      },
      {
        userId: 'user-sarah',
        userName: 'Sarah Johnson',
        userAvatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=50&h=50&fit=crop&crop=face',
        status: 'accepted',
        respondedAt: '2024-03-23T16:45:00Z',
        paymentStatus: 'paid',
        message: "Yes! I've been wanting to check this place out!"
      },
      {
        userId: 'user-mike',
        userName: 'Mike Rodriguez',
        status: 'accepted',
        respondedAt: '2024-03-23T18:20:00Z',
        paymentStatus: 'pending',
      },
      {
        userId: 'user-chris',
        userName: 'Chris Evans',
        status: 'pending',
        paymentStatus: 'pending',
      },
      {
        userId: 'user-nina',
        userName: 'Nina Patel',
        userAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=50&h=50&fit=crop&crop=face',
        status: 'maybe',
        respondedAt: '2024-03-24T09:15:00Z',
        paymentStatus: 'pending',
        message: "Want to come but might be traveling for work 😞"
      },
    ],
  },

  // EXPIRED/PAST INVITATION
  {
    id: 'invite-004',
    type: 'received',
    hostId: 'user-emma',
    hostName: 'Emma Davis',
    eventTitle: 'Corporate Happy Hour',
    venueName: 'Skyline Lounge',
    venueImage: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=400&h=300&fit=crop',
    venueAddress: '321 High Street, Financial District',
    date: '2024-03-20', // Past date
    time: '6:00 PM',
    totalInvited: 8,
    costPerPerson: 65,
    totalCost: 520,
    personalMessage: "Team bonding time! Let's celebrate our project launch 🎊",
    eventType: 'corporate',
    createdAt: '2024-03-18T14:30:00Z',
    urgency: 'upcoming',
    status: 'declined',
    paymentRequired: true,
    paymentStatus: 'not_required',
    responses: [
      {
        userId: 'user-alex',
        userName: 'Alex Chen', // You
        status: 'declined',
        respondedAt: '2024-03-18T15:45:00Z',
        message: "Have family plans that night, but thanks for the invite!"
      },
      // ... other responses
    ],
  },
];

// Helper functions
export const getReceivedInvitations = () => {
  return mockInvitations.filter(invite => 
    invite.type === 'received' && 
    invite.status === 'pending' &&
    new Date(invite.date) >= new Date()
  );
};

export const getSentInvitations = () => {
  return mockInvitations.filter(invite => invite.type === 'sent');
};

export const getPendingInvitations = () => {
  return mockInvitations.filter(invite => 
    invite.status === 'pending' && 
    new Date(invite.date) >= new Date()
  );
};

export const getInvitationsByUrgency = (urgency: 'tonight' | 'tomorrow' | 'this_weekend' | 'upcoming') => {
  return mockInvitations.filter(invite => invite.urgency === urgency);
};

export const getConfirmedCount = (invitation: Invitation) => {
  return invitation.responses.filter(response => response.status === 'accepted').length;
};

export const getPendingCount = (invitation: Invitation) => {
  return invitation.responses.filter(response => response.status === 'pending').length;
};

export const getPaymentProgress = (invitation: Invitation) => {
  const paidCount = invitation.responses.filter(response => response.paymentStatus === 'paid').length;
  const totalRequired = invitation.responses.filter(response => response.paymentStatus !== 'not_required').length;
  return { paidCount, totalRequired, percentage: (paidCount / totalRequired) * 100 };
}; 