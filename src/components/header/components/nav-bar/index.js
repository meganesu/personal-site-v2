import React from "react"
import { Link } from "gatsby"

import {
  navBar as navBarStyles,
  active as activeLinkStyles,
} from "./styles.module.css"

const NavBar = () => (
  <nav>
    <ul className={navBarStyles}>
      <li>
        <Link to="/" activeClassName={activeLinkStyles}>
          Home
        </Link>
      </li>
      <li>
        <Link to="/blog" activeClassName={activeLinkStyles}>
          Blog
        </Link>
      </li>
    </ul>
  </nav>
)

export default NavBar
