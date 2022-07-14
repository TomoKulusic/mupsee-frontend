import React, { Component } from "react";
import "./searchBar.css";

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
        <form onSubmit={this.handleSubmit}>
          <div className="searchInputs">
            <input
              type="text"
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
              console.log(movie);
              return (
                <div className="movie-section" key={movie.id}>
                  <img className="image-section" src={movie.image} />
                  <p>{movie.title}</p>
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

export default SearchPage;
