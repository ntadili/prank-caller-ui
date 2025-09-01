import React, { useState } from 'react';
import { Header, Footer, BackgroundElements } from '../components/layout';
import { HeroSection, FeaturesSection } from '../components/sections';
import { PrankForm } from '../components/prank/PrankForm';
import { PrankModal } from '../components/prank/PrankModal';
import { usePrankForm } from '../hooks';
import { APP_CONFIG } from '../constants';

function HomePage() {
  const [credits] = useState(APP_CONFIG.defaultCredits);
  const [showPrankModal, setShowPrankModal] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  

  const {
    formData,
    playingVoice,
    isLaunching,
    updateFormField,
    updateCountry,
    previewVoice,
    launchPrank,
  } = usePrankForm();

  const handleLaunchPrank = () => {
    launchPrank(() => {
      setShowPrankModal(true);
    });
  };

  const handleCloseModal = () => {
    setShowPrankModal(false);
  };

  const handleAuthToggle = () => {
    // TODO: Implement proper authentication toggle
    console.log('Auth toggle clicked');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600">
      <BackgroundElements />

      <div className="relative z-10">
        <Header credits={credits} isLoggedIn={isLoggedIn} onAuthToggle={handleAuthToggle} />
        <HeroSection isLoggedIn={isLoggedIn} />
        <PrankForm
          formData={formData}
          onFieldChange={updateFormField}
          onCountryChange={updateCountry}
          onLaunchPrank={handleLaunchPrank}
          playingVoice={playingVoice}
          onVoicePreview={previewVoice}
          isLaunching={isLaunching}
          handleSubmit={handleLaunchPrank}
        />
        <FeaturesSection />
        <Footer />
      </div>
      
      <PrankModal
        isOpen={showPrankModal}
        onClose={handleCloseModal}
        targetName={formData.targetName}
      />
    </div>
  );
}

export default HomePage;