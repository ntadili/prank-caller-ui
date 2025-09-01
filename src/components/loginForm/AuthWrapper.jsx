import React, { useState } from 'react'
import { LoginForm } from './login-form';
import { SignUpForm } from './sign-up-form';
import { UpdatePasswordForm } from './update-password-form';
import { ForgotPasswordForm } from './forgot-password-form';

function AuthWrapper({ className, onClose }) {
  const [authStep, setAuthStep] = useState("login");

  // with this, each link clicked will change the setAuthStep variable which will display a different form
  // then this whole component is sent to the prankForm page when the form is clicked.
  return (
    <div className={`${className} fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center p-4 z-50 animate-modal-fade-in`}>
      <div className="w-full max-w-md mx-auto animate-modal-scale-in">
        {/* ADDED: Close button for modal */}
        <div className="flex justify-end mb-2">
          <button
            onClick={onClose}
            className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition-all duration-300 text-white backdrop-blur-sm border border-white/30"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      {authStep === "login" && <LoginForm setAuthStep={setAuthStep} />}
      {authStep === "signUp" && <SignUpForm setAuthStep={setAuthStep} />} 
      {authStep === "forgotPassword" && <ForgotPasswordForm setAuthStep={setAuthStep} />}
      {authStep === "updatePassword" && <UpdatePasswordForm setAuthStep={setAuthStep} />}
      </div>
    </div>
  )
}

export default AuthWrapper