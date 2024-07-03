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
  const [data, setData] = useState([]);
  const [actors, setActors] = useState([]);
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [genreId, setGenreId] = useState("");
  const [searchWord, setSearchWord] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showSearchList, setShowSearchList] = useState(true);
  const [miniSearch, setMiniSearch] = useState([]);
  const [dataType, setDataType] = useState("movie");
  const [movieQuery, setMovieQuery] = useState(`trending/movie/day`);
  const [mostPopularMovies, setMostPopularMovies] = useState([]);
  const searchUrl = `${baseURL}search/multi${key}&query=${searchWord}&language=en-US&page=1`;
  // fetch movies
  const fetchMovies = async () => {
    setIsLoading(true);
    try {
      const {
        data: { results },
      } = await axios(
        `https://api.themoviedb.org/3/${movieQuery}${key}&with_genres=${genreId}`
      );
      setData(results);
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
      } = await axios(
        `https://api.themoviedb.org/3/trending/${dataType}/day${key}`
      );

      setTrendingMovies(results);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };
  // // fetch most popular movie
  const fetchMostPopularMovies = async () => {
    setIsLoading(true);
    try {
      const {
        data: { results },
      } = await axios(`https://api.themoviedb.org/3/trending/movie/day${key}`);
      const topMovies = results
        .sort((a, b) => b.popularity - a.popularity)
        .slice(0, 8);
      setMostPopularMovies(topMovies);
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
  // fetch search array
  const fetchSearchMulti = async () => {
    setIsLoading(true);
    try {
      const {
        data: { results },
      } = await axios(searchUrl);
      setSearchResults(results);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };
  const fetchMiniSearchMulti = async () => {
    setIsLoading(true);
    try {
      const {
        data: { results },
      } = await axios(searchUrl);
      setMiniSearch(results);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchMostPopularMovies();
  }, []);
  useEffect(() => {
    fetchMiniSearchMulti();
  }, [searchUrl]);

  useEffect(() => {
    fetchPeople();
  }, []);

  useEffect(() => {
    fetchMovies();
  }, [movieQuery, genreId]);
  useEffect(() => {
    fetchTrendingMovies();
  }, [dataType]);

  // functions for submenu
  function openSubMenu(page, coordinates) {
    const desiredPage = subMenu.find(item => item.page === page);
    setPage(desiredPage);
    setLocation(coordinates);
    setIsSubMenuOpen(true);
  }
  function closeSubMenu() {
    setIsSubMenuOpen(false);
  }
  // end functions for submenu

  // hide search results
  function hideSearchResults() {
    if (showSearchList) {
      setShowSearchList(false);
    }
  }
  return (
    <AppProvider.Provider
      value={{
        openSubMenu,
        closeSubMenu,
        location,
        page,
        isSubMenuOpen,
        data,
        actors,
        setMovieQuery,
        isLoading,
        trendingMovies,
        setData,
        setGenreId,
        setSearchWord,
        searchWord,
        searchResults,
        showSearchList,
        setShowSearchList,
        hideSearchResults,
        setSearchResults,
        fetchSearchMulti,
        miniSearch,
        setMiniSearch,
        dataType,
        setDataType,
        mostPopularMovies,
      }}
    >
      {children}
    </AppProvider.Provider>
  );
}

const useGlobalContext = () => useContext(AppProvider);

export { useGlobalContext };
