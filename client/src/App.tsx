import { useState, useEffect, lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/toaster";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import store from "./lib/store";

import VideoBackground from "./components/VideoBackground";
import Navbar from "./components/Navbar";
import ExitIntentPopup from "./components/ExitIntentPopup";
import Footer from "./components/Footer";
import LoadingScreen from "./components/LoadingScreen";
import ScrollToTop from "./components/ScrollToTop"; // importado aqui

import HomePage from "./pages/HomePage";
import ProductPage from "./pages/ProductPage";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import CategoryPage from "./pages/CategoryPage";

const AboutPage = lazy(() => import("./pages/AboutPage"));

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <TooltipProvider>
          <Router>
            <ScrollToTop /> {/* garante rolagem ao topo em cada rota */}
            <VideoBackground />
            <Navbar />
            <ExitIntentPopup />
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/produto/:id" element={<ProductPage />} />
              <Route path="/carrinho" element={<CartPage />} />
              <Route path="/checkout" element={<CheckoutPage />} />
              <Route path="/categoria/:categoryName" element={<CategoryPage />} />
              <Route path="/sobre" element={<AboutPage />} />
            </Routes>
            <Footer />
            <Toaster />
          </Router>
        </TooltipProvider>
      </Provider>
    </QueryClientProvider>
  );
}

export default App;
