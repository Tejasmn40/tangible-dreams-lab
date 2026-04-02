import { ArrowDown, Layers, Zap, Shield } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden section-padding pt-32 grid-pattern">
      {/* Glow orbs */}
      <div className="pointer-events-none absolute left-1/4 top-1/4 h-96 w-96 rounded-full bg-primary/10 blur-[120px]" />
      <div className="pointer-events-none absolute bottom-1/4 right-1/4 h-80 w-80 rounded-full bg-secondary/15 blur-[100px]" />

      <div className="relative z-10 mx-auto max-w-5xl text-center">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-xs font-medium text-primary">
          <Zap className="h-3 w-3" />
          Premium 3D Printing Platform
        </div>

        <h1 className="font-heading text-5xl font-bold leading-tight tracking-tight md:text-7xl lg:text-8xl">
          From Pixels
          <br />
          <span className="text-gradient">To Physical</span>
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground md:text-xl">
          Upload your 3D model, customize materials and finishes, and watch your
          creation come to life. Professional-grade manufacturing at your fingertips.
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <a
            href="#builder"
            className="group flex items-center gap-2 rounded-xl bg-primary px-8 py-3.5 font-heading text-sm font-semibold text-primary-foreground transition-all hover:brightness-110 hover:shadow-lg hover:shadow-primary/25"
          >
            Make It Real
            <ArrowDown className="h-4 w-4 transition-transform group-hover:translate-y-0.5" />
          </a>
          <a
            href="#showroom"
            className="glass-card flex items-center gap-2 rounded-xl px-8 py-3.5 font-heading text-sm font-semibold text-foreground transition-all"
          >
            Browse Catalog
          </a>
        </div>

        {/* Stats */}
        <div className="mt-20 grid grid-cols-3 gap-8 border-t border-border pt-10">
          {[
            { icon: Layers, label: "Models Printed", value: "12K+" },
            { icon: Shield, label: "Quality Rate", value: "99.7%" },
            { icon: Zap, label: "Avg Turnaround", value: "48h" },
          ].map((stat) => (
            <div key={stat.label} className="flex flex-col items-center gap-1">
              <stat.icon className="mb-2 h-5 w-5 text-primary" />
              <span className="font-heading text-2xl font-bold md:text-3xl">{stat.value}</span>
              <span className="text-xs text-muted-foreground">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
