import React, { useState } from "react"
import {
  chip as chipStyles,
  selected as selectedStyles,
  blue as blueStyles,
  orange as orangeStyles,
} from "./styles.module.css"

const ToggleChip = ({ text, color, onAdd, onRemove }) => {
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
      type="button"
      className={`${chipStyles} ${colorStyles} ${isSelected ? selectedStyles : ""}`}
      onClick={() => {
        if (isSelected) {
          onRemove(text)
        } else {
          onAdd(text)
        }
        setIsSelected(!isSelected)
      }}
      data-text={text}
      aria-pressed={isSelected.toString()}
    >
      {text}
    </button>
  )
}

export default ToggleChip
