import React from "react"
import { graphql } from "gatsby"
import { MDXRenderer } from "gatsby-plugin-mdx"
import Layout from "../../components/layout"
import {
  title as titleStyles,
  date as dateStyles,
  timeToRead as timeToReadStyles,
} from "./{mdx.slug}.module.css"

export const query = graphql`
  query($id: String!) {
    mdx(id: { eq: $id }) {
      frontmatter {
        title
        date(formatString: "MMMM Do, YYYY")
      }
      body
      timeToRead
    }
  }
`

const BlogPost = (props) => (
  <Layout
    pageTitle={`${props.data.mdx.frontmatter.title} | Megan Sullivan`}
  >
    <h1 className={titleStyles}>
      {props.data.mdx.frontmatter.title}
    </h1>
    <p className={dateStyles}>{props.data.mdx.frontmatter.date}</p>
    <p
      className={timeToReadStyles}
    >{`(${props.data.mdx.timeToRead}-minute read)`}</p>
    <MDXRenderer>
      {props.data.mdx.body}
    </MDXRenderer>
  </Layout>
)

export default BlogPost
