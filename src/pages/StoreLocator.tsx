
import { MapPin } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { MapContainer, TileLayer, Marker, Popup, useMap, Polyline } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L, { LatLngExpression } from "leaflet";

// Fix Leaflet default marker icon issue
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

// Sample store locations
const SAMPLE_STORES = [
  { id: 1, name: "Jana Aushadhi Kendra #1", position: [19.0760, 72.8777] as LatLngExpression }, // Mumbai
  { id: 2, name: "Jana Aushadhi Kendra #2", position: [28.6139, 77.2090] as LatLngExpression }, // Delhi
  { id: 3, name: "Jana Aushadhi Kendra #3", position: [12.9716, 77.5946] as LatLngExpression }, // Bangalore
];

// LocationMarker component to handle user's location with real-time tracking
function LocationMarker({ onLocationUpdate }: { onLocationUpdate: (position: LatLngExpression) => void }) {
  const [position, setPosition] = useState<LatLngExpression | null>(null);
  const map = useMap();

  useEffect(() => {
    let watchId: number;
    let isMounted = true;

    if ("geolocation" in navigator) {
      watchId = navigator.geolocation.watchPosition(
        (pos) => {
          if (!isMounted) return;
          
          const newPos: LatLngExpression = [pos.coords.latitude, pos.coords.longitude];
          setPosition(newPos);
          onLocationUpdate(newPos);
          
          // Only update view if the map is still mounted
          if (map && map.setView) {
            map.setView(newPos, map.getZoom() || 12);
          }
        },
        (error) => {
          if (!isMounted) return;
          toast({
            title: "Error",
            description: "Location access denied. Please enable location services.",
            variant: "destructive"
          });
        },
        {
          enableHighAccuracy: true,
          maximumAge: 10000,
          timeout: 5000
        }
      );
    }

    return () => {
      isMounted = false;
      if (watchId) navigator.geolocation.clearWatch(watchId);
    };
  }, [map, onLocationUpdate]);

  return position === null ? null : (
    <Marker position={position}>
      <Popup>Your current location</Popup>
    </Marker>
  );
}

// Calculate distance between two points
function calculateDistance(point1: LatLngExpression, point2: LatLngExpression): number {
  const [lat1, lon1] = (point1 as [number, number]);
  const [lat2, lon2] = (point2 as [number, number]);
  const R = 6371; // Earth's radius in km
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
    Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
}

const StoreLocator = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [userPosition, setUserPosition] = useState<LatLngExpression | null>(null);
  const [selectedStore, setSelectedStore] = useState<typeof SAMPLE_STORES[0] | null>(null);
  const defaultCenter: LatLngExpression = [20.5937, 78.9629]; // Default center (India)

  const handleLocationUpdate = (position: LatLngExpression) => {
    setUserPosition(position);
  };

  const handleStoreSelect = (store: typeof SAMPLE_STORES[0]) => {
    setSelectedStore(store);
    if (userPosition) {
      const distance = calculateDistance(userPosition, store.position);
      toast({
        description: `Distance to ${store.name}: ${distance.toFixed(2)} km`,
      });
    }
  };

  const findNearbyStores = () => {
    if (!userPosition) {
      toast({
        description: "Please enable location services to find nearby stores",
        variant: "destructive"
      });
      return;
    }

    // Find stores within 10km radius
    const nearbyStores = SAMPLE_STORES.filter(store => {
      const distance = calculateDistance(userPosition, store.position);
      return distance <= 10;
    });

    if (nearbyStores.length === 0) {
      toast({
        description: "No stores found within 10km of your location",
        variant: "destructive"
      });
    } else {
      toast({
        description: `Found ${nearbyStores.length} stores within 10km`,
      });
      // Select the nearest store
      const nearest = nearbyStores.reduce((prev, curr) => {
        const prevDistance = calculateDistance(userPosition, prev.position);
        const currDistance = calculateDistance(userPosition, curr.position);
        return prevDistance < currDistance ? prev : curr;
      });
      handleStoreSelect(nearest);
    }
  };

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      toast({
        description: "Please enter a location to search",
        variant: "destructive"
      });
      return;
    }

    toast({
      description: "Searching nearby stores...",
    });
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
                <Button onClick={findNearbyStores} variant="secondary">
                  Find Nearby
                </Button>
              </div>
              
              <div className="h-[400px] rounded-lg overflow-hidden">
                <MapContainer
                  key={userPosition ? `${userPosition[0]}-${userPosition[1]}` : 'default'}
                  className="h-full w-full"
                  center={userPosition || defaultCenter}
                  zoom={12}
                  minZoom={4}
                  maxZoom={18}
                >
                  <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />
                  <LocationMarker onLocationUpdate={handleLocationUpdate} />
                  
                  {SAMPLE_STORES.map((store) => (
                    <Marker 
                      key={store.id} 
                      position={store.position}
                      eventHandlers={{
                        click: () => handleStoreSelect(store),
                      }}
                    >
                      <Popup>{store.name}</Popup>
                    </Marker>
                  ))}

                  {userPosition && selectedStore && (
                    <Polyline
                      pathOptions={{ color: 'blue', weight: 3, opacity: 0.7 }}
                      positions={[userPosition, selectedStore.position]}
                    />
                  )}
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
