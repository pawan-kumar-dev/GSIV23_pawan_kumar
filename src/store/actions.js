import {
  FETCH_MOVIES_REQUEST,
  FETCH_MOVIES_SUCCESS,
  FETCH_MOVIES_FAILURE,
  FETCH_SINGLE_MOVIE_REQUEST,
  FETCH_SINGLE_MOVIE_SUCCESS,
  FETCH_SINGLE_MOVIE_FAILURE,
  RESET_STATE,
  FETCH_MOVIES_BY_SEARCH_TEXT_REQUEST,
  FETCH_MOVIES_BY_SEARCH_TEXT_SUCCESS,
  FETCH_MOVIES_BY_SEARCH_TEXT_FAILURE,
} from "./actionTypes";

export const fetchMoviesRequest = (searchText) => ({
  type: FETCH_MOVIES_REQUEST,
  payload: searchText,
});

export const fetchMoviesSuccess = (movies) => ({
  type: FETCH_MOVIES_SUCCESS,
  payload: movies,
});

export const fetchMoviesFailure = (error) => ({
  type: FETCH_MOVIES_FAILURE,
  payload: error,
});

export const fetchMoviesBySearchTextRequest = (searchText) => ({
  type: FETCH_MOVIES_BY_SEARCH_TEXT_REQUEST,
});

export const fetchMoviesBySearchTextSuccess = (movies) => ({
  type: FETCH_MOVIES_BY_SEARCH_TEXT_SUCCESS,
  payload: movies,
});

export const fetchMoviesBySearchTextFailure = (error) => ({
  type: FETCH_MOVIES_BY_SEARCH_TEXT_FAILURE,
  payload: error,
});

export const fetchSingleMovieRequest = () => ({
  type: FETCH_SINGLE_MOVIE_REQUEST,
});

export const fetchSingleMovieSuccess = (movie) => ({
  type: FETCH_SINGLE_MOVIE_SUCCESS,
  payload: movie,
});

export const fetchSingleMovieFailure = (error) => ({
  type: FETCH_SINGLE_MOVIE_FAILURE,
  payload: error,
});

export const resetState = (error) => ({
  type: RESET_STATE,
});
