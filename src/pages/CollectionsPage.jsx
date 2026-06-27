import { Link } from "react-router-dom"
import { urlFor } from "../lib/sanityClient"
import { COLLECTIONS } from "../data/collections"

export default function CollectionsPage({ artworks }) {
  const items = Array.isArray(artworks) ? artworks : []

  return (
    <main className="site-main page-main">
      <header className="page-hero">
        <span className="page-index">Séries</span>
        <h1>Coleções</h1>
        <p>
          Séries que se conectam por temas, cores, símbolos e sentimentos. Um
          mapa das direções que atravessam o acervo.
        </p>
      </header>

      <section className="page-body">
        <div className="collections-page-grid">
          {COLLECTIONS.map((collection, index) => {
            const artwork = items.find(
              (item) => item.collection === collection.slug
            )
            const imageUrl = artwork?.image
              ? urlFor(artwork.image).width(1000).quality(78).url()
              : null

            return (
              <Link
                className="collection-page-card is-clickable"
                to={`/colecoes/${collection.slug}`}
                key={collection.slug}
              >
                {imageUrl ? (
                  <img src={imageUrl} alt="" loading="lazy" decoding="async" />
                ) : (
                  <div className="image-placeholder" aria-hidden="true" />
                )}

                <div className="collection-page-card-body">
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <h2>{collection.title}</h2>
                  <p>{collection.subtitle}</p>
                </div>
              </Link>
            )
          })}
        </div>
      </section>
    </main>
  )
}
