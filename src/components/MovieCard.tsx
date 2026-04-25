interface MovieCardProps {
  title: string;
  year: string;
  poster: string;
  type: string;
  imdbID: string;
  onClick: () => void;
}

const MovieCard = ({ title, year, poster, type, onClick }: MovieCardProps) => {
  const hasPoster = poster && poster !== "N/A";

  return (
    <button
      onClick={onClick}
      className="group relative bg-card border border-border rounded-lg overflow-hidden text-left transition-all hover:border-primary/50 hover:border-glow focus:outline-none focus:ring-1 focus:ring-primary"
    >
      <div className="aspect-[2/3] bg-secondary overflow-hidden">
        {hasPoster ? (
          <img
            src={poster}
            alt={title}
            className="w-full h-full object-cover transition-transform group-hover:scale-105"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-muted-foreground text-xs">
            No Poster
          </div>
        )}
      </div>
      <div className="p-3 space-y-1">
        <h3 className="text-sm font-display font-semibold text-foreground truncate group-hover:text-primary transition-colors">
          {title}
        </h3>
        <div className="flex items-center justify-between">
          <span className="text-xs text-muted-foreground">{year}</span>
          <span className="text-[10px] uppercase tracking-wider px-1.5 py-0.5 rounded bg-primary/10 text-primary border border-primary/20">
            {type}
          </span>
        </div>
      </div>
    </button>
  );
};

export default MovieCard;
