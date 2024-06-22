import { useEffect, useRef } from "react";
import { useGlobalContext } from "../../Context/AppContext";
import { Link } from "react-router-dom";

export default function SubMenu() {
  const { location, page, isSubMenuOpen, setMovieQuery } = useGlobalContext();
  const subMenuRef = useRef(null);
  function handleSubMenuLinks(name) {
    if (name === "Top Rated") {
      setMovieQuery("movie/top_rated");
    } else if (name === "Popular") {
      setMovieQuery("movie/popular");
    } else if (name === "Now Playing") {
      setMovieQuery("movie/now_playing");
    } else if (name === "Upcoming") {
      setMovieQuery("movie/upcoming");
    } else {
      setMovieQuery("trending/movie/day");
    }
  }
  useEffect(() => {
    const { center, bottom } = location;
    subMenuRef.current.style.left = `${center}px`;
    subMenuRef.current.style.top = `${bottom}px`;
  }, [location]);
  return (
    <aside
      ref={subMenuRef}
      className={`${isSubMenuOpen ? "grid" : "hidden"} ${
        page?.links?.length > 5 ? "grid-cols-3" : "grid-cols-1"
      } gap-6  z-10 fixed -translate-x-1/2 bg-black py-6 px-8 rounded-md text-white after:w-0 after:h-0 after:absolute after:-top-2 after:left-1/2 after:-translate-x-1/2 after:border-r-8 after:border-solid after:border-r-transparent after:border-b-8 after:border-b-black after:border-l-8 after:border-l-transparent`}
      style={{
        left: `${location.center}px`,
        transition: "all 0.3s ease-in-out",
      }}
    >
      {page?.links?.map(link => {
        const { id, name } = link;
        return (
          <Link
            to={"/movies"}
            key={id}
            onClick={() => handleSubMenuLinks(name)}
            className="block hover:text-[#ff601c]"
          >
            {name}
          </Link>
        );
      })}
    </aside>
  );
}
