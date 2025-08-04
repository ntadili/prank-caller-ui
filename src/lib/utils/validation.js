export const validatePhoneNumber = (phone) => {
  const phoneRegex = /^\+?[\d\s\-\(\)]{10,}$/;
  return phoneRegex.test(phone);
};

export const validateFormData = (data) => {
  const errors = [];
  
  if (!data.targetName.trim()) {
    errors.push('Target name is required');
  }
  
  if (!data.phoneNumber.trim()) {
    errors.push('Phone number is required');
  } else if (!validatePhoneNumber(data.phoneNumber)) {
    errors.push('Please enter a valid phone number');
  }
  
  if (!data.message.trim()) {
    errors.push('Prank message is required');
  }
  
  return errors;
};