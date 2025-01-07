import axios from "axios";
import { envVars } from "../config/envVars.js";

export const fetchfromTMDB = async (url) => {
  if (!url) {
    throw new Error("URL parameter is required for fetching data from TMDB.");
  }

  const options = {
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${envVars.TMDB_API}`, // Ensure TMDB_API contains a valid token
    },
  };

  try {
    const response = await axios.get(url, options);

    if (response.status !== 200) {
      throw new Error(
        `Failed to fetch data from TMDB API. Status: ${response.status} - ${response.statusText}`
      );
    }

    return response.data;
  } catch (error) {
    console.error(`Error fetching data from TMDB API (URL: ${url})`, error.message);
    throw error; // Re-throw the error to propagate it upwards
  }
};
