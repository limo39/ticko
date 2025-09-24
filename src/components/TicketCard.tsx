import React from 'react';
import { Ticket } from '../types';

interface TicketCardProps {
  ticket: Ticket;
  onSelect: (ticket: Ticket) => void;
  isSelected: boolean;
}

const TicketCard: React.FC<TicketCardProps> = ({ ticket, onSelect, isSelected }) => {
  const getTicketTypeColor = (type: string) => {
    switch (type) {
      case 'VVIP':
        return 'bg-purple-100 border-purple-300 text-purple-800';
      case 'VIP':
        return 'bg-gold-100 border-yellow-300 text-yellow-800';
      case 'Regular':
        return 'bg-blue-100 border-blue-300 text-blue-800';
      default:
        return 'bg-gray-100 border-gray-300 text-gray-800';
    }
  };

  return (
    <div
      className={`p-4 border-2 rounded-lg cursor-pointer transition-all hover:shadow-md ${
        isSelected ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
      } ${getTicketTypeColor(ticket.type)}`}
      onClick={() => onSelect(ticket)}
    >
      <div className="flex justify-between items-center">
        <div>
          <h3 className="font-semibold text-lg">{ticket.type}</h3>
          <p className="text-sm opacity-75">Seat: {ticket.seat_number}</p>
        </div>
        <div className="text-right">
          <p className="text-xl font-bold">${ticket.price}</p>
          <p className="text-xs capitalize">{ticket.status}</p>
        </div>
      </div>
    </div>
  );
};

export default TicketCard;