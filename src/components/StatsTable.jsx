// src/components/StatsTable.jsx
import { Link } from "react-router-dom";

export default function StatsTable({ title, data, statKey, statLabel = "Goals" }) {
  return (
    <div className="bg-secondary rounded-lg shadow-md overflow-hidden mb-6">
      <h3 className="text-xl font-semibold text-light p-4">{title}</h3>
      <div className="overflow-x-auto">
        <table className="min-w-full text-left">
          <thead className="bg-slate-700 text-gray-300 uppercase text-sm">
            {/* ... table headers ... */}
            <tr>
              <th scope="col" className="px-4 py-3 whitespace-nowrap">#</th>
              <th scope="col" className="px-4 py-3 whitespace-nowrap">Player</th>
              <th scope="col" className="px-4 py-3 whitespace-nowrap">Team</th>
              <th scope="col" className="px-4 py-3 text-center whitespace-nowrap">Played</th>
              <th scope="col" className="px-4 py-3 text-center font-bold whitespace-nowrap">{statLabel}</th>
            </tr>
          </thead>
          <tbody className="text-light">
            {data.map((item, index) => {
              // Create the state object to pass
              const stateToPass = {
                player: item.player,
                team: item.team,
                stats: item // The 'item' is the whole scorer object (goals, assists, etc.)
              };

              return (
                <tr key={item.player.id} className="border-b border-gray-700 hover:bg-slate-700">
                  <td className="px-4 py-4 font-medium">{index + 1}</td>
                  <td className="px-4 py-4 font-semibold whitespace-nowrap">
                    <Link
                      to={`/player/${item.player.id}`}
                      state={stateToPass} // <-- Pass the new state object
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
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}