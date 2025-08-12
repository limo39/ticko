import { Ticket } from '../types';

interface SeatMapProps {
  tickets: Ticket[];
  selectedSeats: string[];
  onSeatSelect: (seatNumber: string) => void;
}

export default function SeatMap({ tickets, selectedSeats, onSeatSelect }: SeatMapProps) {
  // Group tickets by sections (simplified for example)
  const sections = {
    'VVIP': tickets.filter(t => t.type === 'VVIP'),
    'VIP': tickets.filter(t => t.type === 'VIP'),
    'Regular': tickets.filter(t => t.type === 'Regular'),
  };

  return (
    <div className="bg-gray-100 p-6 rounded-lg">
      <div className="text-center mb-6">
        <div className="w-20 h-8 bg-green-500 mx-auto mb-2"></div>
        <p className="text-sm">Pitch</p>
      </div>

      {Object.entries(sections).map(([section, sectionTickets]) => (
        <div key={section} className="mb-8">
          <h3 className="text-lg font-semibold mb-4">{section} Section</h3>
          <div className="grid grid-cols-10 gap-2">
            {sectionTickets.map(ticket => (
              <button
                key={ticket.seatNumber}
                className={`w-8 h-8 rounded flex items-center justify-center text-xs
                  ${ticket.status !== 'available' ? 'bg-gray-300 cursor-not-allowed' : 
                    selectedSeats.includes(ticket.seatNumber) ? 'bg-blue-600 text-white' : 
                    'bg-white hover:bg-blue-100 border border-gray-200'}
                `}
                disabled={ticket.status !== 'available'}
                onClick={() => onSeatSelect(ticket.seatNumber)}
              >
                {ticket.seatNumber.split('-')[1]}
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
