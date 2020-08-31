import React from "react"
import { Link } from "gatsby"

import styles from "./styles.module.css"

const Footer = () => (
  <footer className={styles.footer}>
    <p>{`Made by Megan Sullivan © 2019 - ${new Date().getFullYear()}`}</p>
    <ul className={styles.footerLinks}>
      <li>
        <Link to="/accessibility">Accessibility</Link>
      </li>
      <li>
        <Link to="/privacy">Privacy Policy</Link>
      </li>
    </ul>
  </footer>
)

export default Footer
