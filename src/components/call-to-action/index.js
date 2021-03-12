import React from 'react'
import { container as containerStyles } from './styles.module.css'

const CallToActionBox = ({children}) => (
  <div className={containerStyles}>
    {children}
  </div>
)

export default CallToActionBox