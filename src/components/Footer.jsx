import "./Footer.css";

function Footer() {
  return (
    <footer>
      <div className="footercontainer">
        <p className="footertext">
          &copy; {new Date().getFullYear()} A simple Crypto Converter & Price
          Tracker
        </p>
        <a href="./sitemap.xml">SiteMap</a>
      </div>
    </footer>
  );
}

export default Footer;
