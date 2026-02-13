import { useState } from "react";
import heroBg from "@/assets/hero-bg.jpg";
import GlitchHeader from "@/components/GlitchHeader";
import TrackPlayer from "@/components/TrackPlayer";
import SubscriptionTiers from "@/components/SubscriptionTiers";
import EasterEggModal from "@/components/EasterEggModal";
import ProtectedSections from "@/components/ProtectedSections";
import AudioVisualizer from "@/components/AudioVisualizer";
import { Shield, Terminal } from "lucide-react";

const Index = () => {
  const [easterEggOpen, setEasterEggOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background text-foreground cyber-grid">
      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex flex-col items-center justify-center overflow-hidden">
        {/* Background image */}
        <div className="absolute inset-0">
          <img src={heroBg} alt="" className="w-full h-full object-cover opacity-30" />
          <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, hsl(var(--dark-base) / 0.6), hsl(var(--dark-base)))" }} />
        </div>

        {/* Scan line effect */}
        <div className="absolute inset-0 scan-effect pointer-events-none" />

        <div className="relative z-10 w-full max-w-5xl mx-auto px-6">
          <GlitchHeader onTripleClick={() => setEasterEggOpen(true)} />
          
          <div className="mt-8">
            <AudioVisualizer />
          </div>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              className="px-8 py-3 border font-display text-sm font-bold tracking-widest transition-all hover:scale-105 neon-border"
              style={{
                borderColor: "hsl(var(--primary) / 0.5)",
                color: "hsl(var(--primary))",
                background: "hsl(var(--primary) / 0.05)",
              }}
            >
              <Shield className="w-4 h-4 inline mr-2" />
              REQUEST ACCESS
            </button>
            <button
              className="px-8 py-3 border font-display text-sm font-bold tracking-widest transition-all hover:scale-105"
              style={{
                borderColor: "hsl(var(--muted-foreground) / 0.3)",
                color: "hsl(var(--muted-foreground))",
              }}
            >
              <Terminal className="w-4 h-4 inline mr-2" />
              VIEW INTEL
            </button>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-5xl mx-auto px-6 space-y-24 pb-24">
        {/* Status Bar */}
        <div className="flex items-center gap-4 py-3 px-4 border-y" style={{ borderColor: "hsl(var(--border))" }}>
          <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: "hsl(var(--neon-green))" }} />
          <span className="text-xs font-mono text-muted-foreground">
            SYSTEM STATUS: <span style={{ color: "hsl(var(--neon-green))" }}>OPERATIONAL</span>
          </span>
          <span className="text-xs font-mono text-muted-foreground ml-auto">
            UPLINK: ACTIVE • LATENCY: 12ms
          </span>
        </div>

        {/* Track Player */}
        <TrackPlayer />

        {/* Protected Sections */}
        <ProtectedSections />

        {/* Subscription Tiers */}
        <SubscriptionTiers />

        {/* Footer */}
        <footer className="border-t pt-8 text-center" style={{ borderColor: "hsl(var(--border))" }}>
          <p className="text-xs font-mono text-muted-foreground tracking-widest">
            © 2026 SYNAPTECH INTELLIGENCE SYSTEMS — ALL SIGNALS ENCRYPTED
          </p>
          <p className="text-xs font-mono text-muted-foreground/50 mt-2">
            [ UNAUTHORIZED ACCESS WILL BE TRACED AND REPORTED ]
          </p>
        </footer>
      </div>

      {/* Easter Egg Modal */}
      <EasterEggModal isOpen={easterEggOpen} onClose={() => setEasterEggOpen(false)} />
    </div>
  );
};

export default Index;
