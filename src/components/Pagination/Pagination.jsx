import { FaAngleDoubleLeft, FaAngleDoubleRight } from "react-icons/fa";
import { useGlobalContext } from "../../Context/AppContext";
import paginationRange from "../../Utils/paginationRange";

export default function Pagination() {
  const { changePage, pages } = useGlobalContext();
  const totalActorsPages = 500;
  const paginationRangeArr = paginationRange(totalActorsPages, pages);
  return (
    <div className="text-white py-4 flex justify-center gap-2 items-center w-[50vw] mx-auto">
      <button
        className={`${
          pages === 1 && "hidden"
        } border-2 rounded-md hover:bg-[#ff601c] hover:transition-all hover:duration-300 border-[#ff601c] py-1 px-2 `}
        onClick={() => changePage("first")}
      >
        <FaAngleDoubleLeft />
      </button>
      <button
        className={`${
          pages === 1 && "hidden"
        } border-2 rounded-md hover:bg-[#ff601c] hover:transition-all hover:duration-300 border-[#ff601c] py-1 px-2`}
        onClick={() => changePage("prev")}
      >
        Prev
      </button>
      {paginationRangeArr.map(page => {
        return (
          <button
            key={page}
            className={`${
              page === pages && "bg-[#ff601c]"
            } border-2 rounded-md hover:bg-[#ff601c] hover:transition-all hover:duration-300 border-[#ff601c] py-1 px-2`}
            onClick={() => changePage(page)}
          >
            {page}
          </button>
        );
      })}
      <button
        onClick={() => changePage("next")}
        className={`${
          pages === totalActorsPages && "hidden"
        } border-2 rounded-md hover:bg-[#ff601c] hover:transition-all hover:duration-300 border-[#ff601c] py-1 px-2`}
      >
        Next
      </button>
      <button
        onClick={() => changePage("last")}
        className={`${
          pages === totalActorsPages && "hidden"
        } border-2 rounded-md hover:bg-[#ff601c] hover:transition-all hover:duration-300 border-[#ff601c] py-1 px-2`}
      >
        <FaAngleDoubleRight />
      </button>
    </div>
  );
}
