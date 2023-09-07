import React, { useEffect, useState } from "react";
import axios from "axios";
import "./list.css";

function CryptoPriceConverter() {
  const [cryptoPrices, setCryptoPrices] = useState({});
  const [conversionData, setConversionData] = useState({
    fromCrypto: "BTCUSDT",
    toCrypto: "ETHUSDT",
    amountUSD: "",
    convertedPrice: 0,
  });
  const [changePercentages, setChangePercentages] = useState({}); // Add changePercentages state
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

  useEffect(() => {
    const fetchCryptoPrices = async () => {
      try {
        const responses = await Promise.all(
          symbols.map((symbol) =>
            axios.get(
              `https://api.binance.com/api/v3/ticker/price?symbol=${symbol}`
            )
          )
        );

        const newPrices = {};
        const newChangePercentages = {};

        responses.forEach((response) => {
          const symbol = response.data.symbol;
          const price = parseFloat(response.data.price);
          const prevPrice = cryptoPrices[symbol] || 0;

          if (prevPrice !== 0) {
            const changePercentage = ((price - prevPrice) / prevPrice) * 100;
            newChangePercentages[symbol] = changePercentage;
          } else {
            newChangePercentages[symbol] = 0;
          }

          newPrices[symbol] = price;
        });

        setCryptoPrices(newPrices);
        setChangePercentages(newChangePercentages);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchCryptoPrices();
    const intervalId = setInterval(fetchCryptoPrices, 15000);
    return () => clearInterval(intervalId);
  }, [cryptoPrices]);

  const handleAmountChange = (e) => {
    setConversionData({
      ...conversionData,
      amountUSD: e.target.value,
    });
  };

  const handleConvert = () => {
    const { fromCrypto, toCrypto, amountUSD } = conversionData;
    const toPrice = cryptoPrices[toCrypto];

    if (toPrice !== 0) {
      const convertedAmountCrypto = parseFloat(amountUSD) / toPrice;

      setConversionData({
        ...conversionData,
        convertedPrice: convertedAmountCrypto,
      });
    } else {
      console.log("Conversion rate is zero.");
    }
  };

  return (
    <div>
      <div className="list">
        <h1>Crypto Prices</h1>
        <ul className="ul">
          {symbols.map((symbol, index) => {
            const changePercentage = changePercentages[symbol] || 0; // Handle undefined values
            let changeSign = "";
            let className = "";

            if (changePercentage !== 0) {
              changeSign = changePercentage >= 0 ? "+" : "-";
              className =
                changePercentage >= 0 ? "positive-change" : "negative-change";
            }

            return (
              <li key={symbol} className={className}>
                {symbol}: {cryptoPrices[symbol]}{" "}
                {changePercentage !== undefined
                  ? `${changeSign}${Math.abs(changePercentage).toFixed(4)}%`
                  : "(N/A)"}
              </li>
            );
          })}
        </ul>
      </div>
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
