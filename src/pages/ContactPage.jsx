import ContactSection from "../components/ContactSection"

// Página de contato: reutiliza a seção de contato da home (mailto + Instagram),
// sem backend, dentro do mesmo layout editorial das demais páginas.
export default function ContactPage() {
  return (
    <main className="site-main page-main">
      <header className="page-hero">
        <span className="page-index">Fale com a artista</span>
        <h1>Contato</h1>
        <p>
          Para conversas sobre arte, projetos e colaborações. Respondo
          diretamente por e-mail ou pelo Instagram.
        </p>
      </header>

      <ContactSection embedded />
    </main>
  )
}
