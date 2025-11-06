// src/pages/Stats.jsx
import { useState, useEffect } from "react";
import { fetchTopScorers } from "../lib/fetch-data";
// 1. Import our new StatsTable
import StatsTable from "../components/StatsTable";

export default function Stats() {
  const [scorers, setScorers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getScorers = async () => {
      try {
        setLoading(true);
        const result = await fetchTopScorers();
        
        if (Array.isArray(result)) {
          setScorers(result);
          setError(null);
        } else {
          setError("Failed to fetch top scorers.");
        }
      } catch (err) {
        console.error(err);
        setError("An application error occurred.");
      } finally {
        setLoading(false);
      }
    };

    getScorers();
  }, []);

  // 2. Create the sorted lists *before* returning
  // We use [...scorers] to create a copy so we don't mess up the original
  
  const sortedByGoals = [...scorers].sort((a, b) => b.goals - a.goals);
  
  // We filter out anyone with 0 assists, then sort
  const sortedByAssists = [...scorers]
    .filter(p => p.assists > 0)
    .sort((a, b) => b.assists - a.assists);

  
  if (loading) {
    return (
      <div className="p-6 text-gray-200 text-center">
        <p className="text-2xl">Loading stats...</p>
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
    <div className="p-6 text-gray-200 max-w-4xl mx-auto">
      <h2 className="text-3xl font-semibold mb-6 text-blue-400">Player Stats</h2>
      
      {/* 3. Render the two tables */}
      
      <StatsTable 
        title="Top Scorers"
        data={sortedByGoals}
        statKey="goals"
        statLabel="Goals"
      />
      
      <StatsTable 
        title="Top Assists"
        data={sortedByAssists}
        statKey="assists"
        statLabel="Assists"
      />
      
    </div>
  );
}