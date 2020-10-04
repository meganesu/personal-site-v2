import React from 'react'
import * as styles from './styles.module.css'

const CallToActionBox = ({children}) => (
  <div className={styles.container}>
    {children}
  </div>
)

export default CallToActionBox