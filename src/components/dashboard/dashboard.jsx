import React, { Component } from "react";
import "./dashboard.css";
import debounce from "lodash.debounce";
import SearchInput from "../search/searchInput";
import { MovieService } from "../../services/movieService";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { genres } from "../../services/genres";
import { countries } from "../../services/countries";
import { languages } from "../../services/languages";
import { ratings } from "../../services/ratings";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import Pagination from "@mui/material/Pagination";
import LoadingSpinner from "../loader/spinner";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: "",
      results: [],
      genresValue: "",
      countriesValue: "",
      languageValue: "",
      ratingValue: 0,
      snackbar: false,
      pageNumber: 1,
      pageSize: 10,
      paginatedData: [],
      isLoading: false,
    };
    this.movieService = new MovieService();
    this.totalPageCount = 0;
  }

  componentDidMount() {
    this.debounceFetchData();
  }

  debounceFetchData = debounce(() => {
    this.setState({ isLoading: true });

    var filter = {
      title: this.state.query,
      genre: this.state.genresValue,
      rating: this.state.ratingValue,
      language: this.state.languageValue,
      country: this.state.countriesValue,
    };

    this.movieService
      .GetMovies(filter)
      .then((res) => res.json())
      .then(
        (result) => {
          this.setState({ results: result }, () => {
            this.updateList(1);
          });
          this.totalPageCount = Math.ceil(result.length / this.state.pageSize);
          this.setState({ isLoading: false });
        },
        (error) => {
          this.handleClick();
        }
      );
  }, 500);

  handleChange = (e) => {
    this.setState({ query: e.target.value });
    this.debounceFetchData();
  };

  handleSelectChange = (event) => {
    this.setState({ genresValue: event.target.value });
    this.debounceFetchData();
  };

  handleCountryChange = (event) => {
    this.setState({ countriesValue: event.target.value });
    this.debounceFetchData();
  };

  handleLanguageChange = (event) => {
    this.setState({ languageValue: event.target.value });
    this.debounceFetchData();
  };

  handleRatingsChange = (event) => {
    this.setState({ ratingValue: event.target.value });
    this.debounceFetchData();
  };

  // renderData = () => {
  //   return (

  // };

  render() {
    return (
      <div>
        <Box
          sx={{
            width: 1 / 1.1,
            height: 1,
          }}
        >
          <div className="search-container">
            <div className="first-row">
              <SearchInput
                value={this.state.query}
                onChangeText={(e) => {
                  this.handleChange(e);
                }}
              />
            </div>
            <div className="second-row">
              <select
                value={this.state.genresValue}
                onChange={this.handleSelectChange}
              >
                {genres.map((movie) => (
                  <option key={movie} value={movie}>
                    {movie}
                  </option>
                ))}
              </select>
              <select
                value={this.state.countriesValue}
                onChange={this.handleCountryChange}
              >
                {countries.map((country) => (
                  <option key={country} value={country}>
                    {country}
                  </option>
                ))}
              </select>
              <select
                value={this.state.languageValue}
                onChange={this.handleLanguageChange}
              >
                {languages.map((language) => (
                  <option key={language} value={language}>
                    {language}
                  </option>
                ))}
              </select>
              <select
                value={this.state.ratingValue}
                onChange={this.handleRatingsChange}
              >
                {ratings.map((ratings) => (
                  <option key={ratings.value} value={ratings.value}>
                    {ratings.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="search">
            {this.state.isLoading ? (
              <LoadingSpinner />
            ) : (
              <div className="dataResult">
                {this.state.paginatedData.map((movie) => {
                  return (
                    <div className="movie-container" key={movie.id}>
                      <a href={`/movie/${movie.id}`}>
                        <div>
                          <div>
                            <img
                              loading="lazy"
                              className="image-container"
                              src={movie.image}
                            ></img>
                            <img
                              loading="lazy"
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
            <div className="pagination-container">
              <Pagination
                count={this.totalPageCount}
                page={this.state.pageNumber}
                onChange={this.onPageChange}
              />
            </div>
          </div>
        </Box>
        _
        <Snackbar
          open={this.state.snackbar}
          autoHideDuration={6000}
          onClose={this.handleClose}
        >
          <Alert
            onClose={this.handleClose}
            severity="error"
            sx={{ width: "100%" }}
          >
            Failed to get movies please try again
          </Alert>
        </Snackbar>
      </div>
    );
  }

  // </div>

  // <div>
  //   <Box
  //     sx={{
  //       width: 1 / 1.1,
  //       height: 1,
  //     }}
  //   >
  //     <div className="search-container">
  //       <div className="first-row">
  //         <SearchInput
  //           value={this.state.query}
  //           onChangeText={(e) => {
  //             this.handleChange(e);
  //           }}
  //         />
  //       </div>
  //       <div className="second-row">
  //         <select
  //           value={this.state.genresValue}
  //           onChange={this.handleSelectChange}
  //         >
  //           {genres.map((movie) => (
  //             <option key={movie} value={movie}>
  //               {movie}
  //             </option>
  //           ))}
  //         </select>
  //         <select
  //           value={this.state.countriesValue}
  //           onChange={this.handleCountryChange}
  //         >
  //           {countries.map((country) => (
  //             <option key={country} value={country}>
  //               {country}
  //             </option>
  //           ))}
  //         </select>
  //         <select
  //           value={this.state.languageValue}
  //           onChange={this.handleLanguageChange}
  //         >
  //           {languages.map((language) => (
  //             <option key={language} value={language}>
  //               {language}
  //             </option>
  //           ))}
  //         </select>
  //         <select
  //           value={this.state.ratingValue}
  //           onChange={this.handleRatingsChange}
  //         >
  //           {ratings.map((ratings) => (
  //             <option key={ratings.value} value={ratings.value}>
  //               {ratings.name}
  //             </option>
  //           ))}
  //         </select>
  //       </div>
  //     </div>

  //     <div className="search">
  //       {this.state.results.length != 0 && (
  //         <div className="dataResult">
  //           {this.state.paginatedData.map((movie) => {
  //             return (
  //               <div className="movie-container" key={movie.id}>
  //                 <a href={`/movie/${movie.id}`}>
  //                   <div>
  //                     <div>
  //                       <img
  //                         loading="lazy"
  //                         className="image-container"
  //                         src={movie.image}
  //                       ></img>
  //                       <img
  //                         loading="lazy"
  //                         className="image-container"
  //                         src={movie.image}
  //                       ></img>
  //                     </div>
  //                   </div>
  //                 </a>
  //               </div>
  //             );
  //           })}
  //         </div>
  //       )}
  //       <div className="pagination-container">
  //         <Pagination
  //           count={this.totalPageCount}
  //           page={this.state.pageNumber}
  //           onChange={this.onPageChange}
  //         />
  //       </div>
  //     </div>
  //   </Box>
  //   <Snackbar
  //     open={this.state.snackbar}
  //     autoHideDuration={6000}
  //     onClose={this.handleClose}
  //   >
  //     <Alert
  //       onClose={this.handleClose}
  //       severity="error"
  //       sx={{ width: "100%" }}
  //     >
  //       Failed to get movies please try again
  //     </Alert>
  //   </Snackbar>
  // </div>

  onPageChange = (event, value) => {
    this.updateList(value);
  };

  updateList(pageNumber) {
    this.setState({ pageNumber: pageNumber });
    var currentPageNumber =
      pageNumber * this.state.pageSize - this.state.pageSize;
    var cloneArray = this.state.results.slice();
    var data = cloneArray.splice(currentPageNumber, this.state.pageSize);
    this.setState({ paginatedData: data });
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

export default Dashboard;
