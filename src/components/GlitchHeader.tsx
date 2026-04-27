import { useState, useEffect, useRef } from "react";

interface GlitchHeaderProps {
  onTripleClick: () => void;
}

const GlitchHeader = ({ onTripleClick }: GlitchHeaderProps) => {
  const [isGlitching, setIsGlitching] = useState(false);
  const clickCount = useRef(0);
  const clickTimer = useRef<NodeJS.Timeout | null>(null);

  const handleClick = () => {
    clickCount.current += 1;

    if (clickTimer.current) clearTimeout(clickTimer.current);

    if (clickCount.current >= 3) {
      clickCount.current = 0;
      setIsGlitching(true);
      setTimeout(() => {
        setIsGlitching(false);
        onTripleClick();
      }, 800);
      return;
    }

    clickTimer.current = setTimeout(() => {
      clickCount.current = 0;
    }, 500);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setIsGlitching(true);
      setTimeout(() => setIsGlitching(false), 200);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative py-8 select-none" onClick={handleClick}>
      <div className="text-center">
        <p className="text-xs tracking-[0.5em] uppercase text-muted-foreground mb-4 font-mono">
          [ CLASSIFIED // SIGNAL INTERCEPT ]
        </p>
        <h1
          className={`font-display text-5xl md:text-7xl lg:text-8xl font-black tracking-wider cursor-pointer transition-all ${
            isGlitching ? "animate-glitch animate-glitch-color" : "neon-glow-cyan"
          }`}
          style={{ color: "hsl(var(--primary))" }}
        >
          SYNAPTECH
        </h1>
        <h2
          className={`font-display text-2xl md:text-3xl lg:text-4xl font-bold tracking-[0.3em] mt-2 ${
            isGlitching ? "animate-glitch-skew" : ""
          }`}
          style={{ color: "hsl(var(--neon-green))" }}
        >
          INTELLIGENCE SYSTEMS
        </h2>
        <div className="mt-6 flex items-center justify-center gap-3">
          <span className="w-16 h-px bg-primary/40" />
          <span className="text-xs font-mono text-muted-foreground tracking-widest">
            ADVANCED AI • RESEARCH • AUTOMATION • INTELLIGENCE
          </span>
          <span className="w-16 h-px bg-primary/40" />
        </div>
      </div>
    </div>
  );
};

export default GlitchHeader;
