// src/components/PlayerCard.jsx
import { Link } from "react-router-dom";

// We now receive 'player', 'team', and optional 'stats' (goals, assists, etc.)
export default function PlayerCard({ player, team, stats }) {
  
  const teamImage = team?.crest || "https://via.placeholder.com/150";

  return (
    // --- THIS IS THE CRITICAL CHANGE ---
    // We pass the 'stats' object via the Link's 'state' prop
    <Link
      to={`/player/${player.id}`}
      state={stats} // Pass stats to the PlayerDetail page
      className="block bg-secondary hover:bg-gray-700 transition rounded-lg shadow-md overflow-hidden"
    >
      <div className="flex justify-between items-center p-4">
        {/* Left side: Player Info */}
        <div className="flex items-center">
          <img
            src={teamImage}
            alt={team?.name || 'Team'}
            className="w-16 h-16 rounded-full object-cover mr-4 border-2 border-accent bg-gray-700"
          />
          <div>
            <h3 className="text-xl font-semibold text-white">{player.name}</h3>
            <p className="text-gray-400">
              {team ? team.name : `Nationality: ${player.nationality}`}
            </p>
            <p className="text-accent text-sm">{player.position}</p>
          </div>
        </div>

        {/* Right side: Goals (Only render if 'stats' prop exists) */}
        {stats?.goals && (
          <div className="text-right">
            <p className="text-3xl font-bold text-accent">{stats.goals}</p>
            <p className="text-gray-400 text-sm">Goals</p>
          </div>
        )}
      </div>
    </Link>
  );
}