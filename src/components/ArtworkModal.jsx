import { useCallback, useEffect } from "react"
import { createPortal } from "react-dom"
import { Link } from "react-router-dom"
import { urlFor } from "../lib/sanityClient"
import { artworkMeta } from "../lib/artworkMeta"
import AcquireButton from "./AcquireButton"

// Lightbox reutilizável: imagem ampliada + Ano/Técnica/Dimensões do Sanity.
// `index` é null quando fechado. Navega com setas/teclado e fecha no Esc/backdrop.
// Renderizado via portal no <body> para não ficar preso no stacking context da
// seção (antes a "obra em destaque" pintava por cima do modal na home).
export default function ArtworkModal({ artworks, index, onClose, onNavigate }) {
  const list = Array.isArray(artworks) ? artworks : []
  const total = list.length
  const isOpen = index != null && index >= 0 && !!list[index]

  const goPrev = useCallback(() => {
    if (total > 1) onNavigate((index - 1 + total) % total)
  }, [index, total, onNavigate])

  const goNext = useCallback(() => {
    if (total > 1) onNavigate((index + 1) % total)
  }, [index, total, onNavigate])

  useEffect(() => {
    if (!isOpen) return

    const onKey = (event) => {
      if (event.key === "Escape") onClose()
      else if (event.key === "ArrowLeft") goPrev()
      else if (event.key === "ArrowRight") goNext()
    }

    document.addEventListener("keydown", onKey)
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"

    return () => {
      document.removeEventListener("keydown", onKey)
      document.body.style.overflow = previousOverflow
    }
  }, [isOpen, onClose, goPrev, goNext])

  if (!isOpen) return null

  const artwork = list[index]
  const imageUrl = artwork.image
    ? urlFor(artwork.image).width(1600).quality(88).url()
    : null
  const meta = artworkMeta(artwork)
  const pager = `${String(index + 1).padStart(2, "0")} / ${String(total).padStart(2, "0")}`

  return createPortal(
    <div
      className="artwork-modal"
      role="dialog"
      aria-modal="true"
      aria-label={artwork.name || "Obra"}
      onClick={onClose}
    >
      <div
        className="artwork-modal-dialog"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          className="artwork-modal-close"
          onClick={onClose}
          aria-label="Fechar"
          type="button"
        >
          ×
        </button>

        <div className="artwork-modal-frame">
          {imageUrl ? (
            <img src={imageUrl} alt={artwork.name || ""} decoding="async" />
          ) : (
            <div className="image-placeholder">Obra</div>
          )}
        </div>

        <div className="artwork-modal-info">
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

          <h2>{artwork.name || "Obra"}</h2>

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
            {artwork.collection ? (
              <div>
                <dt>Coleção</dt>
                <dd>
                  <Link
                    className="feature-meta-link"
                    to={`/colecoes/${artwork.collection.slug}`}
                    onClick={onClose}
                  >
                    {artwork.collection.title}
                  </Link>
                </dd>
              </div>
            ) : null}
          </dl>

          {artwork.description ? <p>{artwork.description}</p> : null}

          <div className="section-actions">
            <AcquireButton artwork={artwork} />
            <Link className="button" to="/galeria" onClick={onClose}>
              Ir para a galeria
            </Link>
          </div>
        </div>
      </div>
    </div>,
    document.body
  )
}
