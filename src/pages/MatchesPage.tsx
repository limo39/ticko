import React from 'react';
import { Link } from 'react-router-dom';

// Mock data for demonstration
const mockMatches = [
  {
    id: 1,
    home_team: 'Manchester United',
    away_team: 'Liverpool',
    venue: 'Old Trafford',
    date_time: '2025-10-15T15:00:00Z',
    status: 'scheduled'
  },
  {
    id: 2,
    home_team: 'Barcelona',
    away_team: 'Real Madrid',
    venue: 'Camp Nou',
    date_time: '2025-10-20T20:00:00Z',
    status: 'scheduled'
  },
  {
    id: 3,
    home_team: 'Bayern Munich',
    away_team: 'Borussia Dortmund',
    venue: 'Allianz Arena',
    date_time: '2025-10-25T18:30:00Z',
    status: 'scheduled'
  }
];

const MatchesPage: React.FC = () => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Upcoming Matches</h1>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {mockMatches.map((match) => (
          <div key={match.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
            <div className="p-6">
              <div className="text-center mb-4">
                <h2 className="text-xl font-semibold text-gray-800 mb-2">
                  {match.home_team} vs {match.away_team}
                </h2>
                <p className="text-gray-600">{match.venue}</p>
              </div>
              
              <div className="text-center mb-4">
                <p className="text-sm text-gray-500">{formatDate(match.date_time)}</p>
                <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium mt-2 ${
                  match.status === 'scheduled' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                }`}>
                  {match.status.charAt(0).toUpperCase() + match.status.slice(1)}
                </span>
              </div>
              
              <Link
                to={`/matches/${match.id}`}
                className="block w-full bg-blue-600 text-white text-center py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
              >
                Book Tickets
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MatchesPage;