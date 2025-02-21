
import { useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// Mock data - in a real app, this would come from an API
const mockMedicines = [
  {
    id: 1,
    brandName: "Crocin",
    genericName: "Paracetamol",
    brandPrice: 25.50,
    genericPrice: 12.75,
    composition: "Acetaminophen 500mg",
    manufacturer: "GSK Healthcare",
  },
  {
    id: 2,
    brandName: "Allegra",
    genericName: "Fexofenadine",
    brandPrice: 85.30,
    genericPrice: 45.00,
    composition: "Fexofenadine HCl 120mg",
    manufacturer: "Sanofi India",
  },
];

const SearchMedicines = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<typeof mockMedicines>([]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query.trim() === "") {
      setSearchResults([]);
      return;
    }
    
    // Filter medicines based on search query
    const results = mockMedicines.filter(
      (medicine) =>
        medicine.brandName.toLowerCase().includes(query.toLowerCase()) ||
        medicine.genericName.toLowerCase().includes(query.toLowerCase()) ||
        medicine.composition.toLowerCase().includes(query.toLowerCase())
    );
    setSearchResults(results);
  };

  return (
    <div className="min-h-screen pt-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center space-x-2 mb-8">
            <Search className="w-6 h-6 text-primary" />
            <h1 className="text-3xl font-bold text-secondary">Search Medicines</h1>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="space-y-6">
              <Input
                type="text"
                placeholder="Search medicines by name or composition"
                className="w-full"
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
              />

              {searchResults.length > 0 ? (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Brand Name</TableHead>
                      <TableHead>Generic Name</TableHead>
                      <TableHead>Composition</TableHead>
                      <TableHead>Brand Price</TableHead>
                      <TableHead>Generic Price</TableHead>
                      <TableHead>Savings</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {searchResults.map((medicine) => (
                      <TableRow key={medicine.id}>
                        <TableCell className="font-medium">
                          {medicine.brandName}
                        </TableCell>
                        <TableCell>{medicine.genericName}</TableCell>
                        <TableCell>{medicine.composition}</TableCell>
                        <TableCell>₹{medicine.brandPrice.toFixed(2)}</TableCell>
                        <TableCell>₹{medicine.genericPrice.toFixed(2)}</TableCell>
                        <TableCell className="text-green-600">
                          {((medicine.brandPrice - medicine.genericPrice) / medicine.brandPrice * 100).toFixed(0)}% less
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
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
