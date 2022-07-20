import React, { Component } from "react";
import "./favorites.css";
import { FavoriteService } from "../../services/favoriteService";

class Favorites extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };

    this.favoriteService = new FavoriteService();
  }

  componentDidMount() {
    this.getFavoriteMovies();
  }

  getFavoriteMovies = () => {
    this.favoriteService
      .GetFavoriteMovies()
      .then((res) => res.json())
      .then(
        (result) => {
          this.setState({ data: result });
        },
        (error) => {}
      );
  };

  render() {
    return (
      <div className="search">
        {this.state.data.length != 0 && (
          <div className="dataResult">
            {this.state.data.map((movie) => {
              return (
                <div className="movie-container" key={movie.id}>
                  <a href={`/movie/${movie.id}`}>
                    <div>
                      <div>
                        <img
                          className="image-container"
                          src={movie.image}
                        ></img>
                        <img
                          className="image-container"
                          src={movie.image}
                        ></img>
                      </div>
                    </div>
                  </a>
                </div>
              );
            })}
          </div>
        )}
      </div>
    );
  }
}

export default Favorites;
