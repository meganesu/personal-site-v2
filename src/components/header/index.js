import React from "react"
import { Link } from "gatsby"
import NavBar from "./components/nav-bar/"
import SocialLinks from "./components/social-links/"
import styles from "./styles.module.css"

const Header = () => (
  <header className={styles.header}>
    <h1 className={styles.title}>
      <Link to="/">
        Megan Sullivan
      </Link>
    </h1>
    <NavBar />
    <SocialLinks />
  </header>
)

export default Header
