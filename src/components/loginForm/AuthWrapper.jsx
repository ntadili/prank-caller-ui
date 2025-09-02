import React, { useState } from 'react'
import { LoginForm } from './login-form';
import { SignUpForm } from './sign-up-form';
import { UpdatePasswordForm } from './update-password-form';
import { ForgotPasswordForm } from './forgot-password-form';

function AuthWrapper({ className, onClose }) {
  const [authStep, setAuthStep] = useState("login");
  
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose?.();
    }
  };

  // with this, each link clicked will change the setAuthStep variable which will display a different form
  // then this whole component is sent to the prankForm page when the form is clicked.
  return (
    <div className={`${className} fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center p-4 z-50 animate-modal-fade-in`} onClick={handleBackdropClick}>
      <div className="w-full max-w-md mx-auto transform animate-modal-scale-in">
        {authStep === "login" && <LoginForm setAuthStep={setAuthStep} onClose={onClose} />}
        {authStep === "signUp" && <SignUpForm setAuthStep={setAuthStep} onClose={onClose} />} 
        {authStep === "forgotPassword" && <ForgotPasswordForm setAuthStep={setAuthStep} onClose={onClose} />}
        {authStep === "updatePassword" && <UpdatePasswordForm setAuthStep={setAuthStep} onClose={onClose} />}
      </div>
    </div>
  )
}

export default AuthWrapper