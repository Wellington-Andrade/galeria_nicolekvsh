import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { urlFor } from "../lib/sanityClient"
import { artworkMeta } from "../lib/artworkMeta"
import AcquireButton from "./AcquireButton"

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
      <div className="feature-image">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={artwork?.name || ""}
            loading="lazy"
            decoding="async"
          />
        ) : (
          <div className="image-placeholder">Obra destaque</div>
        )}
      </div>

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
        </dl>

        {artwork?.description ? (
          <p>{artwork.description}</p>
        ) : (
          <p>
            Arquivo em construção. As informações completas da obra serão
            adicionadas em breve diretamente pelo acervo.
          </p>
        )}

        <div className="section-actions">
          <AcquireButton artwork={artwork} />
          <Link className="button" to="/galeria">
            Ir para a galeria
          </Link>
        </div>
      </div>
    </section>
  )
}
