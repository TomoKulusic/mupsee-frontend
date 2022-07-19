import "./App.css";
import { Routes, Route, Link } from "react-router-dom";
import ToolbarComponent from "./components/toolbar/toolbar";
import MoviePage from "./components/movie-page/moviePage";
import Dashboard from "./components/dashboard/dashboard";
import Favorites from "./components/favorites/favorites";
import { LoginPage } from "./components/login/login";
import { ProtectedLayout } from "./components/layouts/protectedLayout";
import { HomeLayout } from "./components/layouts/loginLayout";
import { ContactForm } from "./components/contact/contactForm";

function App() {
  return (
    <div className="App">
      {/* <div className="toolbar">
        <ToolbarComponent></ToolbarComponent>
      </div> */}
      <div className="main">
        <Routes>
          {/* <Route element={<HomeLayout />}> */}
          <Route path="/login" element={<LoginPage />} />
          {/* </Route> */}
          <Route path="/" element={<ProtectedLayout />}>
            <Route path="search" element={<Dashboard />} />
            <Route path="movie/:id" element={<MoviePage />} />
            <Route path="favorites" element={<Favorites />} />
            <Route path="contact" element={<ContactForm />} />
          </Route>
          {/* <Route path="/" element={<Login />} /> */}
          {/* <Route element={<AuthWrapper />}>
            <Route path="/dashboard" element={<Dashboard />} />
          </Route> */}
          {/* <Route path="/movie/:id" element={<MoviePage />} />
          <Route path="/favorites" element={<Favorites />} /> */}
        </Routes>
      </div>
    </div>
  );
}

export default App;
