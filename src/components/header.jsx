import "./Header.css";
import { Link } from "react-router-dom";

function Header() {
  return (
    <header className="header">
      <nav className="nav">
        <Link className="nav" to="/">
          Home
        </Link>{" "}
        {/* Use Link for homepage */}
        <Link className="nav" to="/about">
          About
        </Link>
        <Link className="nav" to="/Contact">
          Contact
        </Link>
        <Link className="nav" to="/Disclaimer">
          Disclaimer
        </Link>
        {/* Add more navigation links as needed */}
      </nav>
    </header>
  );
}

export default Header;
