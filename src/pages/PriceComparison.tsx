
import { useState } from "react";
import { Scale } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { medicines } from "@/data/medicinesData";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const PriceComparison = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  const filteredMedicines = medicines.filter(med => 
    med.name.toLowerCase().includes(search.toLowerCase()) ||
    med.category.toLowerCase().includes(search.toLowerCase())
  );

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
              <Scale className="w-6 h-6 text-primary" />
              <h1 className="text-3xl font-bold text-secondary">Compare Medicine Prices</h1>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="space-y-6">
              <Input
                type="text"
                placeholder="Search medicines by name or category..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full"
              />
              
              <div className="rounded-lg border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Medicine Name</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Generic Price</TableHead>
                      <TableHead>Branded Prices</TableHead>
                      <TableHead>Savings</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredMedicines.map((med) => {
                      const highestBrandPrice = Math.max(...med.brands.map(b => b.price));
                      const savings = highestBrandPrice - med.generic.price;
                      
                      return (
                        <TableRow key={med.name}>
                          <TableCell className="font-medium">{med.name}</TableCell>
                          <TableCell>{med.category}</TableCell>
                          <TableCell className="text-green-600 font-semibold">
                            ₹{med.generic.price}
                          </TableCell>
                          <TableCell>
                            <div className="space-y-1">
                              {med.brands.map((brand) => (
                                <div key={brand.brand} className="text-red-600">
                                  {brand.brand}: ₹{brand.price}
                                </div>
                              ))}
                            </div>
                          </TableCell>
                          <TableCell className="text-primary font-semibold">
                            Up to ₹{savings}
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PriceComparison;
