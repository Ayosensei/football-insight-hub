// src/pages/Stats.jsx
import { useState, useEffect } from "react";
import { fetchStandings } from "../lib/fetch-data"; // Import the new function
import StandingsTable from "../components/StandingsTable";

export default function Stats() {
  const [standings, setStandings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getStandings = async () => {
      try {
        setLoading(true);
        const result = await fetchStandings();

        console.log("API Result for Standings:", result);
        
        if (Array.isArray(result)) {
          setStandings(result);
          setError(null);
        } else {
          setError("Failed to fetch league standings.");
        }
      } catch (err) {
        console.error(err);
        setError("An application error occurred.");
      } finally {
        setLoading(false);
      }
    };

    getStandings();
  }, []); // Runs once when the Stats page is loaded

  // --- Render Logic ---

  if (loading) {
    return (
      <div className="p-6 text-gray-200 text-center">
        <p className="text-2xl">Loading league standings...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 text-red-400 text-center">
        <h2 className="text-3xl font-semibold mb-4">Error</h2>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="p-6 text-gray-200">
      <h2 className="text-3xl font-semibold mb-6 text-accent">Stats</h2>

      <div className="max-w-4xl mx-auto">
        <StandingsTable title="Premier League Standings" data={standings} />
      </div>
    </div>
  );
}