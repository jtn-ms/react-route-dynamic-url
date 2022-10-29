import React from 'react'
import {useSelector} from "react-redux";
import {getAllMovies} from "features/movies/movieSlice";
import MovieCard from "components/MovieCard";
import { Box, Grid } from '@mui/material';

const Error = ({error}) => (
  <div className="movie-error">
    <h3>{error}</h3>
  </div>
);

const MovieList = () => {
  const movies = useSelector(getAllMovies);

  const renderMovies = movies.Response === "True" ? (
    movies.Search.map((movie, index) => (
      <Grid item key={index} xxs={6} xs={4} sm={3} md={3} lg={2}>
        <MovieCard key={index} movie={movie}/>
      </Grid>
    ))
  ) : <Error error={movies.Error}/>;

  return (
    <Box>
      <Grid container id="movie-list"  spacing={2}>
        {renderMovies}
      </Grid>
    </Box>
  )
}

export default MovieList
