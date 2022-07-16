import "./App.css";
import { Routes, Route, Link } from "react-router-dom";
import ToolbarComponent from "./components/toolbar/toolbar";
import MoviePage from "./components/movie-page/moviePage";
import Dashboard from "./components/dashboard/dashboard";

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
        </Routes>
      </div>
    </div>
  );
}

export default App;
