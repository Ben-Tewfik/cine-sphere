import { FaTimes } from "react-icons/fa";
import { useGlobalContext } from "../../Context/AppContext";
import { Link } from "react-router-dom";

export default function Sidebar() {
  const { closeSidebar, isOpenSidebar } = useGlobalContext();
  return (
    <section
      className={`${
        isOpenSidebar
          ? "text-white py-8 p-[5vw] fixed z-50 transition-all duration-500 bg-black top-0 left-0 h-full w-full md:hidden"
          : "-translate-x-full h-0"
      }`}
    >
      <button
        onClick={closeSidebar}
        className="block ml-auto text-3xl text-[#F1dac4] hover:text-[#ff601c] transition duration-300 ease-in-out"
      >
        <FaTimes />
      </button>
      <ul>
        <li>
          <Link onClick={closeSidebar} to={"/"}>
            Home
          </Link>
          <Link onClick={closeSidebar} to={"/actors"}>
            Actors
          </Link>
        </li>
      </ul>
    </section>
  );
}
