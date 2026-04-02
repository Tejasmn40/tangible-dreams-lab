import { useState } from "react";
import { Palette, Layers, Settings, ArrowRight } from "lucide-react";
import ModelViewer3D from "./ModelViewer3D";

const materials = [
  { name: "PLA", pricePerG: 0.04, desc: "Standard, biodegradable" },
  { name: "PETG", pricePerG: 0.06, desc: "Strong, heat resistant" },
  { name: "TPU", pricePerG: 0.08, desc: "Flexible, rubber-like" },
];

const colors = [
  { name: "Matte Black", value: "#1a1a1a" },
  { name: "Arctic White", value: "#f5f5f5" },
  { name: "Desert Sand", value: "#DDA15E" },
  { name: "Forest Green", value: "#606C38" },
  { name: "Ocean Blue", value: "#2563eb" },
  { name: "Crimson", value: "#dc2626" },
];

const BuilderSection = () => {
  const [material, setMaterial] = useState(0);
  const [infill, setInfill] = useState(20);
  const [layerHeight, setLayerHeight] = useState(0.2);
  const [selectedColor, setSelectedColor] = useState(0);
  const [wireframe, setWireframe] = useState(true);

  const baseWeight = 45;
  const weight = baseWeight * (infill / 100 + 0.5);
  const qualityMultiplier = layerHeight <= 0.1 ? 1.5 : layerHeight <= 0.2 ? 1.0 : 0.8;
  const price = (weight * materials[material].pricePerG * qualityMultiplier + 5).toFixed(2);

  return (
    <section id="builder" className="section-padding grid-pattern">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 text-center">
          <span className="mb-3 inline-block text-xs font-semibold uppercase tracking-widest text-primary">
            Custom Builder
          </span>
          <h2 className="font-heading text-4xl font-bold md:text-5xl">
            Make It <span className="text-gradient">Real</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
            Upload your 3D model, configure materials and finish, and get an instant price estimate.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* 3D Viewer */}
          <div className="glass-card flex min-h-[500px] flex-col rounded-2xl overflow-hidden">
            <div className="relative flex-1">
              <ModelViewer3D color={colors[selectedColor].value} wireframe={wireframe} />
            </div>

            {/* Controls bar */}
            <div className="flex items-center justify-between border-t border-border/30 px-5 py-3">
              {/* Color picker */}
              <div className="flex items-center gap-3">
                <Palette className="h-4 w-4 text-muted-foreground" />
                {colors.map((c, i) => (
                  <button
                    key={c.name}
                    onClick={() => setSelectedColor(i)}
                    className={`h-7 w-7 rounded-full border-2 transition-all ${
                      i === selectedColor
                        ? "scale-110 border-primary shadow-lg"
                        : "border-transparent hover:scale-105"
                    }`}
                    style={{ backgroundColor: c.value }}
                    title={c.name}
                  />
                ))}
              </div>

              {/* Wireframe toggle */}
              <button
                onClick={() => setWireframe(!wireframe)}
                className={`rounded-lg px-4 py-1.5 font-heading text-xs font-semibold tracking-wider transition-all ${
                  wireframe
                    ? "bg-secondary text-secondary-foreground"
                    : "border border-border text-muted-foreground hover:border-secondary"
                }`}
              >
                WIREFRAME {wireframe ? "ON" : "OFF"}
              </button>
            </div>
          </div>

          {/* Configuration panel */}
          <div className="flex flex-col gap-6">
            {/* Material */}
            <div className="glass-card rounded-2xl p-6">
              <div className="mb-4 flex items-center gap-2 text-sm font-semibold text-foreground">
                <Layers className="h-4 w-4 text-primary" />
                Material
              </div>
              <div className="grid grid-cols-3 gap-3">
                {materials.map((m, i) => (
                  <button
                    key={m.name}
                    onClick={() => setMaterial(i)}
                    className={`rounded-xl border p-3 text-left transition-all ${
                      i === material
                        ? "border-primary bg-primary/10"
                        : "border-border hover:border-primary/30"
                    }`}
                  >
                    <span className="block font-heading text-sm font-semibold">{m.name}</span>
                    <span className="mt-0.5 block text-xs text-muted-foreground">{m.desc}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Infill */}
            <div className="glass-card rounded-2xl p-6">
              <div className="mb-4 flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
                  <Settings className="h-4 w-4 text-primary" />
                  Infill Density
                </div>
                <span className="font-heading text-sm font-bold text-primary">{infill}%</span>
              </div>
              <input
                type="range"
                min={10}
                max={100}
                step={5}
                value={infill}
                onChange={(e) => setInfill(Number(e.target.value))}
                className="w-full accent-primary"
              />
              <div className="mt-2 flex justify-between text-xs text-muted-foreground">
                <span>Light (10%)</span>
                <span>Solid (100%)</span>
              </div>
            </div>

            {/* Layer Height */}
            <div className="glass-card rounded-2xl p-6">
              <div className="mb-4 flex items-center gap-2 text-sm font-semibold text-foreground">
                <Layers className="h-4 w-4 text-primary" />
                Layer Height (Finish Quality)
              </div>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { value: 0.1, label: "Ultra Fine", desc: "0.1mm" },
                  { value: 0.2, label: "Standard", desc: "0.2mm" },
                  { value: 0.3, label: "Draft", desc: "0.3mm" },
                ].map((lh) => (
                  <button
                    key={lh.value}
                    onClick={() => setLayerHeight(lh.value)}
                    className={`rounded-xl border p-3 text-left transition-all ${
                      layerHeight === lh.value
                        ? "border-primary bg-primary/10"
                        : "border-border hover:border-primary/30"
                    }`}
                  >
                    <span className="block font-heading text-sm font-semibold">{lh.label}</span>
                    <span className="mt-0.5 block text-xs text-muted-foreground">{lh.desc}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Price */}
            <div className="glass-card glow-primary rounded-2xl p-6">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs text-muted-foreground">Estimated Price</span>
                  <div className="font-heading text-4xl font-bold text-primary">${price}</div>
                  <span className="text-xs text-muted-foreground">
                    {materials[material].name} · {infill}% infill · {layerHeight}mm layers
                  </span>
                </div>
                <button className="flex items-center gap-2 rounded-xl bg-primary px-6 py-3 font-heading text-sm font-semibold text-primary-foreground transition-all hover:brightness-110">
                  Order Now
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BuilderSection;
