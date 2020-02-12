import React from "react"
import styles from "./styles.module.css"

const SkipLink = props => (
  <a className={styles.container} href={props.link}>
    {props.children}
  </a>
)

export default SkipLink
