import { GoChevronLeft, GoChevronRight } from "react-icons/go";
import { useState, useEffect, useRef } from "react";
import MovieListItem from "./MovieListItem";

function MovieList({ goBack, listTitle, moviesToDisplay }) {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [isAtStart, setIsAtStart] = useState(true);
  const [isAtEnd, setIsAtEnd] = useState(false);

  const listContainerRef = useRef(null);
  const itemWidth = 200;

  const handleScrollLeft = () => {
    setScrollPosition((prevPosition) => prevPosition + itemWidth);
  };

  const handleScrollRight = () => {
    setScrollPosition((prevPosition) => prevPosition - itemWidth);
  };

  const renderedMovies = moviesToDisplay.map((mediaItem) => {
    return (
      <MovieListItem
        key={mediaItem.id}
        id={mediaItem.id}
        posterPath={mediaItem.poster_path}
        title={mediaItem.title}
        goBack={goBack}
      />
    );
  });

  useEffect(() => {
    setIsAtStart(scrollPosition === 0);
    const listContainerWidth = listContainerRef.current.clientWidth;
    const totalListWidth = renderedMovies.length * itemWidth;
    setIsAtEnd(
      listContainerWidth >= totalListWidth + scrollPosition - itemWidth
    );
  }, [scrollPosition, renderedMovies]);

  useEffect(() => {
    const handleResize = () => {
      setScrollPosition(0);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="h-fit mx-6 mt-8 mb-2 flex flex-col gap-3">
      <h2 className="text-2xl pl-4 font-bold">{listTitle}</h2>
      <div className="relative group" ref={listContainerRef}>
        <button
          className={`${
            isAtStart ? "disabled" : ""
          } absolute hidden group-hover:block z-10 top-1/2 -left-4 transform -translate-y-1/2 bg-secondary text-primary shadow-black p-1 rounded-full text-3xl hover:bg-highlights`}
          onClick={handleScrollLeft}
          disabled={isAtStart}
        >
          <GoChevronLeft />
        </button>

        <div
          className={`flex p-4 gap-5 overflow-x-hidden transition-transform duration-300 ease-in-out`}
          style={{
            minWidth: `${renderedMovies.length * itemWidth}px`,
            transform: `translateX(${scrollPosition}px)`,
          }}
        >
          {renderedMovies}
        </div>

        <button
          className={`${
            isAtEnd ? "disabled" : ""
          } absolute hidden group-hover:block top-1/2 -right-4 transform -translate-y-1/2 bg-secondary text-primary shadow-black p-1 rounded-full text-3xl hover:bg-highlights`}
          onClick={handleScrollRight}
          disabled={isAtEnd}
        >
          <GoChevronRight />
        </button>
      </div>
    </div>
  );
}

export default MovieList;
