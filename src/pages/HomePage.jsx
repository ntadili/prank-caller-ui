import React, { useState } from 'react';
import { Header, Footer, BackgroundElements } from '../components/layout';
import { HeroSection, FeaturesSection } from '../components/sections';
import { PrankForm } from '../components/prank/PrankForm';
import { usePrankForm } from '../hooks';
import { APP_CONFIG } from '../constants';

function HomePage() {
  const [credits] = useState(APP_CONFIG.defaultCredits);
  const {
    formData,
    playingVoice,
    handleFormChange,
    handleCountryChange,
    handleVoicePreview,
    handlePrankCall,
  } = usePrankForm();

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600">
      <BackgroundElements />

      <div className="relative z-10">
        <Header credits={credits} />
        <HeroSection />
        <PrankForm
          formData={formData}
          onFormChange={handleFormChange}
          onCountryChange={handleCountryChange}
          onSubmit={handlePrankCall}
          playingVoice={playingVoice}
          onVoicePreview={handleVoicePreview}
        />
        <FeaturesSection />
        <Footer />
      </div>
    </div>
  );
}

export default HomePage;