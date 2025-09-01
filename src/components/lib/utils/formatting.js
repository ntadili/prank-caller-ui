export const formatPhoneNumber = (phone, countryCode = 'us') => {
  const cleaned = phone.replace(/\D/g, '');
  
  switch (countryCode) {
    case 'uk':
      if (cleaned.length === 11) {
        return `+44 ${cleaned.slice(1, 5)} ${cleaned.slice(5, 8)} ${cleaned.slice(8)}`;
      }
      break;
    case 'us':
      if (cleaned.length === 10) {
        return `+1 (${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`;
      }
      break;
    case 'es':
      if (cleaned.length === 9) {
        return `+34 ${cleaned.slice(0, 3)} ${cleaned.slice(3, 5)} ${cleaned.slice(5, 7)} ${cleaned.slice(7)}`;
      }
      break;
  }
  
  return phone;
};