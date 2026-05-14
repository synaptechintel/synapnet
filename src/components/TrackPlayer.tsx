import { createPortal } from "react-dom";
import { Play, Pause, Volume2, Headphones, SkipForward, SkipBack } from "lucide-react";
import { useTrackPlayer, tracks, formatTime, formatListeners } from "@/contexts/TrackPlayerContext";

const TrackPlayer = () => {
  const {
    playingId,
    isPaused,
    currentTime,
    volume,
    listenerCounts,
    playTrack,
    skip,
    seek,
    setVolume,
  } = useTrackPlayer();

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
