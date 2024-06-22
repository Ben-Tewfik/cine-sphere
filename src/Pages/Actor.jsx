import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { key, baseURL, baseImgUrl } from "../Context/AppContext";
import { FaEye, FaInternetExplorer } from "react-icons/fa";
import { CiCalendar } from "react-icons/ci";
import { BsGenderAmbiguous } from "react-icons/bs";
import { FaLocationDot } from "react-icons/fa6";
import { GiGraveFlowers } from "react-icons/gi";
import { noImage } from "../../public/Images";
import Loader from "../components/Loader/Loader";
export default function Actor() {
  const [isLoading, setIsLoading] = useState(true);
  const [actor, setActor] = useState({});
  const { id } = useParams();
  const fetchSingleActor = async () => {
    setIsLoading(true);
    const actorURL = `${baseURL}person/${id}${key}&language=en-US`;
    try {
      const { data } = await axios(actorURL);
      console.log(data);
      setActor(data);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchSingleActor();
  }, []);
  const {
    biography,
    birthday,
    deathday,
    gender,
    name,
    place_of_birth: city,
    popularity,
    profile_path,
    homepage,
  } = actor;
  if (isLoading) {
    return <Loader />;
  }
  return (
    <section className="text-white min-h-screen w-[90vw] mx-auto py-10">
      <h1 className="text-4xl font-bold mb-3 md:text-6xl">{name}</h1>
      <div className="mb-8 text-md text-[#F1dac4] flex items-center gap-x-4 md:text-xl">
        <p className="capitalize ">{gender !== 1 ? "actor" : "actress"}</p>
        <span className="bg-[#ff601c] w-1 h-5 rounded-md"></span>
        <p className="flex items-center gap-x-2">
          <FaEye />
          {popularity}
        </p>
      </div>
      <div className="md:flex md:gap-16 mb-8">
        <img
          src={profile_path === null ? noImage : `${baseImgUrl}${profile_path}`}
          alt={`${name} image`}
          className="block md:w-1/5 mx-auto rounded-tl-[20px] rounded-tr-[40px] rounded-br-[60px] rounded-bl-[80px] mb-8 md:mb-0"
        />
        <div className="md:flex-1">
          <h2 className="capitalize font-bold text-[#ff601c] text-2xl mb-8 md:text-4xl">
            personal details
          </h2>
          <h3 className="flex items-center gap-4 text-xl mb-6">
            <CiCalendar className="text-[#ff601c] text-2xl" /> {birthday}
          </h3>
          {deathday && (
            <h3 className="flex items-center gap-4 text-xl mb-6">
              <GiGraveFlowers className="text-[#ff601c] text-2xl" /> {deathday}
            </h3>
          )}
          <h3 className="flex items-center gap-4 text-xl mb-6">
            <BsGenderAmbiguous className="text-[#ff601c] text-2xl" />{" "}
            {gender !== 1 ? "Male" : "Female"}
          </h3>
          <h3 className="flex items-center gap-4 text-xl mb-6">
            <FaLocationDot className="text-[#ff601c] text-2xl" /> {city}
          </h3>
          {homepage && (
            <h3 className="flex items-center gap-4 text-xl mb-6">
              <FaInternetExplorer className="text-[#ff601c] text-2xl" />
              <a
                href={homepage}
                target="_blank"
                className="hover:text-[#ff601c] transition-colors ease-in-out duration-300"
              >
                {name}&apos;s Website
              </a>
            </h3>
          )}
        </div>
      </div>
      <div>
        <h3 className="text-[#ff601c] text-2xl capitalize mb-4 font-bold">
          biography
        </h3>
        <p className="text-lg leading-8 border-[#F1dac4] border-[1px] p-4 rounded-md">
          {biography}
        </p>
      </div>
    </section>
  );
}
