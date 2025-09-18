import { useState } from "react";

const TABS = ["Skills", "Experience", "Education"];

function SkillBar({ label, level }) {
  return (
    <div className="skill">
      <div className="skill-head">
        <span>{label}</span>
        <span className="skill-level">{level}%</span>
      </div>
      <div className="skill-track">
        <div className="skill-fill" style={{ width: `${level}%` }} />
      </div>
    </div>
  );
}

function Badge({ text }) {
  return <span className="badge">{text}</span>;
}

export default function About() {
  const [tab, setTab] = useState("Skills");

  return (
    <section className="section container">
      {/* INTRO CARD */}
      <div className="about-hero card">
        <div className="about-hero-text">
          <h2 className="section-title">About Me</h2>
          <p className="muted">
            I’m a third-year Statistics major at UC Davis (ML/Data Science), focused on
            building modern, accessible web experiences. I love translating data and ideas
            into clean, interactive interfaces — and I move fast with React and design systems.
          </p>
          <div className="about-hero-actions">
            <a className="btn btn-primary" href="/resume">View Resume</a>
            <a className="btn btn-ghost" href="/contact">Contact</a>
          </div>
        </div>

        <div className="about-hero-photo">
          <div className="ring-glow" />
          <img
            src="/portrait.jpg"
            alt="Sara"
            className="about-img"
          />
        </div>
      </div>

      {/* QUICK FACTS */}
      <div className="facts">
        <div className="fact">
          <div className="fact-num">15+</div>
          <div className="fact-label">Projects</div>
        </div>
        <div className="fact">
          <div className="fact-num">3 yrs</div>
          <div className="fact-label">Frontend</div>
        </div>
        <div className="fact">
          <div className="fact-num">UC Davis</div>
          <div className="fact-label">Stats (ML/DS)</div>
        </div>
        <div className="fact">
          <div className="fact-num">Open</div>
          <div className="fact-label">Internships</div>
        </div>
      </div>

      {/* TABS */}
      <div className="tabs card">
        <div className="tab-list" role="tablist" aria-label="About tabs">
          {TABS.map((t) => (
            <button
              key={t}
              className={`tab ${tab === t ? "active" : ""}`}
              onClick={() => setTab(t)}
              role="tab"
              aria-selected={tab === t}
              aria-controls={`panel-${t}`}
              id={`tab-${t}`}
            >
              {t}
            </button>
          ))}
        </div>

        <div className="tab-panels">
          
          {/* SKILLS */}

          {tab === "Skills" && (
            <div className="tab-panel" id="panel-Skills" role="tabpanel" aria-labelledby="tab-Skills">
              <h3 className="card-title">Core Frontend</h3>
              <div className="badges">
                <Badge text="React" />
                <Badge text="JavaScript (ES202x)" />
                <Badge text="CSS / Design Systems" />
                <Badge text="Accessibility (A11y)" />
              </div>

              <h3 className="card-title mt">Data & Backend</h3>
              <div className="badges">
                <Badge text="R / Data Viz" />
                <Badge text="Express / REST APIs" />
                <Badge text="MongoDB Atlas" />
              </div>

              <h3 className="card-title mt">Tools I Use</h3>
              <div className="badges">
                <Badge text="Vite" />
                <Badge text="React Router" />
                <Badge text="Figma" />
                <Badge text="Illustrator" />
                <Badge text="Canva" />
                <Badge text="Git / GitHub" />
                <Badge text="Vercel" />
              </div>
            </div>
          )}


          {/* EXPERIENCE */}
          {tab === "Experience" && (
            <div className="tab-panel" id="panel-Experience" role="tabpanel" aria-labelledby="tab-Experience">
              <div className="timeline">
                <div className="tl-item">
                  <div className="tl-dot" />
                  <div className="tl-content">
                    <div className="tl-row">
                      <strong>ISA UC Davis — Co-Director of Design</strong>
                      <span className="tl-time">2025</span>
                    </div>
                    <p className="muted">
                      Built org website components, event pages, and brand assets. Led design reviews
                      and created a reusable UI kit to speed up new page creation.
                    </p>
                    <div className="badges">
                      <Badge text="Design System" />
                      <Badge text="Branding" />
                      <Badge text="React UI" />
                    </div>
                  </div>
                </div>

                <div className="tl-item">
                  <div className="tl-dot" />
                  <div className="tl-content">
                    <div className="tl-row">
                      <strong>CPA Firm Website — Personal Project</strong>
                      <span className="tl-time">2024</span>
                    </div>
                    <p className="muted">
                      Full-stack demo with Express + MongoDB; public site with contact/careers forms,
                      and a client portal concept. Deployed and iterated from feedback.
                    </p>
                    <div className="badges">
                      <Badge text="Express" />
                      <Badge text="MongoDB" />
                      <Badge text="React" />
                    </div>
                  </div>
                </div>

                <div className="tl-item">
                  <div className="tl-dot" />
                  <div className="tl-content">
                    <div className="tl-row">
                      <strong>Projects & Coursework</strong>
                      <span className="tl-time">2023 → 2025</span>
                    </div>
                    <p className="muted">
                      React projects, R-based visualizations, and class work centered on statistics,
                      ML foundations, and communicating insights clearly.
                    </p>
                    <div className="badges">
                      <Badge text="R / Viz" />
                      <Badge text="React" />
                      <Badge text="A11y" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* EDUCATION */}
          {tab === "Education" && (
            <div className="tab-panel" id="panel-Education" role="tabpanel" aria-labelledby="tab-Education">
              <div className="edu-grid">
                <div className="card">
                  <h3 className="card-title">University of California, Davis</h3>
                  <p className="muted">B.S. Statistics — Machine Learning & Data Science Track</p>
                  <ul className="list">
                    <li>Relevant: Probability & Stats, Statistical Learning, Data Visualization</li>
                    <li>Clubs: Indian Student Association (Design), Tech/design events</li>
                    <li>Focus: Frontend engineering, design systems, storytelling with data</li>
                  </ul>
                </div>
                <div className="card">
                  <h3 className="card-title">Certs / Extras</h3>
                  <ul className="list">
                    <li>Web Accessibility Basics (self-study)</li>
                    <li>MongoDB Atlas essentials (tutorials)</li>
                    <li>Figma UI Components & Auto Layout</li>
                  </ul>
                </div>
              </div>

              <div className="about-cta">
                <a className="btn btn-primary" href="/resume">Download CV</a>
                <a className="btn btn-ghost" href="/projects">View Projects</a>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
