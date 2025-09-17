export default function Contact() {
    return (
      <section className="section container">
        <h2 className="section-title">Contact</h2>
        <p className="muted">Fastest way is email. Open to internships, collabs, and design/dev work.</p>
  
        <div className="grid2 mt">
          <div className="card">
            <h3 className="card-title">Reach me</h3>
            <p>Email: <a className="link" href="mailto:you@example.com">you@example.com</a></p>
            <p>GitHub: <a className="link" href="https://github.com/sskoshy" target="_blank" rel="noreferrer">github.com/sskoshy</a></p>
            <p>LinkedIn: <a className="link" href="https://www.linkedin.com" target="_blank" rel="noreferrer">linkedin.com</a></p>
          </div>
          <form className="card form" onSubmit={(e)=>e.preventDefault()}>
            <h3 className="card-title">Message (demo)</h3>
            <input className="input" placeholder="Your email" />
            <textarea className="textarea" placeholder="Say hi…" />
            <button className="btn btn-primary">Send</button>
          </form>
        </div>
      </section>
    );
  }
  