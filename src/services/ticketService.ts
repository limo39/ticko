import axios from 'axios';
import { Ticket } from '../types';

const API_URL = import.meta.env.VITE_API_URL;

export const getAvailableTickets = async (matchId: number, type: string): Promise<Ticket[]> => {
  const response = await axios.get(`${API_URL}/matches/${matchId}/tickets`, {
    params: { type }
  });
  return response.data;
};

export const purchaseTickets = async (ticketIds: number[]): Promise<void> => {
  await axios.post(`${API_URL}/tickets/purchase`, { ticketIds });
};
