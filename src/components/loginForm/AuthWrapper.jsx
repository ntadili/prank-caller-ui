import React, { useState } from 'react'
import { LoginForm } from './login-form';
import { SignUpForm } from './sign-up-form';
import { UpdatePasswordForm } from './update-password-form';
import { ForgotPasswordForm } from './forgot-password-form';

function AuthWrapper({ className }) {
  const [authStep, setAuthStep] = useState("login");

  // with this, each link clicked will change the setAuthStep variable which will display a different form
  // then this whole component is sent to the prankForm page when the form is clicked.
  return (
    <div className={className}>
      {authStep === "login" && <LoginForm setAuthStep={setAuthStep} />}
      {authStep === "signUp" && <SignUpForm setAuthStep={setAuthStep} />} 
      {authStep === "forgotPassword" && <ForgotPasswordForm setAuthStep={setAuthStep} />}
      {authStep === "updatePassword" && <UpdatePasswordForm setAuthStep={setAuthStep} />}
    </div>
  )
}

export default AuthWrapper