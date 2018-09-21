import React from "react";

const Genre = props => {
  const { genres, currentGenre, selectGenre } = props;
  const genreClass = "list-group-item";
  return (
    <ul className="list-group">
      <li
        className={
          currentGenre === "All Genres" ? genreClass + " active" : genreClass
        }
        onClick={() => selectGenre("All Genres")}
      >
        All Genres
      </li>
      {genres.map(genre => (
        <li
          key={genre._id}
          className={
            currentGenre === genre.name ? genreClass + " active" : genreClass
          }
          onClick={() => selectGenre(genre.name)}
        >
          {genre.name}
        </li>
      ))}
    </ul>
  );
};

export default Genre;
