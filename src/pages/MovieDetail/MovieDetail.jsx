import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  fetchSingleMovieFailure,
  fetchSingleMovieRequest,
  fetchSingleMovieSuccess,
} from "../../store/actions";
import api from "../../api";
import { Header, Loader } from "../../components";
import { get } from "../../utils/lodash"; // Import lodash get
import styles from "./MovieDetail.module.css";
import { getCast, getDirector, getReleaseYear } from "../../utils/functions";

const MovieDetail = () => {
  const { id: movieId } = useParams();
  const dispatch = useDispatch();
  const { movieDetail, isFetchingMovieDetail } = useSelector(
    (state) => state
  );

  useEffect(() => {
    const fetchData = async () => {
      dispatch(fetchSingleMovieRequest());

      try {
        const [movieDetailResponse, movieCredDetailResponse] =
          await Promise.allSettled([
            api.get(`/movie/${movieId}?language=en-US`),
            api.get(`/movie/${movieId}/credits?language=en-US`),
          ]);

        const movieDetailObj = {};

        if (get(movieDetailResponse, "status") === "fulfilled") {
          Object.assign(movieDetailObj, get(movieDetailResponse, "value.data"));
        }

        if (get(movieCredDetailResponse, "status") === "fulfilled") {
          Object.assign(movieDetailObj, {
            ...movieDetailObj,
            ...get(movieCredDetailResponse, "value.data"),
          });
        }

        if (Object.keys(movieDetailObj).length) {
          dispatch(fetchSingleMovieSuccess(movieDetailObj));
        } else {
          dispatch(fetchSingleMovieFailure("Something went wrong!"));
        }
      } catch (error) {
        dispatch(fetchSingleMovieFailure("Something went wrong!"));
      }
    };

    fetchData();
  }, [dispatch, movieId]);

  return (
    <>
      <Header fromDetailsPage={true} />
      <Loader visible={isFetchingMovieDetail} styles={{ paddingTop: "60px" }} />
      {!isFetchingMovieDetail && (
        <div className={styles.MovieDetail__detailedContainer}>
          <div className={styles.MovieDetail__imageContainer}>
            <img
              src={`https://image.tmdb.org/t/p/w500${get(
                movieDetail,
                "poster_path"
              )}`}
              alt={get(movieDetail, "original_title")}
              className={styles.MovieDetail__detailedImage}
            />
          </div>
          <div className={styles.MovieDetail__detailedDescContainer}>
            <div className={styles.MovieDetail__titleContainer}>
              <h2 className={styles.MovieDetail__title}>
                {get(movieDetail, "original_title")}
              </h2>
              <span className={styles.MovieDetail__rating}>
                ({get(movieDetail, "vote_average", 0)})
              </span>
            </div>
            <div className={styles.MovieDetail__basicDetails}>
              <span>{getReleaseYear(get(movieDetail, 'release_date'))}</span>
              <span>{get(movieDetail, "runtime")} Minutes</span>
              <span>{getDirector(get(movieDetail, "crew"))}</span>
            </div>
            <p className={styles.MovieDetail__castStyle}>
              Cast: {getCast(get(movieDetail, "cast"))}
            </p>
            <p className={styles.MovieDetail__description}>
              Description: {get(movieDetail, "overview")}
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default MovieDetail;
