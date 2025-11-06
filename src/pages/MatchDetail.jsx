// src/pages/MatchDetail.jsx
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchMatchDetails } from "../lib/fetch-data";

export default function MatchDetail() {
  const { id } = useParams(); // Get the match ID from the URL
  const [match, setMatch] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getMatch = async () => {
      try {
        setLoading(true);
        const result = await fetchMatchDetails(id);
        if (result) {
          setMatch(result);
          setError(null);
        } else {
          setError("Failed to fetch match details.");
        }
      } catch (err) {
        setError("An application error occurred.");
      } finally {
        setLoading(false);
      }
    };

    getMatch();
  }, [id]);

  if (loading) {
    return (
      <div className="p-6 text-gray-200 text-center">
        <p className="text-2xl">Loading match details...</p>
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

  if (!match) {
    return (
      <div className="p-6 text-gray-200 text-center">
        <p className="text-2xl">Match not found.</p>
      </div>
    );
  }

  const { homeTeam, awayTeam, score, status, venue, lineups } = match;

  return (
    <div className="p-6 text-gray-200 max-w-4xl mx-auto">
      {/* Header: Teams & Score */}
      <div className="flex justify-between items-center bg-gray-800 p-6 rounded-lg shadow-md mb-6">
        <div className="flex items-center gap-4 text-center">
          <img src={homeTeam.crest} alt={homeTeam.name} className="w-16 h-16" />
          <h2 className="text-3xl font-bold text-white">{homeTeam.name}</h2>
        </div>
        <div className="text-center">
          <p className="text-5xl font-bold text-blue-300">
            {score.fullTime.home ?? 0} - {score.fullTime.away ?? 0}
          </p>
          <p className="text-gray-400 text-sm mt-1">{status.replace("_", " ")}</p>
        </div>
        <div className="flex items-center gap-4 text-center">
          <h2 className="text-3xl font-bold text-white">{awayTeam.name}</h2>
          <img src={awayTeam.crest} alt={awayTeam.name} className="w-16 h-16" />
        </div>
      </div>

      {/* Match Info */}
      <div className="bg-gray-800 p-4 rounded-lg shadow-md mb-6">
        <h3 className="text-xl font-semibold text-white mb-3">Match Info</h3>
        <p className="text-gray-300">
          <strong>Venue:</strong> {venue}
        </p>
      </div>

      {/* Lineups */}
      <div className="bg-gray-800 p-4 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold text-white mb-3">Lineups</h3>

        {/* --- THIS IS THE FIX --- */}
        {/* We check if lineups, lineups.home, and lineups.away exist before mapping */}
        {lineups && lineups.home && lineups.away ? (
          <div className="flex justify-between">
            {/* Home Lineup */}
            <div>
              <h4 className="text-lg font-semibold text-blue-300 mb-2">{homeTeam.name}</h4>
              <ul className="text-gray-300">
                {lineups.home.map((player) => (
                  <li key={player.id} className="mb-1">{player.name}</li>
                ))}
              </ul>
            </div>
            {/* Away Lineup */}
            <div>
              <h4 className="text-lg font-semibold text-blue-300 mb-2">{awayTeam.name}</h4>
              <ul className="text-gray-300">
                {lineups.away.map((player) => (
                  <li key={player.id} className="mb-1">{player.name}</li>
                ))}
              </ul>
            </div>
          </div>
        ) : (
          // If lineups don't exist, show this message
          <p className="text-gray-400">Lineups are not available for this match yet.</p>
        )}
      </div>
    </div>
  );
}