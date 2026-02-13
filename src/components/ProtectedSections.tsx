import { Lock, Database, Bot, Code, FileDown } from "lucide-react";

const sections = [
  {
    title: "Intelligence Archive",
    description: "Classified research documents and signal analysis reports.",
    icon: Database,
    access: "OPERATOR",
    color: "--neon-green",
  },
  {
    title: "AI Automations Store",
    description: "Deploy autonomous intelligence gathering systems.",
    icon: Bot,
    access: "OPERATOR",
    color: "--neon-cyan",
  },
  {
    title: "Pen Testing Scripts",
    description: "Offensive security toolkits for authorized operations.",
    icon: Code,
    access: "BLACK DIVISION",
    color: "--neon-red",
  },
  {
    title: "Encrypted Artifacts",
    description: "Downloadable classified packages with verified signatures.",
    icon: FileDown,
    access: "BLACK DIVISION",
    color: "--neon-red",
  },
];

const ProtectedSections = () => {
  return (
    <section>
      <div className="mb-8">
        <h3 className="font-display text-sm tracking-[0.4em] uppercase text-muted-foreground mb-1">
          // RESTRICTED ACCESS
        </h3>
        <h2 className="font-display text-2xl md:text-3xl font-bold neon-glow-cyan" style={{ color: "hsl(var(--primary))" }}>
          CLASSIFIED SECTIONS
        </h2>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {sections.map((section) => {
          const Icon = section.icon;
          return (
            <div
              key={section.title}
              className="relative border p-5 group cursor-pointer transition-all hover:border-opacity-50 overflow-hidden"
              style={{
                borderColor: `hsl(var(${section.color}) / 0.15)`,
                background: "hsl(var(--dark-surface))",
              }}
            >
              {/* Lock overlay */}
              <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                <div className="text-center">
                  <Lock className="w-6 h-6 mx-auto mb-2" style={{ color: `hsl(var(${section.color}))` }} />
                  <p className="text-xs font-display tracking-widest" style={{ color: `hsl(var(${section.color}))` }}>
                    {section.access} REQUIRED
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Icon className="w-5 h-5 mt-0.5 flex-shrink-0" style={{ color: `hsl(var(${section.color}) / 0.6)` }} />
                <div>
                  <h4 className="font-display text-sm font-bold tracking-wider mb-1">{section.title}</h4>
                  <p className="text-xs text-muted-foreground">{section.description}</p>
                  <div className="mt-3 flex items-center gap-2">
                    <Lock className="w-3 h-3 text-muted-foreground" />
                    <span className="text-xs font-mono text-muted-foreground">
                      CLEARANCE: {section.access}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default ProtectedSections;
