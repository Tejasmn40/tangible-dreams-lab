import { Box } from "lucide-react";

const Footer = () => (
  <footer className="border-t border-border px-6 py-12">
    <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 md:flex-row">
      <a href="#" className="flex items-center gap-2 font-heading text-lg font-bold text-foreground">
        <Box className="h-5 w-5 text-primary" />
        3DBrozzz
      </a>
      <p className="text-sm text-muted-foreground">
        © {new Date().getFullYear()} 3DBrozzz. All rights reserved.
      </p>
      <div className="flex gap-6">
        {["Twitter", "Discord", "GitHub"].map((s) => (
          <a key={s} href="#" className="text-sm text-muted-foreground transition-colors hover:text-primary">
            {s}
          </a>
        ))}
      </div>
    </div>
  </footer>
);

export default Footer;
