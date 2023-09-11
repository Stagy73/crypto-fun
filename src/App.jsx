import "./App.css";

import PriceChange from "./components/PriceChange";
import CryptocurrencyDisclaimer from "./components/paragraphe";
import Header from "./components/header";
import Footer from "./components/Footer";

function App() {
  return (
    <>
      <Header />
      <PriceChange />
      <CryptocurrencyDisclaimer />
      <Footer />
    </>
  );
}

export default App;
