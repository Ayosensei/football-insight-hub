// src/pages/Home.jsx
import { useState, useEffect } from "react";
import MatchCard from "../components/MatchCard";
import StandingsTable from "../components/StandingsTable";
import StatsTable from "../components/StatsTable";
// Import all the fetch functions we need
import { fetchStandings, fetchTopScorers, fetchFixtures } from "../lib/fetch-data";

// Helper to get today's date in YYYY-MM-DD format
// We'll use your current date: 2025-11-07
const TODAY_DATE = "2025-11-07"; 

// Define our tabs
const TABS = ["TODAY", "LIVE", "FINISHED"];

export default function Home() {
  // State for the tabs
  const [activeTab, setActiveTab] = useState(TABS[0]); // Default to "TODAY"
  const [matches, setMatches] = useState([]);
  const [loadingMatches, setLoadingMatches] = useState(true);
  const [errorMatches, setErrorMatches] = useState(null);

  // State for the sidebar widgets (this is your existing logic)
  const [standings, setStandings] = useState([]);
  const [scorers, setScorers] = useState([]); // <-- THIS WAS THE LINE WITH THE TYPO
  const [loadingWidgets, setLoadingWidgets] = useState(true);

  // Effect to fetch matches when 'activeTab' changes
  useEffect(() => {
    const getMatches = async () => {
      setLoadingMatches(true);
      setErrorMatches(null);
      
      let filters = {};
      if (activeTab === "TODAY") {
        filters = { date: TODAY_DATE };
      } else {
        filters = { status: activeTab }; // "LIVE" or "FINISHED"
      }

      try {
        const result = await fetchFixtures(filters);
        setMatches(Array.isArray(result) ? result : []);
      } catch (err) {
        setErrorMatches("Failed to fetch matches.");
      } finally {
        setLoadingMatches(false);
      }
    };

    getMatches();
  }, [activeTab]); // Re-run this effect when activeTab changes

  // Effect to fetch widgets (runs only once)
  useEffect(() => {
    const fetchWidgets = async () => {
      try {
        setLoadingWidgets(true);
        const [standingsResult, scorersResult] = await Promise.all([
          fetchStandings(),
          fetchTopScorers()
        ]);
        if (Array.isArray(standingsResult)) setStandings(standingsResult.slice(0, 5));
        if (Array.isArray(scorersResult)) setScorers(scorersResult.slice(0, 5));
      } catch (err) {
        console.error("Failed to load dashboard widgets:", err);
      } finally {
        setLoadingWidgets(false);
      }
    };
    fetchWidgets();
  }, []);

  return (
    <div className="p-6 text-light min-h-screen">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* --- Main Column (Matches) --- */}
        <div className="lg:col-span-2">
          
          {/* --- NEW TABS --- */}
          <div className="flex gap-2 mb-4">
            {TABS.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors
                  ${activeTab === tab 
                    ? 'bg-accent text-primary'  // Active tab style
                    : 'bg-secondary text-light hover:bg-slate-700' // Inactive
                  }
                `}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* --- Match List --- */}
          <div className="h-full">
            {loadingMatches ? (
              <p className="text-lg text-gray-400">Loading matches...</p>
            ) : errorMatches ? (
              <p className="text-lg text-red-500">{errorMatches}</p>
            ) : matches.length > 0 ? (
              matches.map((match) => (
                <MatchCard key={match.id} match={match} />
              ))
            ) : (
              <p className="text-lg text-gray-400">No {activeTab.toLowerCase()} matches found.</p>
            )}
          </div>
        </div>

        {/* --- Sidebar Column (Widgets) --- */}
        <div className="lg:col-span-1 space-y-6">
          {/* Standings Widget */}
          <div>
            <h2 className="text-2xl font-semibold mb-4 text-accent">Standings</h2>
            {loadingWidgets ? (
              <p className="text-gray-400">Loading table...</p>
            ) : (
              <StandingsTable title="Top 5 Teams" data={standings} />
            )}
          </div>
          {/* Top Scorers Widget */}
          <div>
            <h2 className="text-2xl font-semibold mb-4 text-accent">Top Scorers</h2>
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