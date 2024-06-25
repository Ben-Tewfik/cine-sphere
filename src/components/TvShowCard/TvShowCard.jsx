import { Link } from "react-router-dom";
import { noImage } from "../../../public/Images";

export default function TvShowCard({ poster_path, id, name }) {
  return (
    <Link
      to={`/tv-shows/${id}`}
      title={name}
      className="group relative rounded-md overflow-hidden"
    >
      <img
        src={
          poster_path === null
            ? noImage
            : `https://image.tmdb.org/t/p/w500${poster_path}`
        }
        alt={`${name} Poster`}
        className={`${
          poster_path === null ? "block h-[100%] object-cover" : "block"
        }`}
      />
      <div className="absolute bottom-0 left-0 w-[100%] bg-[#00000099] py-2 px-4 text-center translate-y-[100%] group-hover:translate-y-0 transition-all duration-300 ease-in-out">
        <h4 className="text-white">{name}</h4>
      </div>
    </Link>
  );
}
