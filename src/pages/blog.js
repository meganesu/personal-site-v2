import React from "react"
import { graphql, useStaticQuery, Link } from "gatsby"
import Layout from "../components/layout/"
import {
  postList as postListStyles,
  post as postStyles,
} from "./blog.module.css"

const Blog = () => {
  const data = useStaticQuery(graphql`
    query {
      allMarkdownRemark(sort: { fields: frontmatter___date, order: DESC }) {
        edges {
          node {
            frontmatter {
              title
              date(formatString: "MMMM Do, YYYY")
              description
            }
            excerpt(format: PLAIN)
            fields {
              slug
            }
            timeToRead
          }
        }
      }
    }
  `)

  return (
    <Layout pageTitle="Blog | Megan Sullivan">
      <h1>Blog</h1>
      <ol className={postListStyles}>
        {data.allMarkdownRemark.edges.map((edge) => (
          <li className={postStyles}>
            <h2>
              <Link to={`/blog/${edge.node.fields.slug}`}>
                {edge.node.frontmatter.title}
              </Link>
            </h2>
            <p>{`${edge.node.frontmatter.date} | ${edge.node.timeToRead}-minute read`}</p>
            <p>{edge.node.frontmatter.description || edge.node.excerpt}</p>
          </li>
        ))}
      </ol>
    </Layout>
  )
}

export default Blog
