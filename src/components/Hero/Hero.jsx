import { useGlobalContext } from "../../Context/AppContext";

export default function Hero() {
  const { video } = useGlobalContext();

  return (
    <div className="h-[70vh] w-full">
      <iframe
        src={`https://www.youtube.com/embed/${video?.key}?controls=0&autoplay=1`}
        className="w-full h-full rounded-lg"
      ></iframe>
    </div>
  );
}
