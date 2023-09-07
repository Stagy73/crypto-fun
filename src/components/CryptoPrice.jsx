import { useEffect, useState } from "react";
import axios from "axios";

function CryptoPriceList() {
  const [cryptoPrices, setCryptoPrices] = useState([]);
  const symbols = [
    "BTCUSDT",
    "ETHUSDT",
    "BNBUSDT",
    "XRPUSDT",
    "ADAUSDT",
    "SOLUSDT",
    "DOTUSDT",
    "DOGEUSDT",
    "LTCUSDT",
    "LINKUSDT",
  ];

  const fetchCryptoPrices = () => {
    // Create an array to store the promises for each API request
    const apiRequests = symbols.map((symbol) =>
      axios.get(`https://api.binance.com/api/v3/ticker/price?symbol=${symbol}`)
    );

    // Use Promise.all to make multiple requests concurrently
    Promise.all(apiRequests)
      .then((responses) => {
        // Extract the prices from the responses
        const prices = responses.map((response) => response.data.price);
        setCryptoPrices(prices);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  useEffect(() => {
    // Fetch crypto prices immediately when the component mounts
    fetchCryptoPrices();

    // Set up an interval to fetch crypto prices every 15 seconds
    const intervalId = setInterval(fetchCryptoPrices, 15000);

    // Clean up the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div>
      <h1>Crypto Prices</h1>
      <ul>
        {symbols.map((symbol, index) => (
          <li key={symbol}>
            {symbol}: ${cryptoPrices[index]}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CryptoPriceList;
