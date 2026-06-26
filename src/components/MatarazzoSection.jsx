export default function MatarazzoSection() {
  return (
    <section id="matarazzo" className="site-section matarazzo-section">
      <div className="matarazzo-media" aria-hidden="true">
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

      <div className="matarazzo-content">
        <h2>Matarazzo</h2>
        <span className="matarazzo-tick" aria-hidden="true" />
        <p>Um projeto em construção. Entre passado, presença e futuro.</p>
        <a className="button button-arrow" href="#contato">
          Conhecer o projeto
          <span aria-hidden="true">→</span>
        </a>
      </div>
    </section>
  )
}
