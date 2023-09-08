import React from "react";
import header from "../assets/header.jpg";
import "./Header.css";

function Header() {
  return (
    <header>
      <img className="header" src={header} alt="Header Image" />
    </header>
  );
}

export default Header;
