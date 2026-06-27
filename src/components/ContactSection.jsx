// `embedded` = true quando usado dentro da página /contato, onde o título
// já vem do hero da página (evita "Contato" duplicado). Na home fica completo.
// Sem formulário/backend: os canais abrem direto o e-mail e o Instagram.
export default function ContactSection({ embedded = false }) {
  return (
    <section
      id="contato"
      className={`site-section contact-section${embedded ? " is-embedded" : ""}`}
    >
      {!embedded ? (
        <div className="section-copy">
          <span className="section-index">06</span>
          <h2>Contato</h2>
          <p>Vamos conversar sobre arte, projetos e colaborações.</p>
        </div>
      ) : null}

      <div className="contact-channels">
        <a className="contact-channel" href="mailto:nicolevianart@icloud.com">
          <span className="contact-channel-label">E-mail</span>
          <span className="contact-channel-value">nicolevianart@icloud.com</span>
          <span className="contact-channel-cta">Enviar mensagem →</span>
        </a>

        <a
          className="contact-channel"
          href="https://www.instagram.com/nicolekvsh"
          target="_blank"
          rel="noreferrer"
        >
          <span className="contact-channel-label">Instagram</span>
          <span className="contact-channel-value">@nicolekvsh</span>
          <span className="contact-channel-cta">Abrir perfil →</span>
        </a>
      </div>
    </section>
  )
}
