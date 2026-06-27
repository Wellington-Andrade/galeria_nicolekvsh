import { Link } from "react-router-dom"
import { urlFor } from "../lib/sanityClient"

export default function CollectionsSection({ artworks, collections }) {
  const list = (collections || []).slice(0, 3)

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
        {list.map((collection, index) => {
          // Capa escolhida no Studio; senão, a primeira obra da coleção.
          const fallback = (artworks || []).find(
            (item) => item.collection?.slug === collection.slug
          )
          const coverImage = collection.cover || fallback?.image
          const imageUrl = coverImage
            ? urlFor(coverImage).width(900).quality(78).url()
            : null

          return (
            <Link
              className="collection-card is-clickable"
              to={`/colecoes/${collection.slug}`}
              key={collection.slug}
            >
              {imageUrl ? (
                <img src={imageUrl} alt="" loading="lazy" decoding="async" />
              ) : null}

              <div>
                <h3>{collection.title}</h3>
                <p>{collection.subtitle}</p>
                <span>{String(index + 1).padStart(2, "0")}</span>
              </div>
            </Link>
          )
        })}
      </div>
    </section>
  )
}
