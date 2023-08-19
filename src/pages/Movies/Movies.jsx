import { useEffect, useState } from "react";
import { Header, Loader, MovieCard } from "../../components";
import styles from "./Movies.module.css"; // Import your CSS module file
import api from "../../api";
import { get } from "../../utils/lodash";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchMoviesBySearchTextFailure,
  fetchMoviesBySearchTextRequest,
  fetchMoviesBySearchTextSuccess,
  fetchMoviesFailure,
  fetchMoviesRequest,
  fetchMoviesSuccess,
  resetState,
} from "../../store/actions";

const Movies = () => {
  const [searchText, setSearchText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const { movies = [], isFetchingMovies = false, error = null, theme } = state;

  const fetchMovies = async () => {
    dispatch(fetchMoviesRequest());
    try {
      const moviesResponse = await api.get(
        `/movie/upcoming?language=en-US&page=${currentPage}`
      );
      if (get(moviesResponse, "status") === 200) {
        dispatch(fetchMoviesSuccess(get(moviesResponse, "data.results")));
        setTotalPages(get(moviesResponse, "data.total_pages"));
      } else {
        dispatch(fetchMoviesFailure("Something went wrong!"));
      }
    } catch (error) {
      dispatch(fetchMoviesFailure(get(error, "response.data.status_message")));
    }
  };

  useEffect(() => {
    return () => dispatch(resetState());
  }, []);

  useEffect(() => {
    fetchMovies();
  }, [currentPage]);

  const fetchMovieBySearchText = async () => {
    dispatch(fetchMoviesBySearchTextRequest());
    try {
      const moviesResponse = await api.get(
        `/search/movie?query=${searchText}&language=en-US&page=1`
      );
      if (get(moviesResponse, "status") === 200) {
        dispatch(
          fetchMoviesBySearchTextSuccess(get(moviesResponse, "data.results"))
        );
      } else {
        dispatch(fetchMoviesBySearchTextFailure("Something went wrong!"));
      }
    } catch (error) {
      dispatch(
        fetchMoviesBySearchTextFailure(
          get(error, "response.data.status_message")
        )
      );
    }
  };

  const handleSearchTextChange = (event) => setSearchText(event.target.value);
  const handleSearch = async (event) => {
    if (get(event, "key") === "Enter") {
      if (searchText) {
        setCurrentPage(1);
        dispatch(resetState());
        fetchMovieBySearchText();
      } else {
        dispatch(resetState());
        fetchMovies();
      }
    }
  };

  const sortMoviesByLatestRelease = (moviesData) => {
    return moviesData.slice().sort((a, b) => {
      const dateA = new Date(a.release_date);
      const dateB = new Date(b.release_date);
      return dateB - dateA;
    });
  };

  return (
    <>
      <Header
        handleSearchTextChange={handleSearchTextChange}
        handleSearch={handleSearch}
        searchText={searchText}
      />
      <div className={styles.Movies__cardContainer}>
        {sortMoviesByLatestRelease(movies).map((movie, index) => (
          <MovieCard key={get(movie, "id")} movie={movie} />
        ))}
      </div>
      {movies.length && !searchText ? (
        <div className={styles.Movies__loadMoreContainer}>
          {currentPage === totalPages ? (
            <span>That's all for the day</span>
          ) : (
            <button
              className={styles.Movies__button}
              onClick={() => setCurrentPage((prevVal) => prevVal + 1)}
              disabled={isFetchingMovies}
            >
              {isFetchingMovies ? "Loading..." : "Load More"}
            </button>
          )}
        </div>
      ) : null}
      <Loader visible={isFetchingMovies} />
      <p className={styles.Movies__errorMessage}>{error}</p>
    </>
  );
};

export default Movies;
