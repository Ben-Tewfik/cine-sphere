import { Link } from "react-router-dom";
import { useGlobalContext } from "../../Context/AppContext";
import SearchResultInfo from "./SearchResultInfo";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";

export default function SearchResults() {
  const {
    showSearchList,
    setShowSearchList,
    hideSearchResults,
    setSearchWord,
    setMiniSearch,
    miniSearch,
    fetchSearchMulti,
  } = useGlobalContext();
  function handleClick() {
    hideSearchResults();
    fetchSearchMulti();
    setSearchWord("");
  }
  return (
    <section
      className={`${
        showSearchList ? "block" : "hidden"
      } fixed w-[400px] bg-white right-[68px] top-[76px] z-50 rounded-md`}
    >
      {miniSearch &&
        miniSearch
          ?.sort((a, b) => b.popularity - a.popularity)
          ?.slice(0, 5)
          ?.map(result => {
            return (
              <SearchResultInfo
                key={result.id}
                {...result}
                setShowSearchList={setShowSearchList}
                setMiniSearch={setMiniSearch}
                setSearchWord={setSearchWord}
              />
            );
          })}
      {miniSearch?.length > 1 && (
        <Link
          to={"/search"}
          onClick={handleClick}
          className="capitalize p-4 bg-[#ff601c] rounded-br-md rounded-bl-md flex text-white font-bold items-center justify-center"
        >
          view all results
          <MdOutlineKeyboardArrowRight className="text-2xl" />
        </Link>
      )}
    </section>
  );
}
