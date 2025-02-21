
import { useState } from "react";
import { Search, AlertCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { medicines, Medicine } from "@/data/medicinesData";
import { Alert, AlertDescription } from "@/components/ui/alert";

const SearchMedicines = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<Medicine[]>([]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query.trim() === "") {
      setSearchResults([]);
      return;
    }
    
    // Filter medicines based on search query
    const results = medicines.filter(
      (medicine) =>
        medicine.name.toLowerCase().includes(query.toLowerCase()) ||
        medicine.category.toLowerCase().includes(query.toLowerCase()) ||
        medicine.brands.some(brand => 
          brand.brand.toLowerCase().includes(query.toLowerCase())
        )
    );
    setSearchResults(results);
  };

  const calculateLowestBrandPrice = (medicine: Medicine) => {
    return Math.min(...medicine.brands.map(brand => brand.price));
  };

  const calculateHighestSavings = (medicine: Medicine) => {
    const highestBrandPrice = Math.max(...medicine.brands.map(brand => brand.price));
    return ((highestBrandPrice - medicine.generic.price) / highestBrandPrice * 100).toFixed(0);
  };

  return (
    <div className="min-h-screen pt-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center space-x-2 mb-8">
            <Search className="w-6 h-6 text-primary" />
            <h1 className="text-3xl font-bold text-secondary">Search Medicines</h1>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="space-y-6">
              <Input
                type="text"
                placeholder="Search medicines by name, category, or brand"
                className="w-full"
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
              />

              {searchResults.length > 0 ? (
                <div className="space-y-6">
                  {searchResults.map((medicine) => (
                    <div key={medicine.name} className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h2 className="text-xl font-semibold">{medicine.name}</h2>
                          <p className="text-gray-600">
                            {medicine.category} • {medicine.dosage_form} • {medicine.strength}
                          </p>
                        </div>
                        {medicine.prescription_required && (
                          <Alert className="w-auto">
                            <AlertCircle className="h-4 w-4" />
                            <AlertDescription>
                              Prescription Required
                            </AlertDescription>
                          </Alert>
                        )}
                      </div>

                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Brand Name</TableHead>
                            <TableHead>Manufacturer</TableHead>
                            <TableHead className="text-right">Price (₹)</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {medicine.brands.map((brand) => (
                            <TableRow key={brand.brand}>
                              <TableCell className="font-medium">
                                {brand.brand}
                              </TableCell>
                              <TableCell>{brand.manufacturer}</TableCell>
                              <TableCell className="text-right">₹{brand.price}</TableCell>
                            </TableRow>
                          ))}
                          <TableRow className="bg-green-50">
                            <TableCell className="font-medium text-green-700">
                              Generic Alternative
                            </TableCell>
                            <TableCell className="text-green-700">
                              {medicine.generic.manufacturer}
                            </TableCell>
                            <TableCell className="text-right font-bold text-green-700">
                              ₹{medicine.generic.price}
                            </TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>

                      <div className="flex justify-between items-center bg-green-100 p-4 rounded-lg">
                        <div className="text-green-800">
                          <p className="font-semibold">Potential Savings with Generic</p>
                          <p className="text-sm">Compared to branded options</p>
                        </div>
                        <div className="text-2xl font-bold text-green-700">
                          Up to {calculateHighestSavings(medicine)}% less
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : searchQuery ? (
                <div className="text-center py-8 text-gray-500">
                  No medicines found matching your search.
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  Search for medicines to see price comparisons
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchMedicines;
