import React from "react"
import { container as containerStyles } from "./styles.module.css"

const SkipLink = props => (
  <a className={containerStyles} href={props.link}>
    {props.children}
  </a>
)

export default SkipLink
