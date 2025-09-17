export default function Resume() {
    return (
      <section className="section container">
        <h2 className="section-title">Resume</h2>
        <p className="muted">Download or view inline.</p>
  
        <div className="resume-actions">
          <a className="btn btn-primary" href="/resume.pdf" download>Download PDF</a>
          <a className="btn btn-ghost" href="/resume.pdf" target="_blank" rel="noreferrer">Open in new tab</a>
        </div>
  
        <div className="resume-embed">
          <object data="/resume.pdf" type="application/pdf" width="100%" height="800">
            <p>Can’t display PDF. <a href="/resume.pdf" target="_blank" rel="noreferrer">Open in new tab</a>.</p>
          </object>
        </div>
      </section>
    );
  }
  