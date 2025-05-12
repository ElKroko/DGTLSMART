import { Link, NavLink } from 'react-router-dom';

const Navbar = () => {
  const navLinks = [
    { to: '/', label: 'HOME', exact: true },
    { to: '/langtons-ant', label: 'LANGTON' },
    { to: '/boids', label: 'BOIDS' },
    { to: '/l-systems', label: 'L-SYS' },
    { to: '/lenia', label: 'LENIA' },
    { to: '/about', label: 'ABOUT' },
    { to: '/gallery', label: 'GALLERY' },
  ];

  return (
    <header className="border-b border-terminal-green/30 shadow-terminal">
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center">
          <div className="flex items-center justify-between mb-4 md:mb-0">
            <Link to="/" className="text-2xl font-bold text-terminal-green tracking-widest font-terminal">
              <span className="text-terminal-highlight">DIGITALISMO</span>
              <span className="terminal-cursor"></span>
            </Link>
          </div>
          <nav className="flex flex-wrap">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.exact}
                className={({ isActive }) => 
                  `px-3 py-2 mx-1 text-sm font-terminal tracking-wider transition-colors border
                  ${isActive 
                    ? 'border-terminal-green text-terminal-highlight shadow-terminal' 
                    : 'border-transparent text-terminal-green hover:text-terminal-highlight hover:border-terminal-green/50'}`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
