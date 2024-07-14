import { FaTimes } from "react-icons/fa";
import { useGlobalContext } from "../../Context/AppContext";
import { Link } from "react-router-dom";
import { subMenu } from "../../Utils/subMenu";
import { useState } from "react";

export default function Sidebar() {
  const { closeSidebar, isOpenSidebar } = useGlobalContext();
  const [isActive, setIsActive] = useState("");
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
      <ul className="capitalize">
        <li>
          <Link onClick={closeSidebar} to={"/"}>
            Home
          </Link>
        </li>
        {subMenu.map(list => {
          const { page, links } = list;
          return (
            <li
              onClick={() =>
                isActive !== page ? setIsActive(page) : setIsActive("")
              }
              key={page}
            >
              {page}
              {links.map(link => {
                return (
                  <li
                    className={`${isActive === page ? "block" : "hidden"}`}
                    key={link.id}
                  >
                    {link.name}
                  </li>
                );
              })}
            </li>
          );
        })}
        <li>
          <Link onClick={closeSidebar} to={"/actors"}>
            Actors
          </Link>
        </li>
      </ul>
    </section>
  );
}
