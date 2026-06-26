import { useEffect, useState } from "react"

const items = [
  ["01", "Início", "#inicio", "inicio"],
  ["02", "Galeria", "#galeria", "galeria"],
  ["03", "Matarazzo", "#matarazzo", "matarazzo"],
  ["04", "Coleções", "#colecoes", "colecoes"],
  ["05", "Extras", "#extras", "extras"],
  ["06", "Contato", "#contato", "contato"],
]

export default function BottomNav() {
  const [progress, setProgress] = useState(0)
  const [active, setActive] = useState("inicio")

  // Linha de progresso: avança da esquerda para a direita conforme o scroll desce.
  useEffect(() => {
    const onScroll = () => {
      const doc = document.documentElement
      const max = doc.scrollHeight - doc.clientHeight
      const ratio = max > 0 ? doc.scrollTop / max : 0
      setProgress(Math.min(1, Math.max(0, ratio)))
    }

    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", onScroll)
    return () => {
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", onScroll)
    }
  }, [])

  // Destaca o item da seção visível no centro da viewport.
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id)
        })
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 }
    )

    items.forEach(([, , , id]) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  return (
    <nav className="bottom-nav" aria-label="Navegação de seções">
      <div className="bottom-nav-track" aria-hidden="true">
        <div
          className="bottom-nav-progress"
          style={{ width: `${progress * 100}%` }}
        />
      </div>

      <div className="bottom-nav-items">
        {items.map(([number, label, href, id]) => (
          <a
            href={href}
            key={href}
            className={active === id ? "is-active" : ""}
            aria-current={active === id ? "true" : undefined}
          >
            <span>{number}</span>
            <strong>{label}</strong>
          </a>
        ))}
      </div>
    </nav>
  )
}
