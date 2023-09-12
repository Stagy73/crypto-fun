import React, { useEffect, useState, useRef } from "react";
import ApexCharts from "react-apexcharts";
import axios from "axios";
import "apexcharts/dist/apexcharts.css";
import * as d3 from "d3"; // Import D3.js
import "./Signal.css";

const CryptoSignalChart = () => {
  const [chartData, setChartData] = useState([]);
  const [pairs, setPairs] = useState([]);
  const [selectedPair, setSelectedPair] = useState("");
  const [selectedInterval, setSelectedInterval] = useState("1h");
  const [triangleData, setTriangleData] = useState([]);
  const [polygons, setPolygons] = useState([]);

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
        setSelectedPair(tradingPairs[0]);
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

        setChartData([{ data: candlestickData }]);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [selectedPair, selectedInterval]);

  const chartOptions = {
    chart: {
      animations: {
        enabled: true,
        dynamicAnimation: {
          speed: 1000,
        },
      },
      zoom: {
        enabled: true,
        type: "x",
        autoScaleYaxis: true,
      },
      toolbar: {
        show: true,
        tools: {
          download: false,
          selection: true,
          zoom: true,
          zoomin: true,
          zoomout: true,
          pan: true,
          reset: true,
          customIcons: [
            {
              icon: "plus",
              index: 0,
              title: "Add Indicator",
              class: "custom-icon",
              click(chartContext, seriesIndex, config) {
                // Handle the click event for your custom icon here
                // For example, open a modal to add an indicator
              },
            },
          ],
        },
      },
      markers: {
        size: 5,
        hover: {
          size: 7,
        },
      },
    },
    dataLabels: {
      enabled: true,
    },
    xaxis: {},
    yaxis: {},
  };

  const addTriangle = (event) => {
    const { offsetX, offsetY } = event.nativeEvent;
    const { xaxis, yaxis } = chartRef.current.props.options.xaxis;
    const xValue = xaxis.categories[Math.round(offsetX)];
    const yValue = yaxis.categories[Math.round(offsetY)];
    const newTriangle = { x: xValue, y: yValue };
    setTriangleData([...triangleData, newTriangle]);
  };

  const drawTriangles = () => {
    const svg = d3.select(".apexcharts-canvas");
    const newPolygons = [];

    svg.selectAll("polygon").remove();

    triangleData.forEach((triangle, index) => {
      const x = chartRef.current.w.globals.xAxisScale(triangle.x);
      const y = chartRef.current.w.globals.yAxisScale(triangle.y);

      const polygon = svg
        .append("polygon")
        .attr("points", `${x - 5},${y} ${x},${y - 10} ${x + 5},${y}`)
        .attr("fill", "red");

      newPolygons.push(polygon);
    });

    // Store the new polygons in state
    setPolygons(newPolygons);
  };

  useEffect(() => {
    drawTriangles();
  }, [triangleData]);
  //comit
  const chartRef = useRef(null);

  return (
    <div className="chart">
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
      <div
        style={{
          width: "90vw",
          height: "120vh",
          margin: "0 auto",
        }}
        onClick={addTriangle}
      >
        <ApexCharts
          options={chartOptions}
          series={chartData}
          type="candlestick"
          height="100%"
          style={{
            marginLeft: "30px",
            marginRight: "100px",
          }}
          ref={chartRef}
        />
      </div>
    </div>
  );
};

export default CryptoSignalChart;
