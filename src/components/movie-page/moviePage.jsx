import React, { Component } from "react";
import "./moviePage.css";
import { useParams } from "react-router-dom";
import Button from "@mui/material/Button";
import ShareIcon from "@mui/icons-material/Share";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import Snackbar from "@mui/material/Snackbar";
import "react-alice-carousel/lib/alice-carousel.css";
import { FavoriteService } from "../../services/favoriteService";
import { MovieService } from "../../services/movieService";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Box from "@mui/material/Box";

class MoviePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      isFavorite: false,
      snackbar: false,
      trailers: null,
    };
    this.responsive = {
      desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 3,
        slidesToSlide: 4,
      },
      tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 2,
        slidesToSlide: 2,
      },
      mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 1,
        slidesToSlide: 1,
      },
    };

    this.favoriteService = new FavoriteService();
    this.movieService = new MovieService();
  }

  componentDidMount() {
    this.getMovie();
    this.IsMovieFavorite();
  }

  IsMovieFavorite = () => {
    this.favoriteService
      .CheckIsMovieFavorite(this.props.params.id)
      .then((res) => res.json())
      .then(
        (result) => {
          console.log(result);
          this.setState({ isFavorite: result });
        },
        (error) => {}
      );
  };

  setAsFavorite = (value) => {
    this.setState({ isFavorite: value });

    var body = JSON.stringify({
      id: this.state.data.id,
      isFavorite: value,
      image: this.state.data.image,
    });

    this.favoriteService.SaveMovieAsFavorite(body).then(() => {});
  };

  getMovie = () => {
    this.movieService
      .GetMovieById(this.props.params.id)
      .then((res) => res.json())
      .then(
        (result) => {
          console.log(result);
          this.setState({ data: result });
        },
        (error) => {}
      );
  };

  render() {
    return (
      <div className="movie-box">
        <Box
          sx={{
            width: 1 / 1.1,
            height: 1,
          }}
        >
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
                    <p>IMDB: {this.state.data.movieRatingsVm.imdbRating}</p>
                    <p>
                      ROTTEN:{" "}
                      {this.state.data.movieRatingsVm.rottenTomatoesRating}
                    </p>
                  </div>
                  <div className="movie-genres">
                    <p>{this.state.data.genres}</p>
                  </div>
                  <div className="share-button-div">
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
                {/* <Box
                    sx={{
                      width: 1 / 1.1,
                    }}
                  > */}
                <p>Trailers</p>
                <div className="trailer-container">
                  <Carousel
                    swipeable={false}
                    draggable={false}
                    showDots={true}
                    responsive={this.responsive}
                    ssr={true} // means to render carousel on server-side.
                    infinite={false}
                    autoPlaySpeed={1000}
                    keyBoardControl={true}
                    customTransition="all .5"
                    transitionDuration={500}
                    containerClass="carousel-container"
                    removeArrowOnDeviceType={["tablet", "mobile"]}
                    deviceType={"destkop"}
                    dotListClass="custom-dot-list-style"
                    itemClass="carousel-item-padding-40-px"
                  >
                    {this.state.data.trailers.split(",").map((trailer) => (
                      <div key={trailer} className="frameHolder">
                        <iframe
                          className="frame-class"
                          src={`https://www.youtube.com/embed/${trailer}`}
                          frameBorder="0"
                          // allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          sandbox="allow-forms allow-pointer-lock allow-same-origin allow-scripts allow-top-navigation allow-presentation"
                          allowFullScreen
                          title="Embedded youtube"
                        ></iframe>
                      </div>
                    ))}
                  </Carousel>
                </div>
              </div>
            </div> //
          )}
        </Box>
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
}

const withRouter = (WrappedComponent) => (props) => {
  const params = useParams();

  return <MoviePage {...props} params={params} />;
};

export default withRouter(MoviePage);
