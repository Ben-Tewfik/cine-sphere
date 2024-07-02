import { useGlobalContext } from "../../Context/AppContext";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { baseImgUrl } from "../../Context/AppContext";
import { useCallback } from "react";
import { MdOutlineNavigateBefore, MdOutlineNavigateNext } from "react-icons/md";
import { FaStar } from "react-icons/fa6";
import { Link } from "react-router-dom";

export default function Hero() {
  const { mostPopularMovies } = useGlobalContext();
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [Autoplay()]);
  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);
  return (
    <div className="w-[90vw] md:h-[70vh] rounded-lg mx-auto mb-8">
      <div
        className="overflow-hidden w-full rounded-lg h-full relative"
        ref={emblaRef}
      >
        <div className="flex w-full h-full rounded-lg">
          {mostPopularMovies?.map(movie => {
            const {
              backdrop_path,
              id,
              release_date,
              title,
              vote_average,
              poster_path,
              overview,
            } = movie;
            return (
              <Link
                to={`/movies/${id}`}
                className="relative grow-0 shrink-0 basis-full min-w-0 rounded-lg"
                key={movie.id}
              >
                <img
                  src={`${baseImgUrl}${backdrop_path}`}
                  alt=""
                  className="block w-full h-full object-cover rounded-lg "
                />
                <div className="absolute w-96 md:w-[700px] md:h-[250px] bg-black backdrop-filter backdrop-blur-lg opacity-80 rounded-lg p-2 md:p-6 m-2 left-0 bottom-0 md:left-14 md:bottom-1/2 md:translate-y-1/2 flex gap-4 items-center">
                  <img
                    src={`${baseImgUrl}${poster_path}`}
                    alt={`${title} poster image`}
                    className="w-20 md:w-36 block rounded-lg"
                  />
                  <div className="flex flex-col gap-2">
                    <h1 className="text-2xl">{title}</h1>
                    <div className="flex items-center gap-2">
                      <h5>{release_date?.slice(0, 4)}</h5>
                      <span className="bg-[#ff601c] w-1 h-1 rounded-md"></span>
                      <h5 className="flex items-center gap-1">
                        <FaStar className="text-[#ff601c]" />
                        <span className="font-bold">
                          {vote_average?.toFixed(1)}
                        </span>
                        /10
                      </h5>
                    </div>
                    <p className="hidden md:block">
                      {overview?.length > 130
                        ? `${overview?.slice(0, 150)}...`
                        : overview}
                    </p>
                    <Link
                      to={`/movies/${id}`}
                      className="hidden md:bg-[#ff601c] md:block md:py-1 md:px-4 md:w-32 hover:text-[#ff601c] hover:bg-transparent hover:transition-all hover:duration-300 border-2 border-transparent hover:border-[#ff601c] hover:border-2 md:rounded-md"
                    >
                      Watch Trailer
                    </Link>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        <button
          className="absolute top-1/2  bottom-1/2 left-1 hidden sm:grid sm:place-items-center text-[#ff601c] bg-black opacity-80 backdrop:filter backdrop-blur-lg w-10 h-14 rounded-md -translate-y-1/2  "
          onClick={scrollPrev}
        >
          <MdOutlineNavigateBefore className="text-5xl w-full" />
        </button>
        <button
          className="absolute top-1/2  bottom-1/2 right-1 hidden sm:grid sm:place-items-center  text-[#ff601c] bg-black opacity-80 backdrop:filter backdrop-blur-lg w-10 h-14 rounded-md -translate-y-1/2 "
          onClick={scrollNext}
        >
          <MdOutlineNavigateNext className="text-5xl w-full" />
        </button>
      </div>
    </div>
  );
}
