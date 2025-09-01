import React, { useState } from 'react';
import { Header, Footer, BackgroundElements } from '../components/layout';
import { HeroSection, FeaturesSection } from '../components/sections';
import { PrankForm } from '../components/prank/PrankForm';
import { PrankModal } from '../components/prank/PrankModal';
import { usePrankForm } from '../hooks';
import { APP_CONFIG } from '../constants';
import AuthWrapper from '@/components/loginForm/AuthWrapper';

function HomePage() {
  const [credits] = useState(APP_CONFIG.defaultCredits);
  const [showPrankModal, setShowPrankModal] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  // Set functionality for showing Login Form
  const [showLogin, setShowLogin] = useState(false)
  const handleClick = (e) => {
    e.preventDefault()
    setShowLogin(true);
    console.log("hi there")
  }

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
    setIsLoggedIn(!isLoggedIn);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600">
      <BackgroundElements />

      <div className="relative z-10">
        <Header credits={credits} isLoggedIn={isLoggedIn} onAuthToggle={handleAuthToggle} />
        <HeroSection isLoggedIn={isLoggedIn} />
        {showLogin && <AuthWrapper onClose={() => setShowLogin(false)} />}
        <PrankForm
          formData={formData}
          onFieldChange={updateFormField}
          onCountryChange={updateCountry}
          onLaunchPrank={handleLaunchPrank}
          playingVoice={playingVoice}
          onVoicePreview={previewVoice}
          isLaunching={isLaunching}
          handleSubmit={handleClick}
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