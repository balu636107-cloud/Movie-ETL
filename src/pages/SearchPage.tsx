import { useState, useRef } from "react";
import { Search } from "lucide-react";
import MovieCard from "@/components/MovieCard";
import MovieDetail from "@/components/MovieDetail";
import TerminalLogs from "@/components/TerminalLogs";

interface Movie {
  Title: string;
  Year: string;
  Poster: string;
  Type: string;
  imdbID: string;
}

interface LogEntry {
  status: string;
  message: string;
  time: string;
}

const SearchPage = () => {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [selected, setSelected] = useState<Movie | null>(null);
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [logsLoading, setLogsLoading] = useState(false);
  const allLogsRef = useRef<LogEntry[]>([]);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    setLogsLoading(true);
    setError("");
    setMovies([]);

    // Fire both requests in parallel
    const searchPromise = fetch("http://localhost:5678/webhook/e5c6a584-627a-4c17-b0b3-47f07ac55b8d", {
      method: "POST",
      headers: { "Content-Type": "text/plain" },
      body: query.trim(),
    });

    const logsPromise = fetch("http://localhost:5678/webhook/d12a772c-eb10-4b10-ab5f-6168fcbf8720", {
      method: "POST",
      headers: { "Content-Type": "text/plain" },
      body: query.trim(),
    });

    try {
      const res = await searchPromise;
      const data = await res.json();
      if (data?.[0]?.Search) {
        setMovies(data[0].Search);
      } else if (data?.Search) {
        setMovies(data.Search);
      } else {
        setError("No movies found.");
      }
    } catch {
      setError("Failed to connect to search webhook.");
    } finally {
      setLoading(false);
    }

    try {
      const res = await logsPromise;
      const data = await res.json();
      const newLogs = data?.[0]?.logs || data?.logs || [];
      allLogsRef.current = [...allLogsRef.current, ...newLogs];
      setLogs([...allLogsRef.current]);
    } catch {
      const errLog = { status: "ERROR", message: "Failed to fetch insert logs", time: new Date().toISOString() };
      allLogsRef.current = [...allLogsRef.current, errLog];
      setLogs([...allLogsRef.current]);
    } finally {
      setLogsLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <div className="text-center mb-8">
        <h1 className="font-display text-3xl font-bold text-primary text-glow mb-2">
          Search Movies
        </h1>
        <p className="text-sm text-muted-foreground">Search & track insert logs in one place</p>
      </div>

      <form onSubmit={handleSearch} className="max-w-xl mx-auto mb-10">
        <div className="flex gap-2">
          <div className="flex-1 relative">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search for a movie..."
              className="w-full pl-10 pr-4 py-2.5 rounded bg-card border border-border text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="px-5 py-2.5 rounded bg-primary text-primary-foreground text-sm font-semibold hover:opacity-90 transition-opacity disabled:opacity-50"
          >
            {loading ? "..." : "Search"}
          </button>
        </div>
      </form>

      {error && (
        <p className="text-center text-terminal-red text-sm mb-6">{error}</p>
      )}

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {movies.map((movie) => (
          <MovieCard
            key={movie.imdbID}
            title={movie.Title}
            year={movie.Year}
            poster={movie.Poster}
            type={movie.Type}
            imdbID={movie.imdbID}
            onClick={() => setSelected(movie)}
          />
        ))}
      </div>

      {logs.length > 0 && (
        <div className="mt-10">
          <TerminalLogs logs={logs} loading={logsLoading} title="insert-logs@n8n ~ $" />
        </div>
      )}

      {selected && <MovieDetail movie={selected} onClose={() => setSelected(null)} />}
    </div>
  );
};

export default SearchPage;
