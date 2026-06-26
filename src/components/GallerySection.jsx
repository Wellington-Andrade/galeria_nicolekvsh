import { urlFor } from "../lib/sanityClient"

function ArtworkCard({ artwork, index, large = false }) {
  const imageUrl = artwork?.image
    ? urlFor(artwork.image)
        .width(large ? 1400 : 800)
        .quality(82)
        .url()
    : null

  return (
    <figure className={`curated-card ${large ? "is-large" : ""}`}>
      {imageUrl ? (
        <img
          src={imageUrl}
          alt={artwork.name}
          loading="lazy"
          decoding="async"
        />
      ) : (
        <div className="image-placeholder">
          Obra {String(index + 1).padStart(2, "0")}
        </div>
      )}

      <figcaption>
        <strong>{artwork?.name || "Obra em construção"}</strong>
        <span>{String(index + 1).padStart(2, "0")}</span>
      </figcaption>
    </figure>
  )
}

export default function GallerySection({ artworks, loading, error }) {
  const items = artworks.slice(0, 5)

  return (
    <section id="galeria" className="site-section gallery-section">
      <div className="section-copy">
        <span className="section-index">02</span>
        <h2>Galeria</h2>
        <p>
          Um recorte do que vem sendo criado. Entre pinturas, objetos e
          experimentações.
        </p>
        <a className="button" href="#obra">
          Ver obra destaque
        </a>

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
              />
            ))
          : Array.from({ length: 5 }).map((_, index) => (
              <ArtworkCard key={index} index={index} large={index === 0} />
            ))}
      </div>
    </section>
  )
}
