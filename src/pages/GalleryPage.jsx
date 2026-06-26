import { useState } from "react"
import { urlFor } from "../lib/sanityClient"
import ArtworkModal from "../components/ArtworkModal"

// Destaca algumas obras com tamanho maior para quebrar a monotonia do grid.
function isLarge(index) {
  return index % 6 === 0
}

function GalleryCard({ artwork, index, onOpen }) {
  const large = isLarge(index)
  const imageUrl = artwork?.image
    ? urlFor(artwork.image)
        .width(large ? 1600 : 900)
        .quality(82)
        .url()
    : null

  return (
    <button
      type="button"
      className={`gallery-page-card is-clickable ${large ? "is-large" : ""}`}
      onClick={() => onOpen(index)}
      aria-label={`Ampliar obra: ${artwork?.name || ""}`}
    >
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
    </button>
  )
}

export default function GalleryPage({ artworks, loading, error }) {
  const items = Array.isArray(artworks) ? artworks : []
  const [openIndex, setOpenIndex] = useState(null)

  return (
    <main className="site-main page-main">
      <header className="page-hero">
        <span className="page-index">Acervo</span>
        <h1>Galeria</h1>
        <p>
          O acervo completo de Nicole Kvsh. Pinturas, objetos e
          experimentações reunidos em um arquivo visual vivo e em constante
          construção.
        </p>
      </header>

      <section className="page-body">
        {loading ? <p className="state-text">Carregando obras...</p> : null}
        {error ? <p className="state-text is-error">{error}</p> : null}

        {!loading && !error && items.length === 0 ? (
          <div className="empty-state">
            <p>Nenhuma obra publicada no momento.</p>
            <span>O acervo será exibido aqui assim que houver obras.</span>
          </div>
        ) : null}

        {items.length > 0 ? (
          <div className="gallery-page-grid">
            {items.map((artwork, index) => (
              <GalleryCard
                key={artwork._id}
                artwork={artwork}
                index={index}
                onOpen={setOpenIndex}
              />
            ))}
          </div>
        ) : null}
      </section>

      <ArtworkModal
        artworks={items}
        index={openIndex}
        onClose={() => setOpenIndex(null)}
        onNavigate={setOpenIndex}
      />
    </main>
  )
}
