import React from 'react'
import { skipLink as skipLinkStyles } from './styles.module.css'

const RouteTargetHeading = ({
  level = 1,
  targetId,
  className = '',
  children
}) => {
  const Heading = `h${level}`
  return (
    <Heading
      className={className}
    >
      <a
        id="skip-link"
        className={skipLinkStyles}
        href={`#${targetId}`}
        aria-label={`Skip to ${targetId}`}
      />
      {children}
    </Heading>
  )
}

export default RouteTargetHeading