import "./App.css";
import { Routes, Route, Link } from "react-router-dom";
import SearchPage from "./components/seach-component/searchPage";
import ToolbarComponent from "./components/toolbar/toolbar";
import MoviePage from "./components/movie-page/moviePage";

function App() {
  return (
    <div className="App">
      <div className="toolbar">
        <ToolbarComponent></ToolbarComponent>
      </div>
      <div className="main">
        <Routes>
          <Route path="/" element={<SearchPage />} />
          <Route path="/movie/:id" element={<MoviePage />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
