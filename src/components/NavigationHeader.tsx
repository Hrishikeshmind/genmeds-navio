
import { MapPin, Search, Compare, Pill } from "lucide-react";
import { Button } from "@/components/ui/button";

const NavigationHeader = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="container mx-auto px-4">
        <nav className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-2">
            <Pill className="w-6 h-6 text-primary" />
            <span className="text-xl font-semibold text-secondary">Genmeds</span>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <Button variant="ghost" className="flex items-center space-x-2">
              <MapPin className="w-4 h-4" />
              <span>Find Stores</span>
            </Button>
            <Button variant="ghost" className="flex items-center space-x-2">
              <Compare className="w-4 h-4" />
              <span>Compare Prices</span>
            </Button>
            <Button variant="ghost" className="flex items-center space-x-2">
              <Search className="w-4 h-4" />
              <span>Search Medicines</span>
            </Button>
          </div>

          <Button className="bg-primary text-white hover:bg-primary/90">
            Upload Prescription
          </Button>
        </nav>
      </div>
    </header>
  );
};

export default NavigationHeader;
