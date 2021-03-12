import React from "react"
import { Link } from "gatsby"
import NavBar from "./components/nav-bar/"
import SocialLinks from "./components/social-links/"
import {
  header as headerStyles,
  profilePicture as profilePictureStyles,
  title as titleStyles,
} from "./styles.module.css"
import * as profilePicture from "../../images/meganesulli.jpg"

const Header = () => (
  <header className={headerStyles}>
    <img src={profilePicture} alt="" className={profilePictureStyles} />
    <p className={titleStyles}>
      <Link to="/">Megan Sullivan</Link>
    </p>
    <NavBar />
    <SocialLinks />
  </header>
)

export default Header
