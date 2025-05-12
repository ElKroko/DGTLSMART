const Footer = () => {
  return (
    <footer className="border-t border-terminal-green/30 py-6 text-sm">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div>
            <p className="text-terminal-dim">
              <span className="text-terminal-green">$ </span>
              © {new Date().getFullYear()} DIGITALISMO - ALGORITHMIC AESTHETICS AND GENERATIVE ART
            </p>
          </div>
          <div className="mt-4 md:mt-0 flex space-x-4">
            <a href="/about" className="text-terminal-dim hover:text-terminal-green transition-colors">
              [MANIFEST]
            </a>
            <a href="https://github.com" target="_blank" rel="noreferrer" className="text-terminal-dim hover:text-terminal-green transition-colors">
              [GIT]
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
