import React, { useEffect, useState } from "react";
import TextBox from "./ui/TextBox";
import InfoBox from "./ui/InfoBox";
import DrowdownVoices from "./ui/DropdownVoices";
import SubmitCallButton from "./ui/SubmitCallButton";
import Credits from "./ui/Credits";
import { LoginForm } from "../loginForm/login-form";
import AuthWrapper from "../loginForm/AuthWrapper";

// supabase connect
import { createClient } from '@supabase/supabase-js';
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);



const formContainerStyle = {
  maxWidth: "100%",
  height: "77vh",
  paddingTop: "200px",

  marginLeft: "400px",
  borderRadius: "17px"
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
  // inside the <LoginForm /> and will update its Tailwind class to visible.
  const [showLogin, setShowLogin] = useState(false);
  const handleClick = (e) => {
    setShowLogin(true);
  };

  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const [prompt, setPrompt] = useState('');
  const [voice, setVoice] = useState('v1');

  // Set initial credit count at null at first page render, because useState is always loaded before useEffect.
  const [credits, setCredits] = useState(null);

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

    {/* <AuthWrapper className={`absolute w-[300px] ${showLogin ? "visible" : "collapse"}`}/> */}
    {showLogin && <AuthWrapper className={"absolute w-[300px]"}/>}

    <div className="form-container" style={formContainerStyle}>

      <form onClick={handleClick} style={formStyle} onSubmit={handleSubmit}>

        <InfoBox style={formElements} value={name} id={"name"} name={"name"} placeholder={"Kevin"} content={"Enter a name:"} setValue={setName}/>

        <InfoBox style={formElements} value={number} id={"phoneNumber"} name={"phoneNumber"} placeholder={"44 7940 645232"} content={"Enter a phone number:"} setValue={setNumber}/>

        <TextBox style={formElements} value={prompt} setValue={setPrompt}/>

        <DrowdownVoices style={formElements} value={voice} setValue={setVoice} />

        <SubmitCallButton onClick={() => setCredits(credits)}/>

        <Credits credits={credits}/>

      </form>

    </div>


  </div>
  )
};

export default PrankForm;
