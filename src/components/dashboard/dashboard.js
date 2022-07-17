import React, { Component } from "react";
import "./dashboard.css";
import { useNavigate } from "react-router-dom";
import debounce from "lodash.debounce";
import SearchInput from "../search/searchInput";
import authHeader from "../../services/auth-header";
import { useAuth } from "../../services/useAuth";

let url = "https://localhost:7289/Mupsee/SearchAsync";

const fetchData = async (query, cb) => {
  console.warn("fetching " + query);
  const res = await searchMovies(query);
  cb(res);
};

const debouncedFetchData = debounce((query, cb) => {
  fetchData(query, cb);
}, 500);

const searchMovies = async (query, cb) => {
  if (query != "") {
    url = "https://localhost:7289/Mupsee/SearchAsync?search=" + query;
  } else {
    url = "https://localhost:7289/Mupsee/SearchAsync";
  }

  const requestOptions = {
    method: "GET",
    headers: authHeader(),
  };

  return fetch(url, requestOptions)
    .then((res) => res.json())
    .then(
      (result) => {
        return result;
      },
      (error) => {}
    );
};

export default function Dashboard() {
  const [query, setQuery] = React.useState("");
  const [results, setResults] = React.useState([]);
  const [dataLoaded, setLoader] = React.useState([]);
  const navigate = useNavigate();
  const login = useAuth();

  React.useEffect(() => {
    setLoader(true);

    debouncedFetchData(query, (res) => {
      setResults(res);
      setLoader(false);
    });
  }, [query]);

  return (
    <div>
      <SearchInput
        value={query}
        onChangeText={(e) => {
          console.log(e.target.value);
          setQuery(e.target.value);
        }}
      />

      <div className="search">
        {results.length != 0 && dataLoaded == false && (
          <div className="dataResult">
            {results.map((movie) => {
              return (
                <div className="movie-container" key={movie.id}>
                  <a onClick={() => navigate(`/movie/${movie.id}`)}>
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
    </div>
  );
}
