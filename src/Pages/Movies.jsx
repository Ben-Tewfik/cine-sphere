import { useGlobalContext } from "../Context/AppContext";
import Card from "../components/Card/Card";
import Loader from "../components/Loader/Loader";

export default function Movies() {
  const { data, isLoading, closeSubMenu } = useGlobalContext();
  function hideSubMenu() {
    closeSubMenu();
  }
  if (isLoading) {
    return <Loader />;
  }
  return (
    <section
      onMouseOver={hideSubMenu}
      className="w-[90vw] mx-auto py-10 grid gap-6 grid-cols-auto-fill"
    >
      {data?.map(item => {
        return <Card key={item.id} {...item} />;
      })}
    </section>
  );
}
