import { Link } from "react-router-dom"
import { urlFor } from "../lib/sanityClient"

export default function CollectionsPage({ artworks, collections }) {
  const items = Array.isArray(artworks) ? artworks : []
  const list = Array.isArray(collections) ? collections : []

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
          {list.map((collection, index) => {
            // Capa escolhida no Studio; senão, a primeira obra da coleção.
            const fallback = items.find(
              (item) => item.collection?.slug === collection.slug
            )
            const coverImage = collection.cover || fallback?.image
            const imageUrl = coverImage
              ? urlFor(coverImage).width(1000).quality(78).url()
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
