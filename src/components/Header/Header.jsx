import React, { useRef, useState } from "react";
import { CSVLink } from "react-csv";
import { MdHome, MdSearch, MdDownload } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import styles from "./Header.module.css";
import { useSelector } from "react-redux";
import { get } from "../../utils/lodash";

const Header = ({
  fromDetailsPage,
  handleSearchTextChange,
  handleSearch,
  searchText,
}) => {
  const navigate = useNavigate();

  const csvRef = useRef();

  const [downloadMovies, setDownloadMovies] = useState([]);

  const { movies, isFetchingMovies } = useSelector((state) => state);

  const onDownloadMovies = async () => {
    if (isFetchingMovies) return;

    const downloadDataArray = [];
    if (movies && movies.length) {
      movies.forEach((movie) => {
        const movieObject = {};
        movieObject["Name"] = get(movie, "original_title");
        movieObject["Overview"] = get(movie, "overview");
        movieObject["Release Date"] = get(movie, "release_date");
        movieObject["Rating"] = get(movie, "vote_average");
        downloadDataArray.push({ ...movieObject });
      });
    }

    setDownloadMovies(downloadDataArray);

    if (csvRef.current) {
      setTimeout(() => {
        csvRef.current.link.click();
      }, 0);
    }
  };

  return (
    <header className={styles.Header__header}>
      {fromDetailsPage ? (
        <h2>Movie Detail</h2>
      ) : (
        <div className={styles.Header__searchContainer}>
          <MdSearch
            className={`${styles.Header__searchIcon} ${styles.Header__icon}`}
          />
          <CSVLink
            data={downloadMovies}
            ref={csvRef}
            style={{ display: "none" }}
            filename="Movies.csv"
          />
          <input
            type="text"
            className={styles.Header__searchInput}
            value={searchText}
            onChange={handleSearchTextChange}
            onKeyUp={handleSearch}
            placeholder="Search..."
          />
        </div>
      )}
      <div className={styles.Header__additionalContent}>
        <MdHome
          className={`${styles.Header__icon} ${styles.Header__homeIcon}`}
          onClick={() => navigate("/movies")}
        />
        <MdDownload
          onClick={onDownloadMovies}
          className={`${styles.Header__icon} ${
            fromDetailsPage && styles.Header__displayNone
          }`}
        />
      </div>
    </header>
  );
};

export default Header;
