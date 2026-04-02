import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ShowroomSection from "@/components/ShowroomSection";
import BuilderSection from "@/components/BuilderSection";
import ProcessSection from "@/components/ProcessSection";
import Footer from "@/components/Footer";

const Index = () => (
  <div className="min-h-screen bg-background text-foreground">
    <Navbar />
    <HeroSection />
    <ShowroomSection />
    <BuilderSection />
    <ProcessSection />
    <Footer />
  </div>
);

export default Index;
