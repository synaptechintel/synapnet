import { createContext, useContext, useState, useEffect, useRef, type ReactNode } from "react";

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

export interface Track {
  id: number;
  title: string;
  artist: string;
  duration: number;
  src: string;
  listeners: number;
  featured?: boolean;
}

export const tracks: Track[] = [
  { id: 12, title: "Hood Shit Dave", artist: "dMAG", duration: 0, src: "/audio/hood-shit-dave.mp3", listeners: 5210, featured: true },
  { id: 14, title: "Same Code", artist: "dMAG", duration: 0, src: "/audio/same-code.mp3", listeners: 1180 },
  { id: 1, title: "The Colony (Remastered)", artist: "dMAG", duration: 210, src: theColony, listeners: 4820 },
  { id: 2, title: "Slime 'Em Out (Flatbush Zombies Remix)", artist: "dMAG", duration: 283, src: slimeEmOut, listeners: 3125 },
  { id: 3, title: "Lew Sterrett", artist: "dMAG", duration: 157, src: lewSterrett, listeners: 2680 },
  { id: 13, title: "Snitches", artist: "dMAG", duration: 0, src: "/audio/snitches.mp3", listeners: 2510 },
  { id: 4, title: "Filthy", artist: "dMAG", duration: 169, src: filthy, listeners: 2418 },
  { id: 5, title: "Snitch", artist: "dMAG", duration: 102, src: snitch, listeners: 1987 },
  { id: 6, title: "Silent Hill", artist: "dMAG", duration: 186, src: silentHill, listeners: 1742 },
  { id: 7, title: "Final Form", artist: "dMAG", duration: 309, src: finalForm, listeners: 1420 },
  { id: 8, title: "Plug Portfolio", artist: "dMAG", duration: 196, src: plugPortfolio, listeners: 1218 },
  { id: 9, title: "Φ Rising", artist: "SynapTech", duration: 256, src: phiRising, listeners: 1043 },
  { id: 10, title: "Mobius Loop", artist: "SynapTech", duration: 307, src: mobiusLoop, listeners: 892 },
  { id: 11, title: "Whipple 5.0", artist: "dMAG", duration: 122, src: whipple5, listeners: 655 },
];

export const formatTime = (s: number) => {
  if (!isFinite(s)) return "0:00";
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60);
  return `${m}:${sec.toString().padStart(2, "0")}`;
};

export const formatListeners = (n: number | undefined) => {
  if (n == null || !isFinite(n)) return "0";
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(1) + "M";
  if (n >= 1_000) return (n / 1_000).toFixed(1) + "K";
  return n.toString();
};

interface TrackPlayerContextValue {
  playingId: number | null;
  isPaused: boolean;
  currentTime: number;
  volume: number;
  listenerCounts: Record<number, number>;
  playTrack: (id: number) => void;
  skip: (dir: 1 | -1) => void;
  seek: (e: React.MouseEvent<HTMLDivElement>, duration: number) => void;
  setVolume: (v: number) => void;
}

const TrackPlayerContext = createContext<TrackPlayerContextValue | null>(null);

export const TrackPlayerProvider = ({ children }: { children: ReactNode }) => {
  const [playingId, setPlayingId] = useState<number | null>(null);
  const [isPaused, setIsPaused] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolumeState] = useState(0.75);
  const [listenerCounts, setListenerCounts] = useState<Record<number, number>>(
    Object.fromEntries(tracks.map((t) => [t.id, t.listeners]))
  );
  const audioRef = useRef<HTMLAudioElement | null>(null);

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
    audio.addEventListener("loadedmetadata", () => {
      if (isFinite(audio.duration)) track.duration = audio.duration;
    });
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

  return (
    <TrackPlayerContext.Provider
      value={{
        playingId,
        isPaused,
        currentTime,
        volume,
        listenerCounts,
        playTrack,
        skip,
        seek,
        setVolume: setVolumeState,
      }}
    >
      {children}
    </TrackPlayerContext.Provider>
  );
};

export const useTrackPlayer = () => {
  const ctx = useContext(TrackPlayerContext);
  if (!ctx) throw new Error("useTrackPlayer must be used within TrackPlayerProvider");
  return ctx;
};
