import React from "react"

import styles from "./styles.module.css"

import GitHubLogo from "../../../../images/GitHub-Mark-64px.png"
import LinkedInLogo from "../../../../images/LI-In-Bug.png"
import TwitterLogo from "../../../../images/Twitter_Social_Icon_Rounded_Square_Color.png"

const SocialLinks = () => (
  <ul className={styles.socialLinks}>
    <li>
      <a href="https://github.com/meganesu">
        <img alt="GitHub" src={GitHubLogo} />
      </a>
    </li>
    <li>
      <a href="https://twitter.com/meganesulli">
        <img alt="Twitter" src={TwitterLogo} />
      </a>
    </li>
    <li>
      <a href="https://linkedin.com/in/meganesu">
        <img alt="LinkedIn" src={LinkedInLogo} />
      </a>
    </li>
  </ul>
)

export default SocialLinks
