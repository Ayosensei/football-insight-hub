// src/pages/Home.jsx
import { useState, useEffect } from "react";
import MatchCard from "../components/MatchCard";
import StandingsTable from "../components/StandingsTable";
import StatsTable from "../components/StatsTable";
import { fetchStandings, fetchTopScorers } from "../lib/fetch-data";

// --- NEW: Define our "Big 6" team IDs ---
const BIG_6_IDS = [57, 61, 64, 65, 66, 73];

export default function Home({ fixtures, loading: loadingFixtures, error: errorFixtures }) {
  
  const [standings, setStandings] = useState([]);
  const [scorers, setScorers] = useState([]);
  const [loadingWidgets, setLoadingWidgets] = useState(true);

  useEffect(() => {
    const fetchWidgets = async () => {
      try {
        setLoadingWidgets(true);
        const [standingsResult, scorersResult] = await Promise.all([
          fetchStandings(),
          fetchTopScorers()
        ]);

        if (Array.isArray(standingsResult)) {
          setStandings(standingsResult.slice(0, 5));
        }
        if (Array.isArray(scorersResult)) {
          setScorers(scorersResult.slice(0, 5));
        }
      } catch (err) {
        console.error("Failed to load dashboard widgets:", err);
      } finally {
        setLoadingWidgets(false);
      }
    };
    fetchWidgets();
  }, []);

  // --- NEW: Filter fixtures to find "big matches" ---
  const bigMatches = fixtures.filter(match => 
    BIG_6_IDS.includes(match.homeTeam.id) || 
    BIG_6_IDS.includes(match.awayTeam.id)
  );

  return (
    <div className="p-6 text-gray-200 min-h-screen">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* --- Main Column (Matches) --- */}
        <div className="lg:col-span-2">
          {/* Updated title */}
          <h2 className="text-3xl font-semibold mb-6 text-blue-400">Top Matches</h2>
          
          {loadingFixtures ? (
            <p className="text-lg text-gray-400">Loading matches...</p>
          ) : errorFixtures ? (
            <p className="text-lg text-red-400">{errorFixtures}</p>
          ) : bigMatches.length > 0 ? ( // --- Use the filtered list ---
            bigMatches.map((match) => (
              <MatchCard key={match.id} match={match} />
            ))
          ) : (
            <p className="text-lg text-gray-400">No top matches found for this matchday.</p>
          )}
        </div>

        {/* --- Sidebar Column (Widgets) --- */}
        <div className="lg:col-span-1 space-y-6">
          {/* Standings Widget */}
          <div>
            <h2 className="text-2xl font-semibold mb-4 text-blue-400">Standings</h2>
            {loadingWidgets ? (
              <p className="text-gray-400">Loading table...</p>
            ) : (
              <StandingsTable title="Top 5 Teams" data={standings} />
            )}
          </div>

          {/* Top Scorers Widget */}
          <div>
            <h2 className="text-2xl font-semibold mb-4 text-blue-400">Top Scorers</h2>
            {loadingWidgets ? (
              <p className="text-gray-400">Loading scorers...</p>
            ) : (
              <StatsTable 
                title="Top 5 Scorers"
                data={scorers}
                statKey="goals"
                statLabel="Goals"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}