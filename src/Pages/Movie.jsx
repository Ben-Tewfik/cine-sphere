import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { baseURL, key, baseImgUrl } from "../Context/AppContext";
import { FaStar } from "react-icons/fa";
import { logoNotFound } from "../../public/Images";
import Loader from "../components/Loader/Loader";
import ActorCard from "../components/ActorCard/ActorCard";
import Card from "../components/Card/Card";
export default function Movie() {
  const [isLoading, setIsLoading] = useState(true);
  const [movie, setMovie] = useState({});
  const [video, setVideo] = useState({});
  const [cast, setCast] = useState([]);
  const [crew, setCrew] = useState([]);
  const [similarMovies, setSimilarMovies] = useState([]);
  const { id } = useParams();
  const movieUrl = `${baseURL}movie/${id}${key}&language=en-US`;
  const videoUrl = `${baseURL}movie/${id}/videos${key}&language=en-US`;
  const castUrl = `${baseURL}movie/${id}/credits${key}&language=en-US`;
  const similarMoviesUrl = `${baseURL}movie/${id}/similar${key}&language=en-US`;
  const fetchMovie = useCallback(async () => {
    setIsLoading(true);
    try {
      const { data } = await axios(movieUrl);
      console.log(data);
      setMovie(data);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  }, [movieUrl]);
  const fetchVideo = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await axios(videoUrl);
      const videoArr = data.data.results;
      const videoTrailer = videoArr.find(
        video =>
          video.name.toLowerCase().includes("trailer") &&
          video.type === "Trailer"
      );

      setVideo(videoTrailer);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  }, [videoUrl]);
  const fetchCast = useCallback(async () => {
    setIsLoading(true);
    try {
      const { data } = await axios(castUrl);
      setCast(data.cast);
      setCrew(data.crew);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  }, [castUrl]);
  const fetchSimilarMovie = useCallback(async () => {
    setIsLoading(true);
    try {
      const { data } = await axios(similarMoviesUrl);
      setSimilarMovies(data.results);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  }, [similarMoviesUrl]);
  useEffect(() => {
    fetchMovie();
    fetchVideo();
    fetchCast();
    fetchSimilarMovie();
  }, [fetchCast, fetchMovie, fetchVideo, fetchSimilarMovie, id]);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);
  const {
    genres,
    overview,
    poster_path: image,
    production_companies,
    budget,
    production_countries,
    release_date,
    runtime,
    spoken_languages: lang,
    title,
    vote_average: vote,
    vote_count,
  } = movie;
  if (isLoading) {
    return <Loader />;
  }
  // calculate runtime
  let h = runtime / 60;
  let m = runtime % 60;
  // find director
  const director = crew.find(item => item.job.toLowerCase() === "director");
  return (
    <section className="text-white w-[90vw] mx-auto py-5 min-h-screen">
      <div>
        <h1 className="text-3xl font-bold mb-3 md:text-6xl">{title}</h1>
        <div className="mb-4 text-md text-[#F1dac4] flex items-center gap-x-4 md:text-xl">
          <h5>{release_date?.slice(0, 4)}</h5>
          <span className="bg-[#ff601c] w-1 h-5 rounded-md"></span>
          <h5>{`${Math.floor(h)}h ${m === 0 ? "" : `${m}m`}`}</h5>
          <span className="bg-[#ff601c] w-1 h-5 rounded-md"></span>
          <h5 className="flex items-center gap-1">
            <FaStar className="text-[#ff601c]" />
            <span className="font-bold">{vote.toFixed(1)}</span>/10 -{" "}
            {vote_count} votes
          </h5>
        </div>
      </div>
      <div className="h-72 rounded-lg mb-8 md:h-[70vh]">
        <iframe
          src={`https://www.youtube.com/embed/${video?.key}`}
          className="w-full h-full rounded-lg"
        ></iframe>
      </div>
      <div className="md:flex md:gap-8 mb-4">
        <div className="flex gap-4 mb-4">
          <img
            src={`${baseImgUrl}${image}`}
            alt={`${title} Poster`}
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
                  index === genres.length - 1 ? "" : ","
                }`}</li>
              );
            })}
          </ul>
          <div className="flex gap-1 mb-4">
            <h3 className="text-[#ff601c] font-bold">Director:</h3>
            <p>{director?.name}</p>
          </div>
          <ul className="flex gap-1 mb-4">
            <h3 className="text-[#ff601c] font-bold">Languages:</h3>
            {lang?.map((item, index) => {
              const { id, name } = item;
              return (
                <li key={`${id}${name}`} className="capitalize">{`${name}${
                  index === lang.length - 1 ? "" : ","
                }`}</li>
              );
            })}
          </ul>
          <ul className="flex gap-1 mb-4">
            <h3 className="text-[#ff601c] font-bold">Country:</h3>
            {production_countries?.map((item, index) => {
              const { id, name } = item;
              return (
                <li key={`${id}${name}`} className="capitalize">{`${name}${
                  index === lang.length - 1 ? "" : ","
                }`}</li>
              );
            })}
          </ul>
          <div className="flex gap-1 mb-4">
            <h3 className="text-[#ff601c] font-bold">Budget:</h3>
            <p>{budget === 0 ? "Unknown" : `${budget} USD`}</p>
          </div>
          <div className="flex gap-1 mb-4">
            <h3 className="text-[#ff601c] font-bold">Release Date:</h3>
            <p>{release_date}</p>
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
        {cast?.slice(0, 6)?.map(actor => {
          return <ActorCard key={actor.id} {...actor} />;
        })}
      </div>
      {/* similar movies */}
      <h3 className="text-[#ff601c] text-3xl md:text-4xl capitalize mb-8 font-bold">
        similar movies
      </h3>
      <div className="w-[90vw] mx-auto pb-10 grid gap-6 grid-cols-auto-fill">
        {similarMovies?.slice(0, 12)?.map(movie => {
          return <Card key={movie.id} {...movie} />;
        })}
      </div>
    </section>
  );
}
