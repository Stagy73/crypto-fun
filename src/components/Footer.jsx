import "./Footer.css";
function Footer() {
  return (
    <footer>
      <div className="Footer">
        <p>
          &copy; {new Date().getFullYear()} A simple Crypto Converter & Price
          Tracker
        </p>
        <div>
          <a href="./sitemap.xml">SiteMap</a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
