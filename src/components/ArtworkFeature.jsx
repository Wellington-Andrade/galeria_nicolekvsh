import { urlFor } from "../lib/sanityClient"

export default function ArtworkFeature({ artwork, total }) {
  const imageUrl = artwork?.image
    ? urlFor(artwork.image).width(1400).quality(84).url()
    : null

  const dimensions = artwork?.image?.assetMetadata?.dimensions
  const dimensionLabel =
    dimensions?.width && dimensions?.height
      ? `${dimensions.width} × ${dimensions.height} px`
      : "Em construção"

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
            <dd>Em construção</dd>
          </div>
          <div>
            <dt>Técnica</dt>
            <dd>Em construção</dd>
          </div>
          <div>
            <dt>Dimensões</dt>
            <dd>{dimensionLabel}</dd>
          </div>
        </dl>

        <p>
          Arquivo em construção. As informações completas da obra serão
          adicionadas em breve diretamente pelo acervo.
        </p>

        <a className="button" href="#galeria">
          Voltar para galeria
        </a>
      </div>
    </section>
  )
}
