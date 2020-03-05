import React from "react"
import { OutboundLink } from "gatsby-plugin-google-analytics"
import Layout from "../components/layout"

const Privacy = () => (
  <Layout>
    <h1>Privacy Policy</h1>
    <p>
      I'm using Google Analytics to collect data about visitors to my site (that's you!). Here's a list of some data that's being collected and how I'm using it:
    </p>
    <ul>
      <li>
        What pages you're visiting. I use this data to understand which of my posts are more popular, so that I can keep making content that's useful to you.
      </li>
      <li>
        What browser you're using. I use this data so that I can make sure my site has a good user experience on whatever platform you might be using.
      </li>
      <li>
        How you got to my site. I use this data to understand how to better promote my content so that I can get it to you more effectively.
      </li>
    </ul>
    <h2>
      Want a more comprehensive list of what data Google Analytics tracks?
    </h2>
    <p>
      Check out this article: <OutboundLink href="http://www.google.com/policies/privacy/partners/">Google Analytics - "How Google uses data when you use our partners' sites or apps"</OutboundLink>
    </p>
    <h2>Don't want me to collect this info about you?</h2>
    <p>
      You can <a href="javascript:gaOptout();" role="button">opt out of Google Analytics tracking</a>. (This will only disable tracking for this particular site.)
    </p>
    <p>
      Or use a browser plugin to disable Google Analytics tracking on all sites: <OutboundLink href="https://chrome.google.com/webstore/detail/google-analytics-opt-out/fllaojicojecljbmefodhfapmkghcbnh">Chrome Web Store - Google Analytics Opt-out Add-on (by
      Google)</OutboundLink>
    </p>
    <h2>
      Have a different privacy-focused analytics platform that you prefer?
    </h2>
    <p>
      I'd love to hear about it! Reach out to me on Twitter and let me know about your experience.
    </p>
  </Layout>
)

export default Privacy
