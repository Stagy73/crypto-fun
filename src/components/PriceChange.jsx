import { useEffect, useState } from "react";
import axios from "axios";
import "./list.css";
import CryptoIcon from "./icone";

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
    "UNIUSDT",
    "MATICUSDT",
    "VETUSDT",
    "ICPUSDT",
    "FILUSDT",
    "AAVEUSDT",
    "XEMUSDT",
    "ATOMUSDT",
    "THETAUSDT",
    "TRXUSDT",
    "XMRUSDT",
    "EOSUSDT",
    "BCHUSDT",
    "XTZUSDT",
    "NEOUSDT",
    "WAVESUSDT",
    "ALGOUSDT",
    "MKRUSDT",
    "DASHUSDT",
    "ETCUSDT",
    "ZECUSDT",
    "COMPUSDT",
    "VTHOUSDT",
    "GRTUSDT",
    "ENJUSDT",
    "BATUSDT",
    "SNXUSDT",
    "ONTUSDT",
    "MANAUSDT",
    "IOTAUSDT",
    "ZRXUSDT",
    "KNCUSDT",
    "ANKRUSDT",
    "QTUMUSDT",
    "RENUSDT",
    "BTTUSDT",
    "DGBUSDT",
    "SUSHIUSDT",
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
      {" "}
      <div className="entete">
        <h1>Simple Crypto prices & converter</h1>
        <p className="ulparas">
          Cryptocurrency conversion and price tracking are two crucial aspects
          of the cryptocurrency ecosystem. Cryptocurrency conversion allows
          users to convert one cryptocurrency into another, facilitating
          exchanges and transactions in this ever-evolving digital space.
          Whether you want to trade Bitcoin for Ethereum or simply monitor
          real-time prices of different cryptocurrencies, conversion and price
          tracking tools provide you with market visibility. These services
          enable you to make informed decisions about your cryptocurrency
          investments. With the inherent volatility in this digital financial
          sector, having access to accurate, up-to-date price information is
          essential. Cryptocurrency conversion and price tracking are key
          elements for navigating the ever-changing world of cryptocurrencies
          and making the most of your digital assets. Whether you're a seasoned
          investor or a curious newcomer, these tools help you stay informed and
          make informed decisions in the exciting realm of cryptocurrencies.
        </p>
      </div>
      <div className="list">
        {!isLoading && (
          <>
            {" "}
            <div className="now">
              <div></div>

              <h2>Crypto Prices</h2>
              <ul className="ul ,no-bullets">
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
                        <div className="liIinsideLi">{symbol}:</div>
                        <div className="liIinsideLi">
                          {cryptoPrices[symbol].toFixed(8)}
                        </div>
                        <div className="liIinsideLi">
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
              <h2> 24 Hours Ago</h2>
              <ul className="ul , no-bullets">
                {symbols.map((symbol) => {
                  return (
                    <li key={symbol}>
                      <div className="liIinsideLi">
                        <div className="liIinsideLi  color24">{symbol}:</div>
                        <div className="liIinsideLi  color24">
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
        <h2>Crypto Conversion</h2>
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
        <button className="buttonconvert" onClick={handleConvert}>
          Convert
        </button>
        <p className="buydiscla">
          {conversionData.amountUSD} USD to {conversionData.toCrypto}:
          {conversionData.convertedPrice.toFixed(8)}
        </p>
        <p className=" referal">
          {" "}
          <a
            href="https://www.binance.com/fr/activity/referral-entry/CPA?ref=CPA_00QR21HSA3"
            target="_blank"
            rel="noopener noreferrer"
          >
            <button className="buttonbuy">Buy It Now</button>
          </a>
        </p>
      </div>
    </div>
  );
}

export default CryptoPriceConverter;
