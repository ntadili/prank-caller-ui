import { useState } from 'react';
import { validatePhoneNumber } from '../lib/utils';

export const usePrankForm = () => {
  const [formData, setFormData] = useState({
    targetName: '',
    phoneNumber: '',
    countryCode: 'us',
    selectedVoice: 'robot',
    message: ''
  });

  const [playingVoice, setPlayingVoice] = useState(null);

  const handleFormChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleCountryChange = (countryCode) => {
    setFormData(prev => ({ ...prev, countryCode }));
  };
  
  const handleVoicePreview = (voiceId) => {
    setPlayingVoice(voiceId);
    setTimeout(() => setPlayingVoice(null), 2000);
  };

  const handlePrankCall = () => {
    if (!formData.targetName.trim() || !formData.phoneNumber.trim() || !formData.message.trim()) {
      alert('Please fill in all fields to start the prank! 🎭');
      return;
    }
    
    if (!validatePhoneNumber(formData.phoneNumber)) {
      alert('Please enter a valid phone number! 📞');
      return;
    }
    
  };

  return {
    formData,
    playingVoice,
    handleFormChange,
    handleCountryChange,
    handleVoicePreview,
    handlePrankCall,
  };
};