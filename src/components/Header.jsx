import { Link, NavLink } from "react-router-dom"

// Menu superior: navega entre páginas próprias (não usa mais âncoras da home).
export default function Header() {
  return (
    <header className="site-header">
      <Link className="brand" to="/">
        Nicole Kvsh
      </Link>

      <nav aria-label="Navegação principal">
        <NavLink to="/" end>
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
