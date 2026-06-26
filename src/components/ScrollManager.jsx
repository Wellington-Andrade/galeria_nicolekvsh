import { useEffect } from "react"
import { useLocation } from "react-router-dom"

// Gerencia o scroll a cada navegação:
// - se houver hash (ex.: /#galeria), rola suavemente para a seção;
// - caso contrário, volta para o topo ao trocar de página.
export default function ScrollManager() {
  const location = useLocation()

  useEffect(() => {
    if (location.hash) {
      const target = document.querySelector(location.hash)
      if (target) {
        // Pequeno atraso para garantir que a seção já foi renderizada.
        const timer = setTimeout(() => {
          target.scrollIntoView({ behavior: "smooth", block: "start" })
        }, 100)
        return () => clearTimeout(timer)
      }
    }

    window.scrollTo({ top: 0, left: 0, behavior: "auto" })
  }, [location.pathname, location.hash])

  return null
}
