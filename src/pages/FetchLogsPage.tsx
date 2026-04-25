import { useState, useRef } from "react";
import { RefreshCw, Search } from "lucide-react";
import TerminalLogs from "@/components/TerminalLogs";

interface LogEntry {
  status: string;
  message: string;
  time: string;
}

const FetchLogsPage = () => {
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [filteredLogs, setFilteredLogs] = useState<LogEntry[]>([]);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState("");
  const allLogsRef = useRef<LogEntry[]>([]);

  const fetchLogs = async () => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:5678/webhook/89f95d5c-d080-46d5-a75b-74039944f56b");
      const data = await res.json();
      const newLogs: LogEntry[] = data?.[0]?.logs || data?.logs || [];
      allLogsRef.current = [...allLogsRef.current, ...newLogs];
      setLogs([...allLogsRef.current]);
      applyFilter([...allLogsRef.current], filter);
    } catch {
      const errLog = { status: "ERROR", message: "Failed to connect to webhook", time: new Date().toISOString() };
      allLogsRef.current = [...allLogsRef.current, errLog];
      setLogs([...allLogsRef.current]);
      applyFilter([...allLogsRef.current], filter);
    } finally {
      setLoading(false);
    }
  };

  const applyFilter = (allLogs: LogEntry[], q: string) => {
    if (!q.trim()) {
      setFilteredLogs(allLogs);
    } else {
      const lower = q.toLowerCase();
      setFilteredLogs(allLogs.filter(l =>
        l.message.toLowerCase().includes(lower) ||
        l.status.toLowerCase().includes(lower) ||
        l.time.toLowerCase().includes(lower)
      ));
    }
  };

  const handleFilterChange = (val: string) => {
    setFilter(val);
    applyFilter(logs, val);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-display text-2xl font-bold text-primary text-glow">API Call Logs</h1>
          <p className="text-xs text-muted-foreground mt-1">Check if movies are found in the database</p>
        </div>
        <button
          onClick={fetchLogs}
          disabled={loading}
          className="flex items-center gap-2 px-4 py-2 rounded bg-primary text-primary-foreground text-sm font-semibold hover:opacity-90 transition-opacity disabled:opacity-50"
        >
          <RefreshCw size={14} className={loading ? "animate-spin" : ""} />
          Fetch Logs
        </button>
      </div>

      <div className="relative mb-4">
        <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
        <input
          type="text"
          value={filter}
          onChange={(e) => handleFilterChange(e.target.value)}
          placeholder="Filter logs by status, message, or time..."
          className="w-full pl-9 pr-4 py-2 rounded bg-card border border-border text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
        />
      </div>

      <TerminalLogs logs={filteredLogs} loading={loading} title="api-logs@n8n ~ $" />
    </div>
  );
};

export default FetchLogsPage;
