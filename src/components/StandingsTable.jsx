// src/components/StandingsTable.jsx
export default function StandingsTable({ title, data }) {
  return (
    <div className="bg-gray-800 rounded-lg shadow-md overflow-hidden">
      <h3 className="text-xl font-semibold text-white p-4">{title}</h3>
      <table className="w-full text-left">
        {/* Table Header */}
        <thead className="bg-gray-700 text-gray-300 uppercase text-sm">
          <tr>
            <th scope="col" className="px-4 py-3">#</th>
            <th scope="col" className="px-4 py-3">Team</th>
            <th scope="col" className="px-4 py-3 text-center">P</th>
            <th scope="col" className="px-4 py-3 text-center">W</th>
            <th scope="col" className="px-4 py-3 text-center">D</th>
            <th scope="col" className="px-4 py-3 text-center">L</th>
            <th scope="col" className="px-4 py-3 text-center font-bold">Pts</th>
          </tr>
        </thead>
        
        {/* Table Body */}
        <tbody className="text-gray-200">
          {data.map((team) => (
            // Use the new unique key: team.team.id
            <tr key={team.team.id} className="border-b border-gray-700 hover:bg-gray-750">
              <td className="px-4 py-4 font-medium">{team.position}</td>
              <td className="px-4 py-4 font-semibold flex items-center gap-3">
                {/* The new API gives us team crest (logo) URLs! */}
                <img src={team.team.crest} alt={team.team.name} className="w-6 h-6" />
                {team.team.name}
              </td>
              <td className="px-4 py-4 text-center">{team.playedGames}</td>
              <td className="px-4 py-4 text-center">{team.won}</td>
              <td className="px-4 py-4 text-center">{team.draw}</td>
              <td className="px-4 py-4 text-center">{team.lost}</td>
              <td className="px-4 py-4 text-center font-bold text-blue-300">
                {team.points}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}