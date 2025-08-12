import { useEffect, useState } from 'react';
import { Match } from '../types';
import { getMatches } from '../services/matchService';
import MatchCard from '../components/MatchCard';

export default function MatchesPage() {
  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const data = await getMatches();
        setMatches(data);
      } catch (error) {
        console.error('Error fetching matches:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMatches();
  }, []);

  if (loading) return <div>Loading matches...</div>;

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Upcoming Matches</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {matches.map(match => (
          <MatchCard key={match.id} match={match} />
        ))}
      </div>
    </div>
  );
}
