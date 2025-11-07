// src/components/MatchCard.jsx
import { Link } from "react-router-dom";

// Helper to format date (e.g., "Nov 8")
const getMatchDate = (utcDate) => {
  if (!utcDate) return "";
  const date = new Date(utcDate);
  return date.toLocaleDateString([], { month: 'short', day: 'numeric' });
};

// Helper to format time (e.g., "15:00")
const getMatchTime = (utcDate) => {
  if (!utcDate) return "TBA";
  const date = new Date(utcDate);
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
};

export default function MatchCard({ match }) {
  const { id, homeTeam, awayTeam, score, status, utcDate } = match;

  const getStatusDisplay = () => {
    if (status === "FINISHED") {
      return <span className="font-bold text-light">FT</span>;
    }
    if (status === "IN_PLAY") {
      return <span className="font-bold text-accent">LIVE</span>;
    }
    if (status === "PAUSED") {
      return <span className="font-bold text-accent">HT</span>;
    }
    return (
      <>
        <span className="text-light">{getMatchDate(utcDate)}</span>
        <span className="text-gray-400 text-xs">{getMatchTime(utcDate)}</span>
      </>
    );
  };

  return (
    // --- THIS IS THE CHANGE ---
    // We now pass the 'match' object in the 'state' prop
    <Link
      to={`/match/${id}`}
      state={{ match }} // Pass the full match object
      className="block bg-secondary rounded-lg mb-2 transition-all hover:bg-slate-700"
    >
      <div className="flex items-center p-3">
        
        {/* Col 1: Status / Time */}
        <div className="w-16 text-center flex flex-col items-center justify-center">
          {getStatusDisplay()}
        </div>

        {/* Vertical Divider */}
        <div className="w-px h-10 bg-gray-600"></div>

        {/* Col 2: Teams */}
        <div className="flex-1 px-4">
          <div className="flex items-center gap-3 mb-1">
            <img src={homeTeam.crest} alt={homeTeam.name} className="w-5 h-5" />
            <span className="text-light font-semibold">{homeTeam.name}</span>
          </div>
          <div className="flex items-center gap-3">
            <img src={awayTeam.crest} alt={awayTeam.name} className="w-5 h-5" />
            <span className="text-light font-semibold">{awayTeam.name}</span>
          </div>
        </div>
        
        {/* Col 3: Score */}
        <div className="w-16 text-center text-light font-bold text-lg">
          <div>{score.fullTime.home ?? 0}</div>
          <div>{score.fullTime.away ?? 0}</div>
        </div>
        
      </div>
    </Link>
  );
}