import React from 'react'

function SubmitCallButton({onClick}) {
  return (
    <div>
      <button type='submit' id='submitCall' onClick={onClick}>Make the call</button>
    </div>
  )
}

export default SubmitCallButton