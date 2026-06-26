// Página dedicada ao projeto Matarazzo.
// Estrutura editorial preparada para receber muito conteúdo depois
// (conceito, processo, registros, desdobramentos). Textos neutros por enquanto.
export default function MatarazzoPage() {
  return (
    <main className="site-main page-main matarazzo-page">
      <header className="page-hero matarazzo-page-hero">
        <div className="page-hero-media" aria-hidden="true">
          <img
            src="/matarazzo.jpg"
            alt=""
            loading="lazy"
            decoding="async"
            onError={(event) => {
              event.currentTarget.style.display = "none"
            }}
          />
        </div>
        <div className="page-hero-content">
          <span className="page-index">Projeto</span>
          <h1>Matarazzo</h1>
          <p>Um projeto em construção. Entre passado, presença e futuro.</p>
        </div>
      </header>

      <section className="page-body editorial">
        <article className="editorial-block">
          <span className="editorial-tick" aria-hidden="true" />
          <h2>Conceito</h2>
          <p>
            Espaço reservado para apresentar conceito, processo, registros e
            desdobramentos do projeto.
          </p>
        </article>

        <article className="editorial-block">
          <span className="editorial-tick" aria-hidden="true" />
          <h2>Processo</h2>
          <p>
            Espaço reservado para apresentar conceito, processo, registros e
            desdobramentos do projeto.
          </p>
        </article>

        <div className="editorial-gallery" aria-hidden="true">
          <div className="editorial-figure" />
          <div className="editorial-figure" />
          <div className="editorial-figure" />
        </div>

        <article className="editorial-block">
          <span className="editorial-tick" aria-hidden="true" />
          <h2>Registros</h2>
          <p>
            Espaço reservado para apresentar conceito, processo, registros e
            desdobramentos do projeto.
          </p>
        </article>
      </section>
    </main>
  )
}
