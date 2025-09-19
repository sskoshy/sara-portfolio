import { useEffect, useRef, useState } from "react";

export default function Contact() {
  const [toast, setToast] = useState("");
  const [sent, setSent] = useState(false);

  const emailRef = useRef(null);
  const subjectRef = useRef(null);
  const messageRef = useRef(null);

  const copy = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      setToast("Copied to clipboard ✓");
    } catch {
      setToast("Could not copy");
    }
  };

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(""), 1500);
    return () => clearTimeout(t);
  }, [toast]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key.toLowerCase() === "e" && !e.metaKey && !e.ctrlKey && !e.altKey) emailRef.current?.focus();
      if ((e.key === "Enter") && (e.metaKey || e.ctrlKey)) submitDemo();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const submitDemo = () => {
    const email = emailRef.current?.value.trim();
    const subject = subjectRef.current?.value.trim();
    const msg = messageRef.current?.value.trim();
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || !subject || !msg) {
      setToast("Please fill all fields correctly");
      return;
    }
    setSent(true);
    setToast("Message sent (demo) ✓");
    emailRef.current.value = "";
    subjectRef.current.value = "";
    messageRef.current.value = "";
    setTimeout(() => setSent(false), 1400);
  };

  const spotMove = (e) => {
    const el = e.currentTarget; const r = el.getBoundingClientRect();
    el.style.setProperty("--mx", ((e.clientX - r.left) / r.width) * 100 + "%");
    el.style.setProperty("--my", ((e.clientY - r.top) / r.height) * 100 + "%");
  };
  const spotLeave = (e) => { const el = e.currentTarget; el.style.setProperty("--mx","50%"); el.style.setProperty("--my","50%"); };

  const ripple = (e) => {
    const btn = e.currentTarget; const r = btn.getBoundingClientRect();
    const s = Math.max(r.width, r.height); const span = document.createElement("span");
    span.className = "ripple"; span.style.width = span.style.height = s + "px";
    span.style.left = e.clientX - r.left - s / 2 + "px";
    span.style.top = e.clientY - r.top - s / 2 + "px";
    btn.appendChild(span); setTimeout(() => span.remove(), 500);
  };

  return (
    <section className="section container">
      {/* header card with colorful accent */}
      <div
        className="contact-hero card hover-raise spotlight"
        onMouseMove={spotMove}
        onMouseLeave={spotLeave}
        style={{
          borderImage: "linear-gradient(90deg, rgba(99,102,241,.35), rgba(34,211,238,.25), rgba(217,70,239,.25)) 1",
          borderWidth: "1px",
          borderStyle: "solid",
        }}
      >
        <div>
          {/* Title back to white */}
          <h2 className="section-title">Contact</h2>
          <p className="muted">Fastest way is email. Open to internships, collabs, and design/dev work.</p>
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

          {/* Personal */}
          <div
            className="reach-item hover-raise spotlight"
            onMouseMove={spotMove}
            onMouseLeave={spotLeave}
            onClick={() => copy("sara.s.koshy@gmail.com")}
            style={{ background:"linear-gradient(90deg, rgba(99,102,241,.10), rgba(34,211,238,.06))" }}
          >
            <div className="reach-left">
              <div className="reach-icon" style={{ background:"linear-gradient(90deg,var(--brand),var(--primary))" }}>✉️</div>
              <div>
                <div className="reach-label">Email (Personal)</div>
                <a className="link" href="mailto:sara.s.koshy@gmail.com">sara.s.koshy@gmail.com</a>
              </div>
            </div>
            <button className="mini-btn" type="button" onMouseDown={ripple}>Copy</button>
            <span className="card-spotlight" />
          </div>

          {/* School */}
          <div
            className="reach-item hover-raise spotlight"
            onMouseMove={spotMove}
            onMouseLeave={spotLeave}
            onClick={() => copy("sskoshy@ucdavis.edu")}
            style={{ background:"linear-gradient(90deg, rgba(217,70,239,.10), rgba(99,102,241,.06))" }}
          >
            <div className="reach-left">
              <div className="reach-icon" style={{ background:"linear-gradient(90deg,var(--accent),var(--brand))" }}>🎓</div>
              <div>
                <div className="reach-label">Email (School)</div>
                <a className="link" href="mailto:sskoshy@ucdavis.edu">sskoshy@ucdavis.edu</a>
              </div>
            </div>
            <button className="mini-btn" type="button" onMouseDown={ripple}>Copy</button>
            <span className="card-spotlight" />
          </div>

          {/* GitHub */}
          <a
            className="reach-item hover-raise spotlight"
            href="https://github.com/sskoshy"
            target="_blank"
            rel="noreferrer"
            onMouseMove={spotMove}
            onMouseLeave={spotLeave}
            style={{ background:"linear-gradient(90deg, rgba(34,211,238,.10), rgba(217,70,239,.06))" }}
          >
            <div className="reach-left">
              <div className="reach-icon" style={{ background:"linear-gradient(90deg,var(--primary),var(--accent))" }}>🐙</div>
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
            className="reach-item hover-raise spotlight"
            href="https://www.linkedin.com/in/sarakoshy"
            target="_blank"
            rel="noreferrer"
            onMouseMove={spotMove}
            onMouseLeave={spotLeave}
            style={{ background:"linear-gradient(90deg, rgba(99,102,241,.10), rgba(217,70,239,.06))" }}
          >
            <div className="reach-left">
              <div className="reach-icon" style={{ background:"linear-gradient(90deg,var(--brand),var(--accent))" }}>💼</div>
              <div>
                <div className="reach-label">LinkedIn</div>
                <div className="muted">linkedin.com/in/sarakoshy</div>
              </div>
            </div>
            <span className="mini-link">Open ↗</span>
            <span className="card-spotlight" />
          </a>
        </div>

        {/* Message form (demo) */}
        <form
          className={`card form ${sent ? "reveal in-view" : ""}`}
          onSubmit={(e) => { e.preventDefault(); submitDemo(); }}
          style={{ borderImage: "linear-gradient(90deg, rgba(34,211,238,.28), rgba(217,70,239,.22)) 1", borderWidth:"1px", borderStyle:"solid" }}
        >
          <h3 className="card-title" style={{ background:"linear-gradient(90deg,var(--brand),var(--primary))", WebkitBackgroundClip:"text", color:"transparent" }}>
            Message
          </h3>

          <label className="label" htmlFor="email">Your email</label>
          <input id="email" ref={emailRef} className="input" placeholder="you@example.com" type="email" required />

          <label className="label" htmlFor="subject">Subject</label>
          <input id="subject" ref={subjectRef} className="input" placeholder="Subject" required />

          <label className="label" htmlFor="msg">Message</label>
          <textarea id="msg" ref={messageRef} className="textarea" placeholder="Say hi…" rows={6} required />

          <div className="form-actions">
            <button className="btn btn-primary" type="submit">Send (demo)</button>
            <span className="note muted">Tip: Cmd/Ctrl + Enter to send</span>
          </div>
        </form>
      </div>

      {toast && <div className="toast">{toast}</div>}
    </section>
  );
}

/* minor helpers */
const style = document.createElement("style");
style.textContent = `
/* ripple */
.mini-btn{position:relative;overflow:hidden}
.mini-btn .ripple{position:absolute;border-radius:50%;transform:scale(0);background:rgba(255,255,255,.25);animation:ripple .5s ease-out}
@keyframes ripple{to{transform:scale(2.8);opacity:0}}
/* spotlight (if not global) */
.spotlight{position:relative}
.spotlight::after{
  content:"";position:absolute;inset:-150%;pointer-events:none;border-radius:inherit;
  background:radial-gradient(200px 200px at var(--mx,50%) var(--my,50%), rgba(99,102,241,.28), transparent 60%);
  opacity:0;transition:opacity .2s ease
}
.spotlight:hover::after{opacity:1}
`;
document.head.appendChild(style);
