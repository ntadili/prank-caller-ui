import React from 'react';
import { Phone, CreditCard, Sparkles, Menu, X } from 'lucide-react';
import { Button } from '../../ui';

export const Header = ({ credits, isUserAuthed, logOut, showLoginForm }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  return (
    <header className="p-4 md:p-6 animate-fade-in relative z-20">
      <div className="max-w-6xl mx-auto">
        {/* Mobile Header */}
        <div className="flex md:hidden items-center justify-between w-full">
          <div className="flex items-center space-x-3 group">
            <div className="relative">
              <Phone className="w-8 h-8 text-white transform group-hover:rotate-12 transition-transform duration-300" />
              <Sparkles className="w-4 h-4 text-cyan-300 absolute -top-1 -right-1 animate-pulse" />
            </div>
            <h1 className="text-2xl font-bold text-white tracking-tight">Prankie</h1>
          </div>
          
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 rounded-lg bg-white/20 backdrop-blur-sm border border-white/30 text-white hover:bg-white/30 transition-colors duration-200"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Desktop Header */}
        <div className="hidden md:flex items-center justify-between">
          <div className="flex items-center space-x-3 group">
            <div className="relative">
              <Phone className="w-8 h-8 text-white transform group-hover:rotate-12 transition-transform duration-300" />
              <Sparkles className="w-4 h-4 text-cyan-300 absolute -top-1 -right-1 animate-pulse" />
            </div>
            <h1 className="text-3xl font-bold text-white tracking-tight">Prankie</h1>
          </div>
          
          <div className="flex items-center space-x-4">
            {isUserAuthed ? (
              <div className="flex items-center space-x-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 border border-white/30">
                <CreditCard className="w-5 h-5 text-cyan-300" />
                <span className="text-white font-semibold">{credits} Credits</span>
              </div>
            ) : (
              <div className="flex items-center space-x-2 bg-green-500/20 backdrop-blur-sm rounded-full px-4 py-2 border border-green-300/30">
                <CreditCard className="w-5 h-5 text-green-300" />
                <span className="text-white font-semibold">3 Free Credits on Sign Up</span>
              </div>
            )}
            <Button variant="secondary" size="md" onClick={isUserAuthed ? logOut : showLoginForm}>
              {isUserAuthed ? 'Sign Out' : 'Login'}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-16 right-4 bg-white/95 backdrop-blur-sm rounded-2xl border border-white/50 shadow-2xl p-4 min-w-[200px] z-50 mt-2">
            <div className="space-y-4">
              {isUserAuthed ? (
                <div className="flex items-center space-x-2 bg-gray-100 rounded-full px-4 py-2">
                  <CreditCard className="w-5 h-5 text-purple-600" />
                  <span className="text-gray-800 font-semibold">{credits} Credits</span>
                </div>
              ) : (
                <div className="flex items-center space-x-2 bg-green-100 rounded-full px-4 py-2">
                  <CreditCard className="w-5 h-5 text-green-600" />
                  <span className="text-gray-800 font-semibold">3 Free Credits on Sign Up</span>
                </div>
              )}
              <Button 
                variant="primary" 
                size="md" 
                className="w-full"
                onClick={() => {
                  onAuthToggle();
                  setIsMobileMenuOpen(false);
                }}
              >
                {isUserAuthed ? 'Sign Out' : 'Login'}
              </Button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};