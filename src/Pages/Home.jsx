import { Link } from "react-router-dom";
import { key, useGlobalContext } from "../Context/AppContext";
import { MdKeyboardArrowRight } from "react-icons/md";
import Card from "../components/Card/Card";
import TvShowCard from "../components/TvShowCard/TvShowCard";
import Hero from "../components/Hero/Hero";
import ActorCard from "../components/ActorCard/ActorCard";
import { useEffect, useState } from "react";
import Loader from "../components/Loader/Loader";
import axios from "axios";
export default function Home() {
  const { trendingMovies, dataType, actors, setDataType, setMovieQuery } =
    useGlobalContext();
  const [latestMovies, setLatestMovies] = useState([]);
  const [latestShows, setLatestShows] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  async function fetchLatestMovies() {
    setIsLoading(true);
    try {
      const data = await axios(
        `https://api.themoviedb.org/3/movie/now_playing${key}&language=en-US&page=1`
      );
      setLatestMovies(data.data.results);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  }
  async function fetchLatestShows() {
    setIsLoading(true);
    try {
      const data = await axios(
        `https://api.themoviedb.org/3/tv/airing_today${key}&language=en-US&page=1`
      );
      setLatestShows(data.data.results);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  }
  useEffect(() => {
    fetchLatestMovies();
    fetchLatestShows();
  }, []);

  return (
    <section className="text-white pb-10">
      <Hero />
      <div className="w-[90vw] mx-auto">
        <div className="mb-8 md:flex justify-between items-center gap-4">
          <h2 className="text-2xl mb-4 md:mb-0">Trending</h2>
          <div className="flex justify-between items-center flex-1">
            <div className="flex gap-4">
              <button
                onClick={() => {
                  setDataType("movie"), setMovieQuery("trending/movie/day");
                }}
                className="border-2 border-[#ff601c] py-1 px-3 rounded-lg text-[#ff601c] font-semibold hover:text-white hover:bg-[#ff601c] transition-colors duration-300 ease-in-out"
              >
                Movies
              </button>
              <button
                onClick={() => {
                  setDataType("tv"), setMovieQuery("trending/tv/day");
                }}
                className="border-2 border-[#ff601c] py-1 px-3 rounded-lg text-[#ff601c] font-semibold hover:text-white hover:bg-[#ff601c] transition-colors duration-300 ease-in-out"
              >
                TV Shows
              </button>
            </div>
            <Link
              to={`${dataType === "tv" ? "/tv-shows" : "/movies"}`}
              className="flex items-center justify-self-end text-[#ff601c] font-semibold"
            >
              View More <MdKeyboardArrowRight className="text-xl" />
            </Link>
          </div>
        </div>
        <div className="grid gap-6 grid-cols-auto-fill">
          {trendingMovies
            ?.sort((a, b) => b.vote_average - a.vote_average)
            ?.slice(0, 12)
            .map(item => {
              if (item.media_type === "tv") {
                return <TvShowCard key={item.id} {...item} />;
              }
              return <Card key={item.id} {...item} />;
            })}
        </div>
        {/* popular actors */}
        <div className="my-8 flex justify-between items-center gap-4">
          <h2 className="text-2xl">Popular Celebrities</h2>
          <Link
            to={`/actors`}
            className="flex items-center justify-self-end text-[#ff601c] font-semibold"
          >
            View More <MdKeyboardArrowRight className="text-xl" />
          </Link>
        </div>
        <div className="grid gap-6 grid-cols-auto-fill">
          {actors
            ?.sort((a, b) => b.popularity - a.popularity)
            ?.slice(0, 12)
            .map(item => {
              return <ActorCard key={item.id} {...item} />;
            })}
        </div>
        {/* latest movies */}
        {isLoading ? (
          <Loader />
        ) : (
          <>
            <div className="my-8 flex justify-between items-center gap-4">
              <h2 className="text-2xl">Latest Movies</h2>
              <Link
                to={`/movies`}
                onClick={() => {
                  setDataType("movie"), setMovieQuery("movie/now_playing");
                }}
                className="flex items-center justify-self-end text-[#ff601c] font-semibold"
              >
                View More <MdKeyboardArrowRight className="text-xl" />
              </Link>
            </div>
            <div className="grid gap-6 grid-cols-auto-fill">
              {latestMovies
                ?.sort((a, b) => b.popularity - a.popularity)
                ?.slice(0, 12)
                .map(item => {
                  return <Card key={item.id} {...item} />;
                })}
            </div>
          </>
        )}
        {/* latest shows */}
        {isLoading ? (
          <Loader />
        ) : (
          <>
            <div className="my-8 flex justify-between items-center gap-4">
              <h2 className="text-2xl">Latest Series</h2>
              <Link
                to={`/tv-shows`}
                onClick={() => {
                  setDataType("tv"), setMovieQuery("tv/airing_today");
                }}
                className="flex items-center justify-self-end text-[#ff601c] font-semibold"
              >
                View More <MdKeyboardArrowRight className="text-xl" />
              </Link>
            </div>
            <div className="grid gap-6 grid-cols-auto-fill">
              {latestShows
                ?.sort((a, b) => b.popularity - a.popularity)
                ?.slice(0, 12)
                .map(item => {
                  return <TvShowCard key={item.id} {...item} />;
                })}
            </div>
          </>
        )}
      </div>
    </section>
  );
}
