import React from 'react';

import {
  screenshotWrapper as screenshotWrapperStyles,
  screenshotMenubar as screenshotMenubarStyles,
  circle as circleStyles,
  red as redStyles,
  orange as orangeStyles,
  green as greenStyles,
  screenshotNavbar as screenshotNavbarStyles,
} from './styles.module.css';

const BrowserWindow = ({ children, url }) => {
  return (
    <div className={screenshotWrapperStyles}>
      <div className={screenshotMenubarStyles}>
        <div className={`${circleStyles} ${redStyles}`}></div>
        <div className={`${circleStyles} ${orangeStyles}`}></div>
        <div className={`${circleStyles} ${greenStyles}`}></div>
        {url != undefined && <div className={screenshotNavbarStyles}>{url}</div>}
      </div>
      {children}
    </div>
  )
}

export default BrowserWindow;