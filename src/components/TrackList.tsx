import { Headphones } from "lucide-react";
import { useTrackPlayer, tracks, formatTime, formatListeners } from "@/contexts/TrackPlayerContext";

const TrackList = () => {
  const { playingId, listenerCounts, playTrack } = useTrackPlayer();

  return (
    <section>
      <div className="mb-8">
        <h3 className="font-display text-sm tracking-[0.4em] uppercase text-muted-foreground mb-1">
          // ARCHIVE
        </h3>
        <h2 className="font-display text-2xl md:text-3xl font-bold neon-glow-cyan" style={{ color: "hsl(var(--primary))" }}>
          SIGNAL ARCHIVE
        </h2>
      </div>
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

export default TrackList;
