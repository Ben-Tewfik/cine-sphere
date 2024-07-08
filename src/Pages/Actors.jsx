import { useGlobalContext } from "../Context/AppContext";
import ActorCard from "../components/ActorCard/ActorCard";
import Loader from "../components/Loader/Loader";
import Pagination from "../components/Pagination/Pagination";
export default function Actors() {
  const { actors, isLoading, closeSubMenu } = useGlobalContext();
  function hideSubMenu() {
    closeSubMenu();
  }
  if (isLoading) {
    return <Loader />;
  }
  return (
    <section onMouseOver={hideSubMenu}>
      <div className="w-[90vw] mx-auto py-10 grid gap-6 grid-cols-auto-fill">
        {actors?.map(actor => {
          return <ActorCard key={actor.id} {...actor} />;
        })}
      </div>
      <Pagination />
    </section>
  );
}
