import axios from 'axios';
import { Ticket } from '../types';

const API_BASE_URL = 'http://localhost:8080/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const ticketService = {
  getAvailableTickets: async (matchId: number, ticketType?: string): Promise<Ticket[]> => {
    const params = ticketType ? { type: ticketType } : {};
    const response = await api.get(`/matches/${matchId}/tickets`, { params });
    return response.data;
  },

  purchaseTicket: async (ticketId: number, userId: number): Promise<Ticket> => {
    const response = await api.post(`/tickets/${ticketId}/purchase`, { user_id: userId });
    return response.data;
  },
};

export default api;