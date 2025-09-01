import React from 'react';
import { COUNTRIES } from '../../../constants';

export const Input = ({
  type = 'text',
  value,
  onChange,
  placeholder,
  label,
  className = '',
  required = false,
  showCountryPrefix = false,
  selectedCountry = 'us',
  onCountryChange,
}) => {
  const getPhonePlaceholder = () => {
    switch (selectedCountry) {
      case 'uk':
        return '7700 900123';
      case 'us':
        return '(555) 123-4567';
      case 'es':
        return '612 34 56 78';
      default:
        return '7700 900123';
    }
  };

  const handleChange = (e) => {
    let inputValue = e.target.value;
    
    if (type === 'tel') {
      inputValue = inputValue.replace(/[^0-9\s\-\(\)\+]/g, '');
    }
    
    onChange(inputValue);
  };

  return (
    <div className={className}>
      {label && (
        <label className="block text-sm font-semibold text-gray-700 mb-3">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      {showCountryPrefix ? (
        <div className="flex">
          <select
            value={selectedCountry}
            onChange={(e) => onCountryChange(e.target.value)}
            className="px-2 md:px-3 py-4 rounded-l-2xl border-2 border-r-0 border-gray-200 focus:border-purple-500 focus:outline-none transition-colors duration-300 text-lg bg-white min-w-[80px] md:min-w-[100px] flex-shrink-0 h-[56px]"
          >
            {COUNTRIES.map((country) => (
              <option key={country.code} value={country.code}>
                {country.flag} {country.prefix}
              </option>
            ))}
          </select>
          <input
            type={type}
            value={value}
            onChange={handleChange}
            placeholder={showCountryPrefix ? getPhonePlaceholder() : placeholder}
            className="flex-1 px-3 md:px-4 py-4 rounded-r-2xl border-2 border-l-0 border-gray-200 focus:border-purple-500 focus:outline-none transition-colors duration-300 text-lg min-w-0 h-[56px]"
            required={required}
          />
        </div>
      ) : (
        <input
          type={type}
          value={value}
          onChange={handleChange}
          placeholder={placeholder}
          className="w-full px-4 py-4 rounded-2xl border-2 border-gray-200 focus:border-purple-500 focus:outline-none transition-colors duration-300 text-lg h-[56px]"
          required={required}
        />
      )}
    </div>
  );
};