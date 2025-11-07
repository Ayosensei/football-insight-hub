// src/lib/fetch-data.js

const API_KEY = import.meta.env.VITE_FOOTBALL_DATA_KEY;
const BASE_URL = "/api"; // This is our proxy

/**
 * A central helper function to make all our API calls
 * This is the function that was missing!
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

export const fetchFixtures = async (filters = {}) => {
  let endpoint = "competitions/PL/matches";
  const params = [];

  if (filters.status) {
    params.push(`status=${filters.status.toUpperCase()}`);
  }
  if (filters.matchday) {
    params.push(`matchday=${filters.matchday}`);
  }
  if (filters.date) {
    params.push(`dateFrom=${filters.date}&dateTo=${filters.date}`);
  }

  if (params.length > 0) {
    endpoint += `?${params.join("&")}`;
  }

  const result = await fetchApi(endpoint);
  if (result && result.matches) {
    return result.matches;
  }
  return null;
};

export const fetchPlayers = async (teamId) => {
  if (!teamId) return null;
  const result = await fetchApi(`teams/${teamId}`);
  if (result && result.squad) {
    return result.squad;
  }
  return null;
};

export const fetchMatchDetails = async (matchId) => {
  if (!matchId) return null;
  const result = await fetchApi(`matches/${matchId}`);
  if (result) {
    return result;
  }
  return null;
};

export const fetchPlayerDetails = async (playerId) => {
  if (!playerId) return null;
  const result = await fetchApi(`players/${playerId}`);
  if (result) {
    return result;
  }
  return null;
};

export const fetchTopScorers = async () => {
  const result = await fetchApi("competitions/PL/scorers");
  if (result && result.scorers) {
    return result.scorers;
  }
  return null;
};