import React, { useEffect, useState } from "react";
import axios from "axios";

function CryptoPriceConverter() {
  const [cryptoPrices, setCryptoPrices] = useState({});
  const [conversionData, setConversionData] = useState({
    fromCrypto: "BTCUSDT",
    toCrypto: "ETHUSDT",
    amountUSD: "", // Input field for the amount in USD
    convertedPrice: 0,
  });
  const [previousPrices, setPreviousPrices] = useState({});
  const [changePercentages, setChangePercentages] = useState({}); // Define changePercentages state
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
    const apiRequests = symbols.map((symbol) =>
      axios.get(`https://api.binance.com/api/v3/ticker/price?symbol=${symbol}`)
    );

    Promise.all(apiRequests)
      .then((responses) => {
        const newPrices = { ...cryptoPrices };
        const newChangePercentages = {};

        responses.forEach((response) => {
          const symbol = response.data.symbol;
          const price = parseFloat(response.data.price);
          const prevPrice = previousPrices[symbol];

          // Calculate the change percentage
          if (prevPrice !== undefined) {
            const changePercentage = ((price - prevPrice) / prevPrice) * 100;
            newChangePercentages[symbol] = changePercentage;
          }

          newPrices[symbol] = price;
        });

        setPreviousPrices(newPrices); // Update previousPrices state
        setCryptoPrices(newPrices);
        setChangePercentages(newChangePercentages); // Update changePercentages state
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  const handleAmountChange = (e) => {
    setConversionData({
      ...conversionData,
      amountUSD: e.target.value, // Update the amount in USD
    });
  };

  const handleConvert = () => {
    const { fromCrypto, toCrypto, amountUSD } = conversionData;
    const toPrice = cryptoPrices[toCrypto];

    // Calculate the converted amount using the amount in USD
    const convertedAmountCrypto = parseFloat(amountUSD) / toPrice;

    setConversionData({
      ...conversionData,
      convertedPrice: convertedAmountCrypto,
    });
  };

  useEffect(() => {
    fetchCryptoPrices();
    const intervalId = setInterval(fetchCryptoPrices, 15000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div>
      <h1>Crypto Prices</h1>
      <ul>
        {symbols.map((symbol, index) => {
          const changePercentage = changePercentages[symbol];
          const changeSign =
            changePercentage !== undefined
              ? changePercentage >= 0
                ? "+"
                : "-"
              : "";

          return (
            <li key={symbol}>
              {symbol}: {cryptoPrices[symbol]}{" "}
              {changePercentage !== undefined
                ? `${changeSign}${Math.abs(changePercentage).toFixed(2)}%`
                : "(N/A)"}
            </li>
          );
        })}
      </ul>

      <div>
        <h2>Crypto Conversion</h2>
        <label>
          Convert
          <input
            type="text"
            value={conversionData.amountUSD}
            onChange={handleAmountChange}
            placeholder="Enter amount in USD"
          />
        </label>
        to
        <select
          value={conversionData.toCrypto}
          onChange={(e) =>
            setConversionData({
              ...conversionData,
              toCrypto: e.target.value,
            })
          }
        >
          {symbols.map((symbol) => (
            <option key={symbol} value={symbol}>
              {symbol}
            </option>
          ))}
        </select>
        <button onClick={handleConvert}>Convert</button>
        <p>
          {conversionData.amountUSD} USD to {conversionData.toCrypto}:
          {conversionData.convertedPrice.toFixed(8)}
        </p>
      </div>
    </div>
  );
}

export default CryptoPriceConverter;
