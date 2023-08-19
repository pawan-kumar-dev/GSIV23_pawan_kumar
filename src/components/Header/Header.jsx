import React from "react";
import { MdHome, MdSearch, MdDownload } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import styles from "./Header.module.css";

const Header = ({
  fromDetailsPage,
  handleSearchTextChange,
  handleSearch,
  searchText,
}) => {
  const navigate = useNavigate();

  return (
    <header className={styles.Header__header}>
      {fromDetailsPage ? (
        <h2>Movie Detail</h2>
      ) : (
        <div className={styles.Header__searchContainer}>
          <MdSearch
            className={`${styles.Header__searchIcon} ${styles.Header__icon}`}
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
          className={`${styles.Header__icon} ${
            fromDetailsPage && styles.Header__displayNone
          }`}
        />
      </div>
    </header>
  );
};

export default Header;
