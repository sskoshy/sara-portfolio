import { NavLink, Link } from "react-router-dom";
import { useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const link = ({ isActive }) =>
    "nav-link" + (isActive ? " nav-active" : "");

  return (
    <header className="nav">
      <div className="container nav-row">
        <Link to="/" className="brand">sara.dev</Link>
        <button className="nav-toggle" onClick={() => setOpen(v => !v)} aria-label="Toggle menu">
          ☰
        </button>
        <nav className={`nav-menu ${open ? "open" : ""}`} onClick={() => setOpen(false)}>
          <NavLink to="/" className={link} end>Home</NavLink>
          <NavLink to="/about" className={link}>About</NavLink>
          <NavLink to="/projects" className={link}>Projects</NavLink>
          <NavLink to="/resume" className={link}>Resume</NavLink>
          <NavLink to="/contact" className={link}>Contact</NavLink>
        </nav>
      </div>
    </header>
  );
}
