import React, { useEffect, useState } from 'react';
import { Phone, Zap, Sparkles } from 'lucide-react';
import { Input, Card } from '../../ui';
import { VoiceSelector } from '../VoiceSelector';
import { VOICES } from '../../../constants';
import { validatePhoneNumber } from '../../../lib/utils';
import { supabase } from '../../../lib/supabase/client';
import AuthWrapper from '../../loginForm/AuthWrapper';

export const PrankForm = ({
  formData,
  onFormChange,
  onCountryChange,
  onSubmit,
  playingVoice,
  onVoicePreview,
}) => {
  const isFormValid = formData.targetName.trim() && 
                     formData.phoneNumber.trim() && 
                     formData.message.trim() &&
                     validatePhoneNumber(formData.phoneNumber);





  // This is the logic for the pop up Login, we set false by default.
  // handleClick will be used for the onClick inside the <form /> tag
  // to set the value to true once clicked. Then this will trigger the if statement
  // inside the <LoginForm /> and will return it on the skeleton.
  const [showLogin, setShowLogin] = useState(false);

  const handleClick = (e) => {
    // if (isUserAuthenticated) {
      setShowLogin(true);
    // }    This if statement is implemented inline in the component.
  };





  // SUBMIT CALL TO THE SERVER AND FETCH CREDITS
  const {targetName, phoneNumber, message, selectedVoice} = formData;
  const [credits, setCredits] = useState();

  // We now create an async function inside useEffect (because useEffect cant have async directly)
  // Inside we fetch the credit count from the DB and update the useState credits variable with the current count.
  // This is done at first load and for every update the page has. Then we call the function to apply everything.
  useEffect(() => {
    async function fetchCreditCount() {
      const { data, error } = await supabase
      .from('users')
      .select()
      setCredits(data[0].credits);
    }
    fetchCreditCount();
  }, [])

  // Now we create the function to send the form details to the server
  const handleSubmit = (e) => {
    e.preventDefault();
    const callDetails = {
      name: targetName,
      number: phoneNumber,
      message: message,
      voiceId: selectedVoice
    };
    fetch("http://localhost:3000/pranks", {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(callDetails)
    })
    .then(res => res.json()) // parse json from backend
    .then(data => {
      if (data.success) {
        setCredits(data.credits); // update credits from backend
        alert("Prank Submitted")
        console.log("Call details submitted");
        console.log(data, "credits");
      } else {
        alert("Something went wrong");
      }
    })
    .catch(err => {
      console.error("Fetch error:", err);
      alert("⚠️ Server error")
    });
  }
  
  return (
    <section className="px-6 pb-12 mt-1 md:-mt-4 animate-fade-up">
      <form onSubmit={handleSubmit} onClick={handleClick}  className="max-w-4xl mx-auto">

      {showLogin && <AuthWrapper className={" z-10 bg-white"} />}

        <Card variant="default" padding="lg">

          <div className="text-center mb-4 md:mb-10">
            <h3 className="text-xl md:text-3xl font-bold text-gray-800 mb-2 md:mb-4">Create Your Prank</h3>
            <p className="text-gray-600 text-sm md:text-lg">Fill in the details and let the magic happen ✨</p>
          </div>


          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            <div className="space-y-4 md:space-y-6">
              <Input
                label="Target's Name"
                value={formData.targetName}
                onChange={(value) => onFormChange('targetName', value)}
                placeholder="Who's getting pranked?"
                required
              />

              <Input
                type="tel"
                label="Phone Number"
                value={formData.phoneNumber}
                onChange={(value) => onFormChange('phoneNumber', value)}
                placeholder="(555) 123-4567"
                showCountryPrefix={true}
                selectedCountry={formData.countryCode}
                onCountryChange={onCountryChange}
                required
              />

              <div className="relative">
                <div className="flex items-baseline justify-between mb-3">
                  <label className="block text-sm font-semibold text-gray-700">
                    Prank Message
                    <span className="text-red-500 ml-1">*</span>
                  </label>

          {/* AI Improve Button */}
                  <button
                    type="button"
                    className={`flex items-center space-x-1 px-3 py-1 text-white text-xs font-medium rounded-full transition-all duration-200 shadow-sm hover:shadow-md ${
                      formData.message.length > 0 
                        ? 'animate-shimmer animate-glow hover:scale-110 shadow-lg' 
                        : 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600'
                    }`}
                    onClick={() => {
                    }}
                  >
                    <Sparkles className={`w-3 h-3 ${formData.message.length > 0 ? 'animate-wiggle' : 'animate-pulse'}`} />
                    <span>AI Improve</span>
                  </button>
                </div>

          {/* Text Box for Prank message */}
                <textarea
                  value={formData.message}
                  onChange={(e) => onFormChange('message', e.target.value)}
                  placeholder="Call my friend pretending to be the Airbnb owner saying the TV is broken..."
                  rows={6}
                  className="w-full px-4 py-4 rounded-2xl border-2 border-gray-200 focus:border-purple-500 focus:outline-none transition-colors duration-300 text-lg resize-none"
                  required
                />
              </div>
            </div>

          {/* Voices Selector */}
            <div className="mt-6 md:mt-0">
              <VoiceSelector
                voices={VOICES}
                selectedVoice={formData.selectedVoice}
                onVoiceSelect={(voiceId) => onFormChange('selectedVoice', voiceId)}
                onVoicePreview={onVoicePreview}
                playingVoice={playingVoice}
              />
            </div>
          </div>

          {/* Submit Form Button */}
          <div className="mt-8 md:mt-10 text-center">
            <button
              onClick={onSubmit}
              disabled={!isFormValid}
              className={`group relative w-full md:w-auto inline-flex items-center justify-center font-semibold rounded-2xl transition-all duration-300 px-6 py-4 md:px-12 md:py-4 text-lg md:text-xl bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400 text-white shadow-lg hover:shadow-xl hover:shadow-purple-500/25 ${
                isFormValid 
                  ? 'hover:scale-[1.02] hover:from-purple-700 hover:via-pink-600 hover:to-orange-500 hover:brightness-110 active:scale-[0.98] active:shadow-md transform-gpu' 
                  : 'opacity-50 cursor-not-allowed'
              }`}
            >
              <Phone className={`w-5 h-5 md:w-6 md:h-6 mr-2 md:mr-3 transition-transform duration-300 ${isFormValid ? 'group-hover:rotate-12 group-hover:scale-110' : ''}`} />
              <span className="flex-1 text-center md:text-left">Launch Prank Call</span>
              <Zap className={`w-5 h-5 md:w-6 md:h-6 ml-2 md:ml-3 transition-all duration-300 ${isFormValid ? 'group-hover:text-yellow-200 group-hover:drop-shadow-sm group-hover:scale-110' : ''}`} />
              
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-white/0 via-white/5 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              
              <div className="absolute inset-0 rounded-2xl border border-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
            </button>

            <p className="text-xs md:text-sm text-gray-500 mt-3 md:mt-4">
              {isFormValid 
                ? 'This will use 1 credit • Estimated duration: 30-60 seconds'
                : 'Please fill in all fields to launch your prank call'
              }
            </p>
          </div>
        </Card>

      </form>
    </section>
  );
};