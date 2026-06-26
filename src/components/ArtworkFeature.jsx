import { Link } from "react-router-dom"
import { urlFor } from "../lib/sanityClient"
import { artworkMeta } from "../lib/artworkMeta"

export default function ArtworkFeature({ artwork, total }) {
  const imageUrl = artwork?.image
    ? urlFor(artwork.image).width(1400).quality(84).url()
    : null

  const meta = artworkMeta(artwork)
  const totalLabel = String(total || 1).padStart(2, "0")

  return (
    <section id="obra" className="site-section artwork-feature-section">
      <div className="feature-image">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={artwork.name}
            loading="lazy"
            decoding="async"
          />
        ) : (
          <div className="image-placeholder">Obra destaque</div>
        )}
      </div>

      <div className="feature-copy">
        <div className="feature-nav">
          <span className="feature-pager">01 / {totalLabel}</span>
          <div className="feature-arrows">
            <a href="#galeria" aria-label="Obra anterior">
              ‹
            </a>
            <a href="#galeria" aria-label="Próxima obra">
              ›
            </a>
          </div>
        </div>

        <h2>{artwork?.name || "Obra em destaque"}</h2>

        <dl className="feature-meta">
          <div>
            <dt>Ano</dt>
            <dd>{meta.year}</dd>
          </div>
          <div>
            <dt>Técnica</dt>
            <dd>{meta.technique}</dd>
          </div>
          <div>
            <dt>Dimensões</dt>
            <dd>{meta.dimensions}</dd>
          </div>
        </dl>

        <p>
          Arquivo em construção. As informações completas da obra serão
          adicionadas em breve diretamente pelo acervo.
        </p>

        <Link className="button" to="/galeria">
          Ir para a galeria
        </Link>
      </div>
    </section>
  )
}
