import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import {
  title as titleStyles,
  date as dateStyles,
  timeToRead as timeToReadStyles,
} from "./blog-post.module.css"

export const query = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      frontmatter {
        title
        date(formatString: "MMMM Do, YYYY")
      }
      html
      timeToRead
    }
  }
`

const BlogPost = (props) => (
  <Layout
    pageTitle={`${props.data.markdownRemark.frontmatter.title} | Megan Sullivan`}
  >
    <h1 className={titleStyles}>
      {props.data.markdownRemark.frontmatter.title}
    </h1>
    <p className={dateStyles}>{props.data.markdownRemark.frontmatter.date}</p>
    <p
      className={timeToReadStyles}
    >{`(${props.data.markdownRemark.timeToRead}-minute read)`}</p>
    <div dangerouslySetInnerHTML={{ __html: props.data.markdownRemark.html }} />
  </Layout>
)

export default BlogPost
