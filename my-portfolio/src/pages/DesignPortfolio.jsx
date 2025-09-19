export default function DesignPortfolio() {
  return (
    <section className="section container">
      <div className="resume-head">
        <div>
          <h2 className="section-title">Design Portfolio</h2>
          <p className="muted">Preview or download my full design work showcase.</p>
        </div>

        <div className="resume-actions">
          <a className="btn btn-primary" href="/design-portfolio.pdf" download>
            Download PDF
          </a>
          <a
            className="btn btn-ghost"
            href="/design-portfolio.pdf"
            target="_blank"
            rel="noreferrer"
          >
            Open in new tab
          </a>
        </div>
      </div>

      {/* Normal PDF viewer */}
      <div
        className="resume-embed card hover-raise"
        style={{
          maxWidth: "900px", // similar to resume page
          height: "80vh",    // decent viewing height
          margin: "0 auto",
        }}
      >
        <iframe
          title="Design Portfolio PDF"
          src="/design-portfolio.pdf"
          style={{
            width: "100%",
            height: "100%",
            border: "none",
            borderRadius: "10px",
          }}
        />
        <div className="resume-fallback">
          Can’t display the PDF?{" "}
          <a
            href="/design-portfolio.pdf"
            target="_blank"
            rel="noreferrer"
            className="link"
          >
            Open in a new tab
          </a>
          .
        </div>
      </div>
    </section>
  );
}
