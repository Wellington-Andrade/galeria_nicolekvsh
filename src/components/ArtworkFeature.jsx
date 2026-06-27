import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { urlFor } from "../lib/sanityClient"
import { artworkMeta } from "../lib/artworkMeta"
import AcquireButton from "./AcquireButton"
import ArtworkModal from "./ArtworkModal"

// Obra em destaque da home. As setas agora percorrem todo o acervo
// (antes só apontavam para a âncora #galeria e não trocavam de obra).
export default function ArtworkFeature({ artworks = [], featured }) {
  const list = Array.isArray(artworks) ? artworks : []
  const total = list.length

  // Começa na obra em destaque, se ela existir na lista; senão, na primeira.
  const startIndex = featured
    ? Math.max(0, list.findIndex((item) => item._id === featured._id))
    : 0
  const [index, setIndex] = useState(startIndex)
  // null = modal fechado. Abre ampliando a obra atualmente em destaque.
  const [openIndex, setOpenIndex] = useState(null)

  // Realinha quando o acervo chega do Sanity (fetch assíncrono).
  useEffect(() => {
    setIndex(startIndex)
  }, [startIndex])

  const goPrev = () => {
    if (total > 1) setIndex((current) => (current - 1 + total) % total)
  }
  const goNext = () => {
    if (total > 1) setIndex((current) => (current + 1) % total)
  }

  const artwork = list[index] || featured || null
  const imageUrl = artwork?.image
    ? urlFor(artwork.image).width(1400).quality(84).url()
    : null

  const meta = artworkMeta(artwork)
  const pager = `${String(index + 1).padStart(2, "0")} / ${String(total || 1).padStart(2, "0")}`

  return (
    <section id="obra" className="site-section artwork-feature-section">
      {artwork ? (
        <button
          type="button"
          className="feature-image is-clickable"
          onClick={() => setOpenIndex(index)}
          aria-label={`Ampliar obra: ${artwork.name || ""}`}
        >
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={artwork.name || ""}
              loading="lazy"
              decoding="async"
            />
          ) : (
            <div className="image-placeholder">Obra destaque</div>
          )}
        </button>
      ) : (
        <div className="feature-image">
          <div className="image-placeholder">Obra destaque</div>
        </div>
      )}

      <div className="feature-copy">
        <div className="feature-nav">
          <span className="feature-pager">{pager}</span>
          {total > 1 ? (
            <div className="feature-arrows">
              <button onClick={goPrev} aria-label="Obra anterior" type="button">
                ‹
              </button>
              <button onClick={goNext} aria-label="Próxima obra" type="button">
                ›
              </button>
            </div>
          ) : null}
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
          {artwork?.collection ? (
            <div className="feature-meta-full">
              <dt>Coleção</dt>
              <dd>
                <Link className="feature-meta-link" to={`/colecoes/${artwork.collection.slug}`}>
                  {artwork.collection.title}
                </Link>
              </dd>
            </div>
          ) : null}
        </dl>

        {artwork?.description ? <p>{artwork.description}</p> : null}

        <div className="section-actions">
          <AcquireButton artwork={artwork} />
          <Link className="button" to="/galeria">
            Ir para a galeria
          </Link>
        </div>
      </div>

      {/* Modal renderiza via portal no <body>: não fica preso no stacking
          context da seção, então nada da página pinta por cima dele.
          Navegar no modal acompanha a obra em destaque de fundo. */}
      <ArtworkModal
        artworks={list}
        index={openIndex}
        onClose={() => setOpenIndex(null)}
        onNavigate={(i) => {
          setIndex(i)
          setOpenIndex(i)
        }}
      />
    </section>
  )
}
