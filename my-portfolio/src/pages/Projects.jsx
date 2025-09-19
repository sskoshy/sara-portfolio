import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import data from "../data/projects.js";
import ProjectCard from "../components/ProjectCard.jsx";

/* --------- utils --------- */
function useUniqueTags(items) {
  return useMemo(() => {
    const s = new Set();
    items.forEach((p) => (p.stack || []).forEach((t) => s.add(t)));
    return ["All", ...Array.from(s)];
  }, [items]);
}
function useLocalStorage(key, initial) {
  const [v, setV] = useState(() => {
    try { const r = localStorage.getItem(key); return r ? JSON.parse(r) : initial; }
    catch { return initial; }
  });
  useEffect(() => { try { localStorage.setItem(key, JSON.stringify(v)); } catch {} }, [key, v]);
  return [v, setV];
}
function useReveal(selector = ".reveal") {
  useEffect(() => {
    const els = Array.from(document.querySelectorAll(selector));
    if (!("IntersectionObserver" in window)) { els.forEach(el => el.classList.add("in-view")); return; }
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add("in-view"); io.unobserve(e.target); }});
    }, { threshold: .1, rootMargin: "0px 0px -8% 0px" });
    els.forEach(el => io.observe(el));
    return () => io.disconnect();
  }, [selector]);
}

/* --------- modal --------- */
function Modal({ open, onClose, project, onPrev, onNext, onTagClick }) {
  const dialogRef = useRef(null);
  useEffect(() => { if (open) dialogRef.current?.focus(); }, [open]);
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
      onClick={(e) => { if (e.target.classList.contains("proj-modal")) onClose(); }}
    >
      <div
        className="proj-modal-card spotlight"
        onMouseMove={(e) => {
          const el = e.currentTarget; const r = el.getBoundingClientRect();
          el.style.setProperty("--mx", ((e.clientX - r.left) / r.width) * 100 + "%");
          el.style.setProperty("--my", ((e.clientY - r.top) / r.height) * 100 + "%");
        }}
        onMouseLeave={(e) => { e.currentTarget.style.setProperty("--mx", "50%"); e.currentTarget.style.setProperty("--my", "50%"); }}
        style={{
          /* colored border glow */
          boxShadow: "0 0 0 1px rgba(255,255,255,.08), 0 18px 50px rgba(99,102,241,.18)",
        }}
      >
        <button className="proj-close" aria-label="Close" onClick={onClose}>×</button>

        <div className="proj-modal-media" style={{ background: "linear-gradient(180deg, rgba(99,102,241,.12), rgba(34,211,238,.06))" }}>
          {project.image ? <img src={project.image} alt={project.title} /> : <div className="proj-modal-placeholder">No preview</div>}
        </div>

        <div className="proj-modal-body">
          {/* Title back to white */}
          <h3 className="proj-title">{project.title}</h3>
          <p className="muted">{project.description}</p>

          <div className="badges" style={{ marginTop: 10 }}>
            {(project.stack || []).map((t) => (
              <button
                key={t}
                className="badge spotlight"
                onClick={() => { onTagClick?.(t); onClose(); }}
                style={{ borderColor:"rgba(255,255,255,.22)", background:"linear-gradient(90deg, rgba(99,102,241,.18), rgba(34,211,238,.12))" }}
              >
                {t}
              </button>
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

/* --------- page --------- */
export default function Projects() {
  const [query, setQuery] = useState("");
  const [tag, setTag] = useState("All");
  const [sort, setSort] = useLocalStorage("proj:sort", "Newest");
  const [view, setView] = useLocalStorage("proj:view", "grid");
  const [activeIndex, setActiveIndex] = useState(null);
  const [favorites, setFavorites] = useLocalStorage("proj:favs", {});
  const [toast, setToast] = useState(null);

  const tags = useUniqueTags(data);
  useReveal(".reveal");

  // search shortcut
  const searchRef = useRef(null);
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "/" && !e.metaKey && !e.ctrlKey && !e.altKey) { e.preventDefault(); searchRef.current?.focus(); }
      else if (e.key === "Escape") setQuery("");
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    let out = data.filter((p) => {
      const tagMatch = tag === "All" || tag === "Favorites" || p.stack?.includes(tag);
      const textMatch =
        !q ||
        p.title.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        (p.stack || []).some((t) => t.toLowerCase().includes(q));
      return tagMatch && textMatch;
    });
    if (sort === "A → Z") out.sort((a, b) => a.title.localeCompare(b.title));
    if (sort === "Z → A") out.sort((a, b) => b.title.localeCompare(a.title));
    if (sort === "Newest") out.sort((a, b) => (b.year ?? 0) - (a.year ?? 0) || b.title.localeCompare(a.title));
    return out;
  }, [query, tag, sort]);

  const display = tag === "Favorites" ? filtered.filter((p) => favorites[p.title]) : filtered;

  // tilting
  const tiltMove = (e) => {
    const card = e.currentTarget;
    const r = card.getBoundingClientRect();
    const x = e.clientX - r.left, y = e.clientY - r.top;
    const rx = ((y - r.height / 2) / r.height) * -6;
    const ry = ((x - r.width / 2) / r.width) * 6;
    card.style.transform = `rotateX(${rx}deg) rotateY(${ry}deg) translateY(-2px)`;
  };
  const tiltLeave = (e) => { e.currentTarget.style.transform = "none"; };

  // spotlight
  const spotMove = useCallback((e) => {
    const el = e.currentTarget; const r = el.getBoundingClientRect();
    el.style.setProperty("--mx", ((e.clientX - r.left) / r.width) * 100 + "%");
    el.style.setProperty("--my", ((e.clientY - r.top) / r.height) * 100 + "%");
  }, []);
  const spotLeave = useCallback((e) => { const el = e.currentTarget; el.style.setProperty("--mx","50%"); el.style.setProperty("--my","50%"); }, []);

  const openModal = (idx) => setActiveIndex(idx);
  const closeModal = () => setActiveIndex(null);
  const goPrev = () => setActiveIndex((i) => (i === null ? null : (i - 1 + display.length) % display.length));
  const goNext = () => setActiveIndex((i) => (i === null ? null : (i + 1) % display.length));

  const toggleFav = (title) => setFavorites((f) => ({ ...f, [title]: !f[title] }));
  const share = async (p) => {
    const url = p.live || p.repo; if (!url) return;
    try { await navigator.clipboard.writeText(url); setToast("Link copied ✓"); }
    catch { setToast("Copy failed"); }
    setTimeout(() => setToast(null), 1400);
  };

  const overlay = (p, idx) => (
    <div className="proj-overlay" style={{ background: "linear-gradient(to top, rgba(14,19,35,.55), rgba(14,19,35,0))" }}>
      <button className="mini-btn" onClick={() => openModal(idx)}>Quick view</button>
      {p.live && <a className="mini-btn" href={p.live} target="_blank" rel="noreferrer">Live ↗</a>}
      {p.repo && <a className="mini-btn" href={p.repo} target="_blank" rel="noreferrer">Code ↗</a>}
    </div>
  );

  return (
    <section className="section container">
      {/* header */}
      <div className="projects-head">
        <div>
          {/* Title back to white */}
          <h2 className="section-title">Projects</h2>
          <p className="muted">Search, filter, sort, favorite, spotlight + quick preview.</p>
        </div>

        <div className="proj-controls">
          <div className="proj-search spotlight">
            <input
              ref={searchRef}
              className="input"
              placeholder="Search projects…  (press / )"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              aria-label="Search projects"
              onMouseMove={spotMove}
              onMouseLeave={spotLeave}
            />
          </div>

          <div className="proj-view">
            <button
              className={`chip ${view === "grid" ? "chip-active" : ""} spotlight`}
              onClick={() => setView("grid")}
              onMouseMove={spotMove}
              onMouseLeave={spotLeave}
            >
              Grid
            </button>
            <button
              className={`chip ${view === "list" ? "chip-active" : ""} spotlight`}
              onClick={() => setView("list")}
              onMouseMove={spotMove}
              onMouseLeave={spotLeave}
            >
              List
            </button>
          </div>

          <div className="proj-sort">
            <select className="select" value={sort} onChange={(e) => setSort(e.target.value)}>
              <option>Newest</option>
              <option>A → Z</option>
              <option>Z → A</option>
            </select>
          </div>
        </div>
      </div>

      {/* tags (Favorites first) */}
      <div className="chips" style={{ marginTop: 8 }}>
        {["Favorites", ...tags].map((t) => (
          <button
            key={t}
            className={`chip ${tag === t ? "chip-active" : ""} spotlight`}
            onClick={() => setTag(t)}
            onMouseMove={spotMove}
            onMouseLeave={spotLeave}
            style={tag === t ? { boxShadow: "0 8px 24px rgba(99,102,241,.22)" } : undefined}
          >
            {t}
          </button>
        ))}
      </div>

      {/* results */}
      {display.length === 0 ? (
        <div className="empty card mt">
          <p>No projects found. Try clearing filters or changing search.</p>
        </div>
      ) : view === "grid" ? (
        <div className="grid2 mt">
          {display.map((p, idx) => (
            <div
              key={p.title}
              className="card proj-card spotlight hover-raise reveal"
              onMouseMove={(e) => { spotMove(e); tiltMove(e); }}
              onMouseLeave={(e) => { spotLeave(e); tiltLeave(e); }}
              style={{ position: "relative", borderImage: "linear-gradient(90deg, rgba(99,102,241,.35), rgba(34,211,238,.25)) 1", borderWidth: "1px", borderStyle: "solid" }}
            >
              {/* quick actions */}
              <div style={{ display:"flex", gap:8, justifyContent:"flex-end", marginBottom:6 }}>
                <button
                  className={`mini-btn ${favorites[p.title] ? "chip-active" : ""}`}
                  onClick={() => toggleFav(p.title)}
                  title="Favorite"
                  style={{ background: favorites[p.title] ? "linear-gradient(90deg, rgba(34,211,238,.25), rgba(217,70,239,.25))" : undefined }}
                >
                  {favorites[p.title] ? "♥ Favorited" : "♡ Favorite"}
                </button>
                {(p.live || p.repo) && (
                  <button className="mini-btn" onClick={() => share(p)} title="Copy link">Share</button>
                )}
              </div>

              {/* preview */}
              <div className="proj-thumb spotlight">
                {p.image ? (
                  <>
                    <img src={p.image} alt={`${p.title} preview`} loading="lazy" />
                    {overlay(p, idx)}
                  </>
                ) : <div className="proj-thumb-empty">Preview</div>}
              </div>

              <ProjectCard project={p} />
            </div>
          ))}
        </div>
      ) : (
        <div className="proj-list mt">
          {display.map((p, idx) => (
            <article
              key={p.title}
              className="card proj-row spotlight hover-raise reveal"
              onMouseMove={spotMove}
              onMouseLeave={spotLeave}
              style={{ position: "relative", borderImage: "linear-gradient(90deg, rgba(99,102,241,.35), rgba(217,70,239,.25)) 1", borderWidth:"1px", borderStyle:"solid" }}
            >
              <div className="proj-row-media spotlight">
                {p.image ? (
                  <>
                    <img src={p.image} alt={`${p.title} preview`} loading="lazy" />
                    {overlay(p, idx)}
                  </>
                ) : <div className="proj-thumb-empty">Preview</div>}
              </div>

              <div className="proj-row-body">
                {/* Title back to white */}
                <h3 className="card-title">{p.title}</h3>
                <p className="card-desc">{p.description}</p>

                <div className="badges">
                  {(p.stack || []).map((t) => (
                    <button
                      className="badge spotlight"
                      key={t}
                      onClick={() => setTag(t)}
                      onMouseMove={spotMove}
                      onMouseLeave={spotLeave}
                      style={{ borderColor:"rgba(255,255,255,.22)", background:"linear-gradient(90deg, rgba(99,102,241,.18), rgba(217,70,239,.12))" }}
                    >
                      {t}
                    </button>
                  ))}
                </div>

                <div className="card-links" style={{ alignItems: "center" }}>
                  {p.live && <a href={p.live} target="_blank" rel="noreferrer">Live ↗</a>}
                  {p.repo && <a href={p.repo} target="_blank" rel="noreferrer">Code ↗</a>}
                  {(p.live || p.repo) && <button className="link" onClick={() => share(p)}>Copy link</button>}
                  <button className="link" onClick={() => openModal(idx)}>Quick view</button>
                </div>

                <div className="mt1">
                  <button
                    className={`mini-btn ${favorites[p.title] ? "chip-active" : ""}`}
                    onClick={() => toggleFav(p.title)}
                    style={{ background: favorites[p.title] ? "linear-gradient(90deg, rgba(34,211,238,.25), rgba(217,70,239,.25))" : undefined }}
                  >
                    {favorites[p.title] ? "♥ Favorited" : "♡ Favorite"}
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}

      <Modal
        open={activeIndex !== null}
        onClose={closeModal}
        project={activeIndex !== null ? display[activeIndex] : null}
        onPrev={goPrev}
        onNext={goNext}
        onTagClick={(t) => setTag(t)}
      />

      {toast && <div className="toast">{toast}</div>}
    </section>
  );
}

/* tiny style helpers (safe to inject) */
const style = document.createElement("style");
style.textContent = `
/* reveal */
.reveal{opacity:0;transform:translateY(8px);transition:opacity .35s ease, transform .35s ease}
.reveal.in-view{opacity:1;transform:none}

/* spotlight token if not in global */
.spotlight{position:relative}
.spotlight::after{
  content:"";position:absolute;inset:-150%;pointer-events:none;border-radius:inherit;
  background:radial-gradient(200px 200px at var(--mx,50%) var(--my,50%), rgba(34,211,238,.25), transparent 60%);
  opacity:0;transition:opacity .2s ease
}
.spotlight:hover::after{opacity:1}

/* overlay controls */
.proj-thumb{position:relative}
.proj-overlay{
  position:absolute;inset:0;display:flex;gap:8px;align-items:flex-end;justify-content:center;
  padding:10px;opacity:0;transition:opacity .2s ease;pointer-events:none
}
.proj-thumb:hover .proj-overlay,.proj-row-media:hover .proj-overlay{opacity:1;pointer-events:auto}
`;
document.head.appendChild(style);
