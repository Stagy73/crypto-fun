import "./Header.css";
import { Link } from "react-router-dom";

function Header() {
  return (
    <header>
      <nav className="nav">
        <Link to="/">Home</Link> {/* Use Link for homepage */}
        <Link to="/about">About</Link>
        <Link to="/Contact">Contact</Link>
        <Link to="/Disclaimer">Disclaimer</Link>
        {/* Add more navigation links as needed */}
      </nav>
    </header>
  );
}

export default Header;
