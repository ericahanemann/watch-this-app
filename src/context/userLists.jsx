import { createContext, useState } from "react";

const UserListsContext = createContext();

function UserListsProvider({ children }) {
  const [watchList, setWatchList] = useState([]);
  const [watchedList, setWatchedList] = useState([]);

  const addToWatchList = (movie) => {
    setWatchList((prevWatchList) => [...prevWatchList, movie]);
  };

  const removeFromWatchList = (movieId) => {
    setWatchList((prevWatchList) =>
      prevWatchList.filter((movie) => movie.id !== movieId)
    );
  };

  const addToWatchedList = (movie) => {
    setWatchedList((prevWatchedList) => [...prevWatchedList, movie]);
  };

  const removeFromWatchedList = (movieId) => {
    setWatchedList((prevWatchedList) =>
      prevWatchedList.filter((movie) => movie.id !== movieId)
    );
  };

  const lists = {
    watchList,
    setWatchList,
    addToWatchList,
    removeFromWatchList,
    watchedList,
    setWatchedList,
    addToWatchedList,
    removeFromWatchedList,
  };

  return (
    <UserListsContext.Provider value={lists}>
      {children}
    </UserListsContext.Provider>
  );
}

export { UserListsProvider };
export default UserListsContext;
