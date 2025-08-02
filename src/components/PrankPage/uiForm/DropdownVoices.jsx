import React from "react";
import "../styles/FormElements.css"

function DrowdownVoices({ style, value, setValue }) {
  return(
    <div>
      <label htmlFor="voiceId" style={style}>Choose a voice:</label>
      <select value={value} onChange={(e) => setValue(e.target.value)} name="voiceId" style={style} id="voiceId">
        <option value="">Mark</option>
        <option value="">Jenny</option>
        <option value="">Fred</option>
      </select>
    </div>
  )
};

export default DrowdownVoices;