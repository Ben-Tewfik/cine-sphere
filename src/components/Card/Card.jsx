export default function Card({ poster_path, original_title, title }) {
  return (
    <article
      title={title}
      className="group relative rounded-md overflow-hidden"
    >
      <img
        src={`https://image.tmdb.org/t/p/w500${poster_path}`}
        alt={`${title} Poster`}
        className="bloc"
      />
      <div className="absolute bottom-0 left-0 w-[100%] bg-[#00000099] py-2 px-4 text-center translate-y-[100%] group-hover:translate-y-0 transition-all duration-300 ease-in-out">
        <h4 className="text-white">{original_title}</h4>
      </div>
    </article>
  );
}
