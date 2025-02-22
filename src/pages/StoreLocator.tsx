
import { MapPin } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix Leaflet default marker icon issue
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

// LocationMarker component to handle user's location
function LocationMarker() {
  const [position, setPosition] = useState<[number, number] | null>(null);
  const map = useMap();

  useEffect(() => {
    map.locate().on("locationfound", function (e) {
      setPosition(e.latlng);
      map.flyTo(e.latlng, map.getZoom());
      toast({
        description: "Location found!",
      });
    }).on("locationerror", function (e) {
      toast({
        title: "Error",
        description: "Location access denied. Please enable location services.",
        variant: "destructive"
      });
    });
  }, [map]);

  return position === null ? null : (
    <Marker position={position}>
      <Popup>You are here</Popup>
    </Marker>
  );
}

const StoreLocator = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [center] = useState<[number, number]>([20.5937, 78.9629]); // Default center (India)
  const [stores] = useState<Array<[number, number]>>([]); // This will store the Jana Aushadhi Kendras locations

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
              
              <div className="h-[400px] rounded-lg overflow-hidden">
                <MapContainer
                  center={center}
                  zoom={5}
                  style={{ height: "100%", width: "100%" }}
                >
                  <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  />
                  <LocationMarker />
                  {stores.map((position, idx) => (
                    <Marker key={idx} position={position}>
                      <Popup>Jana Aushadhi Kendra #{idx + 1}</Popup>
                    </Marker>
                  ))}
                </MapContainer>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoreLocator;
