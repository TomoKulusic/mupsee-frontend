import React, { Component } from "react";
import "./searchPage.css";
import { useNavigate } from "react-router-dom";

class SearchPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      filteredData: [],
      wordEntered: "",
    };
  }

  render() {
    return (
      <div className="search">
        <form className="search-form" onSubmit={this.handleSubmit}>
          <div className="searchInputs">
            <input
              type="text"
              className="search-input"
              placeholder={"Search"}
              value={this.state.wordEntered}
              onChange={this.handleFilter}
            />
            <div className="searchIcon"></div>
          </div>
        </form>
        {this.state.filteredData.length != 0 && (
          <div className="dataResult">
            {this.state.filteredData.map((movie) => {
              return (
                <div
                  className="movie-section"
                  key={movie.id}
                  onClick={() => this.goToMovieDetails(movie.id)}
                >
                  <img className="image-section" src={movie.image} />
                  <div className="image-hover">
                    <p>{movie.id}</p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    );
  }

  goToMovieDetails(movieId) {
    this.props.navigate("/movie/" + movieId);
  }

  searchMovies = () => {
    if (this.state.wordEntered === "") {
      this.state.filteredData = [];
    } else {
      fetch(
        "https://localhost:7289/Mupsee/SearchAsync?search=" +
          this.state.wordEntered
      )
        .then((res) => res.json())
        .then(
          (result) => {
            this.setState({ filteredData: result });
          },
          // Note: it's important to handle errors here
          // instead of a catch() block so that we don't swallow
          // exceptions from actual bugs in components.
          (error) => {}
        );
    }
  };

  handleSubmit = (event) => {
    console.log(this.state.wordEntered);
    event.preventDefault();
    this.searchMovies();
  };

  handleFilter = (event) => {
    this.setState({ wordEntered: event.target.value });
    console.log(this.state.wordEntered);
  };
}

function WithNavigate(props) {
  let navigate = useNavigate();
  return <SearchPage {...props} navigate={navigate} />;
}

export default WithNavigate;
