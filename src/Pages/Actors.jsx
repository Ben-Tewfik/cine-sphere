import { useGlobalContext } from "../Context/AppContext";
import ActorCard from "../components/ActorCard/ActorCard";
import Loader from "../components/Loader/Loader";
export default function Actors() {
  const { actors, isLoading } = useGlobalContext();
  if (isLoading) {
    return <Loader />;
  }
  return (
    <section className="w-[90vw] mx-auto py-10 grid gap-6 grid-cols-auto-fill">
      {actors?.map(actor => {
        return <ActorCard key={actor.id} {...actor} />;
      })}
    </section>
  );
}
