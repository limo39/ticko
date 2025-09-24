export interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  created_at: string;
}

export interface Match {
  id: number;
  home_team: string;
  away_team: string;
  venue: string;
  date_time: string;
  status: string;
}

export interface Ticket {
  id: number;
  match_id: number;
  match?: Match;
  type: 'VVIP' | 'VIP' | 'Regular';
  seat_number: string;
  price: number;
  status: 'available' | 'reserved' | 'sold' | 'used';
  user_id?: number;
  user?: User;
  purchase_at?: string;
  qr_code?: string;
}

export interface TicketAllocation {
  count: number;
  price: number;
}