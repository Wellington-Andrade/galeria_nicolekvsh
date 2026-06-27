import { useState } from "react"
import { urlFor } from "../lib/sanityClient"
import ArtworkModal from "./ArtworkModal"

export default function Hero({ artwork, artworks = [], loading }) {
  const imageUrl = artwork?.image
    ? urlFor(artwork.image).width(1200).quality(84).url()
    : null

  // Lista para o modal: o acervo completo (permite navegar pelas setas).
  // Fallback para só a obra em destaque caso a lista ainda não tenha chegado.
  const list =
    Array.isArray(artworks) && artworks.length
      ? artworks
      : artwork
        ? [artwork]
        : []
  const featuredIndex = Math.max(
    0,
    list.findIndex((item) => item._id === artwork?._id)
  )

  // null = modal fechado. Abre ampliando a obra em destaque.
  const [openIndex, setOpenIndex] = useState(null)

  return (
    <section id="inicio" className="site-section hero-section">
      <div className="hero-copy">
        <p className="eyebrow">Galeria artística</p>

        <h1>
          Nicole
          <br />
          Kvsh
        </h1>

        <p className="hero-lede">
          Pintura, objeto e imagem em um arquivo visual vivo, fluido e em
          constante construção.
        </p>

        <div className="hero-actions">
          <a className="button button-primary" href="#galeria">
            Ver galeria
          </a>
          <a className="button" href="#matarazzo">
            Projeto Matarazzo
          </a>
        </div>
      </div>

      <div className="hero-art-area">
        {artwork ? (
          <button
            type="button"
            className="hero-art-card is-clickable"
            onClick={() => setOpenIndex(featuredIndex)}
            aria-label={`Ampliar obra: ${artwork.name || ""}`}
          >
            {imageUrl ? (
              <img
                src={imageUrl}
                alt={artwork.name}
                loading="eager"
                decoding="async"
              />
            ) : (
              <div className="image-placeholder">Obra destaque</div>
            )}
          </button>
        ) : (
          <div className="hero-art-card">
            <div className="image-placeholder">
              {loading ? "Carregando obra" : "Obra destaque"}
            </div>
          </div>
        )}

        <div className="hero-caption">
          <span>Obra destaque</span>
          <strong>{artwork?.name || "Arquivo em construção"}</strong>
        </div>
      </div>

      <a className="scroll-cue" href="#galeria" aria-label="Ir para galeria" />

      {/* Modal renderiza via portal no <body>: cobre a página inteira,
          sem nada pintando por cima. */}
      <ArtworkModal
        artworks={list}
        index={openIndex}
        onClose={() => setOpenIndex(null)}
        onNavigate={setOpenIndex}
      />
    </section>
  )
}
