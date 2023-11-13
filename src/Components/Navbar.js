import { Link, useMatch, useResolvedPath } from "react-router-dom"
import IMGKodigo from "../Components/img/kodiStore.png";

export default function Navbar() {
  return (
    <nav className="nav">
          <Link className="site-title" to={"/"}>
          <img src={IMGKodigo} className="imgKodigo" alt="logo" />
          </Link>
      <ul>
        <CustomLink to="/cellphones">Celulares</CustomLink>
        <CustomLink to="/juegos">VideoJuegos</CustomLink>
      </ul>
    </nav>
  )
}

function CustomLink({ to, children, ...props }) {
  const resolvedPath = useResolvedPath(to)
  const isActive = useMatch({ path: resolvedPath.pathname, end: true })

  return (
    <li className={isActive ? "active" : ""}>
      <Link to={to} {...props}>
        {children}
      </Link>
    </li>
  )
}
