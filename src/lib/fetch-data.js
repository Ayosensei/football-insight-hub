// src/lib/fetch-data.js

const API_KEY = import.meta.env.VITE_FOOTBALL_DATA_KEY;
const BASE_URL = "/api"; 

/**
 * A helper function to make all our API calls
 * @param {string} endpoint The endpoint to call (e.g., 'competitions/PL/standings')
 * @returns {Promise<any>} The JSON response from the API
 */
const fetchApi = async (endpoint) => {
  try {
    const response = await fetch(`${BASE_URL}/${endpoint}`, {
      method: 'GET',
      headers: {
        'X-Auth-Token': API_KEY,
      },
    });

    if (!response.ok) {
      console.error(`HTTP error! status: ${response.status}`);
      return null;
    }

    return await response.json();

  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
};

// --- Our App's Data Functions ---

export const fetchStandings = async () => {
  const result = await fetchApi("competitions/PL/standings");
  
  if (result && result.standings && result.standings.length > 0) {
    return result.standings[0].table;
  }
  
  return null;
};

export const fetchFixtures = async () => {
  const result = await fetchApi("competitions/PL/matches?matchday=11");

  if (result && result.matches) {
    return result.matches;
  }
  
  return null;
};

// --- NEW FUNCTION: Gets all teams in the Premier League ---
export const fetchTeams = async () => {
  const result = await fetchApi("competitions/PL/teams");

  if (result && result.teams) {
    return result.teams;
  }

  return null;
};

// --- UPDATED FUNCTION: Now takes a teamId ---
export const fetchPlayers = async (teamId) => {
  // If no teamId is provided, don't fetch.
  if (!teamId) return null;

  const result = await fetchApi(`teams/${teamId}`);

  if (result && result.squad) {
    return result.squad;
  }
  
  return null;
};

export const fetchMatchDetails = async (matchId) => {
  if (!matchId) return null;

  // The 'head2head' endpoint gives us all match details
  const result = await fetchApi(`matches/${matchId}`);

  // The data is just the 'result' object itself
  if (result) {
    return result;
  }
  
  return null; // Return null on failure
};

export const fetchTopScorers = async () => {
  // 'PL' = Premier League. This gets the top scorers list.
  const result = await fetchApi("competitions/PL/scorers");

  // The players array is at result.scorers
  if (result && result.scorers) {
    return result.scorers;
  }
  
  return null; // Return null on failure
};

export const fetchPlayerDetails = async (playerId) => {
  if (!playerId) return null;

  // This endpoint gets a player's profile data
  const result = await fetchApi(`players/${playerId}`);

  if (result) {
    return result;
  }
  
  return null; // Return null on failure
};