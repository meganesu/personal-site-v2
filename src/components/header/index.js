import React from "react"
import { Link } from "gatsby"
import NavBar from "./components/nav-bar/"
import SocialLinks from "./components/social-links/"
import {
  header as headerStyles,
  profilePicture as profilePictureStyles,
  title as titleStyles,
} from "./styles.module.css"
import { StaticImage } from "gatsby-plugin-image"

const Header = () => (
  <header className={headerStyles}>
    <StaticImage src="../../images/meganesulli.jpg" alt="" className={profilePictureStyles} imgStyle={{ borderRadius: "50%" }} />
    <p className={titleStyles}>
      <Link to="/">Megan Sullivan</Link>
    </p>
    <NavBar />
    <SocialLinks />
  </header>
)

export default Header
