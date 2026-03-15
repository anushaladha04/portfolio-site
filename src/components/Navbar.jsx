import { NavLink, useLocation } from "react-router-dom"
import { github, linkedin } from "../assets/icons"

const Navbar = () => {
  const { pathname } = useLocation()
  const isLightPage = pathname === '/about' || pathname === '/projects' || pathname === '/contact'

  const linkClass = ({ isActive }) => {
    const base = 'transition-colors duration-200'
    if (isLightPage) {
      return `${base} ${isActive ? 'text-blue-600' : 'text-slate-800 hover:text-blue-600'}`
    }
    return `${base} ${isActive ? 'text-blue-300' : 'text-white hover:text-blue-200'}`
  }

  return (
    <header className={`header ${isLightPage ? 'bg-white/95' : ''}`}>
        <NavLink to="/" className="w-10 h-10 rounded-lg bg-white items-center justify-center flex font-bold shadow-md">
            <p className="blue-gradient_text">AL</p>
        </NavLink>
        <nav className="flex text-lg gap-7 font-medium items-center">
            <NavLink to="/about" className={linkClass}>
              About
            </NavLink>
            <NavLink to="/projects" className={linkClass}>
              Projects
            </NavLink>
            <div className="flex gap-3 items-center">
              <a
                href="https://github.com/anushaladha04"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg bg-white flex items-center justify-center shadow-md hover:opacity-80 transition-opacity p-1.5"
                aria-label="GitHub"
              >
                <img
                  src={github}
                  alt="GitHub"
                  className="w-full h-full object-contain"
                />
              </a>
              <a
                href="https://www.linkedin.com/in/anusha-ladha/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg bg-white flex items-center justify-center shadow-md hover:opacity-80 transition-opacity p-1.5"
                aria-label="LinkedIn"
              >
                <img
                  src={linkedin}
                  alt="LinkedIn"
                  className="w-full h-full object-contain"
                />
              </a>
            </div>
        </nav>
    </header>
  )
}

export default Navbar