// src/components/MatchCard.jsx
import { Link } from "react-router-dom";

// Helper function to format the time
const getMatchTime = (utcDate) => {
  if (!utcDate) return "TBA";
  const date = new Date(utcDate);
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
};

// --- NEW Helper function to format the date ---
const getMatchDate = (utcDate) => {
  if (!utcDate) return "";
  const date = new Date(utcDate);
  // Formats to a short, readable date like "Nov 8"
  return date.toLocaleDateString([], { month: 'short', day: 'numeric' });
};

export default function MatchCard({ match }) {
  const { id, homeTeam, awayTeam, score, status, utcDate } = match;

  // Helper to determine what to show on the far right
  const getRightSideDisplay = () => {
    if (status === "FINISHED") {
      return "FT";
    }
    if (status === "IN_PLAY") {
      return "Live";
    }
    if (status === "PAUSED") {
      return "HT";
    }
    // For scheduled matches, we'll return the time
    return getMatchTime(utcDate);
  };

  return (
    <Link
      to={`/match/${id}`}
      className="block bg-gray-800 hover:bg-gray-700 transition rounded-xl p-5 shadow-md mb-4 border border-gray-700"
    >
      <div className="flex justify-between items-center">
        {/* Left side — Teams */}
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <img src={homeTeam.crest} alt={homeTeam.name} className="w-6 h-6" />
            <h3 className="text-lg font-semibold text-white">{homeTeam.name}</h3>
          </div>
          <div className="flex items-center gap-3">
            <img src={awayTeam.crest} alt={awayTeam.name} className="w-6 h-6" />
            <h3 className="text-lg font-semibold text-white">{awayTeam.name}</h3>
          </div>
        </div>

        {/* Middle — Score */}
        <div className="text-center w-20">
          <p className="text-2xl font-bold text-blue-300">
            {/* We'll default score to 0-0 for scheduled matches */}
            {score.fullTime.home ?? 0} - {score.fullTime.away ?? 0}
          </p>
          <p className={`text-xs ${status === 'IN_PLAY' ? 'text-green-400' : 'text-gray-400'}`}>
            {status.replace("_", " ")}
          </p>
        </div>

        {/* Right side — Date & Time */}
        <div className="w-16 text-right">
          {/* --- ADDED THE DATE HERE --- */}
          <p className="text-gray-300 text-sm font-semibold">{getMatchDate(utcDate)}</p>
          <p className="text-gray-400 text-xs">{getRightSideDisplay()}</p>
        </div>
      </div>
    </Link>
  );
}