import React from 'react';
import { Phone, Zap, Shield, Users, Star } from 'lucide-react';

export const HeroSection = ({isUserAuthed }) => {
  if (isUserAuthed) {
    return (
      <section className="px-6 py-8 md:py-12">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
            Welcome back! 👋
          </h2>
          <p className="text-base md:text-lg text-white/90 max-w-2xl mx-auto">
            Ready to create some epic pranks?
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="px-6 py-2 md:py-6">
      <div className="max-w-6xl mx-auto text-center">
        <div className="relative inline-block mb-6">
          <div className="w-16 h-16 md:w-32 md:h-32 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/30 animate-bounce relative z-0">
            <Phone className="w-8 h-8 md:w-16 md:h-16 text-white transform rotate-12" />
          </div>
          <div className="absolute -top-1 -right-1 md:-top-2 md:-right-2 w-4 h-4 md:w-8 md:h-8 bg-cyan-400 rounded-full flex items-center justify-center animate-pulse z-0">
            <Zap className="w-2 h-2 md:w-5 md:h-5 text-white" />
          </div>
        </div>
        
        <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-3 md:mb-6 leading-tight">
          The Most Realistic<br />
          <span className="bg-gradient-to-r from-cyan-300 to-emerald-300 bg-clip-text text-transparent">
            AI Prank Calls
          </span>
        </h2>
        
        <p className="text-base md:text-xl text-white/90 mb-3 md:mb-6 max-w-2xl mx-auto leading-relaxed px-4">
          Create hilarious prank calls with AI-powered voices. <span className="hidden md:inline">Your friends will never see it coming! </span>Safe, legal, and absolutely legendary.
        </p>

        <div className="flex items-center justify-center text-white/80 mb-4 md:mb-8 text-sm md:text-base">
          <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-4">
            <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 border border-white/20">
             <Shield className="w-4 h-4 md:w-5 md:h-5 text-green-300" />
             <span>100% Safe</span>
            </div>
            <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 border border-white/20">
             <Star className="w-4 h-4 md:w-5 md:h-5 text-yellow-300 fill-current" />
             <span>Rated 4.9/5 by my mom</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};