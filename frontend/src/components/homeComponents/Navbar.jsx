import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';

export const Navbar = () => {
  const activeClass = 'text-white';
  const inactiveClass = 'text-gray-400 hover:text-white transition-colors';
  const [toggle, setToggle] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/about', label: 'About' },
    { to: '/skills', label: 'Skills' },
    { to: '/projects', label: 'Projects' },
    { to: '/contact', label: 'Contact' },
  ];

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 ${toggle ? `h-full` : ""} w-full z-50 transition-all duration-300 ${scrolled
          ? 'bg-black border-b border-white/10' // solid bg on scroll
          : 'bg-transparent backdrop-blur-md shadow-lg shadow-black/20 border-b border-gradient-to-r from-red-500/50 via-pink-500/50 to-blue-500/50 border-white/10' // transparent initially
        }`}

    >
      <div className="max-w-screen-xl mx-auto flex items-center justify-between px-6 py-4">

        {/* Stylized Name */}
        <NavLink
          to="/"
          className="text-xl font-extrabold tracking-widest uppercase bg-gradient-to-r from-white via-gray-400 to-white  bg-clip-text text-transparent drop-shadow-[0_0_8px_rgba(255,255,255,0.15)] hover:drop-shadow-[0_0_14px_rgba(255,255,255,0.3)] transition-all"
        >
          ANISH&nbsp;KUMAR
        </NavLink>

        {/* Desktop Menu */}
        <ul className="hidden h-full md:flex space-x-10 text-sm font-medium">
          {navLinks.map(({ to, label }) => (
            <li key={label}>
              <NavLink
                to={to}
                className={({ isActive }) =>
                  `transition-colors duration-200 relative after:content-[''] after:block after:h-[2px] after:w-0 after:bg-gradient-to-r after:from-purple-400 after:to-blue-400 after:transition-all after:duration-300 hover:after:w-full ${isActive ? `${activeClass} after:w-full` : inactiveClass
                  }`
                }
              >
                {label}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setToggle(!toggle)}
          className={`md:hidden text-gray-400 hover:text-white transition-colors 
          focus:outline-none`}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d={toggle ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
            />
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {toggle && (
        <div className={`md:hidden ${toggle?"h-screen":""} bg-black/50 backdrop-blur-xl border-t border-white/10 animate-slideDown`}>
          <ul className="flex flex-col p-4 space-y-4 text-sm font-medium">
            {navLinks.map(({ to, label }) => (
              <li key={label}>
                <NavLink
                  to={to}
                  onClick={() => setToggle(false)}
                  className={({ isActive }) =>
                    `block transition-colors ${isActive ? activeClass : inactiveClass
                    }`
                  }
                >
                  {label}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>

  );
};
