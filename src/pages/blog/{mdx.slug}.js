import React from "react"
import { graphql } from "gatsby"
import { MDXRenderer } from "gatsby-plugin-mdx"

import Layout from "../../components/layout"
import RouteTargetHeading from "../../components/route-target-heading"
import MDXProvider from "../../components/mdx-provider"

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
        description
      }
      body
      timeToRead
    }
  }
`

const BlogPost = ({data, location}) => {
  return (
    <Layout
      title={`${data.mdx.frontmatter.title} | Megan Sullivan`}
      description={data.mdx.frontmatter.description}
      location={location}
    >
      <RouteTargetHeading
        level={1}
        targetId="navigation"
        className={titleStyles}
      >
        {data.mdx.frontmatter.title}
      </RouteTargetHeading>
      <p className={dateStyles}>{data.mdx.frontmatter.date}</p>
      <p
        className={timeToReadStyles}
      >{`(${data.mdx.timeToRead}-minute read)`}</p>
      <MDXProvider>
        <MDXRenderer>
          {data.mdx.body}
        </MDXRenderer>
      </MDXProvider>
    </Layout>
  )
}

export default BlogPost
