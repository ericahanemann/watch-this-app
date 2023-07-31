import { createContext, useState } from "react";
import axios from "axios";

axios.defaults.protocol = "https";

const MoviesContext = createContext();

function MoviesProvider({ children }) {
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [nowPlayingMovies, setNowPlayingMovies] = useState([]);
  const [genresIds, setGenresIds] = useState([]);

  const apiToken = process.env.VITE_API_TOKEN;

  const headers = {
    accept: "application/json",
    Authorization: `${apiToken}`,
  };

  const fetchTrendingMovies = async () => {
    try {
      const response = await axios.get(
        "https://api.themoviedb.org/3/movie/popular",
        { headers }
      );

      return response.data.results;
    } catch (error) {
      console.error("Request error:", error);
      return [];
    }
  };

  const fetchTopRatedMovies = async () => {
    try {
      const response = await axios.get(
        "https://api.themoviedb.org/3/movie/top_rated",
        { headers }
      );

      return response.data.results;
    } catch (error) {
      console.error("Request error:", error);
      return [];
    }
  };

  const fetchNowPlayingMovies = async () => {
    try {
      const response = await axios.get(
        "https://api.themoviedb.org/3/movie/now_playing",
        { headers }
      );

      return response.data.results;
    } catch (error) {
      console.error("Request error:", error);
      return [];
    }
  };

  const fetchGenresIds = async () => {
    try {
      const response = await axios.get(
        "https://api.themoviedb.org/3/genre/movie/list",
        { headers }
      );

      return response.data.genres;
    } catch (error) {
      console.error("Request error:", error);
      return [];
    }
  };

  const fetchSimilarMovies = async (movieId) => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/${movieId}/similar`,
        { headers }
      );

      return response.data.results;
    } catch (error) {
      console.error("Request error:", error);
      return [];
    }
  };

  const fetchMovieReviews = async (movieId) => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/${movieId}/reviews`,
        { headers }
      );

      return response.data.results;
    } catch (error) {
      console.error("Request error:", error);
      return [];
    }
  };

  const movies = {
    trendingMovies,
    setTrendingMovies,
    fetchTrendingMovies,
    topRatedMovies,
    setTopRatedMovies,
    fetchTopRatedMovies,
    nowPlayingMovies,
    setNowPlayingMovies,
    fetchNowPlayingMovies,
    genresIds,
    setGenresIds,
    fetchGenresIds,
    fetchSimilarMovies,
    fetchMovieReviews,
  };

  return (
    <MoviesContext.Provider value={movies}>{children}</MoviesContext.Provider>
  );
}

export { MoviesProvider };
export default MoviesContext;
