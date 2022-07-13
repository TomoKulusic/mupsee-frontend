import logo from './logo.svg';
import './App.css';
import { Routes, Route, Link } from "react-router-dom";
import SearchPage from './components/searchPage';


function App() {
  return (
    <div className="App">
        <Routes>
          <Route path="/" element={<SearchPage />} />
        </Routes>
    </div>
  );
}

export default App;
