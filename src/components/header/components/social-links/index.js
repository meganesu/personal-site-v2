import React from "react"

import { OutboundLink } from "gatsby-plugin-google-analytics"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faGithub } from "@fortawesome/free-brands-svg-icons"
import { faTwitter } from "@fortawesome/free-brands-svg-icons"
import { faLinkedin } from "@fortawesome/free-brands-svg-icons"

import styles from "./styles.module.css"

const SocialLinks = () => (
  <ul className={styles.socialLinks}>
    <li>
      <OutboundLink href="https://github.com/meganesu" aria-label="GitHub">
        <FontAwesomeIcon icon={faGithub} size="2x" color="white" />
      </OutboundLink>
    </li>
    <li>
      <OutboundLink href="https://twitter.com/meganesulli" aria-label="Twitter">
        <FontAwesomeIcon icon={faTwitter} size="2x" color="white" />
      </OutboundLink>
    </li>
    <li>
      <OutboundLink href="https://linkedin.com/in/meganesu" aria-label="LinkedIn">
        <FontAwesomeIcon icon={faLinkedin} size="2x" color="white" />
      </OutboundLink>
    </li>
  </ul>
)

export default SocialLinks
