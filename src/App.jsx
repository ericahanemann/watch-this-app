import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { useEffect, useContext, useState } from "react";
import MoviesContext from "./context/movies";

function App() {
  const {
    setTrendingMovies,
    fetchTrendingMovies,
    setTopRatedMovies,
    fetchTopRatedMovies,
    setNowPlayingMovies,
    fetchNowPlayingMovies,
    setGenresIds,
    fetchGenresIds,
  } = useContext(MoviesContext);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    const trendingResponse = await fetchTrendingMovies();
    const topRatedResponse = await fetchTopRatedMovies();
    const upcomingResponse = await fetchNowPlayingMovies();
    const genresResponse = await fetchGenresIds();

    setTrendingMovies(trendingResponse);
    setTopRatedMovies(topRatedResponse);
    setNowPlayingMovies(upcomingResponse);
    setGenresIds(genresResponse);

    setIsLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (isLoading) {
    return (
      <div className="h-screen w-screen flex justify-center items-center">
        Loading...
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
}

export default App;
