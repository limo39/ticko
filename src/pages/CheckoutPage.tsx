import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ticketService } from '../services/api';
import { Ticket } from '../types';

interface CheckoutState {
  selectedSeats: string[];
  tickets: Ticket[];
  matchId: string;
}

const CheckoutPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  const [userInfo, setUserInfo] = useState({
    name: '',
    email: '',
    phone: ''
  });

  const state = location.state as CheckoutState;
  
  if (!state) {
    navigate('/');
    return null;
  }

  const { selectedSeats, tickets } = state;
  
  const selectedTickets = selectedSeats.map(seat => 
    tickets.find(t => t.seat_number === seat)
  ).filter(Boolean) as Ticket[];

  const totalPrice = selectedTickets.reduce((sum, ticket) => sum + ticket.price, 0);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserInfo({
      ...userInfo,
      [e.target.name]: e.target.value
    });
  };

  const handlePurchase = async () => {
    if (!userInfo.name || !userInfo.email) {
      alert('Please fill in all required fields');
      return;
    }

    setIsProcessing(true);
    try {
      // For demo purposes, using a mock user ID
      const userId = 1;
      
      const purchasePromises = selectedTickets.map(ticket =>
        ticketService.purchaseTicket(ticket.id, userId)
      );

      await Promise.all(purchasePromises);
      
      alert('Tickets purchased successfully!');
      navigate('/');
    } catch (error) {
      console.error('Purchase failed:', error);
      alert('Purchase failed. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Checkout</h1>
      
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
        <div className="space-y-2">
          {selectedTickets.map((ticket, index) => (
            <div key={index} className="flex justify-between py-2 border-b">
              <span>{ticket.type} - {ticket.seat_number}</span>
              <span>${ticket.price.toFixed(2)}</span>
            </div>
          ))}
        </div>
        <div className="flex justify-between font-bold text-lg mt-4 pt-4 border-t">
          <span>Total:</span>
          <span>${totalPrice.toFixed(2)}</span>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Customer Information</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Full Name *
            </label>
            <input
              type="text"
              name="name"
              value={userInfo.name}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email *
            </label>
            <input
              type="email"
              name="email"
              value={userInfo.email}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Phone Number
            </label>
            <input
              type="tel"
              name="phone"
              value={userInfo.phone}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>

      <div className="flex space-x-4">
        <button
          onClick={() => navigate(-1)}
          className="flex-1 bg-gray-500 text-white py-3 px-6 rounded-lg hover:bg-gray-600 transition-colors"
        >
          Back
        </button>
        <button
          onClick={handlePurchase}
          disabled={isProcessing}
          className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
        >
          {isProcessing ? 'Processing...' : 'Complete Purchase'}
        </button>
      </div>
    </div>
  );
};

export default CheckoutPage;