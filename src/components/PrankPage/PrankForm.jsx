import React, { useEffect, useState } from "react";
import TextBox from "./uiForm/TextBox";
import InfoBox from "./uiForm/InfoBox";
import DrowdownVoices from "./uiForm/DropdownVoices";
import SubmitCallButton from "./uiForm/SubmitCallButton";
import Credits from "./uiForm/Credits";
import AuthWrapper from "../loginForm/AuthWrapper";
import LogOutbutton from "./uiForm/LogOutButton";
import Welcome from "./uiPage/Welcome";
// supabase connect
import { supabase } from "../lib/supabase/client";



const formContainerStyle = {
  maxWidth: "100%",
  height: "auto",
  marginTop: "140px",
  padding: "20px",
  borderRadius: "17px",
  border: "solid 2px black"
}

const formStyle = {
  maxWidth: "fit-content",
  display: "flex",
  flexDirection: "column",
  gap: "20px",
  margin: "0 auto",
}

const formElements = {
  display: "block",
  color: "black",
  fontFamily: "Helvetica",
  fontWeight: "bold"
}




function PrankForm() {

  // This is the logic for the pop up Login, we set false by default.
  // handleClick will be used for the onClick inside the <form /> tag
  // to set the value to true once clicked. Then this will trigger the if statement
  // inside the <LoginForm /> and will return it on the skeleton.
  const [showLogin, setShowLogin] = useState(false);

  const handleClick = (e) => {
    // if (isUserAuthenticated) {
      setShowLogin(true);
    // }    This if statement is implemented inline in the component.
  };


  // ---------------------------------------------
  // AUTHENTICATION LOGIC (supabase docs reference link here: https://supabase.com/docs/guides/auth/passwords?queryGroups=flow&flow=implicit)
  // POSSIBLE CHANGE: Maybe transfer the auth logic to the backend and fetch the isisUserAuthenticated from express instead
  const [formColor, setFormColor] = useState('bg-grey-200');
  const [showLogOutButton, setShowLogOutButton] = useState(false)
  const [isUserAuthenticated, setIsUserAuthenticated] = useState(null)

  useEffect(() => {
    async function signInWithEmail() {
      const { data, error } = await supabase.auth.getSession();
      if (data.session) {
        const userEmail = data.session.user.email;
        console.log(userEmail)
        setFormColor("bg-green-100");
        setShowLogOutButton(true);
        setIsUserAuthenticated(true);
        console.log(data, `IS THIS USER AUTHENTICATED?: ${isUserAuthenticated}`);
      } else {
        setFormColor("bg-red-100");
        setIsUserAuthenticated(false)
        console.log(`IS THIS USER AUTHENTICATED?: ${isUserAuthenticated}`);
      }
    }
    signInWithEmail();    
  }, [])




  // ---------------------------------------------
  // START OF THE FORM LOGIC
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const [prompt, setPrompt] = useState('');
  const [voice, setVoice] = useState('v1');

  // Set initial credit count at null at first page render, because useState is always loaded before useEffect.
  const [credits, setCredits] = useState();

  // We now create an async function inside useEffect (because useEffect cant have async directly)
  // Inside we fetch the credit count from the DB and update the useState credits variable with the current count.
  // This is done at first load and for every update the page has. Then we call the function to apply everything.
  useEffect(() => {
    async function fetchCreditCount() {
      const { data, error } = await supabase
      .from('users')
      .select()
      setCredits(data[0].credits)
    }
    fetchCreditCount();
  }, [])





  // ------------------------------------------
  // update the welcome text and the credits content for the Credits.jsx 
  const [creditsInfo, setCreditsInfo] = useState("Get 3 free credits when you login for the first time");
  const [welcomeText, setWelcomeText] = useState()
  useEffect(() =>{
    if (isUserAuthenticated) {
      setCreditsInfo(`You have: ${credits} credits left`);
      setWelcomeText(`Welcome back Nasser`);
    } else {
      setWelcomeText(`Log in or create an account`);
    }       
  }, )





  // ------------------------------------------
  // SUBMIT CALL TO THE SERVER
  const handleSubmit = (e) => {
    e.preventDefault();
    const callDetails = {name, number, prompt, voice};

    fetch("http://localhost:3000/pranks", {
      method: 'POST',
      headers: { "Content-Type": "application/json"},
      body: JSON.stringify(callDetails)
    })
    .then(res => res.json()) // parse json from backend
    .then(data => {
      if (data.success) {
        setCredits(data.credits); // update credits from backend
        alert("✅ Prank submitted!");
        console.log("Call details submitted");
      } else {
        alert("Something went wrong");
      }
    })
    .catch(err => {
      console.error("Fetch error:", err);
      alert("⚠️ Server error");
    });
  }
    
  return(
  <div className="flex justify-center items-center">

    <Welcome content={welcomeText} />

    {/* <AuthWrapper className={`absolute w-[300px] ${showLogin ? "visible" : "collapse"}`}/> */}
    {showLogin && <AuthWrapper className={"absolute w-[300px]"}/>}

    <div className="form-container" style={formContainerStyle}>

      <form className={`${formColor}`} onClick={isUserAuthenticated ? undefined : handleClick} style={formStyle} onSubmit={handleSubmit}>

        <InfoBox style={formElements} value={name} id={"name"} name={"name"} placeholder={"Kevin"} content={"Enter a name:"} setValue={setName}/>

        <InfoBox style={formElements} value={number} id={"phoneNumber"} name={"phoneNumber"} placeholder={"44 7940 645232"} content={"Enter a phone number:"} setValue={setNumber}/>

        <TextBox style={formElements} value={prompt} setValue={setPrompt}/>

        <DrowdownVoices style={formElements} value={voice} setValue={setVoice} />

        <SubmitCallButton onClick={() => setCredits(credits)}/>

        <Credits content={creditsInfo} credits={credits}/>

      </form>

      {showLogOutButton && <LogOutbutton setIsUserAuthenticated={setIsUserAuthenticated} isUserAuthenticated={isUserAuthenticated} />}

    </div>

  </div>
  )
};

export default PrankForm;
