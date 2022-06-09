import React from "react"
import { Link } from "gatsby"
import KoFiButton from "../ko-fi-button"

import {
  footer as footerStyles,
  footerLinks as footerLinksStyles,
} from "./styles.module.css"

const Footer = () => (
  <footer className={footerStyles}>
    <p>{`Made by Megan Sullivan © 2019 - ${new Date().getFullYear()}`}</p>
    <ul className={footerLinksStyles}>
      <li>
        <Link to="/accessibility">Accessibility</Link>
      </li>
      <li>
        <Link to="/privacy">Privacy Policy</Link>
      </li>
      <li>
        <Link to="/rss.xml">RSS</Link>
      </li>
      <li>
        <KoFiButton/>
      </li>
    </ul>
  </footer>
)

export default Footer
