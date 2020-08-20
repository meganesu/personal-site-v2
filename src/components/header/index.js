import React from "react"
import { Link } from "gatsby"
import NavBar from "./components/nav-bar/"
import SocialLinks from "./components/social-links/"
import styles from "./styles.module.css"
import * as profilePicture from "../../images/meganesulli.jpg"

const Header = () => (
  <header className={styles.header}>
    <img
      src={profilePicture}
      alt=""
      className={styles.profilePicture}
    />
    <p className={styles.title}>
      <Link to="/">
        Megan Sullivan
      </Link>
    </p>
    <NavBar />
    <SocialLinks />
  </header>
)

export default Header
