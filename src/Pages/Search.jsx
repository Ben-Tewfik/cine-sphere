import { useGlobalContext } from "../Context/AppContext";
import ActorCard from "../components/ActorCard/ActorCard";
import Card from "../components/Card/Card";
import Loader from "../components/Loader/Loader";
import TvShowCard from "../components/TvShowCard/TvShowCard";

export default function Search() {
  const { searchResults, isLoading } = useGlobalContext();
  if (isLoading) {
    return <Loader />;
  }
  return (
    <section className="w-[90vw] mx-auto py-10 grid gap-6 grid-cols-auto-fill">
      {searchResults?.map(item => {
        if (item.media_type === "person") {
          return <ActorCard key={item.id} {...item} />;
        }
        if (item.media_type === "tv") {
          return <TvShowCard key={item.id} {...item} />;
        }
        return <Card key={item.id} {...item} />;
      })}
    </section>
  );
}
