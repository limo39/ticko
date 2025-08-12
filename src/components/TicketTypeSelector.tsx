import { TicketType } from '../types';

interface TicketTypeSelectorProps {
  selectedType: TicketType;
  onChange: (type: TicketType) => void;
}

export default function TicketTypeSelector({ selectedType, onChange }: TicketTypeSelectorProps) {
  const types: TicketType[] = ['VVIP', 'VIP', 'Regular'];
  
  return (
    <div className="flex gap-4 mb-6">
      {types.map(type => (
        <button
          key={type}
          className={`px-4 py-2 rounded-full border-2 font-medium
            ${selectedType === type 
              ? 'border-blue-600 bg-blue-50 text-blue-700' 
              : 'border-gray-200 hover:border-gray-300'}
          `}
          onClick={() => onChange(type)}
        >
          {type} Tickets
        </button>
      ))}
    </div>
  );
}
