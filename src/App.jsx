import Actors from "./Pages/Actors";
import Home from "./Pages/Home";
import Movies from "./Pages/Movies";
import Navbar from "./components/Navbar/Navbar";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import SubMenu from "./components/SubMenu/SubMenu";
import Actor from "./Pages/Actor";
import Movie from "./Pages/Movie";
import TvShows from "./Pages/TvShows";
import TvShow from "./Pages/TvShow";
import SearchResults from "./components/SearchResults/SearchResults";
import Genres from "./Pages/Genres";
import Search from "./Pages/Search";
import { useEffect } from "react";

function App() {
  const ScrollToTop = props => {
    const location = useLocation();
    useEffect(() => {
      window.scrollTo(0, 0);
    }, [location]);
    return <>{props.children}</>;
  };
  return (
    <main className="bg-[#0d0d0d] min-h-screen">
      <Router>
        <ScrollToTop />
        <Navbar />
        <SubMenu />
        <SearchResults />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movies" element={<Movies />} />
          <Route path="/movies/:id" element={<Movie />} />
          <Route path="/actors" element={<Actors />} />
          <Route path="/actors/:id" element={<Actor />} />
          <Route path="/tv-shows" element={<TvShows />} />
          <Route path="/tv-shows/:id" element={<TvShow />} />
          <Route path="/genres" element={<Genres />} />
          <Route path="/search" element={<Search />} />
        </Routes>
      </Router>
    </main>
  );
}

export default App;
