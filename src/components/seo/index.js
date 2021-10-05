import React from 'react';
import { useStaticQuery, graphql } from 'gatsby'
import { Helmet } from 'react-helmet'

const SEO = (props) => {
  
  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
          description
          siteUrl
        }
      }
    }
  `)

  const defaults = data.site.siteMetadata

  const title = props.title || defaults.title
  const description = props.description || defaults.description
  const url = new URL(props.path || '/', defaults.siteUrl)
  const image = new URL(props.image || defaults.image, defaults.siteUrl)

  return (
    <Helmet>
      {/* Accessibility */}
      <html lang='en'/>
      
      {/* SEO */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      {image && <meta name="image" content={image} /> }
      
      {/* Open Graph (Facebook, LinkedIn, etc.) */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      {image && <meta property="og:image" content={image} />}

      {/* Twitter */}
      <meta name="twitter:card" content="summmary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      {image && <meta name="twitter:image" content={image} />}
    </Helmet>
  )
}

export default SEO