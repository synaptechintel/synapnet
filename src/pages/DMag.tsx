import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, ShoppingBag, Flame, MapPin, Instagram, Music2, Play, Pause } from "lucide-react";
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

const tour = [
  { date: "MAY 14", city: "DALLAS, TX", venue: "TREES DEEP ELLUM", status: "SOLD OUT" },
  { date: "MAY 22", city: "HOUSTON, TX", venue: "WAREHOUSE LIVE", status: "ON SALE" },
  { date: "JUN 03", city: "ATLANTA, GA", venue: "THE MASQUERADE", status: "ON SALE" },
  { date: "JUN 18", city: "LOS ANGELES, CA", venue: "THE NOVO", status: "FEW LEFT" },
];

const DMag = () => {
  const [cart, setCart] = useState<number[]>([]);

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
            <a href="#tour" className="hover:text-red-500 transition-colors">TOUR</a>
            <a href="#contact" className="hover:text-red-500 transition-colors">BOOK</a>
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
              THE <span className="text-red-600">TAPE</span>
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
          {[
            { n: "01", t: "THE COLONY (REMASTERED)", d: "3:30", hot: true },
            { n: "02", t: "SLIME 'EM OUT", d: "4:43" },
            { n: "03", t: "LEW STERRETT", d: "2:37", hot: true },
            { n: "04", t: "FILTHY", d: "2:49" },
            { n: "05", t: "SNITCH", d: "1:42" },
            { n: "06", t: "SILENT HILL", d: "3:06" },
            { n: "07", t: "FINAL FORM", d: "5:09" },
            { n: "08", t: "PLUG PORTFOLIO", d: "3:16", hot: true },
          ].map((tr) => (
            <div key={tr.n} className="group flex items-center gap-4 p-4 bg-white/[0.03] hover:bg-red-600/10 border-l-2 border-transparent hover:border-red-600 transition-all cursor-pointer">
              <span className="text-3xl font-black text-white/30 group-hover:text-red-600 w-12" style={{ fontFamily: "'Archivo Black', sans-serif" }}>{tr.n}</span>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <p className="text-xl font-black tracking-wide" style={{ fontFamily: "'Archivo Black', sans-serif" }}>{tr.t}</p>
                  {tr.hot && <Flame className="w-4 h-4 text-red-500 fill-red-500" />}
                </div>
              </div>
              <span className="text-sm text-white/50 tabular-nums" style={{ fontFamily: "'Inter', sans-serif" }}>{tr.d}</span>
              <Play className="w-5 h-5 opacity-0 group-hover:opacity-100 fill-red-500 text-red-500 transition-opacity" />
            </div>
          ))}
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

      {/* TOUR */}
      <section id="tour" className="max-w-7xl mx-auto px-5 py-24">
        <div className="mb-12">
          <p className="text-red-500 text-sm tracking-[0.5em] mb-2" style={{ fontFamily: "'Permanent Marker', cursive" }}>// 2026 RUN</p>
          <h2 className="text-7xl md:text-9xl font-black uppercase leading-[0.9]" style={{ fontFamily: "'Archivo Black', sans-serif" }}>
            DON'T BLINK <span className="text-red-600">TOUR</span>
          </h2>
        </div>

        <div className="space-y-1">
          {tour.map((t) => (
            <div key={t.date} className="grid grid-cols-12 gap-4 items-center p-5 bg-white/[0.03] hover:bg-red-600/10 border-l-4 border-red-600 transition-all">
              <div className="col-span-3 md:col-span-2 text-2xl md:text-3xl font-black text-red-500" style={{ fontFamily: "'Archivo Black', sans-serif" }}>
                {t.date}
              </div>
              <div className="col-span-9 md:col-span-5">
                <p className="text-xl md:text-2xl font-black tracking-wide flex items-center gap-2" style={{ fontFamily: "'Archivo Black', sans-serif" }}>
                  <MapPin className="w-5 h-5 text-red-500" /> {t.city}
                </p>
              </div>
              <div className="col-span-7 md:col-span-3 text-sm text-white/60 tracking-widest" style={{ fontFamily: "'Inter', sans-serif" }}>
                {t.venue}
              </div>
              <div className="col-span-5 md:col-span-2 text-right">
                <span className={`inline-block px-3 py-1.5 text-xs font-black tracking-widest ${
                  t.status === "SOLD OUT" ? "bg-white/10 text-white/40" : "bg-red-600 text-black hover:bg-red-500 cursor-pointer"
                }`} style={{ fontFamily: "'Archivo Black', sans-serif" }}>
                  {t.status === "SOLD OUT" ? t.status : "TIX"}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CONTACT / FOOTER */}
      <footer id="contact" className="bg-black border-t border-red-600/30 py-16">
        <div className="max-w-7xl mx-auto px-5 grid md:grid-cols-3 gap-12">
          <div>
            <h3 className="text-5xl font-black text-red-600 mb-4" style={{ fontFamily: "'Permanent Marker', cursive" }}>dMAG</h3>
            <p className="text-white/60 text-sm" style={{ fontFamily: "'Inter', sans-serif" }}>
              Independent. Unfiltered. From the border to your speakers.
            </p>
          </div>
          <div>
            <h4 className="text-xs tracking-[0.4em] text-white/40 mb-4" style={{ fontFamily: "'Inter', sans-serif" }}>BOOKING / PRESS</h4>
            <p className="text-lg font-bold" style={{ fontFamily: "'Inter', sans-serif" }}>booking@dmag.world</p>
            <p className="text-lg font-bold" style={{ fontFamily: "'Inter', sans-serif" }}>press@dmag.world</p>
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
