import { useState } from "react"
import { Link } from "react-router-dom"
import { urlFor } from "../lib/sanityClient"
import ArtworkModal from "./ArtworkModal"

function ArtworkCard({ artwork, index, large = false, onOpen }) {
  const imageUrl = artwork?.image
    ? urlFor(artwork.image)
        .width(large ? 1400 : 800)
        .quality(82)
        .url()
    : null

  const content = (
    <>
      {imageUrl ? (
        <img src={imageUrl} alt={artwork.name} loading="lazy" decoding="async" />
      ) : (
        <div className="image-placeholder">
          Obra {String(index + 1).padStart(2, "0")}
        </div>
      )}

      <figcaption>
        <strong>{artwork?.name || "Obra em construção"}</strong>
        <span>{String(index + 1).padStart(2, "0")}</span>
      </figcaption>
    </>
  )

  // Só vira botão clicável quando há uma obra real por trás.
  if (artwork && onOpen) {
    return (
      <button
        type="button"
        className={`curated-card is-clickable ${large ? "is-large" : ""}`}
        onClick={() => onOpen(index)}
        aria-label={`Ampliar obra: ${artwork.name || ""}`}
      >
        {content}
      </button>
    )
  }

  return (
    <figure className={`curated-card ${large ? "is-large" : ""}`}>{content}</figure>
  )
}

export default function GallerySection({ artworks, loading, error }) {
  const items = artworks.slice(0, 5)
  const [openIndex, setOpenIndex] = useState(null)

  return (
    <section id="galeria" className="site-section gallery-section">
      <div className="section-copy">
        <span className="section-index">02</span>
        <h2>Galeria</h2>
        <p>
          Um recorte do que vem sendo criado. Entre pinturas, objetos e
          experimentações.
        </p>

        <div className="section-actions">
          <Link className="button button-primary" to="/galeria">
            Ver todas as obras
          </Link>
          <a className="button" href="#obra">
            Ver obra destaque
          </a>
        </div>

        {loading ? <p className="state-text">Carregando obras...</p> : null}
        {error ? <p className="state-text is-error">{error}</p> : null}
      </div>

      <div className="curated-grid">
        {items.length > 0
          ? items.map((artwork, index) => (
              <ArtworkCard
                key={artwork._id}
                artwork={artwork}
                index={index}
                large={index === 0}
                onOpen={setOpenIndex}
              />
            ))
          : Array.from({ length: 5 }).map((_, index) => (
              <ArtworkCard key={index} index={index} large={index === 0} />
            ))}
      </div>

      <ArtworkModal
        artworks={items}
        index={openIndex}
        onClose={() => setOpenIndex(null)}
        onNavigate={setOpenIndex}
      />
    </section>
  )
}
