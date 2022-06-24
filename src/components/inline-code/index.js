import React from "react"
import { inlineCode as inlineCodeStyles } from "./styles.module.css"

const InlineCode = ({ children }) => {
  return <code className={inlineCodeStyles}>{children}</code>
}

export default InlineCode
