import React from "react"

import { OutboundLink } from "gatsby-plugin-google-analytics"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faGithub } from "@fortawesome/free-brands-svg-icons"
import { faTwitter } from "@fortawesome/free-brands-svg-icons"
import { faLinkedin } from "@fortawesome/free-brands-svg-icons"

import { socialLinks as socialLinksStyles } from "./styles.module.css"

const SocialLinks = () => (
  <ul className={socialLinksStyles}>
    <li>
      <OutboundLink href="https://github.com/meganesu" aria-label="Megan's GitHub profile">
        <FontAwesomeIcon icon={faGithub} size="2x" color="white" />
      </OutboundLink>
    </li>
    <li>
      <OutboundLink href="https://twitter.com/meganesulli" aria-label="Megan's Twitter profile">
        <FontAwesomeIcon icon={faTwitter} size="2x" color="white" />
      </OutboundLink>
    </li>
    <li>
      <OutboundLink href="https://linkedin.com/in/meganesu" aria-label="Megan's LinkedIn profile">
        <FontAwesomeIcon icon={faLinkedin} size="2x" color="white" />
      </OutboundLink>
    </li>
  </ul>
)

export default SocialLinks
