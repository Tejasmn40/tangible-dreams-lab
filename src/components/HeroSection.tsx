import { useState } from "react";
import { ArrowDown, Zap, Sparkles, Layers, Timer } from "lucide-react";
import ModelViewer3D from "./ModelViewer3D";

const heroColors = [
  { name: "Lime", value: "#a3e635" },
  { name: "Cyan", value: "#22d3ee" },
  { name: "Orange", value: "#f97316" },
  { name: "Pink", value: "#f472b6" },
  { name: "Red", value: "#ef4444" },
  { name: "Blue", value: "#3b82f6" },
];

const HeroSection = () => {
  const [selectedColor, setSelectedColor] = useState(0);
  const [wireframe, setWireframe] = useState(false);

  return (
    <section className="relative min-h-screen overflow-hidden grid-pattern">
      {/* Glow orbs */}
      <div className="pointer-events-none absolute left-1/4 top-1/4 h-96 w-96 rounded-full bg-secondary/20 blur-[150px]" />
      <div className="pointer-events-none absolute bottom-1/3 right-1/3 h-72 w-72 rounded-full bg-primary/10 blur-[120px]" />

      <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl flex-col justify-center px-6 pt-24 lg:flex-row lg:items-center lg:gap-8 lg:px-8">
        {/* Left — Text */}
        <div className="flex-1 pb-12 lg:pb-0">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-secondary/30 bg-secondary/10 px-4 py-1.5 text-xs font-medium tracking-wider text-secondary">
            <span className="h-2 w-2 rounded-full bg-secondary animate-pulse" />
            ONLINE &bull; Ready to Print
          </div>

          <h1 className="font-heading text-5xl font-bold leading-[1.05] tracking-tight md:text-6xl lg:text-7xl">
            Make Your
            <br />
            <span className="text-gradient">Touchable.</span>
          </h1>

          <p className="mt-6 max-w-md text-base text-muted-foreground leading-relaxed">
            From concept to creation in hours. Upload, customize,
            print. It's that simple — and this beautiful.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <a
              href="#builder"
              className="group flex items-center gap-2 rounded-xl bg-secondary px-7 py-3.5 font-heading text-sm font-semibold text-secondary-foreground transition-all hover:brightness-110 hover:shadow-lg hover:shadow-secondary/25"
            >
              <Zap className="h-4 w-4" />
              Start Building
            </a>
            <a
              href="#showroom"
              className="glass-card flex items-center gap-2 rounded-xl px-7 py-3.5 font-heading text-sm font-semibold text-foreground transition-all hover:border-primary/30"
            >
              <Sparkles className="h-4 w-4 text-primary" />
              Browse Catalog
            </a>
          </div>

          {/* Stats */}
          <div className="mt-16 flex gap-10">
            {[
              { icon: Layers, value: "10,000+", label: "MODELS PRINTED" },
              { icon: Sparkles, value: "50+", label: "MATERIALS" },
              { icon: Timer, value: "24h", label: "FAST DELIVERY" },
            ].map((s) => (
              <div key={s.label} className="flex flex-col">
                <div className="flex items-center gap-2">
                  <s.icon className="h-4 w-4 text-secondary" />
                  <span className="font-heading text-xl font-bold tracking-tight">{s.value}</span>
                </div>
                <span className="mt-0.5 text-[10px] font-medium tracking-widest text-muted-foreground">{s.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right — 3D Model */}
        <div className="relative flex-1">
          {/* Drag hint */}
          <div className="mb-3 text-center">
            <span className="text-xs tracking-wider text-muted-foreground">
              ← Drag to rotate →
            </span>
          </div>

          {/* Canvas container */}
          <div className="relative aspect-square w-full max-w-[520px] mx-auto">
            <ModelViewer3D color={heroColors[selectedColor].value} wireframe={wireframe} />
          </div>

          {/* Bottom controls */}
          <div className="mx-auto mt-4 flex max-w-[520px] items-center justify-between rounded-xl border border-border/40 bg-card/60 px-5 py-3 backdrop-blur-sm">
            {/* Color swatches */}
            <div className="flex items-center gap-2.5">
              {heroColors.map((c, i) => (
                <button
                  key={c.name}
                  onClick={() => setSelectedColor(i)}
                  className={`h-8 w-8 rounded-full border-2 transition-all ${
                    i === selectedColor
                      ? "scale-110 border-foreground shadow-lg"
                      : "border-transparent hover:scale-105 hover:border-muted-foreground/30"
                  }`}
                  style={{ backgroundColor: c.value }}
                  title={c.name}
                />
              ))}
            </div>

            {/* Wireframe toggle */}
            <button
              onClick={() => setWireframe(!wireframe)}
              className={`rounded-lg px-5 py-2 font-heading text-xs font-bold tracking-widest transition-all ${
                wireframe
                  ? "bg-secondary text-secondary-foreground shadow-md shadow-secondary/20"
                  : "border border-border text-muted-foreground hover:border-secondary hover:text-foreground"
              }`}
            >
              WIREFRAME {wireframe ? "ON" : "OFF"}
            </button>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground">
        <span className="font-heading text-[10px] tracking-[0.3em]">EXPLORE</span>
        <ArrowDown className="h-4 w-4 animate-bounce" />
      </div>
    </section>
  );
};

export default HeroSection;
