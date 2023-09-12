import React, { useEffect, useState } from "react";
import ApexCharts from "react-apexcharts";
import axios from "axios";

const CryptoSignalChart = () => {
  const [chartOptions, setChartOptions] = useState({
    chart: {
      type: "candlestick",
      height: 400,
    },
    xaxis: {
      type: "datetime",
    },
    yaxis: {
      tooltip: {
        enabled: true,
      },
    },
  });

  const [chartSeries, setChartSeries] = useState([
    {
      data: [],
    },
  ]);

  const [pairs, setPairs] = useState([]);
  const [selectedPair, setSelectedPair] = useState("");
  const [selectedInterval, setSelectedInterval] = useState("1h");

  const handlePairChange = (event) => {
    setSelectedPair(event.target.value);
  };

  const handleIntervalChange = (event) => {
    setSelectedInterval(event.target.value);
  };

  useEffect(() => {
    const fetchPairs = async () => {
      try {
        const response = await axios.get(
          "https://api.binance.com/api/v3/exchangeInfo"
        );
        const tradingPairs = response.data.symbols.map((pair) => pair.symbol);
        setPairs(tradingPairs);
        setSelectedPair(tradingPairs[0]); // Set the default pair to the first one
      } catch (error) {
        console.error("Error fetching trading pairs:", error);
      }
    };

    fetchPairs();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      if (!selectedPair) return;

      try {
        const response = await axios.get(
          "https://api.binance.com/api/v3/klines",
          {
            params: {
              symbol: selectedPair,
              interval: selectedInterval,
              limit: 100,
            },
          }
        );

        const candlestickData = response.data.map((item) => ({
          x: new Date(item[0]),
          y: [
            parseFloat(item[1]),
            parseFloat(item[2]),
            parseFloat(item[3]),
            parseFloat(item[4]),
          ],
        }));

        setChartSeries([{ data: candlestickData }]);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [selectedPair, selectedInterval]);

  return (
    <div>
      <h1>Cryptocurrency Price Chart</h1>

      <label>Select a Cryptocurrency Pair:</label>
      <select value={selectedPair} onChange={handlePairChange}>
        {pairs.map((pair) => (
          <option key={pair} value={pair}>
            {pair}
          </option>
        ))}
      </select>

      <label>Select Time Interval:</label>
      <select value={selectedInterval} onChange={handleIntervalChange}>
        <option value="1d">1 Day</option>
        <option value="4h">4 Hours</option>
        <option value="1h">1 Hour</option>
        <option value="15m">15 Minutes</option>
        <option value="5m">5 Minutes</option>
        <option value="1m">1 Minute</option>
      </select>

      <ApexCharts
        options={chartOptions}
        series={chartSeries}
        type="candlestick"
        height={400}
      />
    </div>
  );
};

export default CryptoSignalChart;
