import { Upload, Cog, Truck, CheckCircle } from "lucide-react";

const steps = [
  { icon: Upload, title: "Upload", desc: "Drop your STL, GLB, or OBJ file" },
  { icon: Cog, title: "Configure", desc: "Choose material, infill, and finish" },
  { icon: Truck, title: "We Print & Ship", desc: "Professional manufacturing & delivery" },
  { icon: CheckCircle, title: "Enjoy", desc: "Your idea, now in your hands" },
];

const ProcessSection = () => (
  <section id="process" className="section-padding">
    <div className="mx-auto max-w-5xl">
      <div className="mb-16 text-center">
        <span className="mb-3 inline-block text-xs font-semibold uppercase tracking-widest text-primary">
          How It Works
        </span>
        <h2 className="font-heading text-4xl font-bold md:text-5xl">
          Simple <span className="text-gradient">Process</span>
        </h2>
      </div>

      <div className="relative grid gap-8 md:grid-cols-4">
        {/* Connector line */}
        <div className="absolute left-0 right-0 top-12 hidden h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent md:block" />

        {steps.map((step, i) => (
          <div key={step.title} className="glass-card relative rounded-2xl p-6 text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
              <step.icon className="h-5 w-5 text-primary" />
            </div>
            <span className="absolute right-4 top-4 font-heading text-xs font-bold text-muted-foreground">
              0{i + 1}
            </span>
            <h3 className="font-heading text-lg font-semibold">{step.title}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{step.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default ProcessSection;
