// src/pages/Players.jsx
import { useState, useEffect } from "react";
// 1. Import fetchStandings instead of fetchTeams
import { fetchStandings, fetchPlayers } from "../lib/fetch-data";
import PlayerCard from "../components/PlayerCard";

export default function Players() {
  const [teams, setTeams] = useState([]); // This will now hold standings data
  const [selectedTeam, setSelectedTeam] = useState("");
  const [players, setPlayers] = useState([]);
  const [loadingTeams, setLoadingTeams] = useState(true);
  const [loadingPlayers, setLoadingPlayers] = useState(false);
  const [error, setError] = useState(null);

  // 1. First effect: Fetch standings to get the team list
  useEffect(() => {
    const getTeams = async () => {
      try {
        setLoadingTeams(true);
        // 2. Call fetchStandings()
        const result = await fetchStandings(); 
        if (Array.isArray(result)) {
          // The 'result' is the standings array. Each item has a 'team' object.
          setTeams(result); 
        } else {
          setError("Failed to fetch teams.");
        }
      } catch (err) {
        setError("An application error occurred.");
      } finally {
        setLoadingTeams(false);
      }
    };
    getTeams();
  }, []);

  // 2. Second effect (no changes here, it's perfect)
  useEffect(() => {
    if (!selectedTeam) {
      setPlayers([]);
      return;
    }
    const getPlayers = async () => {
      try {
        setLoadingPlayers(true);
        setError(null);
        const result = await fetchPlayers(selectedTeam);
        if (Array.isArray(result)) {
          setPlayers(result);
        } else {
          setError("Failed to fetch players for this team.");
        }
      } catch (err) {
        setError("An application error occurred.");
      } finally {
        setLoadingPlayers(false);
      }
    };
    getPlayers();
  }, [selectedTeam]);

  const handleTeamChange = (e) => {
    setSelectedTeam(e.target.value);
  };

  if (loadingTeams) {
    return <p className="p-6 text-2xl text-gray-200 text-center">Loading teams...</p>;
  }
  if (error) {
    return <p className="p-6 text-2xl text-red-400 text-center">{error}</p>;
  }

  // 3. Find the selected team object from the standings data
  const selectedTeamObject = teams.find(
    (item) => item.team.id === parseInt(selectedTeam)
  )?.team; // We only want the '.team' property

  return (
    <div className="p-6 text-gray-200">
      <h2 className="text-3xl font-semibold mb-6 text-blue-400">View Team Squads</h2>

      {/* Team Selection Dropdown */}
      <div className="mb-6 max-w-md">
        <label htmlFor="team-select" className="block text-sm font-medium text-gray-300 mb-2">
          Select a Team
        </label>
        <select
          id="team-select"
          value={selectedTeam}
          onChange={handleTeamChange}
          className="w-full bg-gray-700 text-white p-2 rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <option value="">-- Please select a team --</option>
          {/* 4. Map over the standings array to get team data */}
          {teams.map((item) => (
            <option key={item.team.id} value={item.team.id}>
              {item.team.name}
            </option>
          ))}
        </select>
      </div>

      {/* Player Grid */}
      {loadingPlayers ? (
        <p className="text-lg text-gray-400 text-center">Loading squad...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {players.map((player) => (
            <PlayerCard
              key={player.id}
              player={player}
              team={selectedTeamObject} // Pass the found team object
            />
          ))}
        </div>
      )}
      {!selectedTeam && !loadingPlayers && players.length === 0 && (
        <p className="text-lg text-gray-400 text-center">
          Please select a team to view its squad.
        </p>
      )}
    </div>
  );
}