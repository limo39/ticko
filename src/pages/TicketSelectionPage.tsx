import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Ticket } from '../types';
import { ticketService } from '../services/api';
import SeatMap from '../components/SeatMap';
import TicketTypeSelector from '../components/TicketTypeSelector';

export default function TicketSelectionPage() {
  const { matchId } = useParams();
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [selectedType, setSelectedType] = useState<'VVIP' | 'VIP' | 'Regular'>('Regular');
  const navigate = useNavigate();
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);

  useEffect(() => {
    const fetchTickets = async () => {
      if (!matchId) return;
      try {
        const data = await ticketService.getAvailableTickets(parseInt(matchId), selectedType);
        setTickets(data);
      } catch (error) {
        console.error('Error fetching tickets:', error);
      }
    };

    fetchTickets();
  }, [matchId, selectedType]);

  const handleSeatSelect = (seatNumber: string) => {
    setSelectedSeats(prev => 
      prev.includes(seatNumber)
        ? prev.filter(s => s !== seatNumber)
        : [...prev, seatNumber]
    );
  };

  return (
    <div className="container mx-auto py-8">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-2/3">
          <TicketTypeSelector 
            selectedType={selectedType}
            onChange={setSelectedType}
          />
          <SeatMap 
            tickets={tickets}
            selectedSeats={selectedSeats}
            onSeatSelect={handleSeatSelect}
          />
        </div>
        <div className="md:w-1/3">
          <div className="sticky top-4 bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4">Your Selection</h3>
            {selectedSeats.length === 0 ? (
              <p>No seats selected</p>
            ) : (
              <div>
                <ul className="mb-4">
                  {selectedSeats.map(seat => (
                    <li key={seat} className="flex justify-between py-2 border-b">
                      <span>{seat}</span>
                      <span>${tickets.find(t => t.seat_number === seat)?.price.toFixed(2)}</span>
                    </li>
                  ))}
                </ul>
                <div className="flex justify-between font-bold text-lg mb-6">
                  <span>Total:</span>
                  <span>
                    ${selectedSeats.reduce((sum, seat) => {
                      const ticket = tickets.find(t => t.seat_number === seat);
                      return sum + (ticket?.price || 0);
                    }, 0).toFixed(2)}
                  </span>
                </div>
                <button 
                  className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
                  onClick={() => navigate('/checkout', { state: { selectedSeats, tickets, matchId } })}
                >
                  Proceed to Checkout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
