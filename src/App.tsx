
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import Index from "./pages/Index";
import StoreLocator from "./pages/StoreLocator";
import PriceComparison from "./pages/PriceComparison";
import SearchMedicines from "./pages/SearchMedicines";
import MedicalChat from "./pages/MedicalChat";
import ReadPrescription from "./pages/ReadPrescription";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import SellMedicines from "./pages/SellMedicines";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/stores" element={<StoreLocator />} />
            <Route path="/compare" element={<PriceComparison />} />
            <Route path="/search" element={<SearchMedicines />} />
            <Route path="/chat" element={<MedicalChat />} />
            <Route path="/read-prescription" element={<ReadPrescription />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/sell" element={<SellMedicines />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
