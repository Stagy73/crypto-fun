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
  const [changePercentages, setChangePercentages] = useState({});
  const [previousPrices, setPreviousPrices] = useState({});
  const [symbols] = useState([
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
  ]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCryptoPrices = async () => {
      try {
        const responses = await Promise.all(
          symbols.map(async (symbol) => {
            // Fetch current price
            const currentResponse = await axios.get(
              `https://api.binance.com/api/v3/ticker/price?symbol=${symbol}`
            );
            const currentPrice = parseFloat(currentResponse.data.price);

            // Fetch 24-hour klines data
            const klinesResponse = await axios.get(
              `https://api.binance.com/api/v1/klines`,
              {
                params: {
                  symbol: symbol,
                  interval: "1d", // 1-day interval
                  limit: 2, // Fetch the last 2 daily candles (24 hours)
                },
              }
            );
            const [previousKline] = klinesResponse.data;

            // Extract the closing price from the previous kline data
            const previousPrice = parseFloat(previousKline[4]);

            // Extract the closing price from the current kline data

            // Calculate the percentage change
            const changePercentage =
              ((currentPrice - previousPrice) / previousPrice) * 100;

            return { symbol, currentPrice, previousPrice, changePercentage };
          })
        );

        const newPrices = {};
        const newChangePercentages = {};
        const newPreviousPrices = {};

        responses.forEach((response) => {
          const { symbol, currentPrice, previousPrice, changePercentage } =
            response;
          newPrices[symbol] = currentPrice;
          newChangePercentages[symbol] = changePercentage;
          newPreviousPrices[symbol] = previousPrice;
        });

        setCryptoPrices(newPrices);
        setChangePercentages(newChangePercentages);
        setPreviousPrices(newPreviousPrices);
        setIsLoading(false); // Mark data as loaded
      } catch (error) {
        console.error("Error fetching data:", error);
        setIsLoading(false); // Mark data as loaded even if there's an error
      }
    };

    // Initial fetch
    fetchCryptoPrices();

    // Set up interval to fetch prices periodically
    const intervalId = setInterval(fetchCryptoPrices, 15000); // Fetch every 15 seconds for updates

    // Cleanup interval on component unmount
    return () => clearInterval(intervalId);
  }, [symbols]); // Use symbols as a dependency to re-fetch data when symbols change

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
        {!isLoading && (
          <>
            {" "}
            <div className="now">
              <h1>Crypto Prices</h1>
              <ul className="ul">
                {symbols.map((symbol) => {
                  const changePercentage = changePercentages[symbol];
                  const changeSign = changePercentage >= 0 ? "+" : "-"; // + or - sign
                  const className =
                    changePercentage >= 0
                      ? "positive-change"
                      : "negative-change";

                  return (
                    <li key={symbol} className={className}>
                      <div className="liIinsideLi">
                        <div>{symbol}:</div>
                        <div>{cryptoPrices[symbol].toFixed(8)}</div>
                        <div>
                          {changePercentage !== undefined
                            ? `${changeSign}${Math.abs(
                                changePercentage
                              ).toFixed(4)}%`
                            : "(N/A)"}
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
            <div className="yesterday">
              <h1> 24 Hours Ago</h1>
              <ul className="ul">
                {symbols.map((symbol) => {
                  return (
                    <li key={symbol}>
                      <div className="liIinsideLi">
                        <div className="liIinsideLi">{symbol}:</div>
                        <div>
                          {previousPrices[symbol] !== undefined
                            ? previousPrices[symbol].toFixed(8)
                            : "N/A"}
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>{" "}
            </div>
          </>
        )}
      </div>
      <div className="convert">
        <h1>Crypto Conversion</h1>
        <label>Convert</label>
        <input
          type="text"
          value={conversionData.amountUSD}
          onChange={handleAmountChange}
          placeholder="Enter amount in USD"
        />
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
        <p>
          {" "}
          <a
            href="https://www.binance.com/fr/activity/referral-entry/CPA?ref=CPA_00QR21HSA3"
            target="_blank"
            rel="noopener noreferrer"
          >
            <button>Buy It Now</button>
          </a>
        </p>
      </div>
    </div>
  );
}

export default CryptoPriceConverter;
