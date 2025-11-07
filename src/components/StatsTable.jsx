// src/components/StatsTable.jsx
import { Link } from "react-router-dom";

export default function StatsTable({ title, data, statKey, statLabel = "Goals" }) {
  return (
    // Removed overflow-hidden from this outer div
    <div className="bg-secondary rounded-lg shadow-md overflow-hidden mb-6">
      <h3 className="text-xl font-semibold text-white p-4">{title}</h3>

      {/* This new div wrapper will handle the scrolling */}
      <div className="overflow-x-auto">
        <table className="min-w-full text-left"> {/* Changed to min-w-full */}
          {/* Table Header */}
          <thead className="bg-secondary text-gray-300 uppercase text-sm">
            <tr>
              {/* Added whitespace-nowrap to all headers */}
              <th scope="col" className="px-4 py-3 whitespace-nowrap">#</th>
              <th scope="col" className="px-4 py-3 whitespace-nowrap">Player</th>
              <th scope="col" className="px-4 py-3 whitespace-nowrap">Team</th>
              <th scope="col" className="px-4 py-3 text-center whitespace-nowrap">Played</th>
              <th scope="col" className="px-4 py-3 text-center font-bold whitespace-Srap">{statLabel}</th>
            </tr>
          </thead>
          
          {/* Table Body */}
          <tbody className="text-gray-200">
            {data.map((item, index) => (
              <tr key={item.player.id} className="border-b border-gray-700 hover:bg-gray-750">
                <td className="px-4 py-4 font-medium">{index + 1}</td>
                
                <td className="px-4 py-4 font-semibold whitespace-nowrap">
                  <Link
                    to={`/player/${item.player.id}`}
                    state={item} 
                    className="hover:text-accent hover:underline"
                  >
                    {item.player.name}
                  </Link>
                </td>
                
                <td className="px-4 py-4 flex items-center gap-2 whitespace-nowrap">
                  <img src={item.team.crest} alt={item.team.name} className="w-5 h-5" />
                  {item.team.name}
                </td>
                <td className="px-4 py-4 text-center">{item.playedMatches}</td>
                <td className="px-4 py-4 text-center font-bold text-accent">
                  {item[statKey]}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}