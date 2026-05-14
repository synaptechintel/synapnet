import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { Play, Pause, Volume2, Headphones, SkipForward, SkipBack } from "lucide-react";

import theColony from "@/assets/tracks/the-colony-remastered.m4a";
import slimeEmOut from "@/assets/tracks/slime-em-out.mp3";
import lewSterrett from "@/assets/tracks/lew-sterrett.mp3";
import filthy from "@/assets/tracks/filthy.mp3";
import snitch from "@/assets/tracks/snitch.m4a";
import silentHill from "@/assets/tracks/silent-hill.m4a";
import finalForm from "@/assets/tracks/final-form.m4a";
import plugPortfolio from "@/assets/tracks/plug-portfolio.m4a";
import whipple5 from "@/assets/tracks/whipple-5.m4a";
import phiRising from "@/assets/tracks/phi-rising.mp3";
import mobiusLoop from "@/assets/tracks/mobius-loop.mp3";

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
  { id: 12, title: "Hood Shit Dave", artist: "dMAG", duration: 0, src: "/audio/hood-shit-dave.mp3", listeners: 5210, featured: true },
  { id: 1, title: "The Colony (Remastered)", artist: "dMAG", duration: 210, src: theColony, listeners: 4820 },
  { id: 2, title: "Slime 'Em Out (Flatbush Zombies Remix)", artist: "dMAG", duration: 283, src: slimeEmOut, listeners: 3125 },
  { id: 3, title: "Lew Sterrett", artist: "dMAG", duration: 157, src: lewSterrett, listeners: 2680 },
  { id: 4, title: "Filthy", artist: "dMAG", duration: 169, src: filthy, listeners: 2418 },
  { id: 5, title: "Snitch", artist: "dMAG", duration: 102, src: snitch, listeners: 1987 },
  { id: 6, title: "Silent Hill", artist: "dMAG", duration: 186, src: silentHill, listeners: 1742 },
  { id: 7, title: "Final Form", artist: "dMAG", duration: 309, src: finalForm, listeners: 1420 },
  { id: 8, title: "Plug Portfolio", artist: "dMAG", duration: 196, src: plugPortfolio, listeners: 1218 },
  { id: 9, title: "Φ Rising", artist: "SynapTech", duration: 256, src: phiRising, listeners: 1043 },
  { id: 10, title: "Mobius Loop", artist: "SynapTech", duration: 307, src: mobiusLoop, listeners: 892 },
  { id: 11, title: "Whipple 5.0", artist: "dMAG", duration: 122, src: whipple5, listeners: 655 },
];

const formatTime = (s: number) => {
  if (!isFinite(s)) return "0:00";
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60);
  return `${m}:${sec.toString().padStart(2, "0")}`;
};

const formatListeners = (n: number | undefined) => {
  if (n == null || !isFinite(n)) return "0";
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(1) + "M";
  if (n >= 1_000) return (n / 1_000).toFixed(1) + "K";
  return n.toString();
};

const TrackPlayer = () => {
  const [playingId, setPlayingId] = useState<number | null>(null);
  const [isPaused, setIsPaused] = useState(false);
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
          const base = prev[t.id] ?? t.listeners;
          updated[t.id] = base + bump + playingBoost;
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
        setIsPaused(false);
      } else {
        audioRef.current.pause();
        setIsPaused(true);
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
      setIsPaused(false);
      setCurrentTime(0);
    });
    audioRef.current = audio;
    audio.play();
    setPlayingId(id);
    setIsPaused(false);
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
  const isFeaturedPlaying = playingId === featured.id && !isPaused;
  const activeTrack = playingId !== null ? tracks.find((t) => t.id === playingId) : null;
  const nowPlaying = activeTrack ?? featured;
  const nowProgress = activeTrack ? (currentTime / nowPlaying.duration) * 100 : 0;
  const hasActive = !!activeTrack;

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

      {/* Now Playing fixed bar — portaled to body so nothing can clip it */}
      {createPortal(
      <div
        className="z-[9999] border-t border-primary/40 backdrop-blur-md"
        style={{
          position: "fixed",
          left: 0,
          right: 0,
          bottom: 0,
          background: "hsl(var(--dark-base) / 0.92)",
        }}
      >
        {/* Time slider */}
        <div
          className="w-full h-1.5 bg-muted cursor-pointer group"
          onClick={(e) => hasActive && seek(e, nowPlaying.duration)}
        >
          <div
            className="h-full transition-all duration-200 relative"
            style={{
              width: `${nowProgress}%`,
              background: "linear-gradient(90deg, hsl(var(--neon-cyan)), hsl(var(--neon-green)))",
              boxShadow: hasActive ? "0 0 10px hsl(var(--neon-cyan) / 0.6)" : "none",
            }}
          >
            <span
              className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
              style={{ background: "hsl(var(--neon-cyan))", boxShadow: "0 0 8px hsl(var(--neon-cyan))" }}
            />
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center gap-4">
          {/* Track info */}
          <div className="flex items-center gap-3 min-w-0 flex-1">
            <span
              className="w-2 h-2 rounded-full animate-pulse shrink-0"
              style={{
                background: !hasActive
                  ? "hsl(var(--muted-foreground))"
                  : isPaused
                  ? "hsl(var(--neon-red))"
                  : "hsl(var(--neon-green))",
              }}
            />
            <div className="min-w-0">
              <p className="text-[10px] font-mono tracking-[0.3em] uppercase text-muted-foreground">
                {!hasActive ? "// STANDBY" : isPaused ? "// PAUSED" : "// NOW PLAYING"}
              </p>
              <p
                className="text-sm font-medium truncate"
                style={{ color: hasActive ? "hsl(var(--foreground))" : "hsl(var(--muted-foreground))" }}
              >
                {hasActive ? nowPlaying.title : "Select a signal to broadcast"}
              </p>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => skip(-1)}
              disabled={!hasActive}
              className="text-muted-foreground hover:text-primary transition-colors disabled:opacity-30 disabled:hover:text-muted-foreground"
            >
              <SkipBack className="w-5 h-5" />
            </button>
            <button
              onClick={() => playTrack(nowPlaying.id)}
              className="w-10 h-10 border-2 flex items-center justify-center transition-all hover:scale-105"
              style={{
                borderColor: "hsl(var(--primary))",
                background: hasActive && !isPaused ? "hsl(var(--primary) / 0.15)" : "transparent",
                boxShadow: hasActive && !isPaused ? "0 0 15px hsl(var(--neon-cyan) / 0.4)" : "none",
              }}
            >
              {hasActive && !isPaused ? (
                <Pause className="w-4 h-4" style={{ color: "hsl(var(--primary))" }} />
              ) : (
                <Play className="w-4 h-4 ml-0.5" style={{ color: "hsl(var(--primary))" }} />
              )}
            </button>
            <button
              onClick={() => skip(1)}
              disabled={!hasActive}
              className="text-muted-foreground hover:text-primary transition-colors disabled:opacity-30 disabled:hover:text-muted-foreground"
            >
              <SkipForward className="w-5 h-5" />
            </button>
          </div>

          {/* Time */}
          <div className="hidden sm:flex items-center gap-2 font-mono text-xs text-muted-foreground shrink-0 tabular-nums">
            <span style={{ color: hasActive ? "hsl(var(--neon-cyan))" : undefined }}>
              {formatTime(hasActive ? currentTime : 0)}
            </span>
            <span>/</span>
            <span>{formatTime(nowPlaying.duration)}</span>
          </div>
        </div>
      </div>,
      document.body
      )}
    </section>
  );
};

export default TrackPlayer;
