import { Link } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import MoviesContext from "../context/movies";
import UserListsContext from "../context/userLists";
import { BiStar, BiPlus } from "react-icons/bi";
import { BsFillBookmarkCheckFill } from "react-icons/bs";
import MovieList from "../components/MovieList";

function Home() {
  const { trendingMovies, topRatedMovies, nowPlayingMovies, genresIds } =
    useContext(MoviesContext);
  const { watchList, addToWatchList, removeFromWatchList } =
    useContext(UserListsContext);

  const [activeMovieIndex, setActiveMediaIndex] = useState(0);
  const movieBackdrop = {
    backgroundImage: `url(https://image.tmdb.org/t/p/original${trendingMovies[activeMovieIndex].backdrop_path})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
  };
  const movieInfoPath = `movie-info/${trendingMovies[activeMovieIndex].id}`;
  let movieGenres = "";

  for (let i = 0; i < trendingMovies[activeMovieIndex].genre_ids.length; i++) {
    const genreIndex = genresIds.findIndex((genre) => {
      return genre.id === trendingMovies[activeMovieIndex].genre_ids[i];
    });

    if (genreIndex !== -1) {
      if (i === trendingMovies[activeMovieIndex].genre_ids.length - 1) {
        movieGenres = movieGenres + " " + genresIds[genreIndex].name;
      } else {
        movieGenres = movieGenres + " " + genresIds[genreIndex].name + " -";
      }
    }
  }

  const [isTimerActive, setTimerActive] = useState(true);

  const startTimer = () => {
    setTimerActive(true);
  };

  const stopTimer = () => {
    setTimerActive(false);
  };

  useEffect(() => {
    if (isTimerActive) {
      const sliderTimer = setTimeout(() => {
        if (activeMovieIndex === trendingMovies.length - 1) {
          setActiveMediaIndex(0);
        } else {
          setActiveMediaIndex(activeMovieIndex + 1);
        }
      }, 10000);

      return () => clearTimeout(sliderTimer);
    }
  }, [activeMovieIndex, isTimerActive, trendingMovies]);

  const [isAddedToWatchlist, setIsAddedToWatchlist] = useState(false);

  const handleAddToWatchlistClick = () => {
    if (
      !watchList.some((item) => item.id === trendingMovies[activeMovieIndex].id)
    ) {
      addToWatchList(trendingMovies[activeMovieIndex]);
    }

    setIsAddedToWatchlist(true);
  };

  const handleRemoveFromWatchlistClick = () => {
    if (
      watchList.some((item) => item.id === trendingMovies[activeMovieIndex].id)
    ) {
      removeFromWatchList(trendingMovies[activeMovieIndex].id);
    }

    setIsAddedToWatchlist(false);
  };

  useEffect(() => {
    if (
      !watchList.some((item) => item.id === trendingMovies[activeMovieIndex].id)
    ) {
      setIsAddedToWatchlist(false);
    } else {
      setIsAddedToWatchlist(true);
    }
  }, [activeMovieIndex]);

  return (
    <div className="mt-20">
      <div className="relative overflow-x-hidden flex flex-col">
        <div
          className="h-screen absolute inset-y-0 right-0 w-4/5 -z-10 duration-500"
          style={movieBackdrop}
        ></div>
        <div className="h-screen absolute inset-0 bg-gradient-to-b from-primary from-5% via-transparent to-primary -z-10"></div>

        <div className="mb-4 min-h-screen flex flex-col justify-between bg-gradient-to-r from-primary from-30% via-transparent to-trasparent">
          <div
            onMouseEnter={stopTimer}
            onMouseLeave={startTimer}
            className="flex-1 flex flex-col gap-2 w-screen mx-2 px-4 mt-20 justify-start sm:ml-24 sm:w-2/5 sm:px-0"
          >
            <h3 className="text-4xl font-bold tracking-tighter text-highlights">
              {trendingMovies[activeMovieIndex].title}
            </h3>
            <p className="mt-4 text-highlights text-lg font-extralight">
              {trendingMovies[activeMovieIndex].overview}
            </p>

            <div className="mt-4 mb-2 flex gap-2">
              <div className="flex items-center gap-1 w-fit text-base text-highlights bg-secondary rounded px-1">
                <BiStar className="text-base text-highlights" />
                <div className="text-highlights">
                  {trendingMovies[activeMovieIndex].vote_average}
                </div>
              </div>

              <div className="flex gap-1 text-base font-semibold">
                <div>{trendingMovies[activeMovieIndex].release_date} |</div>
                <div>{movieGenres}</div>
              </div>
            </div>
            <div className="flex items-center">
              <button className="text-highlights text-lg font-semibold bg-transparent outline-none border-2 border-solid border-highlights rounded p-2 mr-1 hover:bg-secondary">
                <Link to={movieInfoPath}>More Info</Link>
              </button>
              <button
                onClick={
                  isAddedToWatchlist
                    ? handleRemoveFromWatchlistClick
                    : handleAddToWatchlistClick
                }
                className="text-primary font-semibold bg-highlights outline-none border-2 border-solid border-highlights rounded p-3 mr-1 hover:bg-secondary hover:text-highlights ${
                  isAddedToWatchlist"
                title={
                  isAddedToWatchlist
                    ? "Remove from watchlist"
                    : "Add to watchlist"
                }
              >
                <div className="flex items-center gap-1 text-lg">
                  {isAddedToWatchlist ? (
                    <BsFillBookmarkCheckFill />
                  ) : (
                    <BiPlus />
                  )}
                </div>
              </button>
            </div>
          </div>

          <MovieList
            goBack={false}
            listTitle="Trending Now"
            moviesToDisplay={trendingMovies}
          />
        </div>

        <MovieList
          goBack={false}
          listTitle="Top Rated"
          moviesToDisplay={topRatedMovies}
        />
        <MovieList
          goBack={false}
          listTitle="Upcoming"
          moviesToDisplay={nowPlayingMovies}
        />
      </div>
    </div>
  );
}

export default Home;
