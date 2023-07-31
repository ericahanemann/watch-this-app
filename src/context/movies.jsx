import { createContext, useState } from "react";
import axios from "axios";

axios.defaults.protocol = "https";

const MoviesContext = createContext();

function MoviesProvider({ children }) {
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [upcomingMovies, setUpcomingMovies] = useState([]);
  const [genresIds, setGenresIds] = useState([]);

  const apiToken = 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmMmI1ODBmMzljMGYyNDZlMDNhN2UwMjg1ZmQ5OTE0NyIsInN1YiI6IjY0NjYyNjRjMmJjZjY3MDBmZTVlZmZkYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.AfqDzyyXwrwFsaU1BYNgBB_K7Xm16NFiWUG-uJoI2QA';

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

  const fetchUpcomingMovies = async () => {
    try {
      const response = await axios.get(
        "https://api.themoviedb.org/3/movie/upcoming",
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
    upcomingMovies,
    setUpcomingMovies,
    fetchUpcomingMovies,
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
