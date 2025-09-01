import React from 'react';

export const Footer = () => {
  return (
    <footer className="px-6 py-8 border-t border-white/20">
      <div className="max-w-6xl mx-auto text-center">
        <p className="text-white/60 mb-4">
          Made with ❤️ for the prankster community • Always prank responsibly
        </p>
        <div className="flex items-center justify-center space-x-6 text-white/40 text-sm">
          <div className="flex items-center justify-center space-x-3 md:space-x-6 text-xs md:text-sm">
            <span>Terms of Service</span>
            <span>•</span>
            <span>Privacy Policy</span>
            <span>•</span>
            <span>Contact</span>
          </div>
        </div>
      </div>
    </footer>
  );
};