import { useState, useEffect, useRef } from "react";
import { Play, Pause, Volume2, Eye, SkipForward, SkipBack } from "lucide-react";

interface Track {
  id: number;
  title: string;
  artist: string;
  duration: string;
  views: number;
  featured?: boolean;
}

const tracks: Track[] = [
  { id: 1, title: "Bitch at the Border", artist: "SynapTech", duration: "4:32", views: 847293, featured: true },
  { id: 2, title: "Signal Decay", artist: "SynapTech", duration: "3:18", views: 234102 },
  { id: 3, title: "Zero-Day Anthem", artist: "SynapTech", duration: "5:01", views: 189456 },
  { id: 4, title: "Encrypted Transmission", artist: "SynapTech", duration: "3:47", views: 156789 },
  { id: 5, title: "Ghost Protocol", artist: "SynapTech", duration: "4:15", views: 98234 },
];

const TrackPlayer = () => {
  const [playing, setPlaying] = useState<number | null>(null);
  const [viewCounts, setViewCounts] = useState<Record<number, number>>(
    Object.fromEntries(tracks.map((t) => [t.id, t.views]))
  );
  const [progress, setProgress] = useState(0);
  const progressInterval = useRef<NodeJS.Timeout | null>(null);

  // Rising view counter
  useEffect(() => {
    const interval = setInterval(() => {
      setViewCounts((prev) => {
        const updated = { ...prev };
        tracks.forEach((t) => {
          updated[t.id] = prev[t.id] + Math.floor(Math.random() * (t.featured ? 5 : 2));
        });
        return updated;
      });
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Fake progress bar
  useEffect(() => {
    if (playing !== null) {
      progressInterval.current = setInterval(() => {
        setProgress((p) => (p >= 100 ? 0 : p + 0.5));
      }, 200);
    } else {
      setProgress(0);
      if (progressInterval.current) clearInterval(progressInterval.current);
    }
    return () => {
      if (progressInterval.current) clearInterval(progressInterval.current);
    };
  }, [playing]);

  const togglePlay = (id: number) => {
    setPlaying(playing === id ? null : id);
  };

  const formatViews = (n: number) => {
    if (n >= 1000000) return (n / 1000000).toFixed(1) + "M";
    if (n >= 1000) return (n / 1000).toFixed(1) + "K";
    return n.toString();
  };

  return (
    <section className="relative">
      <div className="mb-8">
        <h3 className="font-display text-sm tracking-[0.4em] uppercase text-muted-foreground mb-1">
          // LIVE AUDIO STREAM
        </h3>
        <h2 className="font-display text-2xl md:text-3xl font-bold neon-glow-cyan" style={{ color: "hsl(var(--primary))" }}>
          SIGNAL BROADCAST
        </h2>
      </div>

      {/* Featured track */}
      {tracks.filter((t) => t.featured).map((track) => (
        <div
          key={track.id}
          className="relative border border-primary/30 neon-border p-6 mb-6 scanline"
          style={{ background: "hsl(var(--dark-surface))" }}
        >
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-4">
              <div>
                <span className="text-xs font-mono px-2 py-0.5 border border-neon-red/50 text-neon-red tracking-widest uppercase">
                  FEATURED SIGNAL
                </span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Eye className="w-4 h-4" />
                <span className="font-mono text-sm animate-counter-pulse" style={{ color: "hsl(var(--neon-green))" }}>
                  {formatViews(viewCounts[track.id])}
                </span>
              </div>
            </div>

            <h3 className="font-display text-3xl md:text-4xl font-black mb-1" style={{ color: "hsl(var(--foreground))" }}>
              {track.title.toUpperCase()}
            </h3>
            <p className="text-sm text-muted-foreground font-mono mb-6">{track.artist} • {track.duration}</p>

            {/* Progress bar */}
            <div className="w-full h-1 bg-muted mb-4 overflow-hidden">
              <div
                className="h-full transition-all duration-200"
                style={{
                  width: playing === track.id ? `${progress}%` : "0%",
                  background: "linear-gradient(90deg, hsl(var(--neon-cyan)), hsl(var(--neon-green)))",
                  boxShadow: "0 0 10px hsl(var(--neon-cyan) / 0.5)",
                }}
              />
            </div>

            {/* Controls */}
            <div className="flex items-center gap-4">
              <button className="text-muted-foreground hover:text-primary transition-colors">
                <SkipBack className="w-5 h-5" />
              </button>
              <button
                onClick={() => togglePlay(track.id)}
                className="w-14 h-14 border-2 flex items-center justify-center transition-all hover:scale-105"
                style={{
                  borderColor: "hsl(var(--primary))",
                  background: playing === track.id ? "hsl(var(--primary) / 0.1)" : "transparent",
                  boxShadow: playing === track.id ? "0 0 20px hsl(var(--neon-cyan) / 0.3)" : "none",
                }}
              >
                {playing === track.id ? (
                  <Pause className="w-6 h-6" style={{ color: "hsl(var(--primary))" }} />
                ) : (
                  <Play className="w-6 h-6 ml-1" style={{ color: "hsl(var(--primary))" }} />
                )}
              </button>
              <button className="text-muted-foreground hover:text-primary transition-colors">
                <SkipForward className="w-5 h-5" />
              </button>
              <div className="ml-4 flex items-center gap-2 text-muted-foreground">
                <Volume2 className="w-4 h-4" />
                <div className="w-24 h-1 bg-muted">
                  <div className="w-3/4 h-full" style={{ background: "hsl(var(--primary) / 0.6)" }} />
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Track list */}
      <div className="space-y-1">
        {tracks.filter((t) => !t.featured).map((track, i) => (
          <div
            key={track.id}
            className="flex items-center gap-4 px-4 py-3 border border-transparent hover:border-primary/20 transition-all group cursor-pointer"
            style={{ background: i % 2 === 0 ? "hsl(var(--dark-surface) / 0.5)" : "transparent" }}
            onClick={() => togglePlay(track.id)}
          >
            <span className="text-xs font-mono text-muted-foreground w-6">
              {playing === track.id ? (
                <span className="animate-counter-pulse" style={{ color: "hsl(var(--neon-cyan))" }}>▶</span>
              ) : (
                `0${i + 2}`
              )}
            </span>
            <div className="flex-1">
              <p className="text-sm font-medium group-hover:text-primary transition-colors">{track.title}</p>
              <p className="text-xs text-muted-foreground">{track.artist}</p>
            </div>
            <div className="flex items-center gap-3 text-xs text-muted-foreground">
              <span className="flex items-center gap-1">
                <Eye className="w-3 h-3" />
                {formatViews(viewCounts[track.id])}
              </span>
              <span className="font-mono">{track.duration}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TrackPlayer;
