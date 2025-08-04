import React from 'react';

export const BackgroundElements = () => {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {/* Left light beam */}
      <div className="absolute top-0 left-0 w-96 h-full bg-gradient-to-r from-white/10 via-white/5 to-transparent transform -skew-y-12 opacity-60"></div>
      
      {/* Right light beam */}
      <div className="absolute top-0 right-0 w-96 h-full bg-gradient-to-l from-white/10 via-white/5 to-transparent transform skew-y-12 opacity-60"></div>
    </div>
  );
};