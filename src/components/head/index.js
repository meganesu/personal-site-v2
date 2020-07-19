import React from 'react';
import { Helmet } from 'react-helmet'

const Head = ({title}) => {
  
  return (
    <Helmet
      title={title || "Megan Sullivan"}
    >
      <html lang="en" />
    </Helmet>
  )
}

export default Head