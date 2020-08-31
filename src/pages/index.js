import React from "react"
import { Link } from "gatsby"
import { OutboundLink } from "gatsby-plugin-google-analytics"

import Layout from "../components/layout/"
import * as styles from "./index.module.css"
import * as waveImage from "../images/Emoji_u1f44b.svg"

const IndexPage = () => (
  <Layout pageTitle="Home | Megan Sullivan">
    <p className={styles.greeting}>
      <img src={waveImage} className={styles.wave} alt="wave emoji" />
      Hey there, I'm <span className={styles.name}>Megan</span>!
    </p>
    <p>
      I’m a software developer and educator. I like building things and then{" "}
      <Link to="/blog">teaching others</Link> about what I’ve learned.
    </p>
    <p>
      When I’m not on my computer, I’m a dog volunteer at{" "}
      <OutboundLink href="https://www.oaklandanimalservices.org/">
        Oakland Animal Services
      </OutboundLink>
      .
    </p>
    <p>Want to get in touch? Send me a message on Twitter!</p>
  </Layout>
)

export default IndexPage
