import ProjectCard from "../components/ProjectCard";
import projects from "../data/projects";

export default function Home() {
  const featured = projects.slice(0, 2);

  // spotlight hover for featured projects
  const handleSpotlight = (e) => {
    const el = e.currentTarget;
    const r = el.getBoundingClientRect();
    const x = ((e.clientX - r.left) / r.width) * 100;
    const y = ((e.clientY - r.top) / r.height) * 100;
    el.style.setProperty("--mx", x + "%");
    el.style.setProperty("--my", y + "%");
  };

  return (
    <>
      {/* HERO */}
      <section className="hero">
        <div className="container hero-grid">
          {/* LEFT: text */}
          <div className="hero-text">
            <p className="eyebrow">Welcome 👋</p>
            <h1 className="hero-title">
              I’m <span className="gradient">Sara Koshy</span>
              <span className="cursor">|</span>
            </h1>
            <p className="hero-sub">
              Third-year Statistics major at UC Davis on the Machine Learning &
              Data Science track. I design and build interactive, modern web
              experiences with a focus on <b>React</b>, <b>design systems</b>,
              and <b>data-driven storytelling</b>.
            </p>
            <p className="hero-sub" style={{ marginTop: "12px" }}>
              I love combining <b>creativity</b> and <b>tech</b> — from
              designing event graphics for the Indian Student Association to
              shipping full React apps like a CPA website with a working backend.
            </p>
            <div className="hero-actions">
              <a
                className="btn btn-primary"
                href="https://www.linkedin.com/in/sarakoshy"
                target="_blank"
                rel="noreferrer"
              >
                Let’s Connect
              </a>
              <a className="btn btn-ghost" href="/projects">
                See My Work
              </a>
              <a className="btn btn-ghost" href="/resume">
                Download CV
              </a>
            </div>

            {/* quick stats */}
            <div
              style={{
                display: "flex",
                gap: "16px",
                marginTop: "22px",
                flexWrap: "wrap",
              }}
            >
              <div className="stat-box">
                <div className="stat-num">15+</div>
                <div className="stat-label">Projects Completed</div>
              </div>
              <div className="stat-box">
                <div className="stat-num">3 yrs</div>
                <div className="stat-label">Frontend Experience</div>
              </div>
              <div className="stat-box">
                <div className="stat-num">∞</div>
                <div className="stat-label">Passion for Design</div>
              </div>
            </div>
          </div>

          {/* RIGHT: bigger vibrant portrait */}
          <div
            className="hero-photo"
            style={{ display: "flex", justifyContent: "center" }}
          >
            <div className="glow"></div>
            <img
              src="/portrait.jpg"
              alt="Sara Portrait"
              style={{
                width: "260px",
                height: "260px",
                objectFit: "cover",
                borderRadius: "999px", // circle
                border: "3px solid transparent",
                backgroundImage:
                  "linear-gradient(var(--bg), var(--bg)), linear-gradient(90deg, var(--brand), var(--primary), var(--accent))",
                backgroundOrigin: "border-box",
                backgroundClip: "content-box, border-box",
                boxShadow:
                  "0 15px 45px rgba(99,102,241,.4), 0 0 35px rgba(217,70,239,.3), 0 0 20px rgba(34,211,238,.25)",
                transition: "transform .3s ease, box-shadow .3s ease",
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = "scale(1.05)";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = "scale(1)";
              }}
            />
          </div>
        </div>
      </section>

      {/* FEATURED PROJECTS */}
      <section className="container section">
        <h2 className="section-title">Featured Projects</h2>
        <p className="muted">
          A glimpse of the work I’ve been creating lately.
        </p>

        <div className="grid2" style={{ marginTop: 20 }}>
          {featured.map((p) => (
            <div
              key={p.title}
              className="card hover-raise"
              onMouseMove={handleSpotlight}
              style={{ position: "relative" }}
            >
              <div className="card-spotlight" />
              <ProjectCard project={p} />
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="cta">
        <div className="container cta-card">
          <div className="bg-gradient"></div>
          <h3>Open to Internships & Collaboration ✨</h3>
          <p>
            I bring together <b>statistics</b>, <b>web development</b>, and{" "}
            <b>design</b> to create solutions that are both functional and
            visually engaging. Let’s build something impactful!
          </p>
          <div className="hero-actions">
            <a
              className="btn btn-primary"
              href="https://www.linkedin.com/in/sarakoshy"
              target="_blank"
              rel="noreferrer"
            >
              Let’s Connect
            </a>
            <a className="btn btn-ghost" href="/resume">
              View Resume
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
