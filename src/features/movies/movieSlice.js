import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { OMDB_URL } from "config";

export const fetchAsyncMovies = createAsyncThunk(
  "movies/fetchAsyncMovies",
  async (term) => {
    return await axios
      .get(`${OMDB_URL}&s=${term}&type=movie`)
      .then((res) => res.data);
  }
);

export const fetchAsyncSelectItem = createAsyncThunk(
  "movies/fetchAsyncSelectItem",
  async (id) => {
    return await axios
      .get(`${OMDB_URL}&i=${id}&plot=full`)
      .then((res) => res.data);
  }
);

const initialState = {
  movies: {},
  shows: {},
  item: {},
};

export const movieSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    addMovies: (state, { payload }) => {
      state.movies = payload;
    },
    removeSelectedItem: (state) => {
      state.item = {};
    },
  },
  extraReducers: {
    [fetchAsyncMovies.pending]: () => {
      console.log("pending");
    },
    [fetchAsyncMovies.fulfilled]: (state, { payload }) => {
      console.log("fetched successfully");
      return { ...state, movies: payload };
    },
    [fetchAsyncSelectItem.fulfilled]: (state, { payload }) => {
      return { ...state, item: payload };
    },
  },
});

// Action creators are generated for each case reducer function
export const { removeSelectedItem } = movieSlice.actions;
export const getAllMovies = (state) => state.movies.movies;
export const getSelectedItem = (state) => state.movies.item;
export default movieSlice.reducer;
