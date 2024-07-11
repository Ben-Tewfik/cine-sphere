import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="text-white w-[90vw] mx-auto">
      <Link to={"/"} className="font-black text-[#ff601c] text-3xl">
        CineSphere
      </Link>
    </footer>
  );
}
