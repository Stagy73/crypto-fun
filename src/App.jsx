import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; // Import BrowserRouter, Routes, and Route
import "./App.css";

import CryptocurrencyDisclaimer from "./components/paragraphe";
import Header from "./components/header";
import Footer from "./components/Footer";
import AboutPage from "./components/About"; // Import the AboutPage component
import CryptoPriceConverter from "./components/PriceChange"; // Import the HomePage component
import ContactPage from "./components/Contact"; // Import the ContactPage component

function App() {
  return (
    <Router>
      {/* Wrap your entire app with the Router component */}
      <Header />
      <Routes>
        <Route path="/" element={<CryptoPriceConverter />} />
        <Route path="/Disclaimer" element={<CryptocurrencyDisclaimer />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />

        {/* Add more routes for additional pages */}
      </Routes>

      <Footer />
    </Router>
  );
}

export default App;
