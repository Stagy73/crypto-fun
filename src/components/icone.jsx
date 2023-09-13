import "cryptoawesome/css/icons128.min.css";
import "./Icone.css";

const CryptoCard = ({ symbol }) => {
  return (
    <div className="crypto-card">
      <span className={`${symbol}-128`}></span>
      <h3>{symbol.toUpperCase()}</h3>
    </div>
  );
};

const CryptoCardList = () => {
  const cryptoCurrencies = [
    "btc",
    "eth",
    "ltc",
    "xrp",
    "bch",
    "ada",
    "dot",
    "link",
    "bnb",
    "etc",
    "doge",
    "xlm",

    "neo",
    "eos",
    "xmr",
    "trx",

    "mkr",
    "xem",
    "theta",

    "fil",

    "uni",

    "theta",
    "dash",
    "xtz",
    "waves",
    "omg",
    "qtum",
    "zec",
    "bat",
    "zen",
    "zil",

    "mana",
    "dent",
    "ren",

    "ont",

    "zrx",

    "iost",

    "snt",
  ];

  return (
    <div className="crypto-card-list">
      {cryptoCurrencies.map((crypto, index) => (
        <CryptoCard key={index} symbol={crypto} />
      ))}
    </div>
  );
};

export default CryptoCardList;
