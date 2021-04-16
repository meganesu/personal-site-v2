import React, { useState } from "react"
import {
  chip as chipStyles,
  selected as selectedStyles,
  blue as blueStyles,
  orange as orangeStyles,
} from "./styles.module.css"

const ToggleChip = ({ text, color }) => {
  const [isSelected, setIsSelected] = useState(false)

  let colorStyles
  if (color === 'blue') {
    colorStyles = blueStyles
  }
  else if (color === 'orange') {
    colorStyles = orangeStyles
  }

  return (
    <button
      className={`${chipStyles} ${colorStyles} ${isSelected ? selectedStyles : ""}`}
      onClick={() => {
        setIsSelected(!isSelected)
      }}
      data-text={text}
    >
      {text}
    </button>
  )
}

export default ToggleChip
