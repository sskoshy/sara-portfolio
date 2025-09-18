export default function Resume() {
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
          <a className="btn btn-ghost" href="/resume.pdf" target="_blank" rel="noreferrer">
            Open in new tab
          </a>
        </div>
      </div>

      {/* quick highlights strip */}
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

      {/* resume viewer */}
      <div className="resume-embed">
        <iframe
          title="Resume PDF"
          src="/resume.pdf"
          className="resume-frame"
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
