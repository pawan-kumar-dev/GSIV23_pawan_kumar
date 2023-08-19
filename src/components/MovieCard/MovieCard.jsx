import React from "react";
import { get } from "../../utils/lodash";
import { useNavigate } from "react-router-dom";
import styles from "./MovieCard.module.css";

const MovieCard = ({ movie }) => {
  const navigate = useNavigate();

  return (
    <div
      className={styles.MovieCard__card}
      onClick={() => navigate(`/movie/${get(movie, "id")}`)}
    >
      <div className={styles.MovieCard__imageContainer}>
        <img
          src={`https://image.tmdb.org/t/p/w500${
            get(movie, "poster_path") || get(movie, "backdrop_path")
          }`}
          alt={get(movie, "original_title")}
          className={styles.MovieCard__cardImage}
        />
      </div>
      <div className={styles.MovieCard__cardContent}>
        <div className={styles.MovieCard__cardHeader}>
          <p className={styles.MovieCard__cardTitle}>
            {get(movie, "original_title")}
          </p>
          <div className={styles.MovieCard__rating}>
            <span>{get(movie, "vote_average")}</span>
          </div>
        </div>
        <p className={styles.MovieCard__cardDescription}>
          {get(movie, "overview")}
        </p>
      </div>
    </div>
  );
};

export default MovieCard;
