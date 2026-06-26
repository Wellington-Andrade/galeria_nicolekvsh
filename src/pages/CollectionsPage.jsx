import { urlFor } from "../lib/sanityClient"

// Coleções estáticas por enquanto (sem schema novo no Sanity).
// Cada card usa uma obra do acervo como imagem de fundo, quando houver.
const COLLECTIONS = [
  { title: "Natureza", subtitle: "Séries botânicas e paisagens internas" },
  { title: "Presença", subtitle: "Retratos, corpo e olhar" },
  { title: "Devaneios", subtitle: "Memória, sonho e experimentação" },
  { title: "Objetos", subtitle: "Materialidade, forma e superfície" },
  { title: "Retratos", subtitle: "Rosto, identidade e expressão" },
  { title: "Experimentos", subtitle: "Processos abertos e descobertas" },
]

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
            const artwork = items[index % Math.max(items.length, 1)]
            const imageUrl = artwork?.image
              ? urlFor(artwork.image).width(1000).quality(78).url()
              : null

            return (
              <article className="collection-page-card" key={collection.title}>
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
              </article>
            )
          })}
        </div>
      </section>
    </main>
  )
}
