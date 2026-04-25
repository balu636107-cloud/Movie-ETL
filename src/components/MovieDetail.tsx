import { X } from "lucide-react";

interface Movie {
  Title: string;
  Year: string;
  Poster: string;
  Type: string;
  imdbID: string;
}

interface MovieDetailProps {
  movie: Movie;
  onClose: () => void;
}

const MovieDetail = ({ movie, onClose }: MovieDetailProps) => {
  const hasPoster = movie.Poster && movie.Poster !== "N/A";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/90 backdrop-blur-sm p-4" onClick={onClose}>
      <div
        className="relative bg-card border border-border rounded-lg max-w-lg w-full overflow-hidden border-glow"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-10 p-1.5 rounded bg-background/80 text-foreground hover:text-primary transition-colors"
        >
          <X size={18} />
        </button>

        <div className="flex flex-col sm:flex-row">
          <div className="sm:w-48 shrink-0 bg-secondary">
            {hasPoster ? (
              <img src={movie.Poster} alt={movie.Title} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-64 sm:h-full flex items-center justify-center text-muted-foreground text-xs">
                No Poster
              </div>
            )}
          </div>

          <div className="p-6 space-y-4 flex-1">
            <div>
              <h2 className="font-display text-xl font-bold text-primary text-glow">
                {movie.Title}
              </h2>
              <p className="text-sm text-muted-foreground mt-1">{movie.Year}</p>
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex justify-between py-1 border-b border-border">
                <span className="text-muted-foreground">Type</span>
                <span className="text-foreground uppercase">{movie.Type}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-border">
                <span className="text-muted-foreground">IMDB ID</span>
                <a
                  href={`https://www.imdb.com/title/${movie.imdbID}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-terminal-cyan hover:underline"
                >
                  {movie.imdbID}
                </a>
              </div>
            </div>

            <div className="pt-2">
              <a
                href={`https://www.imdb.com/title/${movie.imdbID}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block text-xs px-4 py-2 rounded bg-primary text-primary-foreground font-semibold hover:opacity-90 transition-opacity"
              >
                View on IMDB →
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;
