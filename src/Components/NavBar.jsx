import { Link, NavLink } from 'react-router-dom'

export default function NavBar() {
  return (
    <nav className="w-fit h-full bg-orange-200 flex flex-col justify-between items-center py-4 px-8 ">
      <div>
        <Link to="/" className="logo">MyHeroCard</Link>
        <ul className="mt-12">
          <li className="nav-item"><NavLink to="/">Dashboard</NavLink></li>
          <li className="nav-item"><NavLink to="/collections">Collections</NavLink></li>
          <li><NavLink to="/favorites">Favorites</NavLink></li>
        </ul>
      </div>
      <ul>
        <li className="nav-item">
          <NavLink>Settings</NavLink>
        </li>
        <li>
          <NavLink>Login</NavLink>
        </li>
      </ul>
    </nav>
  )
}
