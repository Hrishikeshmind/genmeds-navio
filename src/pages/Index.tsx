
import NavigationHeader from "@/components/NavigationHeader";
import HeroSection from "@/components/HeroSection";
import Features from "@/components/Features";
import HowItWorks from "@/components/HowItWorks";
import Testimonials from "@/components/Testimonials";
import FAQ from "@/components/FAQ";

const Index = () => {
  return (
    <div className="min-h-screen bg-white">
      <NavigationHeader />
      <HeroSection />
      <Features />
      <HowItWorks />
      <Testimonials />
      <FAQ />
    </div>
  );
};

export default Index;
