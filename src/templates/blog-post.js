import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import styles from "./blog-post.module.css"

export const query = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      frontmatter {
        title
        date(formatString: "MMMM Do, YYYY")
      }
      html
    }
  }
`

const BlogPost = props => (
  <Layout pageTitle={`${props.data.markdownRemark.frontmatter.title} | Megan Sullivan`}>
    <h1 className={styles.title}>
      {props.data.markdownRemark.frontmatter.title}
    </h1>
    <p className={styles.date}>{props.data.markdownRemark.frontmatter.date}</p>
    <div dangerouslySetInnerHTML={{ __html: props.data.markdownRemark.html }} />
  </Layout>
)

export default BlogPost
