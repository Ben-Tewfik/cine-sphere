import { Link } from "react-router-dom";
import { tmdb } from "../../../public/Images";
import { BsGithub } from "react-icons/bs";
export default function Footer() {
  return (
    <footer className="text-white capitalize pb-10 w-[90vw] mx-auto flex flex-col gap-4">
      <Link to={"/"} className="font-black text-[#ff601c] text-3xl">
        CineSphere
      </Link>
      <div className="flex flex-col gap-4">
        <div className="flex gap-4 items-center">
          <p>data provided by </p>
          <img src={tmdb} alt="the movie data base logo" className="w-32" />
        </div>
        <h3 className="flex items-center gap-2">
          coded by{" "}
          <span className="text-[#ff601c] font-semibold">benarba tewfik</span>
          <a
            href="https://github.com/Ben-Tewfik"
            target="_blank"
            className="text-xl hover:text-[#ff601c] hover:duration-300 hover:ease-in-out"
          >
            <BsGithub />
          </a>
        </h3>
      </div>
    </footer>
  );
}
