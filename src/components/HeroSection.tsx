
import { Button } from "@/components/ui/button";
import { MapPin, Store } from "lucide-react";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-b from-white to-primary/5 pt-16">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto space-y-6">
          <div className="inline-flex items-center space-x-2 bg-primary/10 text-primary px-4 py-2 rounded-full mb-6 animate-float">
            <MapPin className="w-4 h-4" />
            <span className="text-sm font-medium">Find Jana Aushadhi Kendras near you</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold text-secondary leading-tight">
            Making Healthcare 
            <span className="text-primary"> Accessible</span> and 
            <span className="text-primary"> Affordable</span>
          </h1>
          
          <p className="text-lg text-gray-600 mt-6">
            Locate nearby Jana Aushadhi Kendras, compare medicine prices, and get AI-powered prescription assistance all in one place.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4 mt-8">
            <Link to="/stores">
              <Button className="w-full sm:w-auto bg-primary text-white hover:bg-primary/90 h-12 px-8">
                Find Nearby Stores
              </Button>
            </Link>
            <Link to="/compare">
              <Button variant="outline" className="w-full sm:w-auto h-12 px-8">
                Compare Prices
              </Button>
            </Link>
          </div>
          
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Link to="/sell">
              <Button variant="ghost" className="flex items-center">
                <Store className="w-4 h-4 mr-2" />
                <span>Are you a store owner? Sell with us</span>
              </Button>
            </Link>
          </div>
          
          <div className="mt-6 flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Link to="/signin" className="text-primary hover:underline">Sign In</Link>
            <span className="hidden sm:inline text-gray-400">|</span>
            <Link to="/signup" className="text-primary hover:underline">Create Account</Link>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-white to-transparent pointer-events-none" />
    </div>
  );
};

export default HeroSection;
