import React from 'react';
import { Phone, Zap, Sparkles } from 'lucide-react';
import { Input, Card } from '../../ui';
import { VoiceSelector } from '../VoiceSelector';
import { VOICES } from '../../../constants';
import { validatePhoneNumber } from '../../lib/utils/validation';

export const PrankForm = ({
  formData,
  onFieldChange,
  onCountryChange,
  onLaunchPrank,
  playingVoice,
  onVoicePreview,
  isLaunching,
  handleSubmit,
  isUserAuthed
}) => {
  const isFormValid = formData.targetName.trim() && 
                     formData.phoneNumber.trim() && 
                     formData.message.trim() &&
                     validatePhoneNumber(formData.phoneNumber) &&
                     !isLaunching;

  return (
    <section className="px-6 pb-12 mt-1 md:-mt-4 animate-fade-up">
      <div  className="max-w-4xl mx-auto" > 
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
                onChange={(value) => onFieldChange('targetName', value)}
                placeholder="Who's getting pranked?"
                required
              />

              <Input
                type="tel"
                label="Phone Number"
                value={formData.phoneNumber}
                onChange={(value) => onFieldChange('phoneNumber', value)}
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
                <textarea
                  value={formData.message}
                  onChange={(e) => onFieldChange('message', e.target.value)}
                  placeholder="Call my friend pretending to be the Airbnb owner saying the TV is broken..."
                  rows={6}
                  className="w-full px-4 py-4 rounded-2xl border-2 border-gray-200 focus:border-purple-500 focus:outline-none transition-colors duration-300 text-lg resize-none"
                  required
                />
              </div>
            </div>

            <div className="mt-6 md:mt-0">
              <VoiceSelector
                voices={VOICES}
                selectedVoice={formData.selectedVoice}
                onVoiceSelect={(voiceId) => onFieldChange('selectedVoice', voiceId)}
                onVoicePreview={onVoicePreview}
                playingVoice={playingVoice}
              />
            </div>
          </div>

          <div className="mt-8 md:mt-10 text-center">
            <button
              type='submit'
              onClick={isUserAuthed ? onLaunchPrank : handleSubmit}
              // onClick={onLaunchPrank}
              // onClick={handleSubmit}
              disabled={!isFormValid}
              className={`group relative w-full md:w-auto inline-flex items-center justify-center font-semibold rounded-2xl transition-all duration-300 px-6 py-4 md:px-12 md:py-4 text-lg md:text-xl text-white shadow-lg ${
                isLaunching
                  ? 'bg-gradient-to-r from-purple-700 via-pink-600 to-orange-500 animate-pulse cursor-not-allowed'
                  : isFormValid 
                    ? 'bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400 hover:shadow-xl hover:shadow-purple-500/25 hover:scale-[1.02] hover:from-purple-700 hover:via-pink-600 hover:to-orange-500 hover:brightness-110 active:scale-[0.98] active:shadow-md transform-gpu' 
                    : 'bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400 opacity-50 cursor-not-allowed'
              }`}
            >
              {isLaunching ? (
                <>
                  <Phone className="w-5 h-5 md:w-6 md:h-6 mr-2 md:mr-3 animate-phone-ring text-yellow-200" />
                  <span className="flex-1 text-center md:text-left">Launching Prank...</span>
                  <div className="flex items-center space-x-1 ml-2 md:ml-3">
                    <div className="w-2 h-2 bg-yellow-300 rounded-full animate-bounce-dots"></div>
                    <div className="w-2 h-2 bg-yellow-300 rounded-full animate-bounce-dots"></div>
                    <div className="w-2 h-2 bg-yellow-300 rounded-full animate-bounce-dots"></div>
                  </div>
                </>
              ) : (
                <>
                  <Phone className={`w-5 h-5 md:w-6 md:h-6 mr-2 md:mr-3 transition-transform duration-300 ${isFormValid ? 'group-hover:rotate-12 group-hover:scale-110' : ''}`} />
                  <span className="flex-1 text-center md:text-left">Launch Prank Call</span>
                  <Zap className={`w-5 h-5 md:w-6 md:h-6 ml-2 md:ml-3 transition-all duration-300 ${isFormValid ? 'group-hover:text-yellow-200 group-hover:drop-shadow-sm group-hover:scale-110' : ''}`} />
                </>
              )}
              
              {!isLaunching && (
                <>
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-white/0 via-white/5 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                  
                  <div className="absolute inset-0 rounded-2xl border border-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                </>
              )}
              
              {isLaunching && (
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-white/10 via-white/20 to-white/10 animate-pulse pointer-events-none"></div>
              )}
            </button>
            <p className="text-xs md:text-sm text-gray-500 mt-3 md:mt-4">
              {isLaunching
                ? 'Connecting to AI voice system... This may take a moment'
                : isFormValid 
                  ? 'This will use 1 credit • Estimated duration: 30-60 seconds'
                  : 'Please fill in all fields to launch your prank call'
              }
            </p>
          </div>
        </Card>
      </div>
    </section>
  );
};