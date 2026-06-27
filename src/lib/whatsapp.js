// Monta o link do WhatsApp com a mensagem de interesse já pronta.
// Número da Nicole: +55 11 97996-7031 -> formato wa.me sem símbolos.
const PHONE = "5511979967031"

export function whatsappUrl(artworkName) {
  const message = artworkName
    ? `Olá, Nicole! Tenho interesse na obra "${artworkName}". Poderia me passar mais informações?`
    : "Olá, Nicole! Tenho interesse em uma das suas obras. Poderia me passar mais informações?"

  return `https://wa.me/${PHONE}?text=${encodeURIComponent(message)}`
}
