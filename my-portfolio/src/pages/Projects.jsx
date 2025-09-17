import { useMemo, useState } from "react";
import ProjectCard from "../components/ProjectCard.jsx";
import data from "../data/projects.js";

export default function Projects() {
  const allTags = useMemo(() => {
    const s = new Set();
    data.forEach(p => (p.stack || []).forEach(t => s.add(t)));
    return ["All", ...Array.from(s)];
  }, []);

  const [filter, setFilter] = useState("All");
  const projects = useMemo(() =>
    filter === "All" ? data : data.filter(p => p.stack?.includes(filter))
  , [filter]);

  return (
    <section className="section container">
      <div className="projects-head">
        <div>
          <h2 className="section-title">Projects</h2>
          <p className="muted">Filter by tech to explore.</p>
        </div>
        <div className="chips">
          {allTags.map(t => (
            <button key={t}
              className={`chip ${t===filter ? "chip-active" : ""}`}
              onClick={() => setFilter(t)}
            >{t}</button>
          ))}
        </div>
      </div>

      <div className="grid2">
        {projects.map(p => <ProjectCard key={p.title} project={p} />)}
      </div>
    </section>
  );
}
