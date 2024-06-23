import { useGlobalContext } from "../Context/AppContext";
import Card from "../components/Card/Card";
import Loader from "../components/Loader/Loader";

export default function Movies() {
  const { movies, isLoading } = useGlobalContext();
  if (isLoading) {
    return <Loader />;
  }
  return (
    <section className="w-[90vw] mx-auto py-10 grid gap-6 grid-cols-auto-fill">
      {movies?.map(item => {
        return <Card key={item.id} {...item} />;
      })}
    </section>
  );
}
