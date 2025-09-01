import React from 'react';

export const Button = ({
  children,
  onClick,
  variant = 'primary',
  size = 'md',
  className = '',
  icon: Icon,
  iconPosition = 'left',
  disabled = false,
}) => {
  const baseClasses = 'inline-flex items-center justify-center font-semibold rounded-2xl transition-all duration-300 transform hover:scale-105';
  
  const variantClasses = {
    primary: 'bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400 text-white shadow-lg hover:shadow-lg',
    secondary: 'bg-white/20 backdrop-blur-sm text-white border border-white/30 hover:bg-white/30',
    ghost: 'bg-gray-100 hover:bg-gray-200 text-gray-600',
  };
  
  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-12 py-4 text-xl',
  };
  
  const classes = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`;
  
  return (
    <button
      onClick={onClick}
      className={classes}
      disabled={disabled}
    >
      {Icon && iconPosition === 'left' && <Icon className={`w-5 h-5 mr-2 ${disabled ? 'opacity-70' : ''}`} />}
      {children}
      {Icon && iconPosition === 'right' && <Icon className={`w-5 h-5 ml-2 ${disabled ? 'opacity-70' : ''}`} />}
    </button>
  );
};