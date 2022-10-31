import React, { useEffect } from "react";
import MovieList from "components/MovieList";
import { useDispatch } from "react-redux";
import { fetchAsyncMovies } from "features/movies/movieSlice";

function Home() {
  const dispatch = useDispatch();
  const movieText = "Harry";

  useEffect(() => {
    dispatch(fetchAsyncMovies(movieText));
  }, [dispatch]);

  return (
    <>
      <MovieList />
    </>
  );
}

export default Home;
