import React from 'react';

import {
  screenshotWrapper as screenshotWrapperStyles,
} from './styles.module.css';

const IPhoneScreen = ({ children }) => {
  return (
    <div className={screenshotWrapperStyles}>
      {children}
    </div>
  )
}

export default IPhoneScreen;