import React, { Component } from "react";
import "./dashboard.css";
import { useNavigate } from "react-router-dom";
import debounce from "lodash.debounce";
import SearchInput from "../search/searchInput";

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

  console.log(url);

  return fetch(url)
    .then((res) => res.json())
    .then(
      (result) => {
        console.log(result);
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
                <div
                  className="movie-section"
                  key={movie.id}
                  onClick={() => navigate(`/movie/${movie.id}`)}
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

      {/* {results.map((result, index) => (
        <div key={index}>
          <ListItem
            title={result.name}
            imageUrl={result.image_url}
            caption={result.tagline}
          />
        </div>
      ))} */}
    </div>
  );
}

// class Dashboard extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       error: null,
//       isLoaded: false,
//       filteredData: [],
//       wordEntered: "",
//       typing: false,
//       typingTimeout: 0,
//       query: "",
//     };

//     this.changeName = this.changeName.bind(this);
//   }

//   debouncedFetchData = debounce((query, cb) => {
//     this.searchMovies(query, cb);
//   }, 500);

//   componentDidMount() {
//     debouncedFetchData(query, (res) => {
//       this.setState({ filteredData: res });
//     });
//   }

//   // componentDidMount (() => {

//   // }, [query]);

//   render() {
//     return (

//     );
//   }

//   goToMovieDetails(movieId) {
//     this.props.navigate("/movie/" + movieId);
//   }

//   searchMovies = async (query, cb) => {
//     console.log("a");
//     if (this.state.wordEntered === "") {
//       this.state.filteredData = [];
//     } else {
//       fetch("https://localhost:7289/Mupsee/SearchAsync?search=" + query)
//         .then((res) => res.json())
//         .then(
//           (result) => {
//             this.setState({ filteredData: result });
//             cb(result);
//           },
//           // Note: it's important to handle errors here
//           // instead of a catch() block so that we don't swallow
//           // exceptions from actual bugs in components.
//           (error) => {}
//         );
//     }
//   };

//   changeName = (event) => {
//     console.log(event);

//     if (this.state.typingTimeout) {
//       clearTimeout(this.state.typingTimeout);
//     }

//     this.setState({
//       wordEntered: event.target.value,
//       typing: false,
//       typingTimeout: setTimeout(function () {
//         console.log("bb");
//         this.searchMovies();
//       }, 5000),
//     });
//   };

//   handleSubmit = (event) => {
//     console.log(this.state.wordEntered);
//     event.preventDefault();
//     this.searchMovies();
//   };

//   handleFilter = (event) => {
//     this.setState({ wordEntered: event.target.value });
//   };
// }

// function WithNavigate(props) {
//   let navigate = useNavigate();
//   return <Dashboard {...props} navigate={navigate} />;
// }

// export default WithNavigate;
