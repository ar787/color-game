import React from 'react';

function Btn (props) {
  return (
    <div className={`btn ${props.className}`} style={{...props.style, backgroundColor: props.color}}/>
  )
}
export default Btn;