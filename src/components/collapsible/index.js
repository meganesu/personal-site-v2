import React from 'react'

const Collapsible = ({ summary, children }) => (
  <details>
    <summary>
      {summary}
    </summary>
    {children}
  </details>
)

export default Collapsible