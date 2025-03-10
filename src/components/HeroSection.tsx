
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <section className="pt-24 pb-12 md:pt-32 md:pb-24">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center space-y-4 text-center">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
              Your Health, Our Priority
            </h1>
            <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl">
              Find medicines, compare prices, and get expert advice - all in one place.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 mt-8">
            <Link to="/signin">
              <Button className="w-full sm:w-auto">Sign In</Button>
            </Link>
            <Link to="/signup">
              <Button variant="outline" className="w-full sm:w-auto">Create Account</Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
