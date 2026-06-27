// Coleções (estáticas por enquanto). Fonte única usada pela home,
// pela página /colecoes e pela página de detalhe /colecoes/:slug.
export const COLLECTIONS = [
  {
    slug: "natureza",
    title: "Natureza",
    subtitle: "Séries botânicas e paisagens internas",
  },
  {
    slug: "presenca",
    title: "Presença",
    subtitle: "Retratos, corpo e olhar",
  },
  {
    slug: "devaneios",
    title: "Devaneios",
    subtitle: "Memória, sonho e experimentação",
  },
  {
    slug: "objetos",
    title: "Objetos",
    subtitle: "Materialidade, forma e superfície",
  },
  {
    slug: "retratos",
    title: "Retratos",
    subtitle: "Rosto, identidade e expressão",
  },
  {
    slug: "experimentos",
    title: "Experimentos",
    subtitle: "Processos abertos e descobertas",
  },
]

export function findCollection(slug) {
  return COLLECTIONS.find((collection) => collection.slug === slug) || null
}
