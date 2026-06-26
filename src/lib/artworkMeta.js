// Resolve os metadados exibidos de uma obra (Ano / Técnica / Dimensões).
// Prioridade das dimensões: campo manual do Sanity > pixels reais da imagem.
// Campos vazios caem em "Em construção", como no layout atual.
const FALLBACK = "Em construção"

export function artworkMeta(artwork) {
  const pixels = artwork?.image?.assetMetadata?.dimensions
  const pixelLabel =
    pixels?.width && pixels?.height
      ? `${pixels.width} × ${pixels.height} px`
      : null

  return {
    year: artwork?.year || FALLBACK,
    technique: artwork?.technique || FALLBACK,
    dimensions: artwork?.dimensions || pixelLabel || FALLBACK,
  }
}
