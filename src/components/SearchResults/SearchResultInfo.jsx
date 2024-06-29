import { Link } from "react-router-dom";
import { noImage } from "../../../public/Images";
import { baseImgUrl } from "../../Context/AppContext";
export default function SearchResultInfo({
  name,
  poster_path,
  profile_path,
  media_type,
  title,
  first_air_date,
  release_date,
  id,
  setShowSearchList,
  setMiniSearch,
  setSearchWord,
}) {
  const movieYear = release_date?.slice(0, 4);
  const tvYear = first_air_date?.slice(0, 4);
  let path;
  let searchTitle;
  let year;
  let linkPath;
  if (media_type === "person") {
    path = profile_path;
    searchTitle = name;
    linkPath = "actors";
    year = null;
  } else if (media_type === "movie") {
    path = poster_path;
    searchTitle = title;
    year = movieYear;
    linkPath = "movies";
  } else if (media_type === "tv") {
    path = poster_path;
    searchTitle = name;
    year = tvYear;
    linkPath = "tv-shows";
  }
  return (
    <Link
      to={`/${linkPath}/${id}`}
      onClick={() => {
        setShowSearchList(false);
        setMiniSearch("");
        setSearchWord("");
      }}
      className="p-2 flex gap-4 items-center border-b-2 border-gray-200 hover:bg-gray-200 hover:transition-colors hover:duration-300 hover:ease-in-out"
    >
      <img
        src={`${path !== null ? `${baseImgUrl}${path}` : noImage} `}
        alt={`${name} image`}
        className="block w-12 h-full rounded-md"
      />
      <div>
        <h3>{searchTitle}</h3>
        <div className="flex items-center gap-4">
          <h4 className="capitalize">{media_type}</h4>
          <span
            className={`${
              media_type === "person"
                ? "hidden"
                : "block bg-[#ff601c] w-1 h-1 rounded-md"
            }`}
          ></span>
          <h4>{year}</h4>
        </div>
      </div>
    </Link>
  );
}
