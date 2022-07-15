import React, { Component } from "react";
import "./moviePage.css";
import { useLocation, useNavigate, useParams } from "react-router-dom";

class MoviePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
    };
  }

  componentDidMount() {
    this.getMovie();
  }

  render() {
    // const id = this.props.params.id;

    return (
      <div className="page">
        {this.state.data != null && (
          <div>
            <div className="movie-description">
              <div className="description-container">
                <div>
                  <p className="title">{this.state.data.title}</p>
                  <p>Add favorite icon</p>
                </div>
                <div className="movie-ratings">
                  <p>{this.state.data.release}</p>

                  <p>{this.state.data.runtime}</p>
                  <p>IMDB: {this.state.data.movieRatings.imdbRating}</p>
                  <p>
                    ROTTEN: {this.state.data.movieRatings.rottenTomatoesRating}
                  </p>
                </div>
                <div className="movie-genres">
                  <p>{this.state.data.genres}</p>
                </div>
                <div className="share-button-div">SHARE</div>
                <div className="description">
                  <p>{this.state.data.description}</p>
                </div>
              </div>
            </div>
            <div className="trailer">
              <div className="trailer-container">
                <iframe
                  src={`https://www.youtube.com/embed/${this.state.data.movieTrailerResponseItems[0].trailerId}`}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  title="Embedded youtube"
                />
              </div>
              <div></div>
            </div>
          </div>
        )}
      </div>
    );

    //       <div className="page">
    //         {this.state.data != null &&

    // }
    //       </div>
    //     );
  }

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
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {}
      );
  };
}

const withRouter = (WrappedComponent) => (props) => {
  const params = useParams();
  // etc... other react-router-dom v6 hooks

  return (
    <MoviePage
      {...props}
      params={params}
      // etc...
    />
  );
};

export default withRouter(MoviePage);
