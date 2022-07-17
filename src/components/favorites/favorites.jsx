import React, { Component } from "react";
import "./favorites.css";
import { useNavigate } from "react-router-dom";
import authHeader from "../../services/auth-header";

export default function Favorites() {
  const [data, setData] = React.useState("");
  const navigate = useNavigate();

  React.useEffect(() => {
    getFavoriteMovies();
  });

  const getFavoriteMovies = () => {
    const requestOptions = {
      method: "GET",
      headers: authHeader(),
    };

    fetch("https://localhost:7289/Mupsee/GetFavoriteMovies", requestOptions)
      .then((res) => res.json())
      .then(
        (result) => {
          setData(result);
        },
        (error) => {}
      );
  };

  return (
    <div className="search">
      {data.length != 0 && (
        <div className="dataResult">
          {data.map((movie) => {
            return (
              <div className="movie-container" key={movie.id}>
                <a onClick={() => navigate(`/movie/${movie.id}`)}>
                  <div>
                    <div>
                      <img className="image-container" src={movie.image}></img>
                      <img className="image-container" src={movie.image}></img>
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
