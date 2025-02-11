 import axios from 'axios'

 const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
 const BASE_URL = "https://api.themoviedb.org/3";


 export const getMoviesByGenre = async (genreId) => {
    try {
      const response = await axios.get(`${BASE_URL}/discover/movie`, {
        params: {
          api_key: API_KEY,
          with_genres: genreId,
          language: "en-US",
          sort_by: "popularity.desc",
        },
      });
  
      return response.data.results; // Returns an array of movies
    } catch (error) {
      console.error("Error fetching movies:", error);
      return [];
    }
  };
  