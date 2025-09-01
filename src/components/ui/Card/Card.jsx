import React from 'react';

export const Card = ({
  children,
  className = '',
  variant = 'default',
  padding = 'md',
}) => {
  const baseClasses = 'rounded-3xl shadow-2xl transition-all duration-300';
  
  const variantClasses = {
    default: 'bg-white/95 backdrop-blur-sm border border-white/50',
    glass: 'bg-white/20 backdrop-blur-sm border border-white/30 hover:bg-white/30',
    feature: 'bg-white/20 backdrop-blur-sm border border-white/30 hover:bg-white/30 group',
  };
  
  const paddingClasses = {
    sm: 'p-4',
    md: 'p-8',
    lg: 'p-6 md:p-8 lg:p-12',
  };
  
  const classes = `${baseClasses} ${variantClasses[variant]} ${paddingClasses[padding]} ${className}`;
  
  return (
    <form className={classes}> 
      {children}
    </form>
  );
};