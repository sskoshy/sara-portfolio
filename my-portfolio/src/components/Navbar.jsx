import { NavLink, Link, useLocation } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);
  const location = useLocation();
  const menuRef = useRef(null);

  // Close mobile menu on route change
  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  // React to scroll: shadow + progress bar
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 8);
      const h = document.documentElement;
      const total = h.scrollHeight - h.clientHeight;
      const pct = total > 0 ? (h.scrollTop / total) * 100 : 0;
      setProgress(pct);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close menu when clicking outside (mobile)
  useEffect(() => {
    if (!open) return;
    const onClick = (e) => {
      if (!menuRef.current) return;
      if (!menuRef.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, [open]);

  const link = ({ isActive }) =>
    "nav-link" + (isActive ? " nav-active" : "");

  return (
    <header className={`nav ${scrolled ? "nav-scrolled" : ""}`}>
      {/* top progress */}
      <div className="nav-progress" style={{ width: `${progress}%` }} />

      <div className="container nav-row">
        <Link to="/" className="brand">
          sara.dev
        </Link>

        <button
          className={`nav-toggle ${open ? "open" : ""}`}
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
          aria-expanded={open}
          aria-controls="primary-navigation"
        >
          <span />
          <span />
          <span />
        </button>

        {/* Desktop menu */}
        <nav className="nav-menu" aria-label="Primary">
          <NavLink to="/" className={link} end>
            Home
          </NavLink>
          <NavLink to="/about" className={link}>
            About
          </NavLink>
          <NavLink to="/projects" className={link}>
            Projects
          </NavLink>
          <NavLink to="/design-portfolio" className={link}>
            Design Portfolio
          </NavLink>
          <NavLink to="/resume" className={link}>
            Resume
          </NavLink>
          <NavLink to="/contact" className={link}>
            Contact
          </NavLink>
        </nav>
      </div>

      {/* Mobile drawer */}
      <div
        className={`nav-drawer ${open ? "open" : ""}`}
        id="primary-navigation"
        ref={menuRef}
      >
        <NavLink to="/" className={link} end>
          Home
        </NavLink>
        <NavLink to="/about" className={link}>
          About
        </NavLink>
        <NavLink to="/projects" className={link}>
          Projects
        </NavLink>
        <NavLink to="/design-portfolio" className={link}>
          Design Portfolio
        </NavLink>
        <NavLink to="/resume" className={link}>
          Resume
        </NavLink>
        <NavLink to="/contact" className={link}>
          Contact
        </NavLink>
      </div>
    </header>
  );
}
