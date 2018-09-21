import React, { Component } from "react";
import { getMovies } from "../services/fakeMovieService";
import Like from "./common/like";
import Pagination from "./common/pagination";
import { paginate } from "../utils/paginate";
import Genre from "./common/genre";
import { getGenres } from "../services/fakeGenreService";
import { genre } from "../utils/genre";

class Movies extends Component {
  state = {
    movies: getMovies(),
    pageSize: 4,
    currentPage: 1,
    genres: getGenres(),
    currentGenre: "All Genres"
  };

  handleGenre = genre => {
    this.setState({ currentGenre: genre });
  };
  handlePageChange = page => {
    this.setState({ currentPage: page });
  };
  handleLike = movie => {
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movies[index] = { ...movies[index] };
    movies[index].liked = !movies[index].liked;
    this.setState({ movies });
  };

  handleDelete = id => {
    const movies = this.state.movies.filter(obj => obj._id !== id);
    this.setState({ movies });
  };

  render() {
    const {
      movies: allMovies,
      pageSize,
      currentPage,
      genres,
      currentGenre
    } = this.state;
    let movies = genre(allMovies, currentGenre);
    const count = movies.length;
    movies = paginate(movies, pageSize, currentPage);
    console.log(movies);

    return (
      <div className="container">
        <div className="row">
          <div className="col-2">
            <Genre
              genres={genres}
              selectGenre={this.handleGenre}
              currentGenre={currentGenre}
            />
          </div>
          <div className="col">
            {count === 0 ? (
              <p>There are no movies</p>
            ) : (
              <p>
                Showing
                <span className="badge badge-pill badge-info m-1">{count}</span>
                movies in the database
              </p>
            )}
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">Title</th>
                  <th scope="col">Genre</th>
                  <th scope="col">Stock</th>
                  <th scope="col">Rate</th>
                  <th />
                  <th />
                </tr>
              </thead>
              <tbody>
                {movies.map(movie => (
                  <tr key={movie._id} id="1">
                    <td>{movie.title} </td>
                    <td>{movie.genre.name}</td>
                    <td>{movie.numberInStock}</td>
                    <td>{movie.dailyRentalRate}</td>
                    <td>
                      <Like
                        onClick={() => this.handleLike(movie)}
                        liked={movie.liked}
                      />
                    </td>
                    <td>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => this.handleDelete(movie._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <Pagination
              itemCount={count}
              pageLimit={pageSize}
              currentPage={currentPage}
              onPageChange={this.handlePageChange}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Movies;
