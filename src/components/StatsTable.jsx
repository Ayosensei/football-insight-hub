// src/components/StatsTable.jsx
import { Link } from "react-router-dom"; // 1. Import Link

export default function StatsTable({ title, data, statKey, statLabel = "Goals" }) {
  return (
    <div className="bg-gray-800 rounded-lg shadow-md overflow-hidden mb-6">
      <h3 className="text-xl font-semibold text-white p-4">{title}</h3>
      <table className="w-full text-left">
        {/* Table Header */}
        <thead className="bg-gray-700 text-gray-300 uppercase text-sm">
          <tr>
            <th scope="col" className="px-4 py-3">#</th>
            <th scope="col" className="px-4 py-3">Player</th>
            <th scope="col" className="px-4 py-3">Team</th>
            <th scope="col" className="px-4 py-3 text-center">Played</th>
            <th scope="col" className="px-4 py-3 text-center font-bold">{statLabel}</th>
          </tr>
        </thead>
        
        {/* Table Body */}
        <tbody className="text-gray-200">
          {data.map((item, index) => (
            <tr key={item.player.id} className="border-b border-gray-700 hover:bg-gray-750">
              <td className="px-4 py-4 font-medium">{index + 1}</td>
              
              {/* 2. Make the player name a Link */}
              <td className="px-4 py-4 font-semibold">
                <Link
                  to={`/player/${item.player.id}`}
                  state={item} // Pass the whole scorer object (goals, assists, etc.)
                  className="hover:text-blue-300 hover:underline"
                >
                  {item.player.name}
                </Link>
              </td>
              
              <td className="px-4 py-4 flex items-center gap-2">
                 <img src={item.team.crest} alt={item.team.name} className="w-5 h-5" />
                 {item.team.name}
              </td>
              <td className="px-4 py-4 text-center">{item.playedMatches}</td>
              <td className="px-4 py-4 text-center font-bold text-blue-300">
                {item[statKey]}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}