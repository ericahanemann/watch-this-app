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
    setUpcomingMovies,
    fetchUpcomingMovies,
    setGenresIds,
    fetchGenresIds,
  } = useContext(MoviesContext);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    const trendingResponse = await fetchTrendingMovies();
    const topRatedResponse = await fetchTopRatedMovies();
    const upcomingResponse = await fetchUpcomingMovies();
    const genresResponse = await fetchGenresIds();

    setTrendingMovies(trendingResponse);
    setTopRatedMovies(topRatedResponse);
    setUpcomingMovies(upcomingResponse);
    setGenresIds(genresResponse);

    setIsLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (isLoading) {
    return (
      <div className="h-screen w-screen flex justify-center items-center overflow-x-hidden">
        Loading...
      </div>
    );
  }

  return (
    <div className="overflow-x-hidden">
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
}

export default App;
