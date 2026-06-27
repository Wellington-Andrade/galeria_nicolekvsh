import { whatsappUrl } from "../lib/whatsapp"

// Botão "Adquirir obra" (abre o WhatsApp com mensagem pronta).
// Obras marcadas como indisponíveis no Sanity viram um rótulo desabilitado.
// Obras antigas (sem o campo) são tratadas como disponíveis.
export default function AcquireButton({ artwork }) {
  const isAvailable = artwork?.available !== false

  if (!isAvailable) {
    return (
      <button className="button is-disabled" type="button" disabled>
        Indisponível
      </button>
    )
  }

  return (
    <a
      className="button button-primary"
      href={whatsappUrl(artwork?.name)}
      target="_blank"
      rel="noreferrer"
    >
      Adquirir obra
    </a>
  )
}
