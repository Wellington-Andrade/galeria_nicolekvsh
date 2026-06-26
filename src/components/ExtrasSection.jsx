import { Link } from "react-router-dom"

export default function ExtrasSection() {
  return (
    <section id="extras" className="site-section extras-section">
      <div className="section-copy">
        <span className="section-index">05</span>
        <h2>Extras</h2>
        <p>Entrevistas, vídeos, bastidores e registros complementares.</p>

        <div className="section-actions">
          <Link className="button" to="/extras">
            Ver mais
          </Link>
        </div>
      </div>

      <div className="extras-list">
        <article>Entrevistas</article>
        <article>Publicidade</article>
        <article>Bastidores</article>
      </div>
    </section>
  )
}
