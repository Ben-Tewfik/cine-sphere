import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { subMenu } from "../Utils/subMenu";
const AppProvider = createContext();
// const key = `${import.meta.env.REACT_APP_API_KEY}`;
export const key = `?api_key=${import.meta.env.VITE_API_KEY}`;
export const baseURL = `https://api.themoviedb.org/3/`;
const peopleURL = `${baseURL}person/popular${key}&language=en-US&page=1`;
export const baseImgUrl = "https://image.tmdb.org/t/p/w500";
export default function AppContext({ children }) {
  const [isLoading, setIsLoading] = useState(true);
  const [isSubMenuOpen, setIsSubMenuOpen] = useState(false);
  const [location, setLocation] = useState({});
  const [page, setPage] = useState([]);
  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  const [actors, setActors] = useState([]);
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [movieQuery, setMovieQuery] = useState("trending/movie/day");

  // fetch Genres
  const fetchGenre = async () => {
    try {
      const {
        data: { genres },
      } = await axios(`${baseURL}genre/movie/list${key}`);
      setGenres(genres);
    } catch (error) {
      console.error(error);
    }
  };

  // fetch movies
  const fetchMovie = async () => {
    setIsLoading(true);
    try {
      const {
        data: { results },
      } = await axios(`https://api.themoviedb.org/3/${movieQuery}${key}`);

      setMovies(results);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };
  // fetch trending movies
  const fetchTrendingMovies = async () => {
    setIsLoading(true);
    try {
      const {
        data: { results },
      } = await axios(`https://api.themoviedb.org/3/trending/movie/day${key}`);

      setTrendingMovies(results);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };
  // fetchPeople
  const fetchPeople = async () => {
    setIsLoading(true);
    try {
      const {
        data: { results },
      } = await axios(peopleURL);
      setActors(results);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchGenre();
    fetchPeople();
  }, []);
  useEffect(() => {
    fetchMovie();
    fetchTrendingMovies();
  }, [movieQuery]);

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
        actors,
        setMovieQuery,
        isLoading,
        trendingMovies,
      }}
    >
      {children}
    </AppProvider.Provider>
  );
}

const useGlobalContext = () => useContext(AppProvider);

export { useGlobalContext };
