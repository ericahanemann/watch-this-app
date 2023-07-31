import MovieList from "../components/MovieList";
import { useContext } from "react";
import UserListsContext from "../context/userLists";

function Lists() {
  const { watchList, watchedList } = useContext(UserListsContext);
  const noMoviesMessage = <p>No movies in this list.</p>;

  return (
    <div className="mt-20 min-h-screen flex flex-col justify-center gap-10">
      <div>
        {watchList.length === 0 ? (
          <div className="px-8 flex flex-col gap-6">
            <h2 className="text-2xl font-bold">My Watchlist</h2>
            {noMoviesMessage}
          </div>
        ) : (
          <MovieList
            goBack={true}
            listTitle="My Watchlist"
            moviesToDisplay={watchList}
          />
        )}
      </div>

      <div>
        {watchedList.length === 0 ? (
          <div className="px-8 flex flex-col gap-6">
            <h2 className="text-2xl font-bold">Watched</h2>
            {noMoviesMessage}
          </div>
        ) : (
          <MovieList
            goBack={true}
            listTitle="Watched"
            moviesToDisplay={watchedList}
          />
        )}
      </div>
    </div>
  );
}

export default Lists;
