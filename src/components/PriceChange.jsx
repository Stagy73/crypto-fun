function PriceChange({ currentPrice, previousPrice, interval }) {
  const calculatePercentageChange = (current, previous) => {
    if (previous === 0) return 0; // To avoid division by zero
    return ((current - previous) / previous) * 100;
  };

  const percentageChange = calculatePercentageChange(
    currentPrice,
    previousPrice
  );

  return (
    <span>
      {interval} Change:{" "}
      {percentageChange !== 0
        ? `${percentageChange > 0 ? "+" : "-"}${Math.abs(
            percentageChange
          ).toFixed(2)}%`
        : "No Change"}
    </span>
  );
}

export default PriceChange;
