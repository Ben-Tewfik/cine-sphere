import { Link } from "react-router-dom";
import { useGlobalContext } from "../Context/AppContext";
import { MdKeyboardArrowRight } from "react-icons/md";
import Card from "../components/Card/Card";
import TvShowCard from "../components/TvShowCard/TvShowCard";
import Hero from "../components/Hero/Hero";

export default function Home() {
  const { trendingMovies, dataType, setDataType, setMovieQuery } =
    useGlobalContext();

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
      </div>
    </section>
  );
}
