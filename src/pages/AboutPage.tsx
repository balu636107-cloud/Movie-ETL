import { Terminal, Search, Database, Zap } from "lucide-react";

const features = [
  {
    icon: Search,
    title: "Movie Search",
    desc: "Search any movie via n8n webhook connected to the OMDB API. Results displayed in a sleek card grid.",
  },
  {
    icon: Terminal,
    title: "Insert Logs",
    desc: "Every search also fetches insert logs from n8n, displayed in a retro terminal view. Logs persist until you refresh.",
  },
  {
    icon: Database,
    title: "API Call Logs",
    desc: "Dedicated page to fetch and filter API call logs from the movie fetch workflow.",
  },
  {
    icon: Zap,
    title: "n8n Powered",
    desc: "All backend workflows are powered by n8n webhooks — no traditional server needed.",
  },
];

const AboutPage = () => {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
      <div className="text-center mb-10">
        <h1 className="font-display text-3xl font-bold text-primary text-glow mb-2">
          About CINEBOX<span className="text-accent">_</span>
        </h1>
        <p className="text-sm text-muted-foreground max-w-md mx-auto">
          A terminal-themed movie search app powered by n8n webhooks and the OMDB API.
          Built as a project to explore automation workflows.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 gap-4 mb-10">
        {features.map((f) => (
          <div key={f.title} className="bg-card border border-border rounded-lg p-5 border-glow space-y-2">
            <div className="flex items-center gap-2">
              <f.icon size={16} className="text-primary" />
              <h3 className="font-display text-sm font-bold text-foreground">{f.title}</h3>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">{f.desc}</p>
          </div>
        ))}
      </div>

      <div className="bg-card border border-border rounded-lg p-5 border-glow">
        <h2 className="font-display text-sm font-bold text-foreground mb-3">Tech Stack</h2>
        <div className="flex flex-wrap gap-2">
          {["React", "TypeScript", "Tailwind CSS", "n8n", "OMDB API", "Vite"].map((tech) => (
            <span
              key={tech}
              className="text-[10px] uppercase tracking-wider px-2 py-1 rounded bg-primary/10 text-primary border border-primary/20"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
