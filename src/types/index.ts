export type Match = {
  id: number;
  homeTeam: string;
  awayTeam: string;
  venue: string;
  dateTime: string; // ISO string
  status: 'scheduled' | 'ongoing' | 'completed' | 'cancelled';
};

export type TicketType = 'VVIP' | 'VIP' | 'Regular';

export type TicketStatus = 'available' | 'reserved' | 'sold' | 'used';

export type Ticket = {
  id: number;
  matchId: number;
  type: TicketType;
  seatNumber: string;
  price: number;
  status: TicketStatus;
  purchaseAt?: string;
  qrCode?: string;
};

export type User = {
  id: number;
  name: string;
  email: string;
  role: 'admin' | 'staff' | 'user';
};
