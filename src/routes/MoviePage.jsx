import { useParams } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import MoviesContext from "../context/movies";
import UserListsContext from "../context/userLists";
import { BiStar, BiPlus } from "react-icons/bi";
import { BsFillBookmarkCheckFill } from "react-icons/bs";
import MovieList from "../components/MovieList";
import ReviewItem from "../components/ReviewItem";

function MoviePage() {
  const {
    trendingMovies,
    topRatedMovies,
    upcomingMovies,
    genresIds,
    fetchSimilarMovies,
    fetchMovieReviews,
  } = useContext(MoviesContext);
  const {
    watchList,
    addToWatchList,
    removeFromWatchList,
    watchedList,
    addToWatchedList,
    removeFromWatchedList,
  } = useContext(UserListsContext);
  const { id } = useParams();
  const [similarMovies, setSimilarMovies] = useState([]);
  const [movieReviews, setMovieReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [movieDisplayed, setMovieDisplayed] = useState({});
  const [isAddedToWatchlist, setIsAddedToWatchlist] = useState(false);
  const [isAddedToWatchedlist, setIsAddedToWatchedlist] = useState(false);

  const fetchData = async () => {
    const similarMovies = await fetchSimilarMovies(id);
    const movieReviews = await fetchMovieReviews(id);

    setSimilarMovies(similarMovies);
    setMovieReviews(movieReviews);

    setIsLoading(false);
  };

  useEffect(() => {
    setIsLoading(true);
    fetchData();
  }, [id]);

  useEffect(() => {
    const combinedMovies = [
      ...trendingMovies,
      ...topRatedMovies,
      ...upcomingMovies,
      ...similarMovies,
    ];
    const movie = combinedMovies.find((movie) => movie.id === Number(id));

    if (movie) {
      setMovieDisplayed(movie);
    }
  }, [id, trendingMovies, topRatedMovies, upcomingMovies, similarMovies]);

  useEffect(() => {
    if (!watchList.some((item) => item.id === movieDisplayed.id)) {
      setIsAddedToWatchlist(false);
    } else {
      setIsAddedToWatchlist(true);
    }

    if (!watchedList.some((item) => item.id === movieDisplayed.id)) {
      setIsAddedToWatchedlist(false);
    } else {
      setIsAddedToWatchedlist(true);
    }
  }, [movieDisplayed]);

  if (isLoading) {
    return (
      <div className="h-screen w-screen flex justify-center items-center">
        Loading...
      </div>
    );
  }

  let movieGenres = "";

  for (let i = 0; i < movieDisplayed.genre_ids.length; i++) {
    const genreIndex = genresIds.findIndex((genre) => {
      return genre.id === movieDisplayed.genre_ids[i];
    });

    if (genreIndex !== -1) {
      if (i === movieDisplayed.genre_ids.length - 1) {
        movieGenres = movieGenres + " " + genresIds[genreIndex].name;
      } else {
        movieGenres = movieGenres + " " + genresIds[genreIndex].name + " -";
      }
    }
  }

  const movieBackdrop = {
    backgroundImage: `url(https://image.tmdb.org/t/p/original${movieDisplayed.backdrop_path})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
  };
  const posterUrl = `https://image.tmdb.org/t/p/original${movieDisplayed.poster_path}`;

  const renderedReviews = movieReviews.map((reviewItem) => {
    return <ReviewItem key={reviewItem.id} review={reviewItem} />;
  });

  const handleAddToWatchlistClick = () => {
    if (!watchList.some((item) => item.id === movieDisplayed.id)) {
      addToWatchList(movieDisplayed);
    }

    setIsAddedToWatchlist(true);
  };

  const handleRemoveFromWatchlistClick = () => {
    if (watchList.some((item) => item.id === movieDisplayed.id)) {
      removeFromWatchList(movieDisplayed.id);
    }

    setIsAddedToWatchlist(false);
  };

  const handleAddToWatchedlistClick = () => {
    if (watchList.some((item) => item.id === movieDisplayed.id)) {
      removeFromWatchList(movieDisplayed.id);
    }
    if (!watchedList.some((item) => item.id === movieDisplayed.id)) {
      addToWatchedList(movieDisplayed);
    }

    setIsAddedToWatchlist(false);
    setIsAddedToWatchedlist(true);
  };

  const handleRemoveFromWatchedlistClick = () => {
    if (!watchList.some((item) => item.id === movieDisplayed.id)) {
      addToWatchList(movieDisplayed);
    }
    if (watchedList.some((item) => item.id === movieDisplayed.id)) {
      removeFromWatchedList(movieDisplayed.id);
    }

    setIsAddedToWatchlist(true);
    setIsAddedToWatchedlist(false);
  };

  return (
    <div className="flex flex-col mt-20 overflow-x-hidden">
      <div
        className="absolute h-1/2 top-0 inset-x-0 -z-10 opacity-50"
        style={movieBackdrop}
      ></div>
      <div className="h-1/2 absolute inset-0 bg-gradient-to-b from-primary from-5% via-transparent to-primary -z-10"></div>

      <div className="min-h-screen w-4/5 mt-32 mx-auto flex flex-col sm:mt-60">
        <section className="flex flex-col gap-2 items-center sm:flex-row sm:gap-0">
          <img className="w-80" src={posterUrl} alt="movie poster" />

          <div className="sm:ml-32">
            <h3 className="text-2xl font-bold tracking-tighter text-highlights sm:text-4xl">
              {movieDisplayed.title}
            </h3>
            <p className="mt-4 text-highlights text-base sm:text-lg">
              {movieDisplayed.overview}
            </p>

            <div className="flex flex-col mt-2 gap-1 text-base font-semibold">
              <div>Release date: {movieDisplayed.release_date}</div>
              <div>Genres: {movieGenres}</div>
            </div>

            <div className="flex items-center mt-2 gap-1 text-base text-secondary font-semibold">
              <div>Rating:</div>
              <BiStar className="text-base text-secondary font-semibold" />
              <div className="text-secondary font-semibold">
                {movieDisplayed.vote_average}
              </div>
            </div>

            <div className="mt-4 flex items-center">
              <button
                onClick={
                  isAddedToWatchlist
                    ? handleRemoveFromWatchlistClick
                    : handleAddToWatchlistClick
                }
                className={`text-primary font-semibold bg-highlights outline-none border-2 border-solid border-highlights rounded p-3 mr-1 ${
                  isAddedToWatchedlist
                    ? "bg-disabled text-disabled border-disabled cursor-not-allowed"
                    : "hover:bg-secondary hover:text-highlights"
                }`}
                disabled={isAddedToWatchedlist}
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
              <button
                onClick={
                  isAddedToWatchedlist
                    ? handleRemoveFromWatchedlistClick
                    : handleAddToWatchedlistClick
                }
                className="text-highlights font-semibold bg-transparent outline-none border-2 border-solid border-highlights rounded p-2 mr-1 hover:bg-secondary"
                title={
                  isAddedToWatchedlist
                    ? "Remove from watched"
                    : "Mark as watched"
                }
              >
                <div className="flex items-center gap-1 text-lg">
                  {isAddedToWatchedlist ? "Watched" : "Mark as watched"}
                </div>
              </button>
            </div>
          </div>
        </section>

        <section className="mt-32">
          <h2 className="text-2xl pb-4 font-bold border-b border-solid border-secondary w-full sm:pl-4">
            Reviews
          </h2>
          <div className="flex flex-col items-center">{renderedReviews}</div>
        </section>
      </div>

      <MovieList
        goBack={true}
        listTitle="You might also like"
        moviesToDisplay={similarMovies}
      />
    </div>
  );
}

export default MoviePage;
