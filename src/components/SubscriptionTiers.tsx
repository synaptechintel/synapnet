import { Shield, Zap, Crown, Lock } from "lucide-react";

const tiers = [
  {
    name: "SIGNAL",
    price: 19,
    icon: Zap,
    color: "--neon-cyan",
    features: [
      "Basic signal access",
      "Community feed",
      "Standard audio quality",
      "Monthly intelligence brief",
    ],
    cta: "INITIATE",
  },
  {
    name: "OPERATOR",
    price: 49,
    icon: Shield,
    color: "--neon-green",
    featured: true,
    features: [
      "All Signal features",
      "Intelligence Archive access",
      "AI Automations Store",
      "Priority signal decryption",
      "Operator-only channels",
    ],
    cta: "DEPLOY",
  },
  {
    name: "BLACK DIVISION",
    price: 99,
    icon: Crown,
    color: "--neon-red",
    features: [
      "All Operator features",
      "Pen Testing Scripts",
      "Encrypted artifact downloads",
      "Auto-play classified tracks",
      "Direct line to command",
      "Black Division badge",
    ],
    cta: "CLASSIFIED",
  },
];

const SubscriptionTiers = () => {
  return (
    <section>
      <div className="mb-8 text-center">
        <h3 className="font-display text-sm tracking-[0.4em] uppercase text-muted-foreground mb-1">
          // ACCESS LEVELS
        </h3>
        <h2 className="font-display text-2xl md:text-3xl font-bold neon-glow-cyan" style={{ color: "hsl(var(--primary))" }}>
          CLEARANCE TIERS
        </h2>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {tiers.map((tier) => {
          const Icon = tier.icon;
          return (
            <div
              key={tier.name}
              className={`relative border p-6 transition-all hover:scale-[1.02] group ${
                tier.featured ? "neon-border-green" : ""
              }`}
              style={{
                borderColor: tier.featured
                  ? undefined
                  : `hsl(var(${tier.color}) / 0.2)`,
                background: "hsl(var(--dark-surface))",
              }}
            >
              {tier.featured && (
                <div
                  className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 text-xs font-mono tracking-widest uppercase"
                  style={{
                    background: "hsl(var(--neon-green))",
                    color: "hsl(var(--dark-base))",
                  }}
                >
                  RECOMMENDED
                </div>
              )}

              <div className="text-center mb-6">
                <Icon
                  className="w-8 h-8 mx-auto mb-3"
                  style={{ color: `hsl(var(${tier.color}))` }}
                />
                <h3 className="font-display text-lg font-bold tracking-wider" style={{ color: `hsl(var(${tier.color}))` }}>
                  {tier.name}
                </h3>
                <div className="mt-3">
                  <span className="text-4xl font-display font-black">${tier.price}</span>
                  <span className="text-sm text-muted-foreground font-mono">/mo</span>
                </div>
              </div>

              <ul className="space-y-3 mb-8">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2 text-sm">
                    <span style={{ color: `hsl(var(${tier.color}))` }} className="mt-0.5">▸</span>
                    <span className="text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>

              <button
                className="w-full py-3 border font-display text-sm font-bold tracking-widest transition-all hover:shadow-lg"
                style={{
                  borderColor: `hsl(var(${tier.color}) / 0.5)`,
                  color: `hsl(var(${tier.color}))`,
                  background: `hsl(var(${tier.color}) / 0.05)`,
                }}
              >
                {tier.cta}
              </button>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default SubscriptionTiers;
