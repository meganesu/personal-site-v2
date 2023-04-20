import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import RouteTargetHeading from "../components/route-target-heading"
import MDXProvider from "../components/mdx-provider"
import TableOfContents from "../components/table-of-contents"
import MailingListSignupForm from "../components/mailing-list-signup-form"

import {
  title as titleStyles,
  date as dateStyles,
  timeToRead as timeToReadStyles,
} from "./blog-post.module.css"

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
          minutesRoundedUp
        }
      }
      tableOfContents
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
      >{`(${data.mdx.fields.timeToRead.minutesRoundedUp}-minute read)`}</p>
      <TableOfContents tableOfContents={data.mdx.tableOfContents} />
      <MDXProvider>{children}</MDXProvider>
      <MailingListSignupForm />
    </Layout>
  )
}

export default BlogPost
