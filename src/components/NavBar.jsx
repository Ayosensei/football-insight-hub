// src/components/NavBar.jsx
import { NavLink } from "react-router-dom";

export default function Navbar() {
  
  const navLinkClass = ({ isActive }) =>
    isActive
      ? "text-white font-semibold"
      : "hover:text-white";

  return (
    <nav className="bg-gray-900 text-white px-6 py-4 flex justify-between items-center shadow-md">
      
      <NavLink to="/" className="text-2xl font-bold text-blue-400">
        ⚽ Football Insight Hub
      </NavLink>
      
      <ul className="flex gap-6 text-gray-300">
        <li>
          <NavLink to="/" className={navLinkClass} end>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/matches" className={navLinkClass}>
            Matches
          </NavLink>
        </li>
        {/* Updated Links */}
        <li>
          <NavLink to="/standings" className={navLinkClass}>
            Standings
          </NavLink>
        </li>
        <li>
          <NavLink to="/stats" className={navLinkClass}>
            Stats
          </NavLink>
        </li>
        <li>
          <NavLink to="/players" className={navLinkClass}>
            Players
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}