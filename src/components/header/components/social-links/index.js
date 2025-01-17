import React from "react"

import { OutboundLink } from "gatsby-plugin-google-gtag"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faGithub, faBluesky, faTwitch, faYoutube, faLinkedin } from "@fortawesome/free-brands-svg-icons"

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
        href="https://bsky.app/profile/meganesulli.bsky.social"
        aria-label="Megan's BlueSky profile"
        className={linkStyles}
      >
        <FontAwesomeIcon icon={faBluesky} size="2x" className={iconStyles} />
      </OutboundLink>
    </li>
    <li>
      <OutboundLink
        href="https://twitch.tv/meganesulli"
        aria-label="Megan's Twitch channel"
        className={linkStyles}
      >
        <FontAwesomeIcon icon={faTwitch} size="2x" className={iconStyles} />
      </OutboundLink>
    </li>
    <li>
      <OutboundLink
        href="https://youtube.com/@meganesulli"
        aria-label="Megan's YouTube channel"
        className={linkStyles}
      >
        <FontAwesomeIcon icon={faYoutube} size="2x" className={iconStyles} />
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
