
import { MapPin } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";

declare global {
  interface Window {
    mappls: any;
  }
}

const StoreLocator = () => {
  const mapContainer = useRef(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [map, setMap] = useState<any>(null);

  useEffect(() => {
    const loadMap = async () => {
      try {
        const mapplsScript = document.createElement('script');
        mapplsScript.src = 'https://apis.mappls.com/advancedmaps/api/YOUR_API_KEY/map_sdk?v=3.0&layer=vector';
        mapplsScript.async = true;
        
        mapplsScript.onload = () => {
          if (mapContainer.current) {
            const mapInstance = new window.mappls.Map(mapContainer.current, {
              center: [28.6139, 77.2090], // Default center (Delhi)
              zoomControl: true,
              location: true,
              zoom: 12
            });
            setMap(mapInstance);
          }
        };

        document.head.appendChild(mapplsScript);
      } catch (error) {
        console.error('Error loading map:', error);
        toast({
          title: "Error",
          description: "Failed to load the map. Please try again later.",
          variant: "destructive"
        });
      }
    };

    loadMap();

    return () => {
      // Cleanup
      const mapplsScript = document.querySelector('script[src*="mappls.com"]');
      if (mapplsScript) {
        mapplsScript.remove();
      }
    };
  }, []);

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      toast({
        description: "Please enter a location to search",
        variant: "destructive"
      });
      return;
    }

    try {
      // Here we'll add the geocoding API call to search for the location
      // For now, let's just show a toast
      toast({
        description: "Location search functionality will be implemented soon",
      });
    } catch (error) {
      console.error('Error searching location:', error);
      toast({
        title: "Error",
        description: "Failed to search location. Please try again.",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="min-h-screen pt-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center space-x-2 mb-8">
            <MapPin className="w-6 h-6 text-primary" />
            <h1 className="text-3xl font-bold text-secondary">Find Jana Aushadhi Kendras</h1>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
            <div className="space-y-4">
              <div className="flex gap-2">
                <Input
                  type="text"
                  placeholder="Enter your location"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1"
                />
                <Button onClick={handleSearch}>
                  Search
                </Button>
              </div>
              
              <div 
                ref={mapContainer} 
                className="h-[400px] rounded-lg overflow-hidden"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoreLocator;
