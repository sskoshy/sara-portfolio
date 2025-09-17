export default function Footer() {
    const y = new Date().getFullYear();
    return (
      <footer className="footer">
        <div className="container footer-row">
          <p>© {y} Sara Koshy</p>
          <div className="footer-links">
            <a href="https://github.com/sskoshy" target="_blank" rel="noreferrer">GitHub</a>
            <a href="https://www.linkedin.com" target="_blank" rel="noreferrer">LinkedIn</a>
            <a href="mailto:you@example.com">Email</a>
          </div>
        </div>
      </footer>
    );
  }
  