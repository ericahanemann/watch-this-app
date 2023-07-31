import { Link } from "react-router-dom";

function MovieListItem({ id, posterPath, title, goBack }) {
  const movieInfoPath = goBack ? `../../movie-info/${id}` : `movie-info/${id}`;
  const posterUrl = `https://image.tmdb.org/t/p/original${posterPath}`;

  const handleMovieClick = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="min-w-fit flex-shrink-0 cursor-pointer hover:scale-110 hover:duration-200">
      <Link to={movieInfoPath} onClick={handleMovieClick}>
        <div className="flex flex-col gap-2 w-44 overflow-hidden">
          <img className="w-40" src={posterUrl} />
          <p className="text-sm whitespace-nowrap">{title}</p>
        </div>
      </Link>
    </div>
  );
}

export default MovieListItem;
