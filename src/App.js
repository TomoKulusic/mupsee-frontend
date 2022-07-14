import "./App.css";
import { Routes, Route, Link } from "react-router-dom";
import SearchPage from "./components/seach-component/searchPage";
import ToolbarComponent from "./components/toolbar/toolbar";

function App() {
  return (
    <div className="App">
      <div className="toolbar">
        <ToolbarComponent></ToolbarComponent>
      </div>
      <Routes>
        <Route path="/" element={<SearchPage />} />
      </Routes>
    </div>
  );
}

export default App;
