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
          image
          favicon
        }
      }
    }
  `)

  const defaults = data.site.siteMetadata

  const title = props.title || defaults.title
  const description = props.description || defaults.description
  const url = new URL(props.path, defaults.siteUrl)

  /*
    Normally, you could just use defaults.siteUrl for the domain,
    but this way you'll be able to test that the social images
    are working when running the site on localhost (8000 or 9000)
  */
  // If client-side rendering, use the domain from the window
  // If server-side rendering (and window doesn't exist), use the default
  const isBrowser = typeof window !== "undefined"
  const domain = isBrowser ? window.location.origin : defaults.siteUrl
  const image = new URL(props.image || defaults.image, domain)
  const favicon = new URL(defaults.favicon, domain)

  return (
    <Helmet>
      {/* Accessibility */}
      <html lang='en'/>

      {/* Favicon */}
      <link rel="shortcut icon" type="image/jpg" href={favicon.href} />
      
      {/* SEO */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      <meta name="image" content={image} />
      
      {/* Open Graph (Facebook, LinkedIn, etc.) */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={image} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
    </Helmet>
  )
}

export default SEO