import React from "react"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { faTwitter } from '@fortawesome/free-brands-svg-icons';
import { faLinkedin } from '@fortawesome/free-brands-svg-icons';

import styles from "./styles.module.css"

const SocialLinks = () => (
  <ul className={styles.socialLinks}>
    <li>
      <a href="https://github.com/meganesu">
        <FontAwesomeIcon icon={ faGithub } size="2x" color="white" />
      </a>
    </li>
    <li>
      <a href="https://twitter.com/meganesulli">
        <FontAwesomeIcon icon={ faTwitter } size="2x" color="white" />
      </a>
    </li>
    <li>
      <a href="https://linkedin.com/in/meganesu">
        <FontAwesomeIcon icon={ faLinkedin } size="2x" color="white" />
      </a>
    </li>
  </ul>
)

export default SocialLinks
