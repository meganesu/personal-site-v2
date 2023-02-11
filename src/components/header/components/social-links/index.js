import React from "react"

import { OutboundLink } from "gatsby-plugin-google-gtag"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faGithub, faTwitter, faLinkedin } from "@fortawesome/free-brands-svg-icons"

import {
  socialLinks as socialLinksStyles,
  link as linkStyles,
  icon as iconStyles,
} from "./styles.module.css"

const SocialLinks = () => (
  <ul className={socialLinksStyles}>
    <li>
      <OutboundLink
        href="https://github.com/meganesu"
        aria-label="Megan's GitHub profile"
        className={linkStyles}
      >
        <FontAwesomeIcon icon={faGithub} size="2x" className={iconStyles} />
      </OutboundLink>
    </li>
    <li>
      <OutboundLink
        href="https://twitter.com/meganesulli"
        aria-label="Megan's Twitter profile"
        className={linkStyles}
      >
        <FontAwesomeIcon icon={faTwitter} size="2x" className={iconStyles} />
      </OutboundLink>
    </li>
    <li>
      <OutboundLink
        href="https://linkedin.com/in/meganesu"
        aria-label="Megan's LinkedIn profile"
        className={linkStyles}
      >
        <FontAwesomeIcon icon={faLinkedin} size="2x" className={iconStyles} />
      </OutboundLink>
    </li>
  </ul>
)

export default SocialLinks
