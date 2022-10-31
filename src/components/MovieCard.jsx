import { Card, CardActionArea, CardContent, CardMedia, Typography } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom';
import { StyledGridItem } from './styled';

const MovieCard = ({movie}) => {
  return (
    <StyledGridItem>
      <Link to={`movie/${movie.imdbID}`}>
        <Card sx={{ maxWidth: 345 }}>
          <CardActionArea>
            <CardMedia
              component="img"
              height="350"
              image={movie.Poster}
              alt={movie.Title}
              />
            <CardContent>
              <Typography gutterBottom variant="subtitle" component="div">
                {movie.Title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {movie.Year}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </Link>
    </StyledGridItem>
  )
}

export default MovieCard
