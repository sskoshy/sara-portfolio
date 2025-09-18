import { useEffect, useState } from "react";

export default function Contact() {
  const [toast, setToast] = useState("");

  const copy = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      setToast("Copied to clipboard");
    } catch {
      setToast("Could not copy");
    }
  };

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(""), 1500);
    return () => clearTimeout(t);
  }, [toast]);

  return (
    <section className="section container">
      <div className="contact-hero card hover-raise">
        <div>
          <h2 className="section-title">Contact</h2>
          <p className="muted">
            Fastest way is email. Open to internships, collabs, and design/dev work.
          </p>
        </div>
        <div className="chips">
          <span className="chip chip-active">Open to internships</span>
          <span className="chip">Remote-friendly</span>
          <span className="chip">Replies within 24–48h</span>
        </div>
      </div>

      <div className="grid2 mt">
        {/* Reach me */}
        <div className="card reach">
          <h3 className="card-title">Reach me</h3>

          {/* Personal email */}
          <div
            className="reach-item hover-raise"
            onClick={() => copy("sara.s.koshy@gmail.com")}
          >
            <div className="reach-left">
              <div className="reach-icon">✉️</div>
              <div>
                <div className="reach-label">Email (Personal)</div>
                <a className="link" href="mailto:sara.s.koshy@gmail.com">
                  sara.s.koshy@gmail.com
                </a>
              </div>
            </div>
            <button className="mini-btn" type="button">Copy</button>
            <span className="card-spotlight" />
          </div>

          {/* School email */}
          <div
            className="reach-item hover-raise"
            onClick={() => copy("sskoshy@ucdavis.edu")}
          >
            <div className="reach-left">
              <div className="reach-icon">🎓</div>
              <div>
                <div className="reach-label">Email (School)</div>
                <a className="link" href="mailto:sskoshy@ucdavis.edu">
                  sskoshy@ucdavis.edu
                </a>
              </div>
            </div>
            <button className="mini-btn" type="button">Copy</button>
            <span className="card-spotlight" />
          </div>

          {/* GitHub */}
          <a
            className="reach-item hover-raise"
            href="https://github.com/sskoshy"
            target="_blank"
            rel="noreferrer"
          >
            <div className="reach-left">
              <div className="reach-icon">🐙</div>
              <div>
                <div className="reach-label">GitHub</div>
                <div className="muted">github.com/sskoshy</div>
              </div>
            </div>
            <span className="mini-link">Open ↗</span>
            <span className="card-spotlight" />
          </a>

          {/* LinkedIn */}
          <a
            className="reach-item hover-raise"
            href="https://www.linkedin.com/in/sarakoshy"
            target="_blank"
            rel="noreferrer"
          >
            <div className="reach-left">
              <div className="reach-icon">💼</div>
              <div>
                <div className="reach-label">LinkedIn</div>
                <div className="muted">linkedin.com/in/sarakoshy</div>
              </div>
            </div>
            <span className="mini-link">Open ↗</span>
            <span className="card-spotlight" />
          </a>
        </div>

        {/* Simple form */}
        <form className="card form" onSubmit={(e) => e.preventDefault()}>
          <h3 className="card-title">Message</h3>
          <input className="input" placeholder="Your email" type="email" required />
          <input className="input" placeholder="Subject" required />
          <textarea className="textarea" placeholder="Say hi…" rows={6} required />
          <button className="btn btn-primary">Send</button>
        </form>
      </div>

      {/* toast */}
      {toast && <div className="toast">{toast}</div>}
    </section>
  );
}
