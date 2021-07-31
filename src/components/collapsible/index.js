import React from 'react'
import {
  details as detailsStyles,
  summary as summaryStyles,
} from './styles.module.css'

const Collapsible = ({ summary, children }) => (
  <details className={detailsStyles}>
    <summary className={summaryStyles}>
      {summary}
    </summary>
    {children}
  </details>
)

export default Collapsible