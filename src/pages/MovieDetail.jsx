import { Box, Button, Card, CardActionArea, CardContent, CardMedia, IconButton, Rating, Stack, Typography } from '@mui/material'
import React from 'react'
import {useParams} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import { fetchAsyncSelectItem, getSelectedItem, removeSelectedItem } from 'features/movies/movieSlice';
import { useEffect } from 'react';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
// import MovieIcon from '@mui/icons-material/Movie';
// import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import CircularProgress from '@mui/material/CircularProgress';

const Detail = ({k,v}) =>(
    <Stack direction="row"
      justifyContent='space-between'
      textAlign="left"
      >
    <Box flex={1} color="skyblue"> {k} </Box>
    <Box flex={3}> {v}</Box>
  </Stack>
  )

const MovieInfo = ({data}) => {
  console.log(data.imdbRating)
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      <CardContent sx={{ flex: '1 0 auto' }}>
        <Typography component="div" variant="h3">
         {data.Title}
        </Typography>
        <Stack direction="row" spacing={1} m={2} justifyContent="flex-end" alignItems="center">
          <Rating name="half-rating" value={data.imdbRating/2} precision={0.2} />
          <Button disabled startIcon={<ThumbUpIcon/>}>{data.imdbVotes}</Button>
        </Stack>
        <Typography variant="subtitle1" color="text.secondary" component="div">
         {data.Plot}
        </Typography>
        <Stack mt={1}>
          <Detail k="Year" v={data.Year}/>
          <Detail k="Director" v={data.Director}/>
          <Detail k="Actors" v={data.Actors}/>
          <Detail k="Genere" v={data.Genre}/>
          <Detail k="Languages" v={data.Language}/>
          <Detail k="Awards" v={data.Awards}/>
        </Stack>
      </CardContent>
    </Box>
  )
}

export default function MovieDetail() {
  const {imdbID} = useParams();
  const dispatch = useDispatch();
  const data = useSelector(getSelectedItem);

  useEffect(() => {
    dispatch(fetchAsyncSelectItem(imdbID));
    return () => {
      dispatch(removeSelectedItem());
    }
  }, [dispatch,imdbID]);

  return (
    <Box mt={2} p={2}>
      {
        Object.keys(data).length === 0 ?
        <CircularProgress
          sx={{position:'fixed', left:'calc(50%)', top:'calc(50%)'}}
          />:

        <Card sx={{ display: 'flex' }}>
          <MovieInfo data={data}/>
          <CardMedia
            component="img"
            sx={{ width: 300 }}
            image={data.Poster}
            alt={data.Title}
          />
        </Card>
      }
    </Box>
  )
}
