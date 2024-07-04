import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  key,
  baseURL,
  baseImgUrl,
  useGlobalContext,
} from "../Context/AppContext";
import Loader from "../components/Loader/Loader";
import { FaStar } from "react-icons/fa";
import ISO6391 from "iso-639-1";
import { logoNotFound } from "../../public/Images";
import ActorCard from "../components/ActorCard/ActorCard";
import TvShowCard from "../components/TvShowCard/TvShowCard";
export default function TvShow() {
  const [isLoading, setIsLoading] = useState(true);
  const [tvShow, setTvShow] = useState({});
  const [video, setVideo] = useState({});
  const [cast, setCast] = useState([]);
  const [similarSeries, setSimilarSeries] = useState([]);
  const { id } = useParams();
  const { closeSubMenu } = useGlobalContext();
  const tvShowUrl = `${baseURL}tv/${id}${key}&language=en-US`;
  const tvTrailerUrl = `${baseURL}tv/${id}/videos${key}&language=en-US`;
  const castUrl = `${baseURL}tv/${id}/credits${key}&language=en-US`;
  const similarSeriesUrl = `${baseURL}tv/${id}/similar${key}&language=en-US`;
  //   fetch single Tv Show
  const fetchTvShow = useCallback(async () => {
    setIsLoading(true);
    try {
      const { data } = await axios(tvShowUrl);
      // console.log(data);
      setTvShow(data);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  }, [tvShowUrl]);
  // fetch trailer
  const fetchTvTrailer = useCallback(async () => {
    setIsLoading(true);
    try {
      const { data } = await axios(tvTrailerUrl);
      const videoTrailer = data.results.find(
        item => item.type === "Teaser" || item.type === "Trailer"
      );
      const trailerKey = videoTrailer ? videoTrailer : data.results[0];
      setVideo(trailerKey);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  }, [tvTrailerUrl]);
  // fetch cast
  const fetchCast = useCallback(async () => {
    setIsLoading(true);
    try {
      const { data } = await axios(castUrl);
      const mainCast = data?.cast
        ?.sort((a, b) => b.popularity - a.popularity)
        ?.slice(0, 6);
      setCast(mainCast);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  }, [castUrl]);
  // fetch similar series
  const fetchSimilarSeries = useCallback(async () => {
    setIsLoading(true);
    try {
      const { data } = await axios(similarSeriesUrl);
      const topSimilarSeries = data.results.sort(
        (a, b) => b.popularity - a.popularity
      );
      setSimilarSeries(topSimilarSeries);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  }, [similarSeriesUrl]);

  useEffect(() => {
    fetchTvShow();
    fetchTvTrailer();
    fetchCast();
    fetchSimilarSeries();
  }, [fetchTvShow, fetchTvTrailer, fetchCast, fetchSimilarSeries]);
  function hideSubMenu() {
    closeSubMenu();
  }
  // loading state
  if (isLoading) {
    return <Loader />;
  }
  const {
    name,
    first_air_date: first,
    last_air_date: last,
    in_production,
    vote_count,
    vote_average,
    backdrop_path,
    poster_path,
    overview,
    genres,
    created_by,
    languages,
    production_countries,
    seasons,
    production_companies,
  } = tvShow;
  // start year and end year of the show
  const showDate = in_production
    ? `${first?.slice(0, 4)} -`
    : `${first?.slice(0, 4)} - ${last?.slice(0, 4)}`;
  return (
    <section
      onMouseOver={hideSubMenu}
      className="text-white w-[90vw] mx-auto py-5 min-h-screen"
    >
      <div>
        <h1 className="text-3xl font-bold mb-3 md:text-6xl">{name}</h1>
        <div className="mb-4 text-md text-[#F1dac4] flex items-center gap-x-4 md:text-xl">
          <h5>{showDate}</h5>
          <span className="bg-[#ff601c] w-1 h-5 rounded-md"></span>
          <h5 className="flex items-center gap-1">
            <FaStar className="text-[#ff601c]" />
            <span className="font-bold">{vote_average?.toFixed(1)}</span>/10 -{" "}
            {vote_count} votes
          </h5>
        </div>
      </div>
      <div className="h-72 rounded-lg mb-8 md:h-[70vh]">
        {video ? (
          <iframe
            src={`https://www.youtube.com/embed/${video?.key}`}
            className="w-full h-full rounded-lg"
          ></iframe>
        ) : (
          <div
            style={{ backgroundImage: `url(${baseImgUrl}${backdrop_path})` }}
            className="w-full h-full bg-center bg-cover rounded-md"
          ></div>
        )}
      </div>
      <div className="md:flex md:gap-8 mb-4">
        <div className="flex gap-4 mb-4">
          <img
            src={`${baseImgUrl}${poster_path}`}
            alt={`${name} Poster`}
            className="block w-1/3 rounded-md md:w-[600px]"
          />
          <p className="md:hidden">{overview}</p>
        </div>
        <div>
          <p className="hidden md:block md:mb-4">{overview}</p>
          <ul className="flex gap-1 mb-4">
            <h3 className="text-[#ff601c] font-bold">Genre:</h3>
            {genres?.map((genre, index) => {
              const { id, name } = genre;
              return (
                <li key={id}>{`${name}${
                  index === genres?.length - 1 ? "" : ","
                }`}</li>
              );
            })}
          </ul>
          <div className="flex gap-1 mb-4">
            <h3 className="text-[#ff601c] font-bold">Creator:</h3>
            <p>{created_by && created_by[0]?.name}</p>
          </div>
          <ul className="flex gap-1 mb-4">
            <h3 className="text-[#ff601c] font-bold">Languages:</h3>
            {languages?.map((item, index) => {
              return (
                <li
                  key={`${index}${item}`}
                  className="capitalize"
                >{`${ISO6391.getName(item)}${
                  index === languages.length - 1 ? "" : ","
                }`}</li>
              );
            })}
          </ul>
          <ul className="flex gap-1 mb-4">
            <h3 className="text-[#ff601c] font-bold">Country:</h3>
            {production_countries?.map((item, index) => {
              const { name } = item;
              return (
                <li key={`${name}`} className="capitalize">{`${name}${
                  index === production_countries?.length - 1 ? "" : ","
                }`}</li>
              );
            })}
          </ul>
          <div className="flex gap-1 mb-4">
            <h3 className="text-[#ff601c] font-bold">Seasons:</h3>
            <p>{seasons?.length - 1}</p>
          </div>
          <h3 className="text-[#ff601c] font-bold mb-4">
            Production Companies:
          </h3>
          <div
            className={`grid grid-cols-${production_companies?.length}  ${
              production_companies?.length === 1 ? "w-[30vw]" : "w-[70vw]"
            }  md:max-w-[400px] gap-4`}
          >
            {production_companies?.map(company => {
              const { id, logo_path: img, name } = company;
              return (
                <div key={id}>
                  <div className="bg-gray-100 p-2 h-16 rounded-lg mb-2">
                    <img
                      src={img === null ? logoNotFound : `${baseImgUrl}${img}`}
                      alt={`${name} Logo Image`}
                      className="block max-w-full h-full mx-auto"
                    />
                  </div>
                  <h3 className="text-center">{name}</h3>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      {/* cast */}
      <h3 className="text-[#ff601c] text-3xl md:text-4xl capitalize mb-4 font-bold">
        cast
      </h3>
      <div className="w-[90vw] mx-auto pb-10 grid gap-6 grid-cols-auto-fill">
        {cast.map(actor => {
          return <ActorCard key={actor.id} {...actor} />;
        })}
      </div>
      {/* similar movies */}
      <h3 className="text-[#ff601c] text-3xl md:text-4xl capitalize mb-8 font-bold">
        similar movies
      </h3>
      <div className="w-[90vw] mx-auto pb-10 grid gap-6 grid-cols-auto-fill">
        {similarSeries?.slice(0, 12)?.map(tvShow => {
          return <TvShowCard key={tvShow.id} {...tvShow} />;
        })}
      </div>
    </section>
  );
}
