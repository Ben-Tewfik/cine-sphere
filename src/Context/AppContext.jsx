import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { subMenu } from "../Utils/subMenu";
const AppProvider = createContext();
// const key = `${import.meta.env.REACT_APP_API_KEY}`;

export default function AppContext({ children }) {
  const [isSubMenuOpen, setIsSubMenuOpen] = useState(false);
  const [location, setLocation] = useState({});
  const [page, setPage] = useState([]);
  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState([]);

  const key = `?api_key=${import.meta.env.VITE_API_KEY}`;
  const baseURL = `https://api.themoviedb.org/3/`;
  const url = `${baseURL}trending/movie/day${key}`;

  const fetchData = async () => {
    // fetch Genres
    try {
      const {
        data: { genres },
      } = await axios(`${baseURL}genre/movie/list${key}`);
      setGenres(genres);
    } catch (error) {
      console.error(error);
    }
    // fetch movies
    try {
      const {
        data: { results },
      } = await axios(url);
      setMovies(results);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  // functions for submenu
  function openSubMenu(page, coordinates) {
    const desiredPage = subMenu.find(item => item.page === page);
    if (desiredPage.page === "Genres") {
      desiredPage.links = genres;
    }
    setPage(desiredPage);
    setLocation(coordinates);
    setIsSubMenuOpen(true);
  }
  function closeSubMenu() {
    setIsSubMenuOpen(false);
  }
  // end functions for submenu

  return (
    <AppProvider.Provider
      value={{
        openSubMenu,
        closeSubMenu,
        location,
        page,
        genres,
        isSubMenuOpen,
        movies,
      }}
    >
      {children}
    </AppProvider.Provider>
  );
}

const useGlobalContext = () => useContext(AppProvider);

export { useGlobalContext };
