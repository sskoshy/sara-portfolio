import { Link } from "react-router-dom";
export default function NotFound(){
  return (
    <section className="section container">
      <h2 className="section-title">Page not found</h2>
      <p className="muted">Let’s get you back home.</p>
      <Link className="btn btn-primary mt1" to="/">Go Home</Link>
    </section>
  );
}
