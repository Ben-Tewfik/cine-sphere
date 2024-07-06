import { Link } from "react-router-dom";
import { FaBars } from "react-icons/fa6";
import { FaSearch } from "react-icons/fa";
import { useGlobalContext } from "../../Context/AppContext";
export default function Navbar() {
  const {
    openSubMenu,
    closeSubMenu,
    searchWord,
    setSearchWord,
    hideSearchResults,
    setShowSearchList,
    fetchSearchMulti,
  } = useGlobalContext();
  function displaySubMenu(e) {
    const text = e.target.textContent;
    const position = e.target.getBoundingClientRect();
    const center = (position.left + position.right) / 2;
    const bottom = position.bottom;
    openSubMenu(text, { center, bottom });
  }
  function hideSubMenu(e) {
    if (e.target.textContent === "Home" || e.target.textContent === "Actors") {
      closeSubMenu();
    }
  }
  return (
    <nav
      onMouseOver={hideSubMenu}
      className="sticky top-0 z-10 bg-[#141414] backdrop-filter backdrop-blur-lg opacity-80"
    >
      {/* nav center */}
      <div className="w-[90vw] py-6 mx-auto flex justify-between">
        {/* logo */}
        <Link
          to={"/"}
          onClick={hideSearchResults}
          className="font-black text-[#ff601c] text-3xl"
        >
          CineSphere
        </Link>
        <button className="text-3xl text-[#F1dac4] hover:text-[#ff601c] transition duration-300 ease-in-out md:hidden">
          <FaBars />
        </button>
        {/* other links */}
        <ul className="hidden md:flex grow items-center justify-center gap-4 text-xl text-[#F1dac4]">
          <li className="hover:text-[#ff601c] hover:transition-colors hover:duration-300">
            <Link to={"/"}>Home</Link>
          </li>
          <li
            onMouseOver={displaySubMenu}
            className="hover:text-[#ff601c] hover:transition-colors hover:duration-300 h-full flex items-center cursor-default capitalize"
          >
            genres
          </li>
          <li
            onMouseOver={displaySubMenu}
            className="hover:text-[#ff601c] hover:transition-colors hover:duration-300 h-full flex items-center cursor-default capitalize"
          >
            movies
          </li>
          <li
            onMouseOver={displaySubMenu}
            className="hover:text-[#ff601c] hover:transition-colors hover:duration-300 h-full flex items-center cursor-default capitalize"
          >
            tv-shows
          </li>
          <li className="hover:text-[#ff601c] hover:transition-colors hover:duration-300 ">
            <Link to={"/actors"}>Actors</Link>
          </li>
        </ul>
        <form
          className="hidden md:block relative self-center"
          onSubmit={e => {
            e.preventDefault();
            fetchSearchMulti();
          }}
        >
          <input
            type="search"
            value={searchWord}
            onChange={e => setSearchWord(e.target.value)}
            onFocus={() => setShowSearchList(true)}
            className="py-2 pl-2 pr-10 rounded-md focus:outline-none "
            placeholder="Search..."
          />
          <button
            type="submit"
            className="absolute top-[50%] -translate-y-1/2 right-3"
          >
            <FaSearch />
          </button>
        </form>
      </div>
    </nav>
  );
}
