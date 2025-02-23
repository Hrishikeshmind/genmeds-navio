
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import StoreLocator from "./pages/StoreLocator";
import PriceComparison from "./pages/PriceComparison";
import SearchMedicines from "./pages/SearchMedicines";
import MedicalChat from "./pages/MedicalChat";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
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
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
