import PropTypes from "prop-types"; // Import PropTypes

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

// Define prop types for the PriceChange component
PriceChange.propTypes = {
  currentPrice: PropTypes.number.isRequired, // Should be a number and required
  previousPrice: PropTypes.number.isRequired, // Should be a number and required
  interval: PropTypes.string.isRequired, // Should be a string and required
};

export default PriceChange;
