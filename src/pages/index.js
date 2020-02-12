import React from "react"
import Layout from "../components/layout/"

const IndexPage = () => (
  <Layout>
    <p>Here's a little about me:</p>
    <ul>
      <li>I'm currently a full-time software developer</li>
      <li>I love dogs more than all other things on the planet</li>
      <li>My life goal is to someday have my own homestead</li>
      <li>
        In my spare time, I volunteer at{" "}
        <a href="https://www.oaklandanimalservices.org/">
          Oakland Animal Services
        </a>
        . Looking to add a furry friend to your family? Come by!
      </li>
    </ul>
    <p>Want to get in touch? Send me a message on LinkedIn!</p>
  </Layout>
)

export default IndexPage
