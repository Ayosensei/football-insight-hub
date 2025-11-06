// src/pages/Matches.jsx
import MatchCard from "../components/MatchCard";

// We receive the same props as the Home page
export default function Matches({ fixtures, loading: loadingFixtures, error: errorFixtures }) {
  
  return (
    <div className="p-6 text-gray-200 min-h-screen">
      <div className="max-w-4xl mx-auto">
        
        <h2 className="text-3xl font-semibold mb-6 text-blue-400">All Matches (Matchday 11)</h2>
        
        {loadingFixtures ? (
          <p className="text-lg text-gray-400">Loading matches...</p>
        ) : errorFixtures ? (
          <p className="text-lg text-red-400">{errorFixtures}</p>
        ) : fixtures.length > 0 ? (
          // We map over the *full* fixtures list, not the filtered one
          fixtures.map((match) => (
            <MatchCard key={match.id} match={match} />
          ))
        ) : (
          <p className="text-lg text-gray-400">No scheduled matches found.</p>
        )}

      </div>
    </div>
  );
}