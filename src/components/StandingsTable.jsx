// src/components/StandingsTable.jsx
import { Link } from "react-router-dom";

// We receive 'data', but it's an array of { team, position, ... }
export default function StandingsTable({ title, data }) {
  return (
    // Removed overflow-hidden from this outer div
    <div className="bg-secondary rounded-lg shadow-md">
      <h3 className="text-xl font-semibold text-white p-4">{title}</h3>

      {/* This new div wrapper will handle the scrolling */}
      <div className="overflow-x-auto">
        <table className="min-w-full text-left"> {/* Changed to min-w-full */}
          {/* Table Header */}
          <thead className="bg-slate-700 text-gray-300 uppercase text-sm">
            <tr>
              {/* Added whitespace-nowrap to all headers */}
              <th scope="col" className="px-4 py-3 whitespace-nowrap">#</th>
              <th scope="col" className="px-4 py-3 whitespace-nowrap">Team</th>
              <th scope="col" className="px-4 py-3 text-center whitespace-nowrap">P</th>
              <th scope="col" className="px-4 py-3 text-center whitespace-nowrap">W</th>
              <th scope="col" className="px-4 py-3 text-center whitespace-nowrap">D</th>
              <th scope="col" className="px-4 py-3 text-center whitespace-nowrap">L</th>
              <th scope="col" className="px-4 py-3 text-center font-bold whitespace-nowrap">Pts</th>
            </tr>
          </thead>
          
          {/* Table Body */}
          <tbody className="text-gray-200">
            {data.map((teamData) => (
              <tr key={teamData.team.id} className="border-b border-gray-700 hover:bg-gray-750">
                <td className="px-4 py-4 font-medium">{teamData.position}</td>
                <td className="px-4 py-4 font-semibold flex items-center gap-3">
                  <img src={teamData.team.crest} alt={teamData.team.name} className="w-6 h-6" />
                  {teamData.team.name}
                </td>
                <td className="px-4 py-4 text-center">{teamData.playedGames}</td>
                <td className="px-4 py-4 text-center">{teamData.won}</td>
                <td className="px-4 py-4 text-center">{teamData.draw}</td>
                <td className="px-4 py-4 text-center">{teamData.lost}</td>
                <td className="px-4 py-4 text-center font-bold text-accent">
                  {teamData.points}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}