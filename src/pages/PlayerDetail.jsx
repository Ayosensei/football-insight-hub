// src/pages/PlayerDetail.jsx
import { useLocation, Navigate } from "react-router-dom";

// Helper to format date
const formatDate = (utcDate) => {
  if (!utcDate) return "N/A";
  return new Date(utcDate).toLocaleDateString([], {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

export default function PlayerDetail() {
  const location = useLocation();
  
  // Get the data object we passed from the Link
  const { player, team, stats } = location.state || {};

  // If no player data was passed, redirect to home
  if (!player) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="p-6 text-light max-w-2xl mx-auto">
      {/* Player Header */}
      <div className="bg-secondary p-6 rounded-lg shadow-md mb-6 text-center">
        {team?.crest && (
          <img src={team.crest} alt={team.name} className="w-24 h-24 mx-auto mb-4" />
        )}
        <h2 className="text-4xl font-bold text-light">{player.name}</h2>
        <p className="text-2xl text-accent">{player.position}</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Biographical Info */}
        <div className="bg-secondary p-4 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold text-light mb-3">Profile</h3>
          <ul className="text-gray-300 space-y-2">
            <li><strong>Team:</strong> {team?.name ?? "N/A"}</li>
            <li><strong>Nationality:</strong> {player.nationality}</li>
            <li><strong>Date of Birth:</strong> {formatDate(player.dateOfBirth)}</li>
            <li><strong>Shirt Number:</strong> {player.shirtNumber ?? "N/A"}</li>
          </ul>
        </div>

        {/* Season Stats (Only if they were passed) */}
        {stats && (
          <div className="bg-secondary p-4 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-light mb-3">Season Stats (PL)</h3>
            <ul className="text-gray-300 space-y-2">
              <li><strong>Goals:</strong> {stats.goals ?? 0}</li>
              <li><strong>Assists:</strong> {stats.assists ?? 0}</li>
              <li><strong>Penalties:</strong> {stats.penalties ?? 0}</li>
              <li><strong>Matches Played:</strong> {stats.playedMatches ?? 0}</li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}