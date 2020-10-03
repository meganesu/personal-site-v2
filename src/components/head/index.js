import React from 'react';
import { Helmet } from 'react-helmet'

const Head = ({pageTitle}) => {
  
  return (
    <Helmet
      title={pageTitle}
    >
      <html lang="en" />
    </Helmet>
  )
}

export default Head