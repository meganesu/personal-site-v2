import React from "react"
import Head from "../head"
import SkipLink from "../skip-link"
import Header from "../header"
import Footer from "../footer"
import "typeface-dancing-script"
import "typeface-ribeye-marrow"
import "typeface-ubuntu"
import "./global-styles.css"
import styles from "./styles.module.css"

const Layout = ({ children, pageTitle }) => (
  <div className={styles.container}>
    <Head title={pageTitle} />
    <SkipLink link="#main-content">Skip to main content</SkipLink>
    <Header />
    <div className={styles.mainWrapper}>
      <main className={styles.main} id="main-content" tabIndex={-1}>
        {children}
      </main>
      <Footer />
    </div>
  </div>
)

export default Layout
