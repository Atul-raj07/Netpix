import axios from "axios";
import { fetchfromTMDB } from "../services/tmdb.service.js";

// Get a random trending movie
export async function trendingmovies(req, res) {
  try {
    const data = await fetchfromTMDB('https://api.themoviedb.org/3/trending/movie/day?language=en-US');
    if (!data || !data.results || data.results.length === 0) {
      return res.status(404).json({ success: false, message: "No trending movies found" });
    }
    const randomMovie = data.results[Math.floor(Math.random() * data.results.length)];
    res.json({ success: true, content: randomMovie });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to fetch trending movies", error: error.message });
  }
}

// Get trailers for a specific movie
export async function movieTrailers(req, res) {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ success: false, message: "Movie ID is required" });
  }

  try {
    const data = await fetchfromTMDB(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`);
    if (!data || !data.results || data.results.length === 0) {
      return res.status(404).json({ success: false, message: "No trailers found for this movie" });
    }
    res.json({ success: true, content: data.results });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to fetch movie trailers", error: error.message });
  }
}
    export async function movieDetails(req, res) {
        try {
            const { id } = req.params;
            const data = await fetchfromTMDB(`https://api.themoviedb.org/3/movie/${id}?language=en-US`);
    
            if (!data) {
                return res.status(404).json({ error: "Movie not found" });
            }
    
            res.json({ detail: data });
        } catch (error) {
            console.error("Error fetching movie details:", error.message);
            res.status(500).json({ error: "Failed to fetch movie details" });
        }
    }
    export async function similarMovie(req, res) {
      try {
          const { id } = req.params; 
          const data = await fetchfromTMDB(`https://api.themoviedb.org/3/movie/${id}/similar?language=en-US&page=1`);
          
          if (!data || !data.results) {
              return res.status(404).json({ error: "Similar movies not found" });
          }
  
          res.json({ content: data.results }); 
      } catch (error) {
          console.error("Error fetching similar movies:", error.message);
          res.status(500).json({ error: "Failed to fetch similar movies" });
      }
  }
  export async function movieCategory(req,res) {
    const {category} = req.params
    const data = await fetchfromTMDB(``)

    res.json({ category: data.result});
    
  }
  
  