export default function ProjectCard({ project }) {
    return (
      <article className="card hover-raise">
        <div className="card-spotlight" />
        <h3 className="card-title">{project.title}</h3>
        <p className="card-desc">{project.description}</p>
        <div className="tags">
          {(project.stack || []).map(s => <span key={s} className="tag">{s}</span>)}
        </div>
        <div className="card-links">
          {project.live && <a href={project.live} target="_blank" rel="noreferrer">Live ↗</a>}
          {project.repo && <a href={project.repo} target="_blank" rel="noreferrer">Code ↗</a>}
        </div>
      </article>
    );
  }
  