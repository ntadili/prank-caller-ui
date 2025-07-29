import React from "react";
import "../styles/FormElements.css";
// do rfce next time

function TextBox({ style, value, setValue }) {
  return(
    // I have to pass this prop style={style} to be able to add the styling in the PrankForm.jsx page 
    <div> 
      <label htmlFor="textPrompt" style={style}>Set up the context</label>
      <textarea value={value} onChange={(e) => setValue(e.target.value)} name="textPrompt" style={style} id="textPrompt" placeholder="e.g. My friend just came back from a trip — call as an Airbnb host accusing him of damaging the apartment"></textarea>
    </div>
  )
};

export default TextBox;