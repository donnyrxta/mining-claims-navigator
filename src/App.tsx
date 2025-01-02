import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import Subscribe from "./pages/Subscribe";

const queryClient = new QueryClient();

const App = () => {
  // This would normally come from your auth context
  const userRole = 'basic';
  const isSubscribed = false;

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route 
              path="/" 
              element={
                isSubscribed ? (
                  <Index />
                ) : (
                  <Navigate to="/subscribe" replace />
                )
              } 
            />
            <Route path="/subscribe" element={<Subscribe />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;