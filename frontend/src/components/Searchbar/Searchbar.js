import React from "react";
import "./Searchbar.css";
import scrapeGame from "../../api/ScrapeRequests";

function Searchbar({ lightTheme, darkTheme, darkMode }) {
  const colorScheme = {
    "--rad": "30px",
    "--dur": "0.3s",
    "--color-bg": darkMode
      ? darkTheme.palette.background.default
      : lightTheme.palette.background.default,
    "--font-fam": "Google Sans, Roboto Flex, sans-serif",
    "--height": "35px",
    "--btn-width": "3rem",
    "--bez": "cubic-bezier(0, 0, 0.43, 1.49)",
    "--font-color": darkMode
      ? darkTheme.palette.primary.text
      : lightTheme.palette.primary.text,
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const searchQuery = document.getElementById("search").value;
    window.location.href = `/search/${searchQuery}`;
  };

  return (
    <>
      <form
        id="searchForm"
        role="search"
        style={colorScheme}
        onSubmit={handleSubmit}
      >
        <label id="searchLabel" htmlFor="search">
          Search for Games
        </label>
        <input
          id="search"
          type="search"
          placeholder="Search..."
          autoFocus
          required
        />
        <button id="searchButton" type="submit">
          GO
        </button>
      </form>
    </>
  );
}

export default Searchbar;
