import { useEffect, useRef } from "react";

interface LogEntry {
  status: string;
  message: string;
  time: string;
}

interface TerminalLogsProps {
  logs: LogEntry[];
  loading: boolean;
  title: string;
}

const TerminalLogs = ({ logs, loading, title }: TerminalLogsProps) => {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [logs]);

  return (
    <div className="bg-background border border-border rounded-lg overflow-hidden border-glow">
      {/* Terminal header - sticky */}
      <div className="sticky top-0 z-20 flex items-center gap-2 px-4 py-2 bg-card border-b border-border">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-terminal-red/80" />
          <div className="w-3 h-3 rounded-full bg-terminal-amber/80" />
          <div className="w-3 h-3 rounded-full bg-terminal-green/80" />
        </div>
        <span className="text-xs text-muted-foreground ml-2">{title}</span>
      </div>

      {/* Terminal body */}
      <div className="p-4 h-[500px] overflow-y-auto terminal-scrollbar relative">
        <div className="absolute inset-0 scanline" />
        <div className="relative z-10 space-y-1">
          <p className="text-terminal-green text-xs mb-3">
            $ connecting to n8n webhook...
          </p>

          {loading && (
            <p className="text-terminal-amber text-xs animate-pulse">
              &gt; fetching logs...
            </p>
          )}

          {logs.map((log, i) => (
            <div key={i} className="flex gap-2 text-xs leading-relaxed">
              <span className="text-muted-foreground shrink-0">[{log.time}]</span>
              <span
                className={
                  log.status === "SUCCESS"
                    ? "text-terminal-green"
                    : log.status === "ERROR"
                    ? "text-terminal-red"
                    : "text-terminal-amber"
                }
              >
                [{log.status}]
              </span>
              <span className="text-foreground">{log.message}</span>
            </div>
          ))}

          {!loading && logs.length === 0 && (
            <p className="text-muted-foreground text-xs">
              &gt; no logs found. waiting for data...
            </p>
          )}

          <div ref={bottomRef} />
          {!loading && logs.length > 0 && (
            <p className="text-terminal-green text-xs mt-2">
              $ {logs.length} entries loaded. <span className="animate-pulse">█</span>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default TerminalLogs;
