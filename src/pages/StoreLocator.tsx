
import { MapPin } from "lucide-react";

const StoreLocator = () => {
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
              <input
                type="text"
                placeholder="Enter your location"
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <div className="h-[400px] bg-gray-100 rounded-lg flex items-center justify-center">
                <p className="text-gray-500">Map will be integrated here</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoreLocator;
