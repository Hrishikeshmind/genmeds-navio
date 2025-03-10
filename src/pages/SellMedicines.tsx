
import { ArrowLeft, Store, Building2, Clock, Check, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useAuth } from "@/contexts/AuthContext";
import { useState } from "react";
import { toast } from "@/components/ui/use-toast";

const SellMedicines = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [companyName, setCompanyName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [licenseNumber, setLicenseNumber] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!companyName || !email || !phone || !address || !licenseNumber) {
      toast({
        title: "Error",
        description: "Please fill all required fields",
        variant: "destructive",
      });
      return;
    }
    
    // Submit registration request (in a real app, this would connect to an API)
    toast({
      title: "Registration Submitted",
      description: "We've received your application and will contact you soon!",
    });
    
    // Clear form
    setCompanyName("");
    setEmail("");
    setPhone("");
    setAddress("");
    setLicenseNumber("");
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
              <Store className="w-6 h-6 text-primary" />
              <h1 className="text-3xl font-bold text-secondary">Sell Your Medicines</h1>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
            <Tabs defaultValue="register">
              <TabsList className="grid w-full grid-cols-2 mb-8">
                <TabsTrigger value="register">Register Your Store</TabsTrigger>
                <TabsTrigger value="benefits">Benefits</TabsTrigger>
              </TabsList>
              
              <TabsContent value="register" className="space-y-4">
                <div className="max-w-2xl mx-auto">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                      <label htmlFor="companyName" className="block text-sm font-medium">
                        Company/Store Name*
                      </label>
                      <Input
                        id="companyName"
                        value={companyName}
                        onChange={(e) => setCompanyName(e.target.value)}
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="email" className="block text-sm font-medium">
                        Business Email*
                      </label>
                      <Input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="phone" className="block text-sm font-medium">
                        Phone Number*
                      </label>
                      <Input
                        id="phone"
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="address" className="block text-sm font-medium">
                        Business Address*
                      </label>
                      <Input
                        id="address"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="license" className="block text-sm font-medium">
                        Pharmacy License Number*
                      </label>
                      <Input
                        id="license"
                        value={licenseNumber}
                        onChange={(e) => setLicenseNumber(e.target.value)}
                        required
                      />
                    </div>
                    
                    <Button type="submit" className="w-full">
                      Submit Application
                    </Button>
                    
                    <p className="text-xs text-gray-500 mt-4">
                      * By submitting this form, you agree to our verification process. We'll review your 
                      information and contact you to complete the onboarding process.
                    </p>
                  </form>
                </div>
              </TabsContent>
              
              <TabsContent value="benefits" className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <Building2 className="w-5 h-5 mr-2 text-primary" />
                        Expand Your Reach
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600">
                        Connect with thousands of customers searching for affordable medicines every day. 
                        List your store on our platform and become part of our nationwide network.
                      </p>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <Clock className="w-5 h-5 mr-2 text-primary" />
                        Real-time Inventory
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600">
                        Update your available medicines and prices in real-time. Customers can see what's 
                        in stock before visiting your store, reducing wasted trips.
                      </p>
                    </CardContent>
                  </Card>
                </div>
                
                <div className="space-y-4 mt-6">
                  <h3 className="text-xl font-semibold text-secondary">How It Works</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <div className="flex-shrink-0 mr-2">
                        <Check className="h-5 w-5 text-green-500" />
                      </div>
                      <p className="text-gray-600">Register your store with basic details and license information</p>
                    </li>
                    <li className="flex items-start">
                      <div className="flex-shrink-0 mr-2">
                        <Check className="h-5 w-5 text-green-500" />
                      </div>
                      <p className="text-gray-600">Our team verifies your documents and approves your listing</p>
                    </li>
                    <li className="flex items-start">
                      <div className="flex-shrink-0 mr-2">
                        <Check className="h-5 w-5 text-green-500" />
                      </div>
                      <p className="text-gray-600">Upload your inventory, set your prices, and start receiving customers</p>
                    </li>
                    <li className="flex items-start">
                      <div className="flex-shrink-0 mr-2">
                        <Check className="h-5 w-5 text-green-500" />
                      </div>
                      <p className="text-gray-600">Get insights on which medicines are in demand in your area</p>
                    </li>
                  </ul>
                </div>
                
                <div className="mt-8 flex justify-center">
                  <Button onClick={() => document.querySelector('[data-value="register"]')?.click()}>
                    Register Your Store Now
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellMedicines;
