import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import Home from "./routes/Home.jsx";
import MoviePage from "./routes/MoviePage.jsx";
import Lists from "./routes/Lists.jsx";
import ErrorPage from "./routes/ErrorPage.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { MoviesProvider } from "./context/movies.jsx";
import { UserListsProvider } from "./context/userLists.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "movie-info/:id",
        element: <MoviePage />,
      },
      {
        path: "my-lists",
        element: <Lists />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <MoviesProvider>
      <UserListsProvider>
        <RouterProvider router={router} />
      </UserListsProvider>
    </MoviesProvider>
  </React.StrictMode>
);
