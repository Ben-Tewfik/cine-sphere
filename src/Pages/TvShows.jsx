import { useGlobalContext } from "../Context/AppContext";
import Loader from "../components/Loader/Loader";
import TvShowCard from "../components/TvShowCard/TvShowCard";

export default function TvShows() {
  const { data, isLoading } = useGlobalContext();
  if (isLoading) {
    return <Loader />;
  }
  return (
    <section className="w-[90vw] mx-auto py-10 grid gap-6 grid-cols-auto-fill">
      {data?.map(item => {
        return <TvShowCard key={item.id} {...item} />;
      })}
    </section>
  );
}
