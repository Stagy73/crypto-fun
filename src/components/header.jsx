import "./Header.css";

function Header() {
  return (
    <header>
      <nav className="nav">
        <a href="/">Home</a>
        <a href="/about">About</a>
        <a href="/contact">Contact</a>
        {/* Add more navigation links as needed */}
      </nav>
    </header>
  );
}

export default Header;
