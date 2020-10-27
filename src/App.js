import React, { useState } from 'react';
import './App.css';
import BtnContainer from "./components/BtnContainer";

function App () {
  const [finished, setFinished] = useState(false)
  const [steps, setSteps] = useState(0)
  function handlePlayAgain () {
    setFinished(false)
  }

  function handleSetFinished () {
    setFinished(true)
  }
  return (
    <div className="App">
      {finished ? (
        <>
          <div style={{display:"block", textAlign:"center"}}>
            <h1 className="you-won">You Won !</h1>
            <h2>Total Steps: {steps}</h2>
            <button onClick={handlePlayAgain}>Play Again</button>
          </div>
        </>
      ) : (
        <BtnContainer setFinished={handleSetFinished} setSteps={setSteps} steps={steps}/>
      )}
  </div>
  )
}
export default App;