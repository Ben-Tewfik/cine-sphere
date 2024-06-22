import { Link } from "react-router-dom";
import { noImage } from "../../../public/Images";
import { baseImgUrl } from "../../Context/AppContext";
export default function ActorCard({ id, profile_path, name }) {
  const imageSrc = `${baseImgUrl}${profile_path}`;
  return (
    <Link
      to={`/actors/${id}`}
      title={name}
      className="group relative rounded-md overflow-hidden"
    >
      <img
        src={profile_path === null ? noImage : imageSrc}
        alt={`${name} Image`}
        className={`${
          profile_path === null ? "block h-[100%] object-cover" : "block"
        }`}
      />
      <div className="absolute bottom-0 left-0 w-[100%] bg-[#00000099] py-2 px-4 text-center translate-y-[100%] group-hover:translate-y-0 transition-all duration-300 ease-in-out">
        <h4 className="text-white">{name}</h4>
      </div>
    </Link>
  );
}
