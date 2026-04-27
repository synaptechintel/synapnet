import { useState, useEffect, useRef } from "react";
import { Play, Pause, Volume2, Headphones, SkipForward, SkipBack } from "lucide-react";

import cbto from "@/assets/tracks/cbto.mp3";
import stashHouse from "@/assets/tracks/stash-house.mp3";
import slimeEmOut from "@/assets/tracks/slime-em-out.mp3";
import theColony from "@/assets/tracks/the-colony.mp3";
import filthy from "@/assets/tracks/filthy.mp3";

interface Track {
  id: number;
  title: string;
  artist: string;
  duration: number; // seconds
  src: string;
  listeners: number;
  featured?: boolean;
}

const tracks: Track[] = [
  { id: 1, title: "The Colony", artist: "dMAG", duration: 205, src: theColony, listeners: 8420, featured: true },
  { id: 2, title: "CBTO (Cybernetic Bio-Technical Ontology)", artist: "SynapTech", duration: 308, src: cbto, listeners: 4830 },
  { id: 3, title: "Stash House", artist: "dMAG", duration: 97, src: stashHouse, listeners: 3710 },
  { id: 4, title: "Slime 'Em Out (Flatbush Zombies Remix)", artist: "dMAG", duration: 283, src: slimeEmOut, listeners: 2940 },
  { id: 5, title: "Filthy", artist: "dMAG", duration: 169, src: filthy, listeners: 2100 },
];

const formatTime = (s: number) => {
  if (!isFinite(s)) return "0:00";
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60);
  return `${m}:${sec.toString().padStart(2, "0")}`;
};

const formatListeners = (n: number) => {
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(1) + "M";
  if (n >= 1_000) return (n / 1_000).toFixed(1) + "K";
  return n.toString();
};

const TrackPlayer = () => {
  const [playingId, setPlayingId] = useState<number | null>(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(0.75);
  const [listenerCounts, setListenerCounts] = useState<Record<number, number>>(
    Object.fromEntries(tracks.map((t) => [t.id, t.listeners]))
  );
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Rising listener counter
  useEffect(() => {
    const interval = setInterval(() => {
      setListenerCounts((prev) => {
        const updated = { ...prev };
        tracks.forEach((t) => {
          const bump = Math.floor(Math.random() * (t.featured ? 5 : 2));
          const playingBoost = playingId === t.id ? Math.floor(Math.random() * 4) + 1 : 0;
          updated[t.id] = prev[t.id] + bump + playingBoost;
        });
        return updated;
      });
    }, 3000);
    return () => clearInterval(interval);
  }, [playingId]);

  // Volume sync
  useEffect(() => {
    if (audioRef.current) audioRef.current.volume = volume;
  }, [volume]);

  const playTrack = (id: number) => {
    const track = tracks.find((t) => t.id === id);
    if (!track) return;

    if (playingId === id && audioRef.current) {
      if (audioRef.current.paused) {
        audioRef.current.play();
      } else {
        audioRef.current.pause();
        setPlayingId(null);
      }
      return;
    }

    if (audioRef.current) {
      audioRef.current.pause();
    }

    const audio = new Audio(track.src);
    audio.volume = volume;
    audio.addEventListener("timeupdate", () => setCurrentTime(audio.currentTime));
    audio.addEventListener("ended", () => {
      setPlayingId(null);
      setCurrentTime(0);
    });
    audioRef.current = audio;
    audio.play();
    setPlayingId(id);
    setCurrentTime(0);
  };

  const skip = (dir: 1 | -1) => {
    if (playingId === null) return;
    const idx = tracks.findIndex((t) => t.id === playingId);
    const next = tracks[(idx + dir + tracks.length) % tracks.length];
    playTrack(next.id);
  };

  const seek = (e: React.MouseEvent<HTMLDivElement>, duration: number) => {
    if (!audioRef.current) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const pct = (e.clientX - rect.left) / rect.width;
    audioRef.current.currentTime = pct * duration;
    setCurrentTime(audioRef.current.currentTime);
  };

  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const featured = tracks.find((t) => t.featured)!;
  const progress = playingId === featured.id ? (currentTime / featured.duration) * 100 : 0;
  const isFeaturedPlaying = playingId === featured.id && !!audioRef.current && !audioRef.current.paused;

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
      <div
        className="relative border border-primary/30 neon-border p-6 mb-6 scanline"
        style={{ background: "hsl(var(--dark-surface))" }}
      >
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-mono px-2 py-0.5 border border-neon-red/50 text-neon-red tracking-widest uppercase">
              FEATURED SIGNAL
            </span>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Headphones className="w-4 h-4" />
              <span className="font-mono text-sm animate-counter-pulse" style={{ color: "hsl(var(--neon-green))" }}>
                {formatListeners(listenerCounts[featured.id])} listeners
              </span>
            </div>
          </div>

          <h3 className="font-display text-3xl md:text-4xl font-black mb-1" style={{ color: "hsl(var(--foreground))" }}>
            {featured.title.toUpperCase()}
          </h3>
          <p className="text-sm text-muted-foreground font-mono mb-6">
            {featured.artist} • {formatTime(featured.duration)}
          </p>

          {/* Progress bar */}
          <div
            className="w-full h-1 bg-muted mb-2 overflow-hidden cursor-pointer"
            onClick={(e) => isFeaturedPlaying && seek(e, featured.duration)}
          >
            <div
              className="h-full transition-all duration-200"
              style={{
                width: `${progress}%`,
                background: "linear-gradient(90deg, hsl(var(--neon-cyan)), hsl(var(--neon-green)))",
                boxShadow: "0 0 10px hsl(var(--neon-cyan) / 0.5)",
              }}
            />
          </div>
          <div className="flex justify-between text-xs font-mono text-muted-foreground mb-4">
            <span>{playingId === featured.id ? formatTime(currentTime) : "0:00"}</span>
            <span>{formatTime(featured.duration)}</span>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-4">
            <button onClick={() => skip(-1)} className="text-muted-foreground hover:text-primary transition-colors">
              <SkipBack className="w-5 h-5" />
            </button>
            <button
              onClick={() => playTrack(featured.id)}
              className="w-14 h-14 border-2 flex items-center justify-center transition-all hover:scale-105"
              style={{
                borderColor: "hsl(var(--primary))",
                background: isFeaturedPlaying ? "hsl(var(--primary) / 0.1)" : "transparent",
                boxShadow: isFeaturedPlaying ? "0 0 20px hsl(var(--neon-cyan) / 0.3)" : "none",
              }}
            >
              {isFeaturedPlaying ? (
                <Pause className="w-6 h-6" style={{ color: "hsl(var(--primary))" }} />
              ) : (
                <Play className="w-6 h-6 ml-1" style={{ color: "hsl(var(--primary))" }} />
              )}
            </button>
            <button onClick={() => skip(1)} className="text-muted-foreground hover:text-primary transition-colors">
              <SkipForward className="w-5 h-5" />
            </button>
            <div className="ml-4 flex items-center gap-2 text-muted-foreground">
              <Volume2 className="w-4 h-4" />
              <input
                type="range"
                min={0}
                max={1}
                step={0.01}
                value={volume}
                onChange={(e) => setVolume(parseFloat(e.target.value))}
                className="w-24 accent-primary"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Track list */}
      <div className="space-y-1">
        {tracks.filter((t) => !t.featured).map((track, i) => {
          const isActive = playingId === track.id;
          return (
            <div
              key={track.id}
              className="flex items-center gap-4 px-4 py-3 border border-transparent hover:border-primary/20 transition-all group cursor-pointer"
              style={{ background: i % 2 === 0 ? "hsl(var(--dark-surface) / 0.5)" : "transparent" }}
              onClick={() => playTrack(track.id)}
            >
              <span className="text-xs font-mono text-muted-foreground w-6">
                {isActive ? (
                  <span className="animate-counter-pulse" style={{ color: "hsl(var(--neon-cyan))" }}>▶</span>
                ) : (
                  `0${i + 2}`
                )}
              </span>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium group-hover:text-primary transition-colors truncate">{track.title}</p>
                <p className="text-xs text-muted-foreground">{track.artist}</p>
              </div>
              <div className="flex items-center gap-3 text-xs text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Headphones className="w-3 h-3" />
                  {formatListeners(listenerCounts[track.id])}
                </span>
                <span className="font-mono">{formatTime(track.duration)}</span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default TrackPlayer;
