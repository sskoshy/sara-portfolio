import { useEffect, useMemo, useRef, useState } from "react";
import data from "../data/projects.js";
import ProjectCard from "../components/ProjectCard.jsx";

function useUniqueTags(items) {
  return useMemo(() => {
    const s = new Set();
    items.forEach(p => (p.stack || []).forEach(t => s.add(t)));
    return ["All", ...Array.from(s)];
  }, [items]);
}

function Modal({ open, onClose, project, onPrev, onNext }) {
  const dialogRef = useRef(null);

  useEffect(() => {
    if (open && dialogRef.current) dialogRef.current.focus();
  }, [open]);

  if (!open || !project) return null;
  return (
    <div
      className="proj-modal"
      role="dialog"
      aria-modal="true"
      aria-label={project.title}
      tabIndex={-1}
      ref={dialogRef}
      onKeyDown={(e) => {
        if (e.key === "Escape") onClose();
        if (e.key === "ArrowLeft") onPrev();
        if (e.key === "ArrowRight") onNext();
      }}
      onClick={(e) => {
        if (e.target.classList.contains("proj-modal")) onClose();
      }}
    >
      <div className="proj-modal-card">
        <button className="proj-close" aria-label="Close" onClick={onClose}>×</button>
        <div className="proj-modal-media">
          {project.image ? (
            <img src={project.image} alt={project.title} />
          ) : (
            <div className="proj-modal-placeholder">No preview</div>
          )}
        </div>
        <div className="proj-modal-body">
          <h3 className="proj-title">{project.title}</h3>
          <p className="muted">{project.description}</p>
          <div className="badges" style={{ marginTop: 10 }}>
            {(project.stack || []).map((t) => (
              <span key={t} className="badge">{t}</span>
            ))}
          </div>
          <div className="proj-links">
            {project.live && <a className="btn btn-primary" href={project.live} target="_blank" rel="noreferrer">Live ↗</a>}
            {project.repo && <a className="btn btn-ghost" href={project.repo} target="_blank" rel="noreferrer">Code ↗</a>}
          </div>
        </div>
        <button className="proj-nav left" aria-label="Previous" onClick={onPrev}>‹</button>
        <button className="proj-nav right" aria-label="Next" onClick={onNext}>›</button>
      </div>
    </div>
  );
}

export default function Projects() {
  const [query, setQuery] = useState("");
  const [tag, setTag] = useState("All");
  const [sort, setSort] = useState("Newest");
  const [view, setView] = useState("grid"); // "grid" | "list"
  const [activeIndex, setActiveIndex] = useState(null); // for modal

  const tags = useUniqueTags(data);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    let out = data.filter((p) => {
      const tagMatch = tag === "All" || p.stack?.includes(tag);
      const textMatch =
        !q ||
        p.title.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        (p.stack || []).some((t) => t.toLowerCase().includes(q));
      return tagMatch && textMatch;
    });

    if (sort === "A → Z") out.sort((a, b) => a.title.localeCompare(b.title));
    if (sort === "Z → A") out.sort((a, b) => b.title.localeCompare(a.title));
    if (sort === "Newest") {
      // if you add p.year or p.date, we’ll use it; fallback to title
      out.sort((a, b) => (b.year ?? 0) - (a.year ?? 0) || b.title.localeCompare(a.title));
    }
    return out;
  }, [query, tag, sort]);

  // hover tilt effect (only for grid cards)
  const onMouseMove = (e) => {
    const card = e.currentTarget;
    const r = card.getBoundingClientRect();
    const x = e.clientX - r.left;
    const y = e.clientY - r.top;
    const rx = ((y - r.height / 2) / r.height) * -6;
    const ry = ((x - r.width / 2) / r.width) * 6;
    card.style.transform = `rotateX(${rx}deg) rotateY(${ry}deg) translateY(-2px)`;
  };
  const onMouseLeave = (e) => {
    e.currentTarget.style.transform = "none";
  };

  const openModal = (idx) => setActiveIndex(idx);
  const closeModal = () => setActiveIndex(null);
  const goPrev = () => setActiveIndex((i) => (i === null ? null : (i - 1 + filtered.length) % filtered.length));
  const goNext = () => setActiveIndex((i) => (i === null ? null : (i + 1) % filtered.length));

  return (
    <section className="section container">
      {/* Header controls */}
      <div className="projects-head">
        <div>
          <h2 className="section-title">Projects</h2>
          <p className="muted">Search, filter, sort, and quick-preview.</p>
        </div>

        <div className="proj-controls">
          <div className="proj-search">
            <input
              className="input"
              placeholder="Search projects…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              aria-label="Search projects"
            />
          </div>

          <div className="proj-view">
            <button
              className={`chip ${view === "grid" ? "chip-active" : ""}`}
              onClick={() => setView("grid")}
              aria-pressed={view === "grid"}
            >
              Grid
            </button>
            <button
              className={`chip ${view === "list" ? "chip-active" : ""}`}
              onClick={() => setView("list")}
              aria-pressed={view === "list"}
            >
              List
            </button>
          </div>

          <div className="proj-sort">
            <select className="select" value={sort} onChange={(e) => setSort(e.target.value)} aria-label="Sort projects">
              <option>Newest</option>
              <option>A → Z</option>
              <option>Z → A</option>
            </select>
          </div>
        </div>
      </div>

      {/* Tag chips */}
      <div className="chips" style={{ marginTop: 8 }}>
        {tags.map((t) => (
          <button
            key={t}
            className={`chip ${tag === t ? "chip-active" : ""}`}
            onClick={() => setTag(t)}
            aria-pressed={tag === t}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Results */}
      {filtered.length === 0 ? (
        <div className="empty card mt">
          <p>No projects found. Try clearing filters or changing search.</p>
        </div>
      ) : view === "grid" ? (
        <div className="grid2 mt">
          {filtered.map((p, idx) => (
            <div
              key={p.title}
              className="card proj-card hover-raise"
              onMouseMove={onMouseMove}
              onMouseLeave={onMouseLeave}
            >
              {/* preview image area */}
              <div className="proj-thumb" onClick={() => openModal(idx)} role="button" tabIndex={0}
                   onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && openModal(idx)} aria-label={`Preview ${p.title}`}>
                {p.image ? (
                  <img src={p.image} alt={`${p.title} preview`} />
                ) : (
                  <div className="proj-thumb-empty">Preview</div>
                )}
              </div>

              {/* original ProjectCard content */}
              <ProjectCard project={p} />
            </div>
          ))}
        </div>
      ) : (
        <div className="proj-list mt">
          {filtered.map((p, idx) => (
            <article key={p.title} className="card proj-row">
              <div className="proj-row-media" onClick={() => openModal(idx)} role="button" tabIndex={0}
                   onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && openModal(idx)} aria-label={`Preview ${p.title}`}>
                {p.image ? <img src={p.image} alt={`${p.title} preview`} /> : <div className="proj-thumb-empty">Preview</div>}
              </div>
              <div className="proj-row-body">
                <h3 className="card-title">{p.title}</h3>
                <p className="card-desc">{p.description}</p>
                <div className="badges">
                  {(p.stack || []).map((t) => <span className="badge" key={t}>{t}</span>)}
                </div>
                <div className="card-links">
                  {p.live && <a href={p.live} target="_blank" rel="noreferrer">Live ↗</a>}
                  {p.repo && <a href={p.repo} target="_blank" rel="noreferrer">Code ↗</a>}
                  <button className="link" onClick={() => openModal(idx)}>Quick view</button>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}

      {/* Lightbox / quick view */}
      <Modal
        open={activeIndex !== null}
        onClose={closeModal}
        project={activeIndex !== null ? filtered[activeIndex] : null}
        onPrev={goPrev}
        onNext={goNext}
      />
    </section>
  );
}
