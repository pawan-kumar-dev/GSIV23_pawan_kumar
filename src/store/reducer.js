import {
  FETCH_MOVIES_REQUEST,
  FETCH_MOVIES_SUCCESS,
  FETCH_MOVIES_FAILURE,
  FETCH_SINGLE_MOVIE_REQUEST,
  FETCH_SINGLE_MOVIE_SUCCESS,
  FETCH_SINGLE_MOVIE_FAILURE,
  RESET_STATE,
  UPDATE_SEARCH_TEXT,
  UPDATE_THEME,
  FETCH_MOVIES_BY_SEARCH_TEXT_REQUEST,
  FETCH_MOVIES_BY_SEARCH_TEXT_SUCCESS,
  FETCH_MOVIES_BY_SEARCH_TEXT_FAILURE,
} from "./actionTypes";

const initialState = {
  movies: [],
  isFetchingMovies: false,
  movieDetail: {},
  isFetchingMovieDetail: false,
  searchText: "",
  theme: "light",
  error: null
};

const movieReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_MOVIES_REQUEST:
      return {
        ...state,
        isFetchingMovies: true,
      };
    case FETCH_MOVIES_SUCCESS:
    case FETCH_MOVIES_BY_SEARCH_TEXT_SUCCESS:
      return {
        ...state,
        movies: [...state.movies, ...action.payload],
        isFetchingMovies: false,
      };
    case FETCH_MOVIES_FAILURE:
    case FETCH_MOVIES_BY_SEARCH_TEXT_FAILURE:
      return {
        ...state,
        error: action.payload,
        isFetchingMovies: false,
      };
    case FETCH_MOVIES_BY_SEARCH_TEXT_REQUEST:
      return {
        ...state,
        isFetchingMovies: true,
        movies: []
      };
    case FETCH_SINGLE_MOVIE_REQUEST:
      return {
        ...state,
        isFetchingMovieDetail: true,
      };
    case FETCH_SINGLE_MOVIE_SUCCESS:
      return {
        ...state,
        movieDetail: action.payload,
        isFetchingMovieDetail: false,
      };
    case FETCH_SINGLE_MOVIE_FAILURE:
      return {
        ...state,
        isFetchingMovieDetail: false,
        error: action.payload,
      };
    case UPDATE_SEARCH_TEXT:
      return {
        ...state,
        searchText: action.payload,
      };
    case UPDATE_THEME:
      return {
        ...state,
        theme: action.payload,
      };
    case RESET_STATE:
      return initialState;
    default:
      return state;
  }
};

export default movieReducer;
