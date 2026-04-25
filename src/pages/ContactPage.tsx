import { User, Phone, Mail, GraduationCap, Github, Code } from "lucide-react";

const ContactPage = () => {
  return (
    <div className="max-w-lg mx-auto px-4 sm:px-6 py-8">
      <div className="text-center mb-8">
        <h1 className="font-display text-2xl font-bold text-primary text-glow">Developer</h1>
        <p className="text-xs text-muted-foreground mt-1">About the creator</p>
      </div>

      <div className="bg-card border border-border rounded-lg p-6 border-glow space-y-5">
        <div className="flex items-center gap-4 pb-4 border-b border-border">
          <div className="w-14 h-14 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center">
            <User size={24} className="text-primary" />
          </div>
          <div>
            <h2 className="font-display text-lg font-bold text-foreground">Balakrishna S</h2>
            <span className="text-xs text-muted-foreground flex items-center gap-1">
              <GraduationCap size={12} /> Student
            </span>
          </div>
        </div>

        <div className="space-y-3 text-sm">
          <a href="tel:7022023042" className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors">
            <Phone size={16} />
            <span>7022023042</span>
          </a>
          <a href="mailto:balu636107@gmail.com" className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors">
            <Mail size={16} />
            <span>balu636107@gmail.com</span>
          </a>
        </div>

        <div className="pt-4 border-t border-border">
          <p className="text-xs text-muted-foreground leading-relaxed">
            Built with <span className="text-terminal-red">♥</span> using React, Tailwind CSS & n8n webhooks.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
