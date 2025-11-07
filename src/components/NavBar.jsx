// src/components/NavBar.jsx
import { useState } from "react"; // Import useState
import { NavLink } from "react-router-dom";
import { HiMenu, HiX } from "react-icons/hi"; // Import menu icons

export default function Navbar() {
  // State to manage mobile menu
  const [isOpen, setIsOpen] = useState(false);

  // This is your original function to style active links
  const navLinkClass = ({ isActive }) =>
    isActive ? "text-white font-semibold" : "hover:text-white";

  // Function to close the mobile menu when a link is clicked
  const closeMobileMenu = () => {
    setIsOpen(false);
  };

  return (
    // 'relative' allows us to position the mobile menu
    <nav className="bg-secondary text-white shadow-md relative">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        
        {/* Logo */}
        <NavLink to="/" className="text-2xl font-bold text-accent">
          ⚽ Football Insight Hub
        </NavLink>

        {/* Desktop Menu (Hidden on mobile) */}
        <ul className="hidden md:flex gap-6 text-gray-300">
          <li>
            <NavLink to="/" className={navLinkClass} end>Home</NavLink>
          </li>
          <li>
            <NavLink to="/matches" className={navLinkClass}>Matches</NavLink>
          </li>
          <li>
            <NavLink to="/standings" className={navLinkClass}>Standings</NavLink>
          </li>
          <li>
            <NavLink to="/stats" className={navLinkClass}>Stats</NavLink>
          </li>
          <li>
            <NavLink to="/players" className={navLinkClass}>Players</NavLink>
          </li>
        </ul>

        {/* Mobile Menu Button (Visible on mobile) */}
        <div className="md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-white focus:outline-none"
          >
            {isOpen ? (
              <HiX className="w-8 h-8" /> // Close icon
            ) : (
              <HiMenu className="w-8 h-8" /> // Menu icon
            )}
          </button>
        </div>
      </div>

      {/* --- Mobile Menu (Dropdown) --- */}
      {/* This section is shown or hidden based on the 'isOpen' state */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-secondary z-50">
          <ul className="flex flex-col items-center py-4">
            <li className="py-2">
              <NavLink to="/" className={navLinkClass} end onClick={closeMobileMenu}>
                Home
              </NavLink>
            </li>
            <li className="py-2">
              <NavLink to="/matches" className={navLinkClass} onClick={closeMobileMenu}>
                Matches
              </NavLink>
            </li>
            <li className="py-2">
              <NavLink to="/standings" className={navLinkClass} onClick={closeMobileMenu}>
                Standings
              </NavLink>
            </li>
            <li className="py-2">
              <NavLink to="/stats" className={navLinkClass} onClick={closeMobileMenu}>
                Stats
              </NavLink>
            </li>
            <li className="py-2">
              <NavLink to="/players" className={navLinkClass} onClick={closeMobileMenu}>
                Players
              </NavLink>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}