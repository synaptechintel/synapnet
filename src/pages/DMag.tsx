import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, ShoppingBag, Flame, MapPin, Instagram, Music2, Play, Pause, Mail, Calendar, Users } from "lucide-react";
import dmagHero from "@/assets/dmag-hero.jpg";
import theColony from "@/assets/tracks/the-colony-remastered.m4a";
import slimeEmOut from "@/assets/tracks/slime-em-out.mp3";
import lewSterrett from "@/assets/tracks/lew-sterrett.mp3";
import filthy from "@/assets/tracks/filthy.mp3";
import snitch from "@/assets/tracks/snitch.m4a";
import silentHill from "@/assets/tracks/silent-hill.m4a";
import finalForm from "@/assets/tracks/final-form.m4a";
import plugPortfolio from "@/assets/tracks/plug-portfolio.m4a";

const vaultTracks = [
  { n: "01", t: "HOOD SHIT DAVE", d: "0:00", src: "/audio/hood-shit-dave.mp3", hot: true },
  { n: "02", t: "THE COLONY (REMASTERED)", d: "3:30", src: theColony, hot: true },
  { n: "03", t: "SLIME 'EM OUT", d: "4:43", src: slimeEmOut },
  { n: "04", t: "LEW STERRETT", d: "2:37", src: lewSterrett, hot: true },
  { n: "05", t: "FILTHY", d: "2:49", src: filthy },
  { n: "06", t: "SNITCH", d: "1:42", src: snitch },
  { n: "07", t: "SILENT HILL", d: "3:06", src: silentHill },
  { n: "08", t: "FINAL FORM", d: "5:09", src: finalForm },
  { n: "09", t: "PLUG PORTFOLIO", d: "3:16", src: plugPortfolio, hot: true },
];
import merchTee from "@/assets/merch-tee.jpg";
import merchHoodie from "@/assets/merch-hoodie.jpg";
import merchCap from "@/assets/merch-cap.jpg";
import merchPoster from "@/assets/merch-poster.jpg";

const merch = [
  { id: 1, name: "DON'T BLINK Tee", price: 35, img: merchTee, tag: "BESTSELLER", line: "Blink and you'll miss the wave." },
  { id: 2, name: "PLUG AT THE BORDER Hoodie", price: 75, img: merchHoodie, tag: "DROP 03", line: "Heavyweight. Cartel cozy." },
  { id: 3, name: "dMAG Drip Snapback", price: 30, img: merchCap, tag: "NEW", line: "Embroidered. Iced out optional." },
  { id: 4, name: "DON'T BLINK IN DALLAS Poster", price: 20, img: merchPoster, tag: "LIMITED", line: "18x24, signed run of 250." },
];

const slogans = [
  "DON'T BLINK",
  "DON'T BLINK IN DALLAS",
  "PLUG AT THE BORDER",
  "DON'T BLINK IN HOUSTON",
  "DON'T BLINK IN ATL",
  "BLINK = LOSS",
];

const DMag = () => {
  const [cart, setCart] = useState<number[]>([]);
  const [playingSrc, setPlayingSrc] = useState<string | null>(null);
  const [rsvpName, setRsvpName] = useState("");
  const [rsvpEmail, setRsvpEmail] = useState("");
  const [rsvpSubmitted, setRsvpSubmitted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => () => { audioRef.current?.pause(); }, []);

  const toggleTrack = (src: string) => {
    if (playingSrc === src && audioRef.current) {
      if (audioRef.current.paused) { audioRef.current.play(); setPlayingSrc(src); }
      else { audioRef.current.pause(); setPlayingSrc(null); }
      return;
    }
    audioRef.current?.pause();
    const a = new Audio(src);
    a.addEventListener("ended", () => setPlayingSrc(null));
    audioRef.current = a;
    a.play();
    setPlayingSrc(src);
  };

  const handleRsvp = (e: React.FormEvent) => {
    e.preventDefault();
    if (rsvpName.trim() && rsvpEmail.trim()) {
      setRsvpSubmitted(true);
      setRsvpName("");
      setRsvpEmail("");
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white overflow-x-hidden" style={{ fontFamily: "'Bebas Neue', 'Anton', 'Impact', sans-serif" }}>
      {/* Google fonts */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Permanent+Marker&family=Archivo+Black&family=Inter:wght@400;500;700&display=swap" rel="stylesheet" />

      {/* Top nav */}
      <nav className="sticky top-0 z-40 bg-black/80 backdrop-blur-md border-b border-red-600/30">
        <div className="max-w-7xl mx-auto px-5 h-14 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 text-white/70 hover:text-red-500 transition-colors text-sm" style={{ fontFamily: "'Inter', sans-serif" }}>
            <ArrowLeft className="w-4 h-4" /> SYNAPTECH
          </Link>
          <div className="hidden md:flex items-center gap-8 text-sm tracking-[0.25em]">
            <a href="#music" className="hover:text-red-500 transition-colors">MUSIC</a>
            <a href="#shop" className="hover:text-red-500 transition-colors">SHOP</a>
            <a href="#event" className="hover:text-red-500 transition-colors">EVENT</a>
            <a href="#contact" className="hover:text-red-500 transition-colors">CONTACT</a>
          </div>
          <button className="relative flex items-center gap-2 px-4 py-1.5 bg-red-600 hover:bg-red-500 text-black font-bold text-sm tracking-widest" style={{ fontFamily: "'Archivo Black', sans-serif" }}>
            <ShoppingBag className="w-4 h-4" /> CART [{cart.length}]
          </button>
        </div>
      </nav>

      {/* HERO */}
      <section className="relative min-h-[92vh] flex items-end overflow-hidden">
        <img src={dmagHero} alt="dMAG" className="absolute inset-0 w-full h-full object-cover" width={1920} height={1080} />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/20" />
        {/* spray paint splatter overlay */}
        <div className="absolute inset-0 mix-blend-overlay opacity-40"
          style={{ background: "radial-gradient(circle at 20% 80%, #ff0033 0%, transparent 40%), radial-gradient(circle at 80% 20%, #ff6600 0%, transparent 35%)" }}
        />

        <div className="relative z-10 max-w-7xl mx-auto px-5 pb-16 w-full">
          <p className="text-red-500 text-sm tracking-[0.5em] mb-3" style={{ fontFamily: "'Permanent Marker', cursive" }}>
            WEAR THE STREET. DON'T BLINK.
          </p>
          <h1 className="text-[18vw] md:text-[14rem] leading-[0.85] font-black uppercase" style={{ fontFamily: "'Archivo Black', sans-serif", letterSpacing: "-0.04em" }}>
            <span className="block text-white">dMAG</span>
            <span className="block text-red-600 -mt-4 md:-mt-12" style={{ textShadow: "6px 6px 0 #000, -2px -2px 0 #fff" }}>MERCH</span>
          </h1>
          <p className="mt-6 text-2xl md:text-4xl max-w-2xl uppercase leading-tight" style={{ fontFamily: "'Inter', sans-serif", color: "#ffffff" }}>
            Official street-certified apparel and limited drops.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <a href="#music" className="group inline-flex items-center gap-3 px-8 py-4 bg-red-600 hover:bg-red-500 text-black font-black text-lg tracking-widest transition-all hover:scale-105" style={{ fontFamily: "'Archivo Black', sans-serif" }}>
              <Play className="w-5 h-5 fill-black" /> STREAM THE TAPE
            </a>
            <a href="#shop" className="inline-flex items-center gap-3 px-8 py-4 border-2 border-white hover:bg-white hover:text-black font-black text-lg tracking-widest transition-all" style={{ fontFamily: "'Archivo Black', sans-serif" }}>
              <ShoppingBag className="w-5 h-5" /> PLUG MERCH
            </a>
          </div>
        </div>
      </section>

      {/* SLOGAN MARQUEE */}
      <div className="bg-red-600 text-black py-4 overflow-hidden border-y-4 border-black">
        <div className="flex gap-12 animate-[marquee_30s_linear_infinite] whitespace-nowrap">
          {[...slogans, ...slogans, ...slogans].map((s, i) => (
            <span key={i} className="text-3xl md:text-5xl font-black tracking-tight" style={{ fontFamily: "'Archivo Black', sans-serif" }}>
              {s} <span className="text-white">★</span>
            </span>
          ))}
        </div>
        <style>{`@keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-33.333%); } }`}</style>
      </div>

      {/* MUSIC */}
      <section id="music" className="max-w-7xl mx-auto px-5 py-24">
        <div className="flex items-end justify-between mb-12 flex-wrap gap-4">
          <div>
            <p className="text-red-500 text-sm tracking-[0.5em] mb-2" style={{ fontFamily: "'Permanent Marker', cursive" }}>// THE CATALOG</p>
            <h2 className="text-7xl md:text-9xl font-black uppercase" style={{ fontFamily: "'Archivo Black', sans-serif" }}>
              THE <span className="text-red-600">VAULT</span>
            </h2>
          </div>
          <div className="flex gap-3">
            {["SPOTIFY", "APPLE", "YOUTUBE", "SOUNDCLOUD"].map((p) => (
              <a key={p} href="#" className="px-4 py-2 border border-white/20 hover:border-red-500 hover:text-red-500 text-xs tracking-widest transition-colors" style={{ fontFamily: "'Inter', sans-serif" }}>
                {p}
              </a>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-2">
          {vaultTracks.map((tr) => {
            const isPlaying = playingSrc === tr.src;
            return (
              <div
                key={tr.n}
                onClick={() => toggleTrack(tr.src)}
                className={`group flex items-center gap-4 p-4 border-l-2 transition-all cursor-pointer ${
                  isPlaying ? "bg-red-600/15 border-red-600" : "bg-white/[0.03] hover:bg-red-600/10 border-transparent hover:border-red-600"
                }`}
              >
                <span className={`text-3xl font-black w-12 ${isPlaying ? "text-red-600" : "text-white/30 group-hover:text-red-600"}`} style={{ fontFamily: "'Archivo Black', sans-serif" }}>{tr.n}</span>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <p className="text-xl font-black tracking-wide" style={{ fontFamily: "'Archivo Black', sans-serif" }}>{tr.t}</p>
                    {tr.hot && <Flame className="w-4 h-4 text-red-500 fill-red-500" />}
                  </div>
                </div>
                <span className="text-sm text-white/50 tabular-nums" style={{ fontFamily: "'Inter', sans-serif" }}>{tr.d}</span>
                {isPlaying ? (
                  <Pause className="w-5 h-5 fill-red-500 text-red-500" />
                ) : (
                  <Play className="w-5 h-5 opacity-0 group-hover:opacity-100 fill-red-500 text-red-500 transition-opacity" />
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* SHOP */}
      <section id="shop" className="bg-gradient-to-b from-black via-red-950/20 to-black py-24 border-y border-red-600/20">
        <div className="max-w-7xl mx-auto px-5">
          <div className="mb-12">
            <p className="text-red-500 text-sm tracking-[0.5em] mb-2" style={{ fontFamily: "'Permanent Marker', cursive" }}>// OFFICIAL DROP 03</p>
            <h2 className="text-7xl md:text-9xl font-black uppercase" style={{ fontFamily: "'Archivo Black', sans-serif" }}>
              THE <span className="text-red-600" style={{ fontFamily: "'Permanent Marker', cursive" }}>SHOP</span>
            </h2>
            <p className="mt-4 text-xl text-white/70 max-w-xl" style={{ fontFamily: "'Inter', sans-serif" }}>
              Limited runs. Once they're gone, they're gone. Don't blink.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {merch.map((m) => (
              <div key={m.id} className="group relative bg-black border border-white/10 hover:border-red-500 transition-all">
                <div className="absolute top-3 left-3 z-10 px-2 py-1 bg-red-600 text-black text-xs font-black tracking-widest" style={{ fontFamily: "'Archivo Black', sans-serif" }}>
                  {m.tag}
                </div>
                <div className="aspect-square overflow-hidden bg-zinc-900">
                  <img src={m.img} alt={m.name} loading="lazy" width={768} height={768} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-4">
                  <h3 className="text-xl font-black uppercase leading-tight" style={{ fontFamily: "'Archivo Black', sans-serif" }}>{m.name}</h3>
                  <p className="text-xs text-white/50 mt-1 italic" style={{ fontFamily: "'Permanent Marker', cursive" }}>"{m.line}"</p>
                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-2xl font-black text-red-500" style={{ fontFamily: "'Archivo Black', sans-serif" }}>${m.price}</span>
                    <button
                      onClick={() => setCart([...cart, m.id])}
                      className="px-3 py-2 bg-white text-black font-black text-xs tracking-widest hover:bg-red-500 hover:text-black transition-colors"
                      style={{ fontFamily: "'Archivo Black', sans-serif" }}
                    >
                      ADD +
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SALES TRAINING EVENT */}
      <section id="event" className="max-w-7xl mx-auto px-5 py-24">
        <div className="mb-12">
          <p className="text-red-500 text-sm tracking-[0.5em] mb-2" style={{ fontFamily: "'Permanent Marker', cursive" }}>// JUNE 2026</p>
          <h2 className="text-7xl md:text-9xl font-black uppercase leading-[0.9]" style={{ fontFamily: "'Archivo Black', sans-serif" }}>
            SALES <span className="text-red-600">TRAINING</span>
          </h2>
          <p className="mt-4 text-xl text-white/70 max-w-xl" style={{ fontFamily: "'Inter', sans-serif" }}>
            Level up your hustle. A one-day intensive for serious closers.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-2 p-8 bg-white/[0.03] border-l-4 border-red-600">
            <div className="flex items-center gap-3 mb-6">
              <Calendar className="w-6 h-6 text-red-500" />
              <span className="text-2xl font-black text-red-500" style={{ fontFamily: "'Archivo Black', sans-serif" }}>JUNE 2026 — DALLAS, TX</span>
            </div>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Users className="w-5 h-5 text-red-500 mt-1 shrink-0" />
                <div>
                  <p className="font-black text-lg" style={{ fontFamily: "'Archivo Black', sans-serif" }}>PROSPECTING & PIPELINE</p>
                  <p className="text-sm text-white/60" style={{ fontFamily: "'Inter', sans-serif" }}>Build a bulletproof lead flow that never goes dry.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Users className="w-5 h-5 text-red-500 mt-1 shrink-0" />
                <div>
                  <p className="font-black text-lg" style={{ fontFamily: "'Archivo Black', sans-serif" }}>CLOSING PSYCHOLOGY</p>
                  <p className="text-sm text-white/60" style={{ fontFamily: "'Inter', sans-serif" }}>Read the room. Handle objections. Lock in the deal.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Users className="w-5 h-5 text-red-500 mt-1 shrink-0" />
                <div>
                  <p className="font-black text-lg" style={{ fontFamily: "'Archivo Black', sans-serif" }}>SCALING & SYSTEMS</p>
                  <p className="text-sm text-white/60" style={{ fontFamily: "'Inter', sans-serif" }}>Turn one rep into a team that moves units on autopilot.</p>
                </div>
              </div>
            </div>
          </div>

          <div id="contact" className="p-8 bg-red-600/10 border border-red-600/30">
            <p className="text-red-500 text-sm tracking-[0.5em] mb-4" style={{ fontFamily: "'Permanent Marker', cursive" }}>// RSVP</p>
            <h3 className="text-3xl font-black mb-6" style={{ fontFamily: "'Archivo Black', sans-serif" }}>LOCK YOUR SEAT</h3>
            {rsvpSubmitted ? (
              <div className="text-center py-8">
                <p className="text-2xl font-black text-red-500 mb-2" style={{ fontFamily: "'Archivo Black', sans-serif" }}>YOU'RE IN.</p>
                <p className="text-white/70 text-sm" style={{ fontFamily: "'Inter', sans-serif" }}>We'll hit you with the details soon.</p>
              </div>
            ) : (
              <form onSubmit={handleRsvp} className="space-y-4">
                <div>
                  <label className="text-xs tracking-widest text-white/50 mb-1 block" style={{ fontFamily: "'Inter', sans-serif" }}>NAME</label>
                  <input
                    type="text"
                    value={rsvpName}
                    onChange={(e) => setRsvpName(e.target.value)}
                    className="w-full bg-black border border-white/20 px-4 py-3 text-white placeholder:text-white/30 focus:border-red-500 focus:outline-none transition-colors"
                    placeholder="Your name"
                    required
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  />
                </div>
                <div>
                  <label className="text-xs tracking-widest text-white/50 mb-1 block" style={{ fontFamily: "'Inter', sans-serif" }}>EMAIL</label>
                  <input
                    type="email"
                    value={rsvpEmail}
                    onChange={(e) => setRsvpEmail(e.target.value)}
                    className="w-full bg-black border border-white/20 px-4 py-3 text-white placeholder:text-white/30 focus:border-red-500 focus:outline-none transition-colors"
                    placeholder="you@email.com"
                    required
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-4 bg-red-600 hover:bg-red-500 text-black font-black text-lg tracking-widest transition-colors"
                  style={{ fontFamily: "'Archivo Black', sans-serif" }}
                >
                  RSVP NOW
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* CONTACT / FOOTER */}
      <footer className="bg-black border-t border-red-600/30 py-16">
        <div className="max-w-7xl mx-auto px-5 grid md:grid-cols-3 gap-12">
          <div>
            <h3 className="text-5xl font-black text-red-600 mb-4" style={{ fontFamily: "'Permanent Marker', cursive" }}>dMAG</h3>
            <p className="text-white/60 text-sm" style={{ fontFamily: "'Inter', sans-serif" }}>
              Independent. Unfiltered. From the border to your speakers.
            </p>
          </div>
          <div>
            <h4 className="text-xs tracking-[0.4em] text-white/40 mb-4" style={{ fontFamily: "'Inter', sans-serif" }}>CONTACT</h4>
            <a href="mailto:synaptechintelligencenetwork@gmail.com" className="flex items-center gap-2 text-lg font-bold hover:text-red-500 transition-colors" style={{ fontFamily: "'Inter', sans-serif" }}>
              <Mail className="w-5 h-5 text-red-500" /> synaptechintelligencenetwork@gmail.com
            </a>
          </div>
          <div>
            <h4 className="text-xs tracking-[0.4em] text-white/40 mb-4" style={{ fontFamily: "'Inter', sans-serif" }}>FOLLOW</h4>
            <div className="flex gap-3">
              <a href="#" className="w-10 h-10 flex items-center justify-center border border-white/20 hover:border-red-500 hover:text-red-500 transition-colors"><Instagram className="w-4 h-4" /></a>
              <a href="#" className="w-10 h-10 flex items-center justify-center border border-white/20 hover:border-red-500 hover:text-red-500 transition-colors"><Music2 className="w-4 h-4" /></a>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-5 mt-12 pt-8 border-t border-white/10 text-xs text-white/40 tracking-widest flex flex-wrap justify-between gap-2" style={{ fontFamily: "'Inter', sans-serif" }}>
          <span>© 2026 dMAG. ALL RIGHTS RESERVED.</span>
          <span className="text-red-500" style={{ fontFamily: "'Permanent Marker', cursive" }}>DON'T BLINK.</span>
        </div>
      </footer>
    </div>
  );
};

export default DMag;
