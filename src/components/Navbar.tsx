import { useState } from "react";
import { Menu, X, Box } from "lucide-react";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  const links = [
    { label: "Showroom", href: "#showroom" },
    { label: "Make It Real", href: "#builder" },
    { label: "Process", href: "#process" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-card rounded-none border-x-0 border-t-0">
      <div className="container mx-auto flex items-center justify-between px-6 py-4">
        <a href="#" className="flex items-center gap-2 font-heading text-xl font-bold tracking-tight text-foreground">
          <Box className="h-6 w-6 text-primary" />
          3DBrozzz
        </a>

        <div className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              {l.label}
            </a>
          ))}
          <a
            href="#builder"
            className="rounded-lg bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground transition-all hover:brightness-110"
          >
            Start Building
          </a>
        </div>

        <button onClick={() => setOpen(!open)} className="text-foreground md:hidden">
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {open && (
        <div className="flex flex-col gap-4 px-6 pb-6 md:hidden">
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              onClick={() => setOpen(false)}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              {l.label}
            </a>
          ))}
          <a
            href="#builder"
            onClick={() => setOpen(false)}
            className="rounded-lg bg-primary px-5 py-2 text-center text-sm font-semibold text-primary-foreground"
          >
            Start Building
          </a>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
