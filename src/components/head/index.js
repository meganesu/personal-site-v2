import React from 'react';
import { Helmet } from 'react-helmet'

const Head = ({title}) => {
  
  return (
    <Helmet
      title={title}
    >
      <html lang="en" />
    </Helmet>
  )
}

export default Head