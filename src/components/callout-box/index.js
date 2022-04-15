import React from 'react'
import { container as containerStyles } from './styles.module.css'

const CalloutBox = ({ children }) => {
  return (
    <aside className={containerStyles}>
      {children}
    </aside>
  )
}

export default CalloutBox