
import { MapPin, Search, Scale, Pill, Eye, LogIn, UserPlus, Store } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import UserMenu from "./UserMenu";
import { useAuth } from "@/contexts/AuthContext";

const NavigationHeader = () => {
  const { user } = useAuth();
  
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="container mx-auto px-4">
        <nav className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2">
            <Pill className="w-6 h-6 text-primary" />
            <span className="text-xl font-semibold text-secondary">Genmeds</span>
          </Link>
          
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/stores">
              <Button variant="ghost" className="flex items-center space-x-2">
                <MapPin className="w-4 h-4" />
                <span>Find Stores</span>
              </Button>
            </Link>
            <Link to="/medicine-stores">
              <Button variant="ghost" className="flex items-center space-x-2">
                <Store className="w-4 h-4" />
                <span>Medicine Stores</span>
              </Button>
            </Link>
            <Link to="/compare">
              <Button variant="ghost" className="flex items-center space-x-2">
                <Scale className="w-4 h-4" />
                <span>Compare Prices</span>
              </Button>
            </Link>
            <Link to="/search">
              <Button variant="ghost" className="flex items-center space-x-2">
                <Search className="w-4 h-4" />
                <span>Search Medicines</span>
              </Button>
            </Link>
            <Link to="/read-prescription">
              <Button variant="ghost" className="flex items-center space-x-2">
                <Eye className="w-4 h-4" />
                <span>Read Prescription</span>
              </Button>
            </Link>
            <Link to="/sell">
              <Button variant="ghost" className="flex items-center space-x-2">
                <Store className="w-4 h-4" />
                <span>Sell Medicines</span>
              </Button>
            </Link>
          </div>
          
          {user ? (
            <UserMenu />
          ) : (
            <div className="flex items-center space-x-2">
              <Link to="/signin">
                <Button variant="ghost" size="sm" className="flex items-center">
                  <LogIn className="w-4 h-4 mr-2" />
                  <span>Sign In</span>
                </Button>
              </Link>
              <Link to="/signup">
                <Button variant="default" size="sm" className="flex items-center">
                  <UserPlus className="w-4 h-4 mr-2" />
                  <span>Sign Up</span>
                </Button>
              </Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};

export default NavigationHeader;
