import React from 'react';
import { Link } from 'react-router-dom';

// =================================================================================
// SVG Icon Components for Social Links
// Using inline SVGs is clean, fast, and avoids external dependencies.
// =================================================================================

const GithubIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
  </svg>
);

const LinkedInIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.713c-.966 0-1.75-.784-1.75-1.75s.784-1.75 1.75-1.75 1.75.784 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.713h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
  </svg>
);

const TwitterIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-.424.727-.666 1.581-.666 2.477 0 1.61.82 3.027 2.053 3.847-.764-.024-1.482-.232-2.11-.583v.06c0 2.256 1.605 4.14 3.737 4.568-.39.106-.803.162-1.227.162-.3 0-.593-.028-.877-.082.593 1.85 2.303 3.2 4.338 3.245-1.59 1.25-3.6 1.995-5.786 1.995-.376 0-.747-.022-1.112-.065 2.062 1.323 4.51 2.096 7.14 2.096 8.57 0 13.255-7.098 13.255-13.254 0-.2-.005-.402-.014-.602.91-.658 1.7-1.476 2.323-2.41z"/>
  </svg>
);

// =================================================================================
// Main Enhanced Footer Component
// =================================================================================
export const Footer = () => {
  return (
    
    <footer className="relative left-0 mt-20 z-10 bottom-0 right-0  bg-black border-t border-white/10 text-gray-300">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
          
          {/* Column 1: Brand and Social */}
          <div className="col-span-1 lg:col-span-2">
            <h2 className="text-2xl font-bold text-white mb-4">
              <Link to="/" className="hover:text-indigo-400 transition-colors">ANISH KUMAR</Link>
            </h2>
            <p className="max-w-xs text-gray-400 mb-6">
              A passionate developer building the future of the web, one line of code at a time.
            </p>
            <div className="flex space-x-5">
              <a href="https://github.com/Anishkumar100" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                <GithubIcon />
              </a>
              <a href="https://in.linkedin.com/in/anish-kumar-s-66ab50292" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                <LinkedInIcon />
              </a>

            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4 uppercase tracking-wider">Quick Links</h3>
            <ul className="space-y-3">
              <li><Link to="/" className="hover:text-indigo-400 hover:underline transition-colors">Home</Link></li>
              <li><Link to="/about" className="hover:text-indigo-400 hover:underline transition-colors">About</Link></li>
              <li><Link to="/projects" className="hover:text-indigo-400 hover:underline transition-colors">Projects</Link></li>
              <li><Link to="/contact" className="hover:text-indigo-400 hover:underline transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Column 3: Legal */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4 uppercase tracking-wider">Legal</h3>
            <ul className="space-y-3">
              <li><Link to="/privacy-policy" className="hover:text-indigo-400 hover:underline transition-colors">Privacy Policy</Link></li>
              <li><Link to="/licensing" className="hover:text-indigo-400 hover:underline transition-colors">Licensing</Link></li>
              <li><Link to="/terms-of-service" className="hover:text-indigo-400 hover:underline transition-colors">Terms of Service</Link></li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-gray-800 text-center text-gray-500 text-sm">
          <p>© {new Date().getFullYear()} ANISH KUMAR™. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
    
  );
};

export default Footer;
