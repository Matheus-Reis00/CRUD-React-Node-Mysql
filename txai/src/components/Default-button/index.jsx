import React from 'react';
import './styles.css'

export default function DefaultButton({actionButton, contentButton, buttonColor, alignContent}) {
  return (
      <div className='container-button' style={{justifyContent: alignContent}}>
          <button style={{backgroundColor: buttonColor}}onClick={() => actionButton()}>{contentButton}</button>
      </div>
  )
}
