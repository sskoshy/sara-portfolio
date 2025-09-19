import { useEffect, useRef, useState } from "react";

export default function Resume() {
  const [loading, setLoading] = useState(true);
  const frameRef = useRef(null);

  // keyboard shortcuts: d=download, o=open
  useEffect(() => {
    const onKey = (e) => {
      if (e.target && /input|textarea|select/i.test(e.target.tagName)) return;
      if (e.key.toLowerCase() === "d") {
        const a = document.createElement("a");
        a.href = "/resume.pdf";
        a.download = "Sara-Koshy-Resume.pdf";
        a.click();
      } else if (e.key.toLowerCase() === "o") {
        window.open("/resume.pdf", "_blank", "noopener,noreferrer");
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <section className="section container">
      <div className="resume-head">
        <div>
          <h2 className="section-title">Resume</h2>
          <p className="muted">Download or view it directly below.</p>
        </div>

        <div className="resume-actions">
          <a className="btn btn-primary" href="/resume.pdf" download>
            Download PDF
          </a>
          <a
            className="btn btn-ghost"
            href="/resume.pdf"
            target="_blank"
            rel="noreferrer"
          >
            Open in new tab
          </a>
        </div>
      </div>

      {/* highlights */}
      <div className="resume-highlights card hover-raise">
        <div className="rh-row">
          <div className="rh-item">
            <div className="rh-title">Focus</div>
            <div className="rh-value">Frontend · React · Design Systems</div>
          </div>
          <div className="rh-item">
            <div className="rh-title">Extras</div>
            <div className="rh-value">Accessibility · Data Viz (R) · Express</div>
          </div>
          <div className="rh-item">
            <div className="rh-title">Status</div>
            <div className="rh-value">Open to internships</div>
          </div>
        </div>
      </div>

      {/* viewer card with spotlight + shimmer */}
      <div
        className="resume-embed spotlight"
        onMouseMove={(e) => {
          const el = e.currentTarget;
          const r = el.getBoundingClientRect();
          const x = ((e.clientX - r.left) / r.width) * 100;
          const y = ((e.clientY - r.top) / r.height) * 100;
          el.style.setProperty("--mx", x + "%");
          el.style.setProperty("--my", y + "%");
        }}
        onMouseLeave={(e) => {
          const el = e.currentTarget;
          el.style.setProperty("--mx", "50%");
          el.style.setProperty("--my", "50%");
        }}
      >
        {/* loading shimmer */}
        {loading && (
          <div
            className="shimmer"
            style={{
              position: "absolute",
              inset: 0,
              borderRadius: 16,
              overflow: "hidden",
            }}
            aria-hidden="true"
          />
        )}

        <iframe
          ref={frameRef}
          title="Resume PDF"
          src="/resume.pdf"
          className="resume-frame"
          onLoad={() => setLoading(false)}
        />

        <div className="resume-fallback">
          Can’t display the PDF?{" "}
          <a href="/resume.pdf" target="_blank" rel="noreferrer" className="link">
            Open in a new tab
          </a>
          .
        </div>
      </div>
    </section>
  );
}
