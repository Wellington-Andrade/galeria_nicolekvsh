// Hub de conteúdos extras. Sem backend/CMS novo por enquanto:
// apenas a estrutura visual pronta para crescer.
const CATEGORIES = [
  {
    title: "Entrevistas",
    subtitle: "Conversas sobre processo, obra e trajetória",
  },
  { title: "Publicidade", subtitle: "Colaborações, campanhas e parcerias" },
  { title: "Bastidores", subtitle: "O que acontece antes da obra pronta" },
  { title: "Vídeos", subtitle: "Registros em movimento e time-lapses" },
  { title: "Registros", subtitle: "Documentação de exposições e eventos" },
]

export default function ExtrasPage() {
  return (
    <main className="site-main page-main">
      <header className="page-hero">
        <span className="page-index">Complementos</span>
        <h1>Extras</h1>
        <p>
          Entrevistas, vídeos, bastidores e registros complementares ao acervo
          — o entorno que dá contexto ao trabalho.
        </p>
      </header>

      <section className="page-body">
        <div className="extras-page-grid">
          {CATEGORIES.map((category, index) => (
            <article className="extras-page-card" key={category.title}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <h2>{category.title}</h2>
              <p>{category.subtitle}</p>
              <span className="extras-page-soon">Em breve</span>
            </article>
          ))}
        </div>
      </section>
    </main>
  )
}
