import React from 'react';

export const TextArea = ({
  value,
  onChange,
  placeholder,
  label,
  rows = 4,
  className = '',
  required = false,
}) => {
  return (
    <div className={className}>
      {label && (
        <label className="block text-sm font-semibold text-gray-700 mb-3">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={rows}
        className="w-full px-4 py-4 rounded-2xl border-2 border-gray-200 focus:border-purple-500 focus:outline-none transition-colors duration-300 text-lg resize-none"
        required={required}
      />
    </div>
  );
};