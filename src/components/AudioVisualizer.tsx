import { useEffect, useRef } from "react";

const AudioVisualizer = () => {
  const bars = 40;
  const barRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const animate = () => {
      barRefs.current.forEach((bar) => {
        if (bar) {
          const height = Math.random() * 60 + 5;
          bar.style.height = `${height}%`;
        }
      });
      requestAnimationFrame(animate);
    };
    const id = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(id);
  }, []);

  return (
    <div className="flex items-end justify-center gap-[2px] h-16 w-full opacity-60">
      {Array.from({ length: bars }).map((_, i) => (
        <div
          key={i}
          ref={(el) => { barRefs.current[i] = el; }}
          className="w-1 transition-[height] duration-150 ease-out"
          style={{
            height: "10%",
            background: `linear-gradient(to top, hsl(var(--neon-cyan) / 0.3), hsl(var(--neon-cyan)))`,
          }}
        />
      ))}
    </div>
  );
};

export default AudioVisualizer;
