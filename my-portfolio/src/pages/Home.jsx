import { useEffect, useState } from "react";
import ProjectCard from "../components/ProjectCard.jsx";
import projects from "../data/projects.js";

export default function Home() {
  const featured = projects.slice(0, 2);

  // Slower, nicer typewriter with pauses
  const phrases = ["Web Developer", "Designer", "Stats + ML @ UC Davis"];
  const [idx, setIdx] = useState(0);
  const [text, setText] = useState("");
  const [phase, setPhase] = useState("type"); // "type" | "pause" | "erase"

  useEffect(() => {
    let timer;
    const current = phrases[idx];

    if (phase === "type") {
      timer = setTimeout(() => {
        const next = current.slice(0, text.length + 1);
        setText(next);
        if (next.length === current.length) setPhase("pause");
      }, 120); // slower typing
    } else if (phase === "pause") {
      timer = setTimeout(() => setPhase("erase"), 900); // longer pause at end
    } else if (phase === "erase") {
      timer = setTimeout(() => {
        const next = text.slice(0, -1);
        setText(next);
        if (next.length === 0) {
          setPhase("type");
          setIdx((i) => (i + 1) % phrases.length);
        }
      }, 70); // erase speed
    }

    return () => clearTimeout(timer);
  }, [text, phase, idx]);

  return (
    <>
      {/* HERO (more filled: portrait on right) */}
      <section className="hero">
        <div className="container hero-grid">
          {/* left copy */}
          <div className="hero-text">
            <p className="eyebrow">HI THERE,</p>
            <h1 className="hero-title">
              I am <span className="gradient">{text}</span>
              <span className="cursor">|</span>
            </h1>
            <p className="hero-sub">
              I craft clean, fast interfaces and ship quickly. Focused on React,
              design systems, and data-driven projects.
            </p>
            <div className="hero-actions">
              <a className="btn btn-primary" href="mailto:you@example.com">Hire Me</a>
              <a className="btn btn-ghost" href="/projects">Portfolio</a>
              <a className="btn btn-ghost" href="/resume">Resume</a>
            </div>

            {/* quick stats row to fill space */}
            <div className="stats">
              <div className="stat">
                <div className="stat-num">15+</div>
                <div className="stat-label">Projects</div>
              </div>
              <div className="stat">
                <div className="stat-num">3 yrs</div>
                <div className="stat-label">React</div>
              </div>
              <div className="stat">
                <div className="stat-num">7</div>
                <div className="stat-label">Tools /wk</div>
              </div>
            </div>
          </div>

          {/* right portrait */}
          <div className="hero-photo portrait-frame">
            <div className="glow"></div>
            <img src="/portrait.jpg" alt="Portrait" />
          </div>
        </div>
      </section>

      {/* tiny tech ticker to add motion */}
      <div className="ticker">
        <div className="ticker-track">
          <span>React</span><span>Vite</span><span>CSS</span>
          <span>Express</span><span>MongoDB</span><span>UI/UX</span>
          <span>Design Systems</span><span>Accessibility</span>
          <span>React</span><span>Vite</span><span>CSS</span>
          <span>Express</span><span>MongoDB</span><span>UI/UX</span>
        </div>
      </div>

      {/* Featured projects (unchanged structure, wrapped in spotlight) */}
      <section className="container section">
        <h2 className="section-title">Featured</h2>
        <p className="muted">A couple of recent highlights.</p>
        <div className="grid2">
          {featured.map((p) => (
            <div
              key={p.title}
              className="card hover-raise spotlight-wrap"
              onMouseMove={(e) => {
                const el = e.currentTarget;
                const r = el.getBoundingClientRect();
                const x = ((e.clientX - r.left) / r.width) * 100;
                const y = ((e.clientY - r.top) / r.height) * 100;
                el.style.setProperty("--mx", x + "%");
                el.style.setProperty("--my", y + "%");
              }}
            >
              <div className="card-spotlight" />
              <ProjectCard project={p} />
            </div>
          ))}
        </div>
      </section>

      {/* small image gallery to make page feel fuller */}
      <section className="container section">
        <h2 className="section-title">Snapshots</h2>
        <p className="muted">A peek at recent design/dev moments.</p>
        <div className="gallery3">
          <figure className="gallery-card">
            <img src="/gallery1.jpg" alt="Work sample 1" />
            <figcaption>CPA site UI</figcaption>
          </figure>
          <figure className="gallery-card">
            <img src="/gallery2.jpg" alt="Work sample 2" />
            <figcaption>ISA event page</figcaption>
          </figure>
          <figure className="gallery-card">
            <img src="/gallery3.jpg" alt="Work sample 3" />
            <figcaption>Sticky notes app</figcaption>
          </figure>
        </div>
      </section>

      {/* CTA */}
      <section className="cta">
        <div className="container cta-card">
          <div className="bg-gradient"></div>
          <h3>Let’s build something great</h3>
          <p>I’m open to internships and collabs in design and front-end.</p>
          <div className="hero-actions">
            <a className="btn btn-primary" href="mailto:you@example.com">Email me</a>
            <a className="btn btn-ghost" href="/resume">Download resume</a>
          </div>
        </div>
      </section>
    </>
  );
}
