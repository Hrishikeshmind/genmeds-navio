
import { useState } from "react";
import { ArrowLeft, Calculator, Plus, X, Pill } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import NavigationHeader from "@/components/NavigationHeader";

interface MedicineExpense {
  id: string;
  name: string;
  price: number;
  frequency: number; // per month
}

const MedicineCalculator = () => {
  const [expenses, setExpenses] = useState<MedicineExpense[]>([]);
  const [medicineName, setMedicineName] = useState("");
  const [medicinePrice, setMedicinePrice] = useState("");
  const [medicineFrequency, setMedicineFrequency] = useState("");

  const handleAddMedicine = () => {
    if (!medicineName || !medicinePrice || !medicineFrequency) return;

    const newExpense: MedicineExpense = {
      id: Date.now().toString(),
      name: medicineName,
      price: parseFloat(medicinePrice),
      frequency: parseInt(medicineFrequency),
    };

    setExpenses([...expenses, newExpense]);
    setMedicineName("");
    setMedicinePrice("");
    setMedicineFrequency("");
  };

  const handleRemoveMedicine = (id: string) => {
    setExpenses(expenses.filter((expense) => expense.id !== id));
  };

  const calculateTotalMonthlyExpense = () => {
    return expenses.reduce((total, expense) => {
      return total + expense.price * expense.frequency;
    }, 0);
  };

  return (
    <div className="min-h-screen bg-white">
      <NavigationHeader />
      <div className="container mx-auto px-4 pt-20">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center space-x-4 mb-8">
            <Link to="/">
              <Button variant="ghost" size="icon" className="rounded-full">
                <ArrowLeft className="h-6 w-6" />
              </Button>
            </Link>
            <div className="flex items-center space-x-2">
              <Calculator className="w-6 h-6 text-primary" />
              <h1 className="text-3xl font-bold text-secondary">Monthly Medicine Expense Calculator</h1>
            </div>
          </div>
          
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Add Your Medicines</CardTitle>
              <CardDescription>
                Track your monthly expenses on medicines
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Medicine Name
                  </label>
                  <Input
                    placeholder="Enter medicine name"
                    value={medicineName}
                    onChange={(e) => setMedicineName(e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Price (₹)
                  </label>
                  <Input
                    type="number"
                    placeholder="Price"
                    value={medicinePrice}
                    onChange={(e) => setMedicinePrice(e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Times/Month
                  </label>
                  <Input
                    type="number"
                    placeholder="Frequency"
                    value={medicineFrequency}
                    onChange={(e) => setMedicineFrequency(e.target.value)}
                  />
                </div>
              </div>
              <Button 
                onClick={handleAddMedicine} 
                className="mt-4 w-full"
              >
                <Plus className="mr-2 h-4 w-4" /> Add Medicine
              </Button>
            </CardContent>
          </Card>

          {expenses.length > 0 && (
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Your Medicine Expenses</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {expenses.map((expense) => (
                    <div 
                      key={expense.id} 
                      className="flex items-center justify-between p-4 border rounded-lg bg-gray-50"
                    >
                      <div className="flex items-center">
                        <Pill className="h-5 w-5 text-primary mr-2" />
                        <div>
                          <p className="font-medium">{expense.name}</p>
                          <p className="text-sm text-gray-500">
                            ₹{expense.price} × {expense.frequency} times per month
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <p className="font-semibold">
                          ₹{(expense.price * expense.frequency).toFixed(2)}
                        </p>
                        <Button 
                          variant="ghost" 
                          size="icon"
                          onClick={() => handleRemoveMedicine(expense.id)}
                        >
                          <X className="h-4 w-4 text-red-500" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="flex justify-between border-t p-4">
                <div>
                  <p className="text-gray-600">Total Monthly Expense:</p>
                </div>
                <p className="text-2xl font-bold text-primary">
                  ₹{calculateTotalMonthlyExpense().toFixed(2)}
                </p>
              </CardFooter>
            </Card>
          )}

          {expenses.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Savings Opportunity</CardTitle>
                <CardDescription>Switch to generics and save on your expenses</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="p-4 bg-green-50 rounded-lg">
                  <p className="text-green-800 mb-2">
                    By switching to generic alternatives, you could save up to 60% on your medicine expenses.
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-green-700">Potential monthly savings:</span>
                    <span className="text-lg font-bold text-green-700">
                      Up to ₹{(calculateTotalMonthlyExpense() * 0.6).toFixed(2)}
                    </span>
                  </div>
                </div>
                <div className="mt-4">
                  <Link to="/search">
                    <Button className="w-full">
                      Find Generic Alternatives
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default MedicineCalculator;
