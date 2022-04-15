import React from "react"
import SEO from "../seo"
import Header from "../header"
import Footer from "../footer"
import "typeface-dancing-script"
import "typeface-ribeye-marrow"
import "typeface-quicksand"
import "./global-styles.css"
import {
  container as containerStyles,
  mainWrapper as mainWrapperStyles,
  main as mainStyles,
} from "./styles.module.css"

const Layout = (props) => {
  const {
    children,
    pageContext,
    location,
  } = props

  const title = pageContext?.frontmatter?.title || props.title
  const description = pageContext?.frontmatter?.description || props.description
  const image = pageContext?.frontmatter?.image || props.image || false

  return (
    <div className={containerStyles}>
      <SEO
        title={title}
        description={description}
        image={image}
        path={location.pathname}
      />
      <Header />
      <div className={mainWrapperStyles}>
        <main className={mainStyles} id="main-content">
          {children}
        </main>
        <Footer />
      </div>
    </div>
  )
}

export default Layout
