export const validatePhoneNumber = (phone) => {
  const phoneRegex = /^\+?[\d\s\-\(\)]{7,}$/;
  return phoneRegex.test(phone) && phone.replace(/\D/g, '').length >= 7;
};

export const validatePrankForm = (formData) => {
  const errors = [];
  
  if (!formData.targetName?.trim()) {
    errors.push('Target name is required');
  }
  
  if (!formData.phoneNumber?.trim()) {
    errors.push('Phone number is required');
  } else if (!validatePhoneNumber(formData.phoneNumber)) {
    errors.push('Please enter a valid phone number');
  }
  
  if (!formData.message?.trim()) {
    errors.push('Prank message is required');
  }
  
  return errors;
};