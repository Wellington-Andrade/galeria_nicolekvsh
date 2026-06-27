import { Link, NavLink, useLocation } from "react-router-dom"

// Menu superior: navega entre páginas próprias (não usa mais âncoras da home).
export default function Header() {
  const location = useLocation()

  // Quando já estamos na home, clicar em "Início"/marca não muda a rota,
  // então o ScrollManager não dispara. Forçamos o scroll ao topo aqui —
  // isso resolvia o caso de ficar preso no fim da página.
  const scrollToTopIfHome = () => {
    if (location.pathname === "/") {
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" })
    }
  }

  return (
    <header className="site-header">
      <Link className="brand" to="/" onClick={scrollToTopIfHome}>
        Nicole Kvsh
      </Link>

      <nav aria-label="Navegação principal">
        <NavLink to="/" end onClick={scrollToTopIfHome}>
          Início
        </NavLink>
        <NavLink to="/galeria">Galeria</NavLink>
        <NavLink to="/matarazzo">Matarazzo</NavLink>
        <NavLink to="/colecoes">Coleções</NavLink>
        <NavLink to="/extras">Extras</NavLink>
        <NavLink to="/contato">Contato</NavLink>
      </nav>
    </header>
  )
}
