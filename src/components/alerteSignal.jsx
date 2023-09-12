import PropTypes from "prop-types";

const TradingSignalAlert = ({ rsiValue }) => {
  // Define your RSI thresholds for buy and sell signals
  const buyThreshold = 30;
  const sellThreshold = 70;

  // Determine whether to display a buy, sell, or no alert
  let alertMessage = "";
  let alertType = "";

  if (rsiValue < buyThreshold) {
    alertMessage = "Buy Signal";
    alertType = "buy";
  } else if (rsiValue > sellThreshold) {
    alertMessage = "Sell Signal";
    alertType = "sell";
  } else {
    alertMessage = "No Signal";
    alertType = "none";
  }

  return (
    <div className={`alert alert-${alertType}`}>
      <strong>{alertMessage}</strong>
    </div>
  );
};
TradingSignalAlert.propTypes = {
  rsiValue: PropTypes.number.isRequired, // You can adjust the PropTypes based on the expected data type
};

export default TradingSignalAlert;
