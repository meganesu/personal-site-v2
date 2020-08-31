import React from "react"
import { OutboundLink } from "gatsby-plugin-google-analytics"
import Layout from "../components/layout"

const Accessibility = () => (
  <Layout pageTitle="Accessibility | Megan Sullivan">
    <h1>Accessibility Statement</h1>
    <p>
      I want to make sure this site is accessible and usable by everyone.
    </p>
    <p>
      I'm currently using the W3C <OutboundLink href="https://www.w3.org/WAI/standards-guidelines/wcag/">Web Content Accessibility Guidelines (WCAG) 2.1</OutboundLink> as
      a standard. It defines three different levels of accessibility conformance (A, AA, AAA).
      My goal is to achieve level AA.
    </p>
    <p>
      If you find any accessibility issues, please reach out and let me know!
      The best way to contact me is to reach out on <OutboundLink href="https://twitter.com/meganesulli">Twitter</OutboundLink>.
    </p>
  </Layout>
)

export default Accessibility
