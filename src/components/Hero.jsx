import { urlFor } from "../lib/sanityClient"

export default function Hero({ artwork, loading }) {
  const imageUrl = artwork?.image
    ? urlFor(artwork.image).width(1200).quality(84).url()
    : null

  return (
    <section id="inicio" className="site-section hero-section">
      <div className="hero-copy">
        <p className="eyebrow">Portfólio artístico</p>

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
        <div className="hero-art-card">
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={artwork.name}
              loading="eager"
              decoding="async"
            />
          ) : (
            <div className="image-placeholder">
              {loading ? "Carregando obra" : "Obra destaque"}
            </div>
          )}
        </div>

        <div className="hero-caption">
          <span>Obra destaque</span>
          <strong>{artwork?.name || "Arquivo em construção"}</strong>
        </div>
      </div>

      <a className="scroll-cue" href="#galeria" aria-label="Ir para galeria" />
    </section>
  )
}
