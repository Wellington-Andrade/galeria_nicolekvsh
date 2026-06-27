// `embedded` = true quando usado dentro da página /contato, onde o título
// já vem do hero da página (evita "Contato" duplicado). Na home fica completo.
export default function ContactSection({ embedded = false }) {
  return (
    <section
      id="contato"
      className={`site-section contact-section${embedded ? " is-embedded" : ""}`}
    >
      <div className="section-copy">
        {!embedded ? (
          <>
            <span className="section-index">06</span>
            <h2>Contato</h2>
            <p>Vamos conversar sobre arte, projetos e colaborações.</p>
          </>
        ) : null}

        <div className="contact-links">
          <a href="mailto:nicolekvsh.art@gmail.com">nicolekvsh.art@gmail.com</a>
          <a
            href="https://www.instagram.com/nicolekvsh"
            target="_blank"
            rel="noreferrer"
          >
            @nicolekvsh
          </a>
        </div>
      </div>

      <form
        className="contact-form"
        onSubmit={(event) => event.preventDefault()}
      >
        <input placeholder="Nome" aria-label="Nome" />
        <input placeholder="E-mail" type="email" aria-label="E-mail" />
        <textarea placeholder="Mensagem" rows="5" aria-label="Mensagem" />
        <a
          className="button button-primary"
          href="mailto:nicolekvsh.art@gmail.com"
        >
          Enviar mensagem
        </a>
      </form>
    </section>
  )
}
