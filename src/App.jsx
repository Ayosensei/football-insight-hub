// src/App.jsx
import { Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import Navbar from "./components/NavBar";
import Home from "./pages/Home";
import Stats from "./pages/Stats";
import Standings from "./pages/Standings";
import Players from "./pages/Players";
import MatchDetail from "./pages/MatchDetail";
import PlayerDetail from "./pages/PlayerDetail";
import Matches from "./pages/Matches"; // 1. Import the new page
import { fetchFixtures } from "./lib/fetch-data";

export default function App() {
  const [fixtures, setFixtures] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const result = await fetchFixtures();
        
        if (Array.isArray(result)) {
          setFixtures(result);
          setError(null);
        } else {
          setError("Failed to fetch fixtures.");
        }
      } catch (err) {
        console.error("A bug occurred in App.jsx:", err);
        setError("An application error occurred.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="font-sans bg-gray-950 min-h-screen">
      <Navbar />

      <Routes>
        <Route
          path="/"
          element={<Home fixtures={fixtures} loading={loading} error={error} />}
        />
        
        {/* 2. Update the /matches route to use the new component */}
        <Route
          path="/matches"
          element={<Matches fixtures={fixtures} loading={loading} error={error} />}
        />
        
        <Route path="/players" element={<Players />} />
        <Route path="/stats" element={<Stats />} />
        <Route path="/standings" element={<Standings />} /> 
        <Route path="/match/:id" element={<MatchDetail />} />
        <Route path="/player/:id" element={<PlayerDetail />} />
      </Routes>
    </div>
  );
}