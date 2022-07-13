import React, { Component } from 'react';

class SearchPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
          error: null,
          isLoaded: false,
          items: []
        };
      }

      // searchMovies() {
      //   fetch("https://localhost:7289/Mupsee/SearchAsync?search=avengers")
      //     .then(res => res.json())
      //     .then(
      //       (result) => {
      //         console.log(result);
      //         this.setState({
      //           isLoaded: true,
      //           items: result.items
      //         });
      //       },
      //       // Note: it's important to handle errors here
      //       // instead of a catch() block so that we don't swallow
      //       // exceptions from actual bugs in components.
      //       (error) => {
      //         this.setState({
      //           isLoaded: true,
      //           error
      //         });
      //       }
      //     )
      // }

    render() { 
        return <p>Test Test</p>;
    }
}
 
export default SearchPage;