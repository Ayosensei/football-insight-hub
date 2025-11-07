// src/App.jsx
import { Routes, Route } from "react-router-dom";
// We no longer need useState, useEffect, or fetchFixtures here
import Navbar from "./components/NavBar";
import Home from "./pages/Home";
import Stats from "./pages/Stats";
import Standings from "./pages/Standings";
import Players from "./pages/Players";
import MatchDetail from "./pages/MatchDetail";
import PlayerDetail from "./pages/PlayerDetail";
import Matches from "./pages/Matches";

export default function App() {
  // All state and effects related to fixtures are GONE.
  // This component is now simple and clean.

  return (
    <div className="font-sans min-h-screen">
      <Navbar />
      <Routes>
        {/* Pass the components directly without props */}
        <Route path="/" element={<Home />} />
        <Route path="/matches" element={<Matches />} />
        
        <Route path="/players" element={<Players />} />
        <Route path="/stats" element={<Stats />} />
        <Route path="/standings" element={<Standings />} /> 
        <Route path="/match/:id" element={<MatchDetail />} />
        <Route path="/player/:id" element={<PlayerDetail />} />
      </Routes>
    </div>
  );
}