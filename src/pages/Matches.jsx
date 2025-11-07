// src/pages/Matches.jsx
import { useState, useEffect } from "react";
import MatchCard from "../components/MatchCard";
import { fetchFixtures } from "../lib/fetch-data";

export default function Matches() {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch all scheduled matches when this page loads
  useEffect(() => {
    const getMatches = async () => {
      try {
        setLoading(true);
        setError(null);
        // You can change this filter to whatever you want this page to show
        const result = await fetchFixtures({ status: "SCHEDULED" });
        setMatches(Array.isArray(result) ? result : []);
      } catch (err) {
        setError("Failed to fetch matches.");
      } finally {
        setLoading(false);
      }
    };

    getMatches();
  }, []); // Runs once on page load

  return (
    <div className="p-6 text-light min-h-screen">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-semibold mb-6 text-accent">Scheduled Matches</h2>
        
        {loading ? (
          <p className="text-lg text-gray-400">Loading matches...</p>
        ) : error ? (
          <p className="text-lg text-red-500">{error}</p>
        ) : matches.length > 0 ? (
          matches.map((match) => (
            <MatchCard key={match.id} match={match} />
          ))
        ) : (
          <p className="text-lg text-gray-400">No scheduled matches found.</p>
        )}
      </div>
    </div>
  );
}