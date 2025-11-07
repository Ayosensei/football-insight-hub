// src/pages/MatchDetail.jsx
import { useLocation, Navigate } from "react-router-dom";

// Helper function to format date
const formatDate = (utcDate) => {
  if (!utcDate) return "N/A";
  const date = new Date(utcDate);
  return date.toLocaleString([], {
    dateStyle: 'full',
    timeStyle: 'short',
  });
};

export default function MatchDetail() {
  const location = useLocation();
  
  // Get the match object we passed from the Link
  const match = location.state?.match;

  // If someone lands on this page directly (no match data), redirect them
  if (!match) {
    return <Navigate to="/" replace />;
  }

  // We have the match! Now we can destructure it.
  const { homeTeam, awayTeam, score, status, venue, utcDate } = match;

  return (
    <div className="p-6 text-light max-w-4xl mx-auto">
      
      {/* Header: Teams & Score */}
      <div className="flex justify-between items-center bg-secondary p-6 rounded-lg shadow-md mb-6">
        <div className="flex items-center gap-4 text-center">
          <img src={homeTeam.crest} alt={homeTeam.name} className="w-16 h-16" />
          <h2 className="text-3xl font-bold text-light">{homeTeam.name}</h2>
        </div>
        <div className="text-center">
          <p className="text-5xl font-bold text-accent">
            {score.fullTime.home ?? 0} - {score.fullTime.away ?? 0}
          </p>
          <p className="text-gray-400 text-sm mt-1">{status.replace("_", " ")}</p>
        </div>
        <div className="flex items-center gap-4 text-center">
          <h2 className="text-3xl font-bold text-light">{awayTeam.name}</h2>
          <img src={awayTeam.crest} alt={awayTeam.name} className="w-16 h-16" />
        </div>
      </div>

      {/* Match Info (Summary) */}
      <div className="bg-secondary p-4 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold text-light mb-3">Match Info</h3>
        <p className="text-gray-300">
          <strong>Date:</strong> {formatDate(utcDate)}
        </p>
        <p className="text-gray-300">
          <strong>Venue:</strong> {venue ?? "Not available"}
        </p>
        <p className="text-gray-400 mt-4">
          Detailed stats and lineups for this match are not available on the free plan.
        </p>
      </div>
    </div>
  );
}