import { Box } from '@mui/material'
import React, { useEffect } from 'react'
import MovieList from 'components/MovieList';
import {useDispatch} from 'react-redux';
import { fetchAsyncMovies } from 'features/movies/movieSlice';

function Home() {
  const dispatch = useDispatch();
  const movieText = "Harry";
  const showText = "Friends";

  useEffect(() => {
    dispatch(fetchAsyncMovies(movieText));
  },[dispatch]);

  return (
    <Box>
      <MovieList/>
    </Box>
  )
}

export default Home
