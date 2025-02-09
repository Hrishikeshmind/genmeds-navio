
import { Scale } from "lucide-react";

const PriceComparison = () => {
  return (
    <div className="min-h-screen pt-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center space-x-2 mb-8">
            <Scale className="w-6 h-6 text-primary" />
            <h1 className="text-3xl font-bold text-secondary">Compare Medicine Prices</h1>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Search for medicines to compare prices"
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <div className="space-y-4">
                <div className="p-4 border border-gray-100 rounded-lg">
                  <p className="text-gray-500">Medicine price comparison results will appear here</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PriceComparison;
