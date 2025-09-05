import React, { useState, useEffect } from 'react';
import { Header, Footer, BackgroundElements } from '../components/layout';
import { HeroSection, FeaturesSection } from '../components/sections';
import { PrankForm } from '../components/prank/PrankForm';
import { PrankModal } from '../components/prank/PrankModal';
import { usePrankForm } from '../hooks';
import { APP_CONFIG } from '../constants';
import AuthWrapper from '@/components/loginForm/AuthWrapper';
import { supabase } from '@/components/lib/supabase/client';
import { Button } from '@/components/ui';

function HomePage() {
  const [credits] = useState(APP_CONFIG.defaultCredits);
  const [showPrankModal, setShowPrankModal] = useState(false);



  // -----------------------------------------------------------
  // POP UP LOGIN FORM LOGIC
  // handleClick will be used for the onClick inside the <form /> tag
  // to set the value to true once clicked. Then this will trigger the if statement
  // inside the <LoginForm /> and will return it on the skeleton.
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  const [showLogin, setShowLogin] = useState(false)
  const showLoginForm = (e) => {
    e.preventDefault()
    setShowLogin(true);
    console.log("Please Login")
  }
  // -----------------------------------------------------------




  // ---------------------------------------------
  // AUTHENTICATION LOGIC (supabase docs reference link here: https://supabase.com/docs/guides/auth/passwords?queryGroups=flow&flow=implicit)
  // POSSIBLE CHANGE: Maybe transfer the auth logic to the backend and fetch the isisUserAuthenticated from express instead
  // const [formColor, setFormColor] = useState('bg-grey-200');
  // const [showLogOutButton, setShowLogOutButton] = useState(false)
  const [isUserAuthed, setIsUserAuthed] = useState(null)

  useEffect(() => {
    async function signInWithEmail() {
      const { data, error } = await supabase.auth.getSession();
      const authed = !!data?.session;

      console.log("Data: ", data);
      console.log("Authed: ", authed)

      setIsUserAuthed(authed)
    }
    signInWithEmail();    
  }, [])

  // This second useEffect is to render isUserAuthed so 
  // it does not stay null (old value)
  useEffect(() => {
    if (isUserAuthed !== null) {
      console.log("Authed (from state):", isUserAuthed);
    }
  }, [isUserAuthed]);
  // -----------------------------------------------------------



  // -----------------------------------------------------------
  // TOGGLE AUTH LOGIC
  // Docs used for Sign Out: https://supabase.com/docs/guides/auth/signout
  const logOut = async () => {
    await supabase.auth.signOut({ scope: 'local' });
    window.location.reload()
    setIsUserAuthenticated(false);
    console.log(`User logged off: ${supabase.auth.signOut}`, isUserAuthed);
  }
  // -----------------------------------------------------------





  const handleCloseLogin = () => {
    setShowLogin(false);
  };

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
        <Header credits={credits} isUserAuthed={isUserAuthed} logOut={logOut} showLoginForm={showLoginForm} />
        <HeroSection isLoggedIn={isLoggedIn} isUserAuthed={isUserAuthed} />

        <PrankForm
          formData={formData}
          onFieldChange={updateFormField}
          onCountryChange={updateCountry}
          onLaunchPrank={handleLaunchPrank}
          playingVoice={playingVoice}
          onVoicePreview={previewVoice}
          isLaunching={isLaunching}
          handleSubmit={showLoginForm}
          isUserAuthed={isUserAuthed}
        />
        <FeaturesSection />
        <Footer />
      </div>

      {showLogin && <AuthWrapper onClose={handleCloseLogin} />}
      
      <PrankModal
        isOpen={showPrankModal}
        onClose={handleCloseModal}
        targetName={formData.targetName}
      />
    </div>
  );
}

export default HomePage;