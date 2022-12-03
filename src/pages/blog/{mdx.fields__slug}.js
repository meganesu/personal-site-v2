import React from "react"
import { graphql } from "gatsby"

import Layout from "../../components/layout"
import RouteTargetHeading from "../../components/route-target-heading"
import MDXProvider from "../../components/mdx-provider"

import {
  title as titleStyles,
  date as dateStyles,
  timeToRead as timeToReadStyles,
} from "./{mdx.fields__slug}.module.css"

export const query = graphql`
  query ($id: String!) {
    mdx(id: { eq: $id }) {
      frontmatter {
        title
        date(formatString: "MMMM Do, YYYY")
        description
      }
      fields {
        timeToRead {
          minutes
        }
      }
    }
  }
`

const BlogPost = ({ data, location, children }) => {
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
      >{`(${data.mdx.fields.timeToRead.minutes}-minute read)`}</p>
      <MDXProvider>{children}</MDXProvider>
    </Layout>
  )
}

export default BlogPost
