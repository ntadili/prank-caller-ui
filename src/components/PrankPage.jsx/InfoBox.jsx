import React from "react";
import "./styles/FormElements.css"

function InfoBox({ style, value, id, name, placeholder, content, setValue }) {
  return (
    <div>
      <label htmlFor="phoneNumber" style={style}>{content}</label>
      <input value={value} onChange={(e) => setValue(e.target.value)} type="tel" style={style} name={name} id={id} placeholder={placeholder}/>
    </div>
  )
}

export default InfoBox;