
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, MapPin, Phone, Star, ExternalLink, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

// Sample data for medicine stores
const SAMPLE_STORES = [
  {
    id: 1,
    name: "Jana Aushadhi Kendra - City Center",
    location: "123 Main Street, Mumbai",
    phone: "+91 9876543210",
    rating: 4.5,
    openingHours: "9:00 AM - 9:00 PM",
    type: "Jana Aushadhi",
    inventoryStatus: "Well Stocked",
    distance: "1.2 km"
  },
  {
    id: 2,
    name: "Government Medical Store",
    location: "45 Hospital Road, Delhi",
    phone: "+91 9876543211",
    rating: 4.2,
    openingHours: "8:00 AM - 8:00 PM",
    type: "Government",
    inventoryStatus: "Moderately Stocked",
    distance: "2.5 km"
  },
  {
    id: 3,
    name: "Community Pharmacy",
    location: "78 Market Street, Bangalore",
    phone: "+91 9876543212",
    rating: 4.8,
    openingHours: "10:00 AM - 10:00 PM",
    type: "Private",
    inventoryStatus: "Well Stocked",
    distance: "3.7 km"
  },
  {
    id: 4,
    name: "Jana Aushadhi Kendra - North Point",
    location: "234 Ring Road, Chennai",
    phone: "+91 9876543213",
    rating: 4.1,
    openingHours: "8:30 AM - 8:30 PM",
    type: "Jana Aushadhi",
    inventoryStatus: "Limited Stock",
    distance: "4.3 km"
  },
  {
    id: 5,
    name: "People's Pharmacy",
    location: "56 Gandhi Road, Kolkata",
    phone: "+91 9876543214",
    rating: 4.6,
    openingHours: "9:00 AM - 9:00 PM",
    type: "Private",
    inventoryStatus: "Well Stocked",
    distance: "5.1 km"
  }
];

const MedicineStores = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredStores, setFilteredStores] = useState(SAMPLE_STORES);
  const [storeType, setStoreType] = useState("all");

  const handleSearch = () => {
    // Filter stores based on search query and type
    const filtered = SAMPLE_STORES.filter(store => {
      const matchesSearch = !searchQuery || 
        store.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        store.location.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesType = storeType === "all" || store.type.toLowerCase() === storeType.toLowerCase();
      
      return matchesSearch && matchesType;
    });
    
    setFilteredStores(filtered);
  };

  const handleTypeChange = (value: string) => {
    setStoreType(value);
    // Re-filter when type changes
    const filtered = SAMPLE_STORES.filter(store => {
      const matchesSearch = !searchQuery || 
        store.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        store.location.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesType = value === "all" || store.type.toLowerCase() === value.toLowerCase();
      
      return matchesSearch && matchesType;
    });
    
    setFilteredStores(filtered);
  };

  // Function to get badge color based on inventory status
  const getInventoryBadgeColor = (status: string) => {
    switch(status) {
      case "Well Stocked":
        return "bg-green-100 text-green-800";
      case "Moderately Stocked":
        return "bg-yellow-100 text-yellow-800";
      case "Limited Stock":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen pt-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center space-x-4 mb-8">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate('/')}
              className="hover:bg-secondary/10"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Button>
            <div className="flex items-center space-x-2">
              <MapPin className="w-6 h-6 text-primary" />
              <h1 className="text-3xl font-bold text-secondary">Medicine Stores</h1>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
            <div className="mb-6">
              <div className="flex gap-2 mb-4">
                <Input
                  type="text"
                  placeholder="Search by name or location"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1"
                />
                <Button onClick={handleSearch}>
                  <Search className="h-4 w-4 mr-2" />
                  Search
                </Button>
              </div>
              
              <Tabs defaultValue="all" onValueChange={handleTypeChange}>
                <TabsList className="grid grid-cols-3 mb-4">
                  <TabsTrigger value="all">All Stores</TabsTrigger>
                  <TabsTrigger value="Jana Aushadhi">Jana Aushadhi</TabsTrigger>
                  <TabsTrigger value="Private">Private Stores</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
            
            {filteredStores.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-500">No stores found matching your criteria.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredStores.map((store) => (
                  <Card key={store.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex justify-between flex-col md:flex-row gap-4">
                        <div className="space-y-2">
                          <div className="flex items-start justify-between">
                            <h3 className="text-xl font-semibold text-secondary">{store.name}</h3>
                            <div className="flex items-center">
                              <Star className="h-4 w-4 text-yellow-500 mr-1" fill="currentColor" />
                              <span>{store.rating}</span>
                            </div>
                          </div>
                          
                          <div className="flex items-start space-x-2">
                            <MapPin className="h-4 w-4 text-gray-500 mt-0.5" />
                            <p className="text-gray-600">{store.location}</p>
                          </div>
                          
                          <div className="flex items-start space-x-2">
                            <Phone className="h-4 w-4 text-gray-500 mt-0.5" />
                            <p className="text-gray-600">{store.phone}</p>
                          </div>
                          
                          <div className="flex items-center flex-wrap gap-2 mt-2">
                            <Badge variant="outline" className="bg-primary/10 text-primary">
                              {store.type}
                            </Badge>
                            <Badge variant="outline" className={getInventoryBadgeColor(store.inventoryStatus)}>
                              {store.inventoryStatus}
                            </Badge>
                            <span className="text-sm text-gray-500">
                              {store.openingHours}
                            </span>
                          </div>
                        </div>
                        
                        <div className="flex flex-col justify-between items-end">
                          <span className="text-sm text-gray-500">{store.distance} away</span>
                          
                          <div className="flex flex-col gap-2 mt-4">
                            <Button
                              variant="default"
                              size="sm"
                              onClick={() => navigate(`/stores?id=${store.id}`)}
                              className="whitespace-nowrap"
                            >
                              <MapPin className="h-4 w-4 mr-2" />
                              View on Map
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              className="whitespace-nowrap"
                            >
                              <ExternalLink className="h-4 w-4 mr-2" />
                              Get Directions
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MedicineStores;
