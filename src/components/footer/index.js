import React from "react"
import { Link } from "gatsby"

import styles from "./styles.module.css"

const Footer = () => (
  <footer className={styles.footer}>
    <p>{`Made by Megan Sullivan © 2019 - ${new Date().getFullYear()}`}</p>
    <p>
      <Link to="/privacy">Privacy Policy</Link>
    </p>
  </footer>
)

export default Footer
