import { Link } from "react-router-dom"
import { urlFor } from "../lib/sanityClient"

export default function CollectionsSection({ artworks }) {
  const collections = [
    { title: "Natureza", subtitle: "Séries botânicas e paisagens internas" },
    { title: "Presença", subtitle: "Retratos, corpo e olhar" },
    { title: "Devaneios", subtitle: "Memória, sonho e experimentação" },
  ]

  return (
    <section id="colecoes" className="site-section collections-section">
      <div className="section-copy">
        <span className="section-index">04</span>
        <h2>Coleções</h2>
        <p>Séries que se conectam por temas, cores, símbolos e sentimentos.</p>

        <div className="section-actions">
          <Link className="button" to="/colecoes">
            Ver coleções
          </Link>
        </div>
      </div>

      <div className="collections-grid">
        {collections.map((collection, index) => {
          const artwork = artworks[index]
          const imageUrl = artwork?.image
            ? urlFor(artwork.image).width(900).quality(78).url()
            : null

          return (
            <article className="collection-card" key={collection.title}>
              {imageUrl ? (
                <img src={imageUrl} alt="" loading="lazy" decoding="async" />
              ) : null}

              <div>
                <h3>{collection.title}</h3>
                <p>{collection.subtitle}</p>
                <span>{String(index + 1).padStart(2, "0")}</span>
              </div>
            </article>
          )
        })}
      </div>
    </section>
  )
}
