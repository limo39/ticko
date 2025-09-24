import React from 'react';

interface TicketTypeSelectorProps {
  selectedType: 'VVIP' | 'VIP' | 'Regular';
  onChange: (type: 'VVIP' | 'VIP' | 'Regular') => void;
}

const TicketTypeSelector: React.FC<TicketTypeSelectorProps> = ({ selectedType, onChange }) => {
  const ticketTypes = [
    { value: 'VVIP' as const, label: 'VVIP', color: 'bg-purple-600' },
    { value: 'VIP' as const, label: 'VIP', color: 'bg-yellow-600' },
    { value: 'Regular' as const, label: 'Regular', color: 'bg-blue-600' },
  ];

  return (
    <div className="mb-6">
      <h3 className="text-lg font-semibold mb-4">Select Ticket Type</h3>
      <div className="flex space-x-4">
        {ticketTypes.map((type) => (
          <button
            key={type.value}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              selectedType === type.value
                ? `${type.color} text-white`
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
            onClick={() => onChange(type.value)}
          >
            {type.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TicketTypeSelector;