import "./App.css";
import { Routes, Route, Link } from "react-router-dom";
import ToolbarComponent from "./components/toolbar/toolbar";
import MoviePage from "./components/movie-page/moviePage";
import Dashboard from "./components/dashboard/dashboard";
import Favorites from "./components/favorites/favorites";

function App() {
  return (
    <div className="App">
      <div className="toolbar">
        <ToolbarComponent></ToolbarComponent>
      </div>
      <div className="main">
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/movie/:id" element={<MoviePage />} />
          <Route path="/favorites" element={<Favorites />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
