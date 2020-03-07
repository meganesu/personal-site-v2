import React from "react"
import { Link } from "gatsby"

import styles from "./styles.module.css"

const NavBar = () => (
  <nav>
    <ul className={styles.navBar}>
      <li>
        <Link to="/" activeClassName={styles.active}>
          Home
        </Link>
      </li>
      <li>
        <Link to="/blog" activeClassName={styles.active}>
          Blog
        </Link>
      </li>
    </ul>
  </nav>
)

export default NavBar
