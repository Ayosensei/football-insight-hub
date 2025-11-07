// src/components/PlayerCard.jsx
import { Link } from "react-router-dom";

// We receive 'player', 'team', and optional 'stats'
export default function PlayerCard({ player, team, stats }) {
  
  const teamImage = team?.crest || "https://via.placeholder.com/150";

  // We'll create a 'stateToPass' object.
  // This will contain all the data our detail page needs.
  const stateToPass = {
    player, // The player object (id, name, nationality, etc.)
    team,   // The team object (id, name, crest)
    stats   // The stats object (goals, assists) - if it exists
  };

  return (
    <Link
      to={`/player/${player.id}`}
      state={stateToPass} // <-- Pass the whole data object
      className="block bg-secondary rounded-lg mb-2 transition-all hover:bg-slate-700"
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
            <h3 className="text-xl font-semibold text-light">{player.name}</h3>
            <p className="text-gray-400">
              {team ? team.name : `Nationality: ${player.nationality}`}
            </p>
            <p className="text-accent-dark text-sm">{player.position}</p>
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