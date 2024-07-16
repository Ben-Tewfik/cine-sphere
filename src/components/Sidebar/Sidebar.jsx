import { FaTimes } from "react-icons/fa";
import { useGlobalContext } from "../../Context/AppContext";
import { Link } from "react-router-dom";
import { subMenu } from "../../Utils/subMenu";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Sidebar() {
  const { closeSidebar, isOpenSidebar, setGenreId, setMovieQuery } =
    useGlobalContext();
  const [isActive, setIsActive] = useState("");
  function handleSubMenuLinks(e, name, movieLink, id) {
    setGenreId(id);
    if (name === e.target.textContent) {
      setMovieQuery(movieLink);
    }
    closeSidebar();
  }
  return (
    <AnimatePresence>
      {isOpenSidebar && (
        <motion.section
          initial={{ x: "-100%" }}
          animate={{ x: 0 }}
          exit={{ x: "-100%", transition: { delay: 0.7, duration: 0.3 } }}
          transition={{ duration: 0.3 }}
          className="text-white py-8 p-[5vw] fixed z-50 transition-all duration-500 bg-black top-0 left-0 h-full w-full md:hidden"
        >
          <button
            onClick={closeSidebar}
            className="block ml-auto text-3xl text-[#F1dac4] hover:text-[#ff601c] transition duration-300 ease-in-out"
          >
            <FaTimes />
          </button>
          <ul className="capitalize flex flex-col gap-2">
            <motion.li
              whileHover={{ fontSize: "30px", color: "#ff601c" }}
              style={{ fontSize: "25px" }}
            >
              <Link onClick={closeSidebar} to={"/"}>
                Home
              </Link>
            </motion.li>
            {subMenu.map(list => {
              const { page, links } = list;
              return (
                <motion.li
                  whileHover={{ fontSize: "30px", color: "#ff601c" }}
                  style={{ fontSize: "25px" }}
                  onClick={() =>
                    isActive !== page ? setIsActive(page) : setIsActive("")
                  }
                  key={page}
                  className="cursor-pointer"
                >
                  {page}
                  <div
                    className={`${
                      links.length > 6
                        ? "grid grid-cols-2 gap-1"
                        : "grid grid-cols-1"
                    } `}
                  >
                    {links.map(link => {
                      const { name, id, link: movieLink } = link;
                      return (
                        <AnimatePresence key={id}>
                          {isActive === page && (
                            <motion.li
                              whileHover={{
                                color: "#ff601c",
                                marginLeft: "8px",
                              }}
                              style={{ fontSize: "22px", color: "white" }}
                            >
                              <Link
                                to={`/${page}`}
                                onClick={e =>
                                  handleSubMenuLinks(e, name, movieLink, id)
                                }
                              >
                                {name}
                              </Link>
                            </motion.li>
                          )}
                        </AnimatePresence>
                      );
                    })}
                  </div>
                </motion.li>
              );
            })}
            <motion.li
              whileHover={{ fontSize: "30px", color: "#ff601c" }}
              style={{ fontSize: "25px" }}
            >
              <Link onClick={closeSidebar} to={"/actors"}>
                Actors
              </Link>
            </motion.li>
          </ul>
        </motion.section>
      )}
    </AnimatePresence>
  );
}
