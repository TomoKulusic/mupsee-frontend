import React, { Component } from "react";
import "./moviePage.css";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Button from "@mui/material/Button";
import ShareIcon from "@mui/icons-material/Share";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

class MoviePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      isFavorite: false,
      snackbar: false,
    };
  }

  componentDidMount() {
    this.getMovie();
    this.IsMovieFavorite();
  }

  IsMovieFavorite = () => {
    console.log("aa");
    fetch(
      "https://localhost:7289/Mupsee/CheckIsFavorite?movieId=" +
        this.props.params.id
    )
      .then((res) => res.json())
      .then(
        (result) => {
          console.log(result);
          this.setState({ isFavorite: result });
        },
        (error) => {}
      );
  };

  render() {
    return (
      <div>
        <div className="page">
          {this.state.data != null && (
            <div>
              <div className="movie-description">
                <div className="description-container">
                  <div>
                    <p className="title">{this.state.data.title}</p>
                    {this.state.isFavorite ? (
                      <FavoriteOutlinedIcon
                        onClick={() => this.setAsFavorite(false)}
                      />
                    ) : (
                      <FavoriteBorderOutlinedIcon
                        onClick={() => this.setAsFavorite(true)}
                      />
                    )}
                  </div>
                  <div className="movie-ratings">
                    <p>{this.state.data.release}</p>

                    <p>{this.state.data.runtime}</p>
                    <p>IMDB: {this.state.data.movieRatings.imdbRating}</p>
                    <p>
                      ROTTEN:{" "}
                      {this.state.data.movieRatings.rottenTomatoesRating}
                    </p>
                  </div>
                  <div className="movie-genres">
                    <p>{this.state.data.genres}</p>
                  </div>
                  <div className="share-button-div">
                    {" "}
                    <Button
                      variant="contained"
                      endIcon={<ShareIcon />}
                      onClick={this.ShareMovie}
                    >
                      Share
                    </Button>
                  </div>
                  <div className="description">
                    <p>{this.state.data.description}</p>
                  </div>
                </div>
              </div>
              <div className="trailer">
                <div className="trailer-container">
                  {this.state.data.trailerId != null && (
                    <iframe
                      src={`https://www.youtube.com/embed/${this.state.data.movieTrailerResponseItems[0].trailerId}`}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      title="Embedded youtube"
                    />
                  )}
                </div>
                <div></div>
              </div>
            </div>
          )}
        </div>
        <Snackbar
          open={this.state.snackbar}
          autoHideDuration={2000}
          onClose={this.handleClose}
          message="Added to favorites"
        ></Snackbar>
      </div>
    );
  }

  handleClick = () => {
    this.setState({ snackbar: true });
  };

  handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    this.setState({ snackbar: false });
  };

  setAsFavorite = (value) => {
    this.setState({ isFavorite: value });

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: this.state.data.id,
        isFavorite: value,
        image: this.state.data.image,
      }),
    };
    fetch(
      "https://localhost:7289/Mupsee/SaveMovieAsFavorite",
      requestOptions
    ).then(() => {});
  };

  getMovie = () => {
    fetch(
      "https://localhost:7289/Mupsee/SearchByIdAsync?movieId=" +
        this.props.params.id
    )
      .then((res) => res.json())
      .then(
        (result) => {
          console.log(result);
          this.setState({ data: result });
        },
        (error) => {}
      );
  };
}

const withRouter = (WrappedComponent) => (props) => {
  const params = useParams();

  return <MoviePage {...props} params={params} />;
};

export default withRouter(MoviePage);
