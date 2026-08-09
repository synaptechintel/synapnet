import { useState, useRef, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft, ShoppingBag, Flame, Instagram, Music2, Play, Pause, Mail, Calendar, Users,
  X, Plus, Minus, Radio, Lock, Shield, Cpu, Zap,
} from "lucide-react";
import dmagHero from "@/assets/dmag-hero.jpg";
import theColony from "@/assets/tracks/the-colony-remastered.m4a";
import slimeEmOut from "@/assets/tracks/slime-em-out.mp3";
import lewSterrett from "@/assets/tracks/lew-sterrett.mp3";
import filthy from "@/assets/tracks/filthy.mp3";
import snitch from "@/assets/tracks/snitch.m4a";
import silentHill from "@/assets/tracks/silent-hill.m4a";
import finalForm from "@/assets/tracks/final-form.m4a";
import plugPortfolio from "@/assets/tracks/plug-portfolio.m4a";

// Collection imagery
import streetTee from "@/assets/merch/street-tee-plug.jpg";
import streetHoodie from "@/assets/merch/street-hoodie-deepellum.jpg";
import streetSkimask from "@/assets/merch/street-skimask.jpg";
import streetBomber from "@/assets/merch/street-bomber.jpg";
import synapHoodie from "@/assets/merch/synap-hoodie.jpg";
import synapVest from "@/assets/merch/synap-vest.jpg";
import synapTee from "@/assets/merch/synap-tee.jpg";
import synapMousepad from "@/assets/merch/synap-mousepad.jpg";
import stintJacket from "@/assets/merch/stint-jacket.jpg";
import stintCompression from "@/assets/merch/stint-compression.jpg";
import stintHoodie from "@/assets/merch/stint-hoodie.jpg";
import stintCap from "@/assets/merch/stint-cap.jpg";
import featuredBanner from "@/assets/merch/featured-drop-banner.jpg";

type Product = {
  id: string;
  name: string;
  price: number;
  img: string;
  tag: "LIMITED DROP" | "CLASSIFIED" | "SIGNAL ACTIVE" | "NEW" | "VAULT";
  line: string;
  sizes: string[];
  collection: "street" | "synaptech" | "stint";
};

const products: Product[] = [
  // dMAG STREET
  { id: "st-tee", name: "PLUG MERCH Oversized Tee", price: 45, img: streetTee, tag: "SIGNAL ACTIVE", line: "Wear the street. Don't blink.", sizes: ["S","M","L","XL","XXL"], collection: "street" },
  { id: "st-hoodie", name: "DEEP ELLUM DIVISION Hoodie", price: 95, img: streetHoodie, tag: "LIMITED DROP", line: "Heavyweight. Dallas certified.", sizes: ["S","M","L","XL"], collection: "street" },
  { id: "st-ski", name: "dMAG Knit Ski Mask", price: 40, img: streetSkimask, tag: "NEW", line: "Stay anonymous. Stay paid.", sizes: ["One Size"], collection: "street" },
  { id: "st-bomber", name: "DON'T BLINK Bomber", price: 220, img: streetBomber, tag: "LIMITED DROP", line: "Tactical luxury outerwear.", sizes: ["S","M","L","XL"], collection: "street" },
  // SYNAPTECH
  { id: "sn-hoodie", name: "SYNAPTECH Core Hoodie", price: 110, img: synapHoodie, tag: "SIGNAL ACTIVE", line: "Build · Ship · Monetize.", sizes: ["S","M","L","XL"], collection: "synaptech" },
  { id: "sn-vest", name: "Systems Over Chaos Vest", price: 185, img: synapVest, tag: "CLASSIFIED", line: "Techwear utility, intelligence-grade.", sizes: ["S/M","L/XL"], collection: "synaptech" },
  { id: "sn-tee", name: "BUILD · SHIP · MONETIZE Tee", price: 42, img: synapTee, tag: "NEW", line: "Operator uniform.", sizes: ["S","M","L","XL","XXL"], collection: "synaptech" },
  { id: "sn-mouse", name: "Neural Grid XL Mousepad", price: 35, img: synapMousepad, tag: "SIGNAL ACTIVE", line: "Desk-side intelligence relay.", sizes: ["XL"], collection: "synaptech" },
  // STINT-NET BLACK VECTOR
  { id: "sv-jacket", name: "Node Active Tactical Jacket", price: 295, img: stintJacket, tag: "CLASSIFIED", line: "Stealth-grade outerwear.", sizes: ["S","M","L","XL"], collection: "stint" },
  { id: "sv-comp", name: "Hermes Relay Compression", price: 65, img: stintCompression, tag: "VAULT", line: "Operator base layer.", sizes: ["S","M","L","XL"], collection: "stint" },
  { id: "sv-hoodie", name: "HEIMDALL VERIFIED Hoodie", price: 130, img: stintHoodie, tag: "LIMITED DROP", line: "Tonal black. Encrypted insignia.", sizes: ["S","M","L","XL"], collection: "stint" },
  { id: "sv-cap", name: "Black Vector Operator Cap", price: 45, img: stintCap, tag: "NEW", line: "Covert headwear.", sizes: ["One Size"], collection: "stint" },
];

const collections = [
  {
    id: "street" as const,
    name: "dMAG STREET",
    code: "// COLLECTION 01",
    tagline: "Dallas trap luxury. Limited drops. Wear the street.",
    icon: Flame,
    accent: "text-red-500",
    accentBg: "bg-red-600",
  },
  {
    id: "synaptech" as const,
    name: "SYNAPTECH",
    code: "// COLLECTION 02",
    tagline: "Intelligence architecture. Engineered for operators.",
    icon: Cpu,
    accent: "text-cyan-400",
    accentBg: "bg-cyan-500",
  },
  {
    id: "stint" as const,
    name: "STINT-NET // BLACK VECTOR",
    code: "// COLLECTION 03 — CLASSIFIED",
    tagline: "Autonomous network. Operator-issue apparel.",
    icon: Shield,
    accent: "text-red-500",
    accentBg: "bg-white",
  },
];

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

const slogans = [
  "DON'T BLINK", "PLUG AT THE BORDER", "SIGNAL ACTIVE", "STREET CERTIFIED",
  "NODE ACTIVE", "STINT-NET ONLINE", "SYSTEMS OVER CHAOS", "BLINK = LOSS",
];

type CartLine = { product: Product; size: string; qty: number };

const tagStyles: Record<Product["tag"], string> = {
  "LIMITED DROP": "bg-red-600 text-black",
  "CLASSIFIED": "bg-black text-red-500 border border-red-500",
  "SIGNAL ACTIVE": "bg-cyan-500 text-black",
  "NEW": "bg-white text-black",
  "VAULT": "bg-zinc-800 text-white border border-white/20",
};

const DMag = () => {
  const [cart, setCart] = useState<CartLine[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [activeCollection, setActiveCollection] = useState<"all" | "street" | "synaptech" | "stint">("all");
  const [playingSrc, setPlayingSrc] = useState<string | null>(null);
  const [rsvpName, setRsvpName] = useState("");
  const [rsvpEmail, setRsvpEmail] = useState("");
  const [rsvpSubmitted, setRsvpSubmitted] = useState(false);
  const [promo, setPromo] = useState("");
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

  const addToCart = (p: Product, size: string) => {
    setCart(prev => {
      const idx = prev.findIndex(l => l.product.id === p.id && l.size === size);
      if (idx >= 0) {
        const next = [...prev];
        next[idx] = { ...next[idx], qty: next[idx].qty + 1 };
        return next;
      }
      return [...prev, { product: p, size, qty: 1 }];
    });
    setCartOpen(true);
  };

  const updateQty = (id: string, size: string, delta: number) => {
    setCart(prev =>
      prev
        .map(l => l.product.id === id && l.size === size ? { ...l, qty: l.qty + delta } : l)
        .filter(l => l.qty > 0)
    );
  };

  const removeLine = (id: string, size: string) => {
    setCart(prev => prev.filter(l => !(l.product.id === id && l.size === size)));
  };

  const subtotal = useMemo(() => cart.reduce((s, l) => s + l.product.price * l.qty, 0), [cart]);
  const cartCount = useMemo(() => cart.reduce((s, l) => s + l.qty, 0), [cart]);
  const shipping = subtotal > 0 ? (subtotal >= 150 ? 0 : 12) : 0;
  const discount = promo.trim().toUpperCase() === "DONTBLINK" ? Math.round(subtotal * 0.1) : 0;
  const total = Math.max(0, subtotal - discount) + shipping;

  const visibleProducts = activeCollection === "all" ? products : products.filter(p => p.collection === activeCollection);

  const handleRsvp = (e: React.FormEvent) => {
    e.preventDefault();
    if (rsvpName.trim() && rsvpEmail.trim()) {
      setRsvpSubmitted(true);
      setRsvpName(""); setRsvpEmail("");
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white overflow-x-hidden relative" style={{ fontFamily: "'Bebas Neue', 'Anton', 'Impact', sans-serif" }}>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Permanent+Marker&family=Archivo+Black&family=JetBrains+Mono:wght@400;500;700&family=Inter:wght@400;500;700&display=swap" rel="stylesheet" />

      {/* GLOBAL SCANLINE OVERLAY */}
      <div className="pointer-events-none fixed inset-0 z-[5] opacity-[0.06] mix-blend-overlay" style={{
        backgroundImage: "repeating-linear-gradient(0deg, rgba(255,255,255,0.6) 0px, rgba(255,255,255,0.6) 1px, transparent 1px, transparent 3px)",
      }} />

      {/* Global keyframes */}
      <style>{`
        @keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-33.333%); } }
        @keyframes scanner { 0% { transform: translateY(-100%); } 100% { transform: translateY(100%); } }
        @keyframes signal-pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.3; } }
        @keyframes vhs-flicker { 0%, 100% { opacity: 1; } 92% { opacity: 0.85; } 94% { opacity: 1; } 96% { opacity: 0.7; } }
        @keyframes glitch-x { 0%, 100% { transform: translateX(0); } 20% { transform: translateX(-1px); } 40% { transform: translateX(1px); } 60% { transform: translateX(-0.5px); } }
        .scanner-line::after {
          content: ''; position: absolute; left: 0; right: 0; height: 2px;
          background: linear-gradient(90deg, transparent, #dc2626 50%, transparent);
          animation: scanner 4s linear infinite;
          box-shadow: 0 0 12px #dc2626;
        }
        .signal-dot { animation: signal-pulse 1.4s ease-in-out infinite; }
      `}</style>

      {/* NAV */}
      <nav className="sticky top-0 z-40 bg-black/85 backdrop-blur-md border-b border-red-600/30">
        <div className="max-w-7xl mx-auto px-5 h-14 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 text-white/70 hover:text-red-500 transition-colors text-sm" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
            <ArrowLeft className="w-4 h-4" /> SYNAPTECH
          </Link>
          <div className="hidden md:flex items-center gap-8 text-xs tracking-[0.3em]" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
            <a href="#shop" className="hover:text-red-500 transition-colors">SHOP</a>
            <a href="#music" className="hover:text-red-500 transition-colors">VAULT</a>
            <a href="#event" className="hover:text-red-500 transition-colors">EVENT</a>
            <a href="#contact" className="hover:text-red-500 transition-colors">CONTACT</a>
          </div>
          <button onClick={() => setCartOpen(true)} className="relative flex items-center gap-2 px-4 py-1.5 bg-red-600 hover:bg-red-500 text-black font-bold text-sm tracking-widest transition-colors" style={{ fontFamily: "'Archivo Black', sans-serif" }}>
            <ShoppingBag className="w-4 h-4" /> CART [{cartCount}]
          </button>
        </div>
      </nav>

      {/* HERO */}
      <section className="relative min-h-[92vh] flex items-end overflow-hidden">
        <img src={dmagHero} alt="dMAG" className="absolute inset-0 w-full h-full object-cover" width={1920} height={1080} />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/20" />
        <div className="absolute inset-0 mix-blend-overlay opacity-40" style={{ background: "radial-gradient(circle at 20% 80%, #ff0033 0%, transparent 40%), radial-gradient(circle at 80% 20%, #ff6600 0%, transparent 35%)" }} />
        <div className="relative z-10 max-w-7xl mx-auto px-5 pb-16 w-full">
          <div className="flex items-center gap-3 mb-3">
            <span className="signal-dot w-2 h-2 rounded-full bg-red-500 shadow-[0_0_10px_#dc2626]" />
            <p className="text-red-500 text-xs tracking-[0.5em]" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
              SIGNAL ACTIVE · WEAR THE STREET · DON'T BLINK
            </p>
          </div>
          <h1 className="text-[18vw] md:text-[14rem] leading-[0.85] font-black uppercase" style={{ fontFamily: "'Archivo Black', sans-serif", letterSpacing: "-0.04em", animation: "vhs-flicker 6s infinite" }}>
            <span className="block text-white">dMAG</span>
            <span className="block text-red-600 -mt-4 md:-mt-12 text-[12vw] md:text-[9rem]" style={{ textShadow: "6px 6px 0 #000, -2px -2px 0 #fff" }}>DON'T BLINK</span>
          </h1>
          <p className="mt-6 text-xl md:text-3xl max-w-2xl uppercase leading-tight text-white/90" style={{ fontFamily: "'Inter', sans-serif" }}>
            Official street-certified apparel. dMAG × SynapTech × STINT-NET.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <a href="#shop" className="group inline-flex items-center gap-3 px-8 py-4 bg-red-600 hover:bg-red-500 text-black font-black text-lg tracking-widest transition-all hover:scale-105" style={{ fontFamily: "'Archivo Black', sans-serif" }}>
              <ShoppingBag className="w-5 h-5" /> ENTER THE SHOP
            </a>
            <a href="#music" className="inline-flex items-center gap-3 px-8 py-4 border-2 border-white hover:bg-white hover:text-black font-black text-lg tracking-widest transition-all" style={{ fontFamily: "'Archivo Black', sans-serif" }}>
              <Play className="w-5 h-5" /> THE VAULT
            </a>
          </div>
        </div>
      </section>

      {/* MARQUEE */}
      <div className="bg-red-600 text-black py-3 overflow-hidden border-y-4 border-black">
        <div className="flex gap-12 animate-[marquee_30s_linear_infinite] whitespace-nowrap">
          {[...slogans, ...slogans, ...slogans].map((s, i) => (
            <span key={i} className="text-2xl md:text-4xl font-black tracking-tight" style={{ fontFamily: "'Archivo Black', sans-serif" }}>
              {s} <span className="text-white">★</span>
            </span>
          ))}
        </div>
      </div>

      {/* FEATURED DROP */}
      <section className="relative max-w-7xl mx-auto px-5 py-20">
        <div className="relative overflow-hidden border border-red-600/40 group">
          <img src={featuredBanner} alt="Featured drop" loading="lazy" width={1920} height={1024} className="w-full h-[420px] md:h-[520px] object-cover group-hover:scale-105 transition-transform duration-700" />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/60 to-transparent" />
          <div className="scanner-line absolute inset-0 pointer-events-none" />
          <div className="absolute inset-0 flex items-center">
            <div className="px-8 md:px-16 max-w-2xl">
              <div className="flex items-center gap-2 mb-4">
                <span className="signal-dot w-2 h-2 rounded-full bg-red-500" />
                <span className="text-red-500 text-xs tracking-[0.4em]" style={{ fontFamily: "'JetBrains Mono', monospace" }}>FEATURED DROP · LIVE NOW</span>
              </div>
              <h2 className="text-5xl md:text-7xl font-black uppercase leading-[0.9] mb-4" style={{ fontFamily: "'Archivo Black', sans-serif" }}>
                BLACK <span className="text-red-600">VECTOR</span><br />OPS ISSUE
              </h2>
              <p className="text-white/80 text-lg max-w-md mb-6" style={{ fontFamily: "'Inter', sans-serif" }}>
                Limited 250-unit run. Stealth-grade outerwear engineered for operators. Once they're gone, they vanish.
              </p>
              <a href="#shop" className="inline-flex items-center gap-3 px-6 py-3 bg-red-600 hover:bg-red-500 text-black font-black text-sm tracking-widest" style={{ fontFamily: "'Archivo Black', sans-serif" }}>
                ACCESS THE DROP →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* SHOP */}
      <section id="shop" className="bg-gradient-to-b from-black via-red-950/10 to-black py-20 border-y border-red-600/20">
        <div className="max-w-7xl mx-auto px-5">
          <div className="mb-10">
            <p className="text-red-500 text-xs tracking-[0.5em] mb-2" style={{ fontFamily: "'JetBrains Mono', monospace" }}>// CATALOG ACCESS</p>
            <h2 className="text-6xl md:text-8xl font-black uppercase" style={{ fontFamily: "'Archivo Black', sans-serif" }}>
              THE <span className="text-red-600">STOREFRONT</span>
            </h2>
            <p className="mt-4 text-lg text-white/60 max-w-2xl" style={{ fontFamily: "'Inter', sans-serif" }}>
              Three collections. One signal. Filter the catalog or scroll deep.
            </p>
          </div>

          {/* Collection tabs */}
          <div className="flex flex-wrap gap-2 mb-12">
            {[
              { id: "all" as const, label: "ALL DROPS" },
              { id: "street" as const, label: "dMAG STREET" },
              { id: "synaptech" as const, label: "SYNAPTECH" },
              { id: "stint" as const, label: "STINT-NET" },
            ].map(t => (
              <button
                key={t.id}
                onClick={() => setActiveCollection(t.id)}
                className={`px-4 py-2 text-xs tracking-[0.25em] border transition-all ${
                  activeCollection === t.id
                    ? "bg-red-600 text-black border-red-600"
                    : "border-white/20 text-white/70 hover:border-red-500 hover:text-red-500"
                }`}
                style={{ fontFamily: "'JetBrains Mono', monospace" }}
              >
                {t.label}
              </button>
            ))}
          </div>

          {/* Collection headers + grids */}
          {collections
            .filter(c => activeCollection === "all" || activeCollection === c.id)
            .map(col => {
              const Icon = col.icon;
              const items = products.filter(p => p.collection === col.id);
              return (
                <div key={col.id} className="mb-20 last:mb-0">
                  <div className="flex items-end justify-between flex-wrap gap-4 mb-6 pb-4 border-b border-white/10">
                    <div>
                      <p className={`${col.accent} text-xs tracking-[0.4em] mb-2 flex items-center gap-2`} style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                        <Icon className="w-3.5 h-3.5" /> {col.code}
                      </p>
                      <h3 className="text-3xl md:text-5xl font-black uppercase" style={{ fontFamily: "'Archivo Black', sans-serif" }}>
                        {col.name}
                      </h3>
                      <p className="mt-2 text-white/60 text-sm max-w-lg" style={{ fontFamily: "'Inter', sans-serif" }}>{col.tagline}</p>
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
                    {items.map(p => (
                      <ProductCard key={p.id} product={p} onAdd={addToCart} />
                    ))}
                  </div>
                </div>
              );
            })}
        </div>
      </section>

      {/* MUSIC / VAULT */}
      <section id="music" className="max-w-7xl mx-auto px-5 py-20">
        <div className="flex items-end justify-between mb-10 flex-wrap gap-4">
          <div>
            <p className="text-red-500 text-xs tracking-[0.5em] mb-2" style={{ fontFamily: "'JetBrains Mono', monospace" }}>// AUDIO CATALOG</p>
            <h2 className="text-6xl md:text-8xl font-black uppercase" style={{ fontFamily: "'Archivo Black', sans-serif" }}>
              THE <span className="text-red-600">VAULT</span>
            </h2>
          </div>
          <div className="flex gap-3 flex-wrap">
            {["SPOTIFY", "APPLE", "YOUTUBE", "SOUNDCLOUD"].map(p => (
              <a key={p} href="#" className="px-4 py-2 border border-white/20 hover:border-red-500 hover:text-red-500 text-xs tracking-widest transition-colors" style={{ fontFamily: "'JetBrains Mono', monospace" }}>{p}</a>
            ))}
          </div>
        </div>
        <div className="grid md:grid-cols-2 gap-2">
          {vaultTracks.map(tr => {
            const isPlaying = playingSrc === tr.src;
            return (
              <div key={tr.n} onClick={() => toggleTrack(tr.src)}
                className={`group flex items-center gap-4 p-4 border-l-2 transition-all cursor-pointer ${isPlaying ? "bg-red-600/15 border-red-600" : "bg-white/[0.03] hover:bg-red-600/10 border-transparent hover:border-red-600"}`}>
                <span className={`text-3xl font-black w-12 ${isPlaying ? "text-red-600" : "text-white/30 group-hover:text-red-600"}`} style={{ fontFamily: "'Archivo Black', sans-serif" }}>{tr.n}</span>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <p className="text-xl font-black tracking-wide" style={{ fontFamily: "'Archivo Black', sans-serif" }}>{tr.t}</p>
                    {tr.hot && <Flame className="w-4 h-4 text-red-500 fill-red-500" />}
                  </div>
                </div>
                <span className="text-sm text-white/50 tabular-nums" style={{ fontFamily: "'Inter', sans-serif" }}>{tr.d}</span>
                {isPlaying ? <Pause className="w-5 h-5 fill-red-500 text-red-500" /> : <Play className="w-5 h-5 opacity-0 group-hover:opacity-100 fill-red-500 text-red-500 transition-opacity" />}
              </div>
            );
          })}
        </div>
      </section>

      {/* SALES TRAINING EVENT */}
      <section id="event" className="max-w-7xl mx-auto px-5 py-20">
        <div className="mb-10">
          <p className="text-red-500 text-xs tracking-[0.5em] mb-2" style={{ fontFamily: "'JetBrains Mono', monospace" }}>// JUNE 2026</p>
          <h2 className="text-6xl md:text-8xl font-black uppercase leading-[0.9]" style={{ fontFamily: "'Archivo Black', sans-serif" }}>
            SALES <span className="text-red-600">TRAINING</span>
          </h2>
          <p className="mt-4 text-lg text-white/70 max-w-xl" style={{ fontFamily: "'Inter', sans-serif" }}>
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
              {[
                ["PROSPECTING & PIPELINE", "Build a bulletproof lead flow that never goes dry."],
                ["CLOSING PSYCHOLOGY", "Read the room. Handle objections. Lock in the deal."],
                ["SCALING & SYSTEMS", "Turn one rep into a team that moves units on autopilot."],
              ].map(([h, b]) => (
                <div key={h} className="flex items-start gap-3">
                  <Users className="w-5 h-5 text-red-500 mt-1 shrink-0" />
                  <div>
                    <p className="font-black text-lg" style={{ fontFamily: "'Archivo Black', sans-serif" }}>{h}</p>
                    <p className="text-sm text-white/60" style={{ fontFamily: "'Inter', sans-serif" }}>{b}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div id="contact" className="p-8 bg-red-600/10 border border-red-600/30">
            <p className="text-red-500 text-xs tracking-[0.5em] mb-4" style={{ fontFamily: "'JetBrains Mono', monospace" }}>// RSVP</p>
            <h3 className="text-3xl font-black mb-6" style={{ fontFamily: "'Archivo Black', sans-serif" }}>LOCK YOUR SEAT</h3>
            {rsvpSubmitted ? (
              <div className="text-center py-8">
                <p className="text-2xl font-black text-red-500 mb-2" style={{ fontFamily: "'Archivo Black', sans-serif" }}>YOU'RE IN.</p>
                <p className="text-white/70 text-sm" style={{ fontFamily: "'Inter', sans-serif" }}>We'll hit you with the details soon.</p>
              </div>
            ) : (
              <form onSubmit={handleRsvp} className="space-y-4">
                <input type="text" value={rsvpName} onChange={e => setRsvpName(e.target.value)} placeholder="Your name" required className="w-full bg-black border border-white/20 px-4 py-3 text-white placeholder:text-white/30 focus:border-red-500 focus:outline-none transition-colors" style={{ fontFamily: "'Inter', sans-serif" }} />
                <input type="email" value={rsvpEmail} onChange={e => setRsvpEmail(e.target.value)} placeholder="you@email.com" required className="w-full bg-black border border-white/20 px-4 py-3 text-white placeholder:text-white/30 focus:border-red-500 focus:outline-none transition-colors" style={{ fontFamily: "'Inter', sans-serif" }} />
                <button type="submit" className="w-full py-4 bg-red-600 hover:bg-red-500 text-black font-black text-lg tracking-widest transition-colors" style={{ fontFamily: "'Archivo Black', sans-serif" }}>
                  RSVP NOW
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-black border-t border-red-600/30 py-16">
        <div className="max-w-7xl mx-auto px-5 grid md:grid-cols-3 gap-12">
          <div>
            <h3 className="text-5xl font-black text-red-600 mb-4" style={{ fontFamily: "'Permanent Marker', cursive" }}>dMAG</h3>
            <p className="text-white/60 text-sm" style={{ fontFamily: "'Inter', sans-serif" }}>
              Independent. Unfiltered. From the border to your speakers.
            </p>
          </div>
          <div>
            <h4 className="text-xs tracking-[0.4em] text-white/40 mb-4" style={{ fontFamily: "'JetBrains Mono', monospace" }}>CONTACT</h4>
            <a href="mailto:synaptechintelligencenetwork@gmail.com" className="flex items-center gap-2 text-base font-bold hover:text-red-500 transition-colors break-all" style={{ fontFamily: "'Inter', sans-serif" }}>
              <Mail className="w-5 h-5 text-red-500 shrink-0" /> synaptechintelligencenetwork@gmail.com
            </a>
          </div>
          <div>
            <h4 className="text-xs tracking-[0.4em] text-white/40 mb-4" style={{ fontFamily: "'JetBrains Mono', monospace" }}>FOLLOW</h4>
            <div className="flex gap-3">
              <a href="#" className="w-10 h-10 flex items-center justify-center border border-white/20 hover:border-red-500 hover:text-red-500 transition-colors"><Instagram className="w-4 h-4" /></a>
              <a href="#" className="w-10 h-10 flex items-center justify-center border border-white/20 hover:border-red-500 hover:text-red-500 transition-colors"><Music2 className="w-4 h-4" /></a>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-5 mt-12 pt-8 border-t border-white/10 text-xs text-white/40 tracking-widest flex flex-wrap justify-between gap-2" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
          <span>© 2026 dMAG × SYNAPTECH × STINT-NET. ALL RIGHTS RESERVED.</span>
          <span className="text-red-500" style={{ fontFamily: "'Permanent Marker', cursive" }}>DON'T BLINK.</span>
        </div>
      </footer>

      {/* FLOATING CART BUTTON */}
      {cartCount > 0 && !cartOpen && (
        <button
          onClick={() => setCartOpen(true)}
          className="fixed bottom-6 right-6 z-40 flex items-center gap-3 px-5 py-4 bg-red-600 hover:bg-red-500 text-black font-black tracking-widest shadow-[0_10px_40px_-5px_rgba(220,38,38,0.6)] hover:scale-105 transition-all"
          style={{ fontFamily: "'Archivo Black', sans-serif" }}
          aria-label="Open cart"
        >
          <ShoppingBag className="w-5 h-5" />
          <span className="tabular-nums">{cartCount} · ${subtotal}</span>
        </button>
      )}

      {/* CART DRAWER */}
      <CartDrawer
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        cart={cart}
        subtotal={subtotal}
        shipping={shipping}
        discount={discount}
        total={total}
        promo={promo}
        setPromo={setPromo}
        updateQty={updateQty}
        removeLine={removeLine}
      />
    </div>
  );
};

/* ---------- Product Card ---------- */

const ProductCard = ({ product, onAdd }: { product: Product; onAdd: (p: Product, size: string) => void }) => {
  const [size, setSize] = useState(product.sizes[0]);
  const [hover, setHover] = useState(false);

  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className="group relative bg-black border border-white/10 hover:border-red-500 transition-all duration-300"
    >
      {/* Tag */}
      <div className={`absolute top-3 left-3 z-10 px-2 py-1 text-[10px] font-black tracking-[0.2em] ${tagStyles[product.tag]}`} style={{ fontFamily: "'Archivo Black', sans-serif" }}>
        {product.tag}
      </div>
      {/* Signal dot */}
      <div className="absolute top-3 right-3 z-10 flex items-center gap-1.5">
        <span className="signal-dot w-1.5 h-1.5 rounded-full bg-red-500 shadow-[0_0_6px_#dc2626]" />
        <span className="text-[9px] tracking-[0.3em] text-red-500" style={{ fontFamily: "'JetBrains Mono', monospace" }}>LIVE</span>
      </div>

      <div className="relative aspect-square overflow-hidden bg-zinc-900">
        <img
          src={product.img}
          alt={product.name}
          loading="lazy"
          width={1024}
          height={1024}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        {/* hover red wash */}
        <div className={`absolute inset-0 bg-gradient-to-t from-red-600/30 via-transparent to-transparent transition-opacity duration-500 ${hover ? "opacity-100" : "opacity-0"}`} />
        {/* scanner line on hover */}
        {hover && <div className="scanner-line absolute inset-0 pointer-events-none" />}
      </div>

      <div className="p-4">
        <h4 className="text-lg font-black uppercase leading-tight" style={{ fontFamily: "'Archivo Black', sans-serif" }}>{product.name}</h4>
        <p className="text-xs text-white/50 mt-1 italic" style={{ fontFamily: "'Permanent Marker', cursive" }}>"{product.line}"</p>

        {/* size pills */}
        <div className="flex flex-wrap gap-1 mt-3">
          {product.sizes.map(s => (
            <button
              key={s}
              onClick={() => setSize(s)}
              className={`px-2 py-1 text-[10px] tracking-widest border transition-colors ${
                size === s ? "bg-white text-black border-white" : "border-white/20 text-white/60 hover:border-white"
              }`}
              style={{ fontFamily: "'JetBrains Mono', monospace" }}
            >
              {s}
            </button>
          ))}
        </div>

        <div className="mt-4 flex items-center justify-between">
          <span className="text-2xl font-black text-red-500 tabular-nums" style={{ fontFamily: "'Archivo Black', sans-serif" }}>${product.price}</span>
          <button
            onClick={() => onAdd(product, size)}
            className="px-3 py-2 bg-white text-black font-black text-xs tracking-widest hover:bg-red-500 hover:text-black transition-colors"
            style={{ fontFamily: "'Archivo Black', sans-serif" }}
          >
            ADD +
          </button>
        </div>
      </div>
    </div>
  );
};

/* ---------- Cart Drawer ---------- */

const CartDrawer = ({
  open, onClose, cart, subtotal, shipping, discount, total, promo, setPromo, updateQty, removeLine,
}: {
  open: boolean;
  onClose: () => void;
  cart: CartLine[];
  subtotal: number;
  shipping: number;
  discount: number;
  total: number;
  promo: string;
  setPromo: (v: string) => void;
  updateQty: (id: string, size: string, delta: number) => void;
  removeLine: (id: string, size: string) => void;
}) => {
  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        className={`fixed inset-0 z-50 bg-black/70 backdrop-blur-sm transition-opacity duration-300 ${open ? "opacity-100" : "opacity-0 pointer-events-none"}`}
      />
      {/* Drawer */}
      <aside
        className={`fixed top-0 right-0 z-50 h-full w-full sm:w-[420px] bg-[#0a0a0a] border-l border-red-600/40 flex flex-col transition-transform duration-300 ${open ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="flex items-center justify-between p-5 border-b border-white/10">
          <div>
            <p className="text-red-500 text-[10px] tracking-[0.4em]" style={{ fontFamily: "'JetBrains Mono', monospace" }}>// SECURE TRANSACTION</p>
            <h3 className="text-2xl font-black mt-1" style={{ fontFamily: "'Archivo Black', sans-serif" }}>YOUR CART</h3>
          </div>
          <button onClick={onClose} aria-label="Close cart" className="w-9 h-9 flex items-center justify-center border border-white/20 hover:border-red-500 hover:text-red-500 transition-colors">
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {cart.length === 0 ? (
            <div className="text-center py-16">
              <Radio className="w-10 h-10 text-white/20 mx-auto mb-4" />
              <p className="text-white/60 tracking-widest text-sm" style={{ fontFamily: "'JetBrains Mono', monospace" }}>NO SIGNAL · CART EMPTY</p>
            </div>
          ) : (
            cart.map(line => (
              <div key={line.product.id + line.size} className="flex gap-3 border border-white/10 p-3 bg-white/[0.02]">
                <img src={line.product.img} alt={line.product.name} className="w-20 h-20 object-cover" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-black uppercase truncate" style={{ fontFamily: "'Archivo Black', sans-serif" }}>{line.product.name}</p>
                  <p className="text-[10px] text-white/40 tracking-widest mt-0.5" style={{ fontFamily: "'JetBrains Mono', monospace" }}>SIZE · {line.size}</p>
                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center border border-white/20">
                      <button onClick={() => updateQty(line.product.id, line.size, -1)} className="w-7 h-7 flex items-center justify-center hover:bg-red-600 hover:text-black transition-colors"><Minus className="w-3 h-3" /></button>
                      <span className="w-7 text-center text-sm tabular-nums" style={{ fontFamily: "'JetBrains Mono', monospace" }}>{line.qty}</span>
                      <button onClick={() => updateQty(line.product.id, line.size, 1)} className="w-7 h-7 flex items-center justify-center hover:bg-red-600 hover:text-black transition-colors"><Plus className="w-3 h-3" /></button>
                    </div>
                    <span className="text-sm font-black text-red-500 tabular-nums" style={{ fontFamily: "'Archivo Black', sans-serif" }}>
                      ${line.product.price * line.qty}
                    </span>
                  </div>
                </div>
                <button onClick={() => removeLine(line.product.id, line.size)} aria-label="Remove" className="text-white/30 hover:text-red-500 transition-colors">
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))
          )}
        </div>

        {cart.length > 0 && (
          <div className="border-t border-white/10 p-5 space-y-4">
            <div className="flex gap-2">
              <input
                value={promo}
                onChange={e => setPromo(e.target.value)}
                placeholder="PROMO CODE"
                className="flex-1 bg-black border border-white/20 px-3 py-2 text-sm tracking-widest text-white placeholder:text-white/30 focus:border-red-500 focus:outline-none"
                style={{ fontFamily: "'JetBrains Mono', monospace" }}
              />
              <button className="px-4 py-2 border border-white/20 hover:border-red-500 hover:text-red-500 text-xs tracking-widest" style={{ fontFamily: "'JetBrains Mono', monospace" }}>APPLY</button>
            </div>

            <div className="space-y-1.5 text-sm" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
              <Row label="SUBTOTAL" value={`$${subtotal}`} />
              {discount > 0 && <Row label="DISCOUNT" value={`-$${discount}`} accent />}
              <Row label="SHIPPING" value={shipping === 0 ? "FREE" : `$${shipping}`} />
              <div className="border-t border-white/10 my-2" />
              <Row label="TOTAL" value={`$${total}`} large />
            </div>

            <button
              disabled
              className="w-full py-4 bg-red-600/40 text-black/60 font-black tracking-widest cursor-not-allowed flex items-center justify-center gap-2"
              style={{ fontFamily: "'Archivo Black', sans-serif" }}
            >
              <Lock className="w-4 h-4" /> CHECKOUT COMING SOON
            </button>
            <p className="text-[10px] text-white/40 text-center tracking-widest flex items-center justify-center gap-2" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
              <Zap className="w-3 h-3 text-red-500" /> SECURE STRIPE PAYMENTS · NEXT DROP
            </p>
          </div>
        )}
      </aside>
    </>
  );
};

const Row = ({ label, value, accent, large }: { label: string; value: string; accent?: boolean; large?: boolean }) => (
  <div className={`flex justify-between ${large ? "text-lg font-black" : ""}`}>
    <span className={`tracking-widest ${large ? "text-white" : "text-white/60"}`}>{label}</span>
    <span className={`tabular-nums ${accent ? "text-red-500" : large ? "text-red-500" : "text-white"}`}>{value}</span>
  </div>
);

export default DMag;
