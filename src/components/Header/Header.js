import React from "react";
import "./Header.css";
function Header() {
  return (
    <header className="nav">
      <a href="/" className="nav-logo-link">
        <div className="nav-logo">My blog</div>
      </a>
      <nav className="nav__menu">
        <a className="nav-link" href="/">
          Home
        </a>
        <a className="nav-link" href="/add">
          Add
        </a>
        <a className="nav-link" href="/about">
          About
        </a>
        <a className="nav-link" href="/contacts">
          Contacts
        </a>
      </nav>
    </header>
  );
}

export default Header;
