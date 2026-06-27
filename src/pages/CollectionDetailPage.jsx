import { useState } from "react"
import { Link, useParams } from "react-router-dom"
import { urlFor } from "../lib/sanityClient"
import { findCollection } from "../data/collections"
import ArtworkModal from "../components/ArtworkModal"

function CollectionCard({ artwork, index, onOpen }) {
  const imageUrl = artwork?.image
    ? urlFor(artwork.image).width(900).quality(82).url()
    : null

  return (
    <button
      type="button"
      className="gallery-page-card is-clickable"
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

// Detalhe da coleção: mostra as obras cujo campo "collection" (Sanity)
// corresponde ao slug. Enquanto a coleção não tiver obras, exibe os
// espaços reservados ("Em breve"), no mesmo espírito de /extras.
export default function CollectionDetailPage({ artworks }) {
  const { slug } = useParams()
  const collection = findCollection(slug)
  const [openIndex, setOpenIndex] = useState(null)

  if (!collection) {
    return (
      <main className="site-main page-main">
        <header className="page-hero">
          <span className="page-index">Coleções</span>
          <h1>Coleção não encontrada</h1>
          <p>Essa coleção ainda não existe ou foi movida.</p>
          <div className="section-actions">
            <Link className="button" to="/colecoes">
              Voltar para coleções
            </Link>
          </div>
        </header>
      </main>
    )
  }

  const all = Array.isArray(artworks) ? artworks : []
  const items = all.filter((artwork) => artwork.collection === slug)
  const placeholders = Array.from({ length: 6 })

  return (
    <main className="site-main page-main">
      <header className="page-hero">
        <span className="page-index">Coleção</span>
        <h1>{collection.title}</h1>
        <p>{collection.subtitle}</p>
        <div className="section-actions">
          <Link className="button" to="/colecoes">
            Voltar para coleções
          </Link>
        </div>
      </header>

      <section className="page-body">
        {items.length > 0 ? (
          <div className="gallery-page-grid">
            {items.map((artwork, index) => (
              <CollectionCard
                key={artwork._id}
                artwork={artwork}
                index={index}
                onOpen={setOpenIndex}
              />
            ))}
          </div>
        ) : (
          <div className="collection-detail-grid">
            {placeholders.map((_, index) => (
              <article className="collection-detail-frame" key={index}>
                <div className="image-placeholder" aria-hidden="true" />
                <span className="extras-page-soon">Em breve</span>
              </article>
            ))}
          </div>
        )}
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
