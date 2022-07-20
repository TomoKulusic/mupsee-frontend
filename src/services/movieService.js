import authHeader from "./authHeader";

const url_base = "https://localhost:7289/api/Movie";

export class MovieService {
  GetMovies = (object) => {
    var filterArray = [];
    var filter = "";

    for (const [key, value] of Object.entries(object)) {
      if (value != "") {
        filterArray.push(`${filter}${key}=${value}&&`);
      }

      // if (key == "title") {
      //   filter = `${filter}${key}=${value}`;
      // } else {
      //   if (value !== "null" || value !== 0)
      //     filter = `${filter}${key}=${value}`;
      // }
    }

    if (filterArray.length >= 1) filter = `?${filterArray.join("")}`;

    console.log(filter);

    let url = `${url_base}/SearchMoviesAsync${filter}`;

    const requestOptions = {
      method: "GET",
      headers: authHeader(),
    };

    return fetch(url, requestOptions);
  };

  GetMovieById = (value) => {
    let url = `${url_base}/SearchMovieByIdAsync?movieId=${value}`;

    const requestOptions = {
      method: "GET",
      headers: authHeader(),
    };

    return fetch(url, requestOptions);
  };
}
