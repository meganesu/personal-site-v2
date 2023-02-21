import React from 'react'
import {
  container as containerStyles,
  blue as blueStyles,
  orange as orangeStyles,
} from './styles.module.css'

const CalloutBox = ({ children, color = "blue" }) => {
  let colorClassName;
  switch (color) {
    case "blue":
      colorClassName = blueStyles
      break
    case "orange":
      colorClassName = orangeStyles
      break
    default:
      colorClassName = blueStyles
  }

  return (
    <aside className={`${containerStyles} ${colorClassName}`}>
      {children}
    </aside>
  )
}

export default CalloutBox