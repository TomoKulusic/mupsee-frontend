import authHeader from "./authHeader";

const url_base = "https://localhost:7289/api/Favorite";

export class FavoriteService {
  CheckIsMovieFavorite = (movieId) => {
    let url = `${url_base}/CheckIsFavorite?movieId=${movieId}`;
    const requestOptions = {
      method: "GET",
      headers: authHeader(),
    };

    return fetch(url, requestOptions);
  };

  GetFavoriteMovies = () => {
    let url = `${url_base}/GetFavoriteMovies`;

    const requestOptions = {
      method: "GET",
      headers: authHeader(),
    };

    return fetch(url, requestOptions);
  };

  SaveMovieAsFavorite = (value) => {
    let url = `${url_base}/SaveMovieAsFavoriteAsync`;

    const requestOptions = {
      method: "POST",
      headers: authHeader(),
      body: value,
    };

    return fetch(url, requestOptions);
  };
}
