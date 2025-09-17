export default function About() {
    return (
      <section className="section container">
        <h2 className="section-title">About</h2>
        <p className="muted maxw">
          I’m a third-year Statistics major at UC Davis (ML/Data Science). I love clean UI,
          accessible patterns, and fast iteration with React.
        </p>
  
        <div className="grid2 mt">
          <div className="card">
            <h3 className="card-title">Skills</h3>
            <ul className="list">
              <li>React, Vite, React Router</li>
              <li>Design systems & components</li>
              <li>Node/Express, REST basics</li>
              <li>R / statistics / viz</li>
              <li>Figma, Illustrator, Canva</li>
            </ul>
          </div>
          <div className="card">
            <h3 className="card-title">Timeline</h3>
            <ul className="list">
              <li><b>2025:</b> ISA Co-Director of Design, building org site/components</li>
              <li><b>2024:</b> CPA website demo with backend + DB</li>
              <li><b>2023:</b> Started web dev track; dove into React + JS</li>
            </ul>
          </div>
        </div>
      </section>
    );
  }
  