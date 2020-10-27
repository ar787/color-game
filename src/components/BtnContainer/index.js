import React, { useEffect, useRef, useState } from 'react';
import Btn from "../Btn";
import {copyArray, generateRenderData} from "../../helpers";

function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current === undefined ? value : ref.current;
}

async function getData() {
  const response = await fetch('data.json');
  const data = await response.json();
  return data
}

function BtnContainer (props) {
  const [colors, setColors] = useState([])
  const [MAX_COUNT, setMAX_COUNT] =useState(0)  
  const [selectedColor, setSelectedColor] = useState("")
  const [active, setActive] = useState(false)
  const [selectedElement, setSelectedElement] = useState(null)
  const [selectedIndex, setSelectedIndex] = useState(0)
  const prev = usePrevious(selectedColor)
  useEffect(() => {
    getData().then(data => {
      setColors(data.colors)
      setMAX_COUNT(data.maxCount)
    })
  }, [])
  
  useEffect(() => {   
    if (prev !== selectedColor) {
        let status = true

        colors.forEach((colors) => {
        if (colors.length) {
          
          if (colors.length === MAX_COUNT) {
            const uniqueObj = new Set();
            colors.forEach((color) => uniqueObj.add(color));
            if (uniqueObj.size !== 1) status = false;
            
            return;
          }

          status = false;
        }
      })

      if (status) {
        props.setFinished();
      }
   
    }
  }, [selectedColor])
  
  function handleClick (index) {
    const colorsCopy = copyArray(colors);
    const clickedColorsArray = colorsCopy[index];
    const clickedColor = clickedColorsArray[clickedColorsArray.length - 1];


    if (!selectedColor) {
      let el = clickedColorsArray.pop();
      setColors(colorsCopy);
      setSelectedColor(clickedColor);
      setActive(true)
      setSelectedElement(el)
      setSelectedIndex(index)
      return;
    }

    if (clickedColorsArray.length < MAX_COUNT && (!clickedColor || selectedColor === clickedColor)) {
      clickedColorsArray.push(selectedColor);
      setSelectedColor("");
      setColors(colorsCopy);
      setActive(false)
      props.setSteps(props.steps + 1) 
    }
  }

  function reset() {
    const colorsCopy = copyArray(colors);
    colorsCopy[selectedIndex].push(selectedElement)
    setColors(colorsCopy)
    setSelectedColor("")
    setActive(false)
  }

  const colorsGenerate = generateRenderData(colors, MAX_COUNT);
  return(
    <>
      <Btn color={selectedColor} className="btn-selected"/>
        {active ? <button onClick={reset}>reset</button> : null } 
      <div className="game-container">
        {colorsGenerate.map((colors, i) => (
          <div key={i} className="btn-container" onClick={() => handleClick(i)}>
            {colors.map((color, j) => (
              <Btn key={j} color={color}/>
            ))}
          </div>
        ))}
      </div>
    </>
  )
}

export default BtnContainer;