// src/pages/PlayerDetail.jsx
import { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import { fetchPlayerDetails } from "../lib/fetch-data";

export default function PlayerDetail() {
  const { id } = useParams(); // Get player ID from URL
  const location = useLocation(); // Get data passed from the Link
  
  // 'location.state' might contain stats (goals, assists)
  // We'll call this 'passedStats'
  const passedStats = location.state; 

  const [player, setPlayer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getPlayer = async () => {
      try {
        setLoading(true);
        // Fetch the player's biographical data
        const result = await fetchPlayerDetails(id);
        if (result) {
          setPlayer(result);
          setError(null);
        } else {
          setError("Failed to fetch player details.");
        }
      } catch (err) {
        setError("An application error occurred.");
      } finally {
        setLoading(false);
      }
    };

    getPlayer();
  }, [id]); // Re-run if the player ID changes

  // Helper to format date
  const formatDate = (utcDate) => {
    if (!utcDate) return "N/A";
    return new Date(utcDate).toLocaleDateString([], {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  if (loading) {
    return <p className="p-6 text-2xl text-gray-200 text-center">Loading player...</p>;
  }
  if (error) {
    return <p className="p-6 text-2xl text-red-400 text-center">{error}</p>;
  }
  if (!player) {
    return <p className="p-6 text-2xl text-gray-200 text-center">Player not found.</p>;
  }

  return (
    <div className="p-6 text-gray-200 max-w-2xl mx-auto">
      {/* Player Header */}
      <div className="bg-gray-800 p-6 rounded-lg shadow-md mb-6 text-center">
        <h2 className="text-4xl font-bold text-white">{player.name}</h2>
        <p className="text-2xl text-blue-300">{player.position}</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Biographical Info */}
        <div className="bg-gray-800 p-4 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold text-white mb-3">Profile</h3>
          <ul className="text-gray-300 space-y-2">
            <li><strong>Nationality:</strong> {player.nationality}</li>
            <li><strong>Date of Birth:</strong> {formatDate(player.dateOfBirth)}</li>
            <li><strong>Shirt Number:</strong> {player.shirtNumber ?? "N/A"}</li>
          </ul>
        </div>

        {/* Season Stats (Only if they were passed) */}
        {passedStats && (
          <div className="bg-gray-800 p-4 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-white mb-3">Season Stats (PL)</h3>
            <ul className="text-gray-300 space-y-2">
              <li><strong>Goals:</strong> {passedStats.goals ?? 0}</li>
              <li><strong>Assists:</strong> {passedStats.assists ?? 0}</li>
              <li><strong>Penalties:</strong> {passedStats.penalties ?? 0}</li>
              <li><strong>Matches Played:</strong> {passedStats.playedMatches ?? 0}</li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}