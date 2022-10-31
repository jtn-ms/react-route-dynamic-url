#### Initialize
```shell
mkdir Header Footer Home MovieCard MoiveDetail MovieList
```
#### [Create a Redux Store](https://redux-toolkit.js.org/tutorials/quick-start#create-a-redux-store)
```js
// app/store.js
import { configureStore } from '@reduxjs/toolkit'

export const store = configureStore({
  reducer: {},
})
```
#### [Provide the Redux Store to React](https://redux-toolkit.js.org/tutorials/quick-start#provide-the-redux-store-to-react)
```js
// index.js
import { store } from './app/store'
import { Provider } from 'react-redux'

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
```
#### [Create a Redux State Slice](https://redux-toolkit.js.org/tutorials/quick-start#create-a-redux-state-slice)
```js
// features/movies/movieSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios';

const url = "https://omdbapi.com/";
const apiKey = "48fa6eaf";

export const fetchAsyncMovies = createAsyncThunk("movies/fetchAsyncMovies", async (term) => {
    return await axios.get(`${url}?apiKey=${apiKey}&s=${term}&type=movie`)
            .then(res => res.data);
})

const initialState = {
  movies: {},
  shows: {},
  item: {},
}

export const movieSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    addMovies: (state,{payload}) => {
        state.movies = payload;
    },
    removeSelectedItem: state => {
        state.item={};
    }
  },
  extraReducers: {
    [fetchAsyncMovies.pending]:()=>{
        console.log("pending");
    },
    [fetchAsyncMovies.fulfilled]:(state,{payload}) => {
        console.log("fetched successfully");
        return {...state,movies:payload};
    },
  }
})

// Action creators are generated for each case reducer function
export const { removeSelectedItem } = movieSlice.actions
export const getAllMovies = (state) => state.movies.movies;
export default movieSlice.reducer
```
#### [Add Slice Reducers to the Store](https://redux-toolkit.js.org/tutorials/quick-start#add-slice-reducers-to-the-store)
```js
// app/store.js
import { configureStore } from '@reduxjs/toolkit'
import movieReducer from '../features/movies/movieSlice'

export const store = configureStore({
  reducer: {
    movies: movieReducer,
  },
})
```
#### [Update Redux State](https://redux-toolkit.js.org/tutorials/quick-start#use-redux-state-and-actions-in-react-components), `Dispatch`
```jsx
// components/Home/Home.jsx
import { useEffect } from 'react';
import MovieList from '../MovieList/MovieList';
import {useDispatch} from 'react-redux';
import { fetchAsyncMovies } from '../../features/movies/movieSlice';

export default function Home() {
  const dispatch = useDispatch();
  const movieText = "Harry";
  const showText = "Friends";

  useEffect(() => {
    dispatch(fetchAsyncMovies(movieText));
  },[dispatch]);

  return (
    <div>
      <div className="banner-img"></div>
      <MovieList/>
    </div>
  )
}
```
#### Use Redux State, `useSelector`
```jsx
// components/MovieList/MovieList.jsx
import {useSelector} from "react-redux";
import {getAllMovies} from "../../features/movies/movieSlice";
import MovieCard from "../MovieCard/MovieCard";

export default function MovieList() {
  const movies = useSelector(getAllMovies);

  const renderMovies = movies.Response === "True" ? (
    movies.Search.map((movie, index) => (
      <MovieCard key={index} movie={movie}/>
    ))
  ) : (<div className="movie-error"> <h3>{movies.Error}</h3> </div>
  );

  return (
    <div className="movie-wrapper">
      <div className="movie-list">
        <div className="movie-container">{renderMovies}</div>
      </div>
    </div>
  )
}
```
#### Using Props(No Syntax Change)
```jsx
export default function MovieCard({movie}) {
  return (
    <div className='card-item'>
      <div className='card-inner'>
        <div className='card-top'>
          <img src = {movie.Poster} alt={movie.Title}/>
        </div>
        <div className='card-bottom'>
          <div className='card-info'>
            <h4>{movie.Title}</h4>
            <p>{movie.Year}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
```