import { useState } from "react";
import { X, Terminal } from "lucide-react";

interface EasterEggModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CORRECT_PHRASE = "black division";

const EasterEggModal = ({ isOpen, onClose }: EasterEggModalProps) => {
  const [input, setInput] = useState("");
  const [status, setStatus] = useState<"idle" | "success" | "error" | "terminal">("idle");
  const [terminalLines, setTerminalLines] = useState<string[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.toLowerCase().trim() === CORRECT_PHRASE) {
      setStatus("success");
      // Terminal reveal animation
      const lines = [
        "> LYRIC AUTHORIZATION ACCEPTED",
        "> VERIFYING CLEARANCE...",
        "> ACCESS LEVEL: BLACK DIVISION",
        "> DECRYPTING CLASSIFIED SIGNALS...",
        "> ██████████████████████ 100%",
        "> ARTIFACT UNLOCKED: [BORDER_PROTOCOL.enc]",
        "> AUTO-PLAY INITIATED...",
        "> WELCOME, OPERATOR.",
      ];
      lines.forEach((line, i) => {
        setTimeout(() => {
          setTerminalLines((prev) => [...prev, line]);
          if (i === lines.length - 1) {
            setTimeout(() => setStatus("terminal"), 500);
          }
        }, i * 400);
      });
    } else {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 1500);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
      <div
        className="relative w-full max-w-lg mx-4 border scanline"
        style={{
          background: "hsl(var(--dark-surface))",
          borderColor: status === "error" ? "hsl(var(--neon-red) / 0.5)" : "hsl(var(--neon-cyan) / 0.3)",
          boxShadow: status === "error"
            ? "0 0 30px hsl(var(--neon-red) / 0.2)"
            : "0 0 30px hsl(var(--neon-cyan) / 0.1)",
        }}
      >
        <div className="relative z-10 p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <Terminal className="w-4 h-4" style={{ color: "hsl(var(--neon-cyan))" }} />
              <span className="font-display text-xs tracking-widest uppercase" style={{ color: "hsl(var(--neon-cyan))" }}>
                LYRIC AUTHORIZATION
              </span>
            </div>
            <button onClick={onClose} className="text-muted-foreground hover:text-foreground transition-colors">
              <X className="w-4 h-4" />
            </button>
          </div>

          {status !== "success" && status !== "terminal" ? (
            <>
              <p className="text-sm text-muted-foreground font-mono mb-4">
                Enter the authorization phrase to access classified content.
              </p>
              <form onSubmit={handleSubmit}>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-primary font-mono text-sm">{">"}</span>
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    className="w-full pl-8 pr-4 py-3 font-mono text-sm border bg-transparent focus:outline-none"
                    style={{
                      borderColor: status === "error" ? "hsl(var(--neon-red) / 0.5)" : "hsl(var(--border))",
                      color: "hsl(var(--foreground))",
                    }}
                    placeholder="enter phrase..."
                    autoFocus
                  />
                </div>
                {status === "error" && (
                  <p className="text-xs font-mono mt-2 neon-glow-red" style={{ color: "hsl(var(--neon-red))" }}>
                    ACCESS DENIED — INVALID AUTHORIZATION
                  </p>
                )}
                <button
                  type="submit"
                  className="mt-4 w-full py-2.5 border font-display text-xs tracking-widest uppercase transition-all hover:bg-primary/10"
                  style={{
                    borderColor: "hsl(var(--primary) / 0.5)",
                    color: "hsl(var(--primary))",
                  }}
                >
                  AUTHORIZE
                </button>
              </form>
            </>
          ) : (
            <div className="font-mono text-sm space-y-1">
              {terminalLines.map((line, i) => (
                <p
                  key={i}
                  className="animate-fade-in"
                  style={{
                    color: line.includes("ACCEPTED") || line.includes("WELCOME")
                      ? "hsl(var(--neon-green))"
                      : line.includes("100%")
                      ? "hsl(var(--neon-cyan))"
                      : "hsl(var(--muted-foreground))",
                  }}
                >
                  {line}
                </p>
              ))}
              {status === "terminal" && (
                <div className="mt-4 pt-4 border-t" style={{ borderColor: "hsl(var(--border))" }}>
                  <button
                    onClick={onClose}
                    className="px-4 py-2 border font-display text-xs tracking-widest uppercase transition-all hover:bg-secondary/10"
                    style={{
                      borderColor: "hsl(var(--neon-green) / 0.5)",
                      color: "hsl(var(--neon-green))",
                    }}
                  >
                    PROCEED TO OPERATIONS
                  </button>
                </div>
              )}
              <span className="inline-block w-2 h-4 animate-terminal-blink" style={{ background: "hsl(var(--neon-green))" }} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EasterEggModal;
