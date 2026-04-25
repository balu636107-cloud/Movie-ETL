import { Link, useLocation } from "react-router-dom";
import { Search, Database, Info, User } from "lucide-react";

const navItems = [
  { to: "/", label: "Search", icon: Search },
  { to: "/api-logs", label: "API Logs", icon: Database },
  { to: "/about", label: "About", icon: Info },
  { to: "/contact", label: "Contact", icon: User },
];

const Navbar = () => {
  const location = useLocation();

  return (
    <nav className="border-b border-border bg-card/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-14">
          <Link to="/" className="font-display text-lg font-bold text-primary text-glow tracking-wider">
            CINEBOX<span className="text-accent">_</span>
          </Link>
          <div className="flex items-center gap-1">
            {navItems.map(({ to, label, icon: Icon }) => {
              const active = location.pathname === to;
              return (
                <Link
                  key={to}
                  to={to}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded text-sm transition-all ${
                    active
                      ? "bg-primary/10 text-primary border border-primary/30 border-glow"
                      : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                  }`}
                >
                  <Icon size={14} />
                  <span className="hidden sm:inline">{label}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
