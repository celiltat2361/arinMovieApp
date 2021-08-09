import React from "react";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import SearchBar from "./components/SearchBar";
import MovieList from "./components/MovieList";
import AddMovie from "./components/AddMovie";
import EditMovie from "./components/EditMovie";
import axios from "axios";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

require("dotenv").config();
/* console.log(process.env.REACT_APP_API_Key); */

class App extends React.Component {
  state = {
    movies: [],
    searchResults: "",
  };

  /*   async componentDidMount() {
      const baseUrl = "http://localhost:3001/movies"
      const response = await fetch(baseUrl)
      const data = await response.json()
      this.setState({movies: data});
    } */

  async componentDidMount() {
    this.getMovies();
  }

  async getMovies() {
    const response = await axios.get("http://localhost:3001/movies");
    this.setState({ movies: response.data });
  }

  /*   deleteMovie = (movie) => {
    const newMovieList = this.state.movies.filter(
      m => m.id !== movie.id
    );

    this.setState(state => ({
      movies: newMovieList,
    }))
  } */

  //Fetch api
  /*  deleteMovie = async(movie) => {

    const baseUrl = `http://localhost:3001/movies/${movie.id}`
    await fetch(baseUrl, {
      method: "DELETE"
    })

    const newMovieList = this.state.movies.filter(
      m => m.id !== movie.id
    );

    this.setState(state => ({
      movies: newMovieList,
    }))
  } */

  //Axios api delete
  deleteMovie = async (movie) => {
    axios.delete(`http://localhost:3001/movies/${movie.id}`);
    const newMovieList = this.state.movies.filter((m) => m.id !== movie.id);

    this.setState((state) => ({
      movies: newMovieList,
    }));
  };

  //search movie
  searchMovie = (event) => {
    this.setState({ searchResults: event.target.value });
  };

  //add amovie
  addMovie = async (movie) => {
    await axios.post(`http://localhost:3001/movies/`, movie);
    this.setState((state) => ({
      movies: state.movies.concat([movie]),
    }));

    this.getMovies();
  };

  //edit movie
  editMovie = async (id, updatedMovie) => {
    await axios.put(`http://localhost:3001/movies/${id}`, updatedMovie)
    this.getMovies();
  }

  render() {
    let filteredMovies = this.state.movies
      .filter((movie) => {
        return (
          movie.name
            .toLowerCase()
            .indexOf(this.state.searchResults.toLowerCase()) !== -1
        );
      })
      .sort((a, b) => {
        return a.id < b.id ? 1 : a.id > b.id ? -1 : 0; // en son giren data ilk gösterilsin
      });

    return (
      <Router>
        <div className="container">
          <Switch>
            <Route
              path="/"
              exact
              render={() => (
                <React.Fragment>
                  <div className="row">
                    <div className="col-lg-12">
                      <SearchBar searchMovieProp={this.searchMovie} />
                    </div>
                  </div>
                  <MovieList
                    movies={filteredMovies}
                    deleteMovieProp={this.deleteMovie}
                  />
                </React.Fragment>
              )}
            ></Route>

            <Route
              path="/add"
              render={({ history }) => (
                <AddMovie
                  onAddMovie={(movie) => {
                    this.addMovie(movie);
                    history.push("/");
                  }}
                />
              )}
            ></Route>
            <Route
              path="/edit/:id"
              render={(props) => (
                <EditMovie
                {...props}
                  onEditMovie={(id, movie) => {
                    this.editMovie(id, movie);
                  }}
                />
              )}
            ></Route>
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
