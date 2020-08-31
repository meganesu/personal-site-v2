import React from "react"
import { graphql, useStaticQuery, Link } from "gatsby"
import Layout from "../components/layout/"
import styles from "./blog.module.css"

const Blog = () => {
  const data = useStaticQuery(graphql`
    query {
      allMarkdownRemark(
        sort: {
          fields: frontmatter___date
          order: DESC
        }
      ) {
        edges {
          node {
            frontmatter {
              title
              date(formatString: "MMMM Do, YYYY")
            }
            excerpt(format: PLAIN)
            fields {
              slug
            }
          }
        }
      }
    }
  `)

  return (
    <Layout pageTitle="Blog | Megan Sullivan">
      <h1>Blog</h1>
      <ol className={styles.postList}>
        {data.allMarkdownRemark.edges.map(edge => (
          <li className={styles.post}>
            <h2>
              <Link to={`/blog/${edge.node.fields.slug}`}>
                {edge.node.frontmatter.title}
              </Link>
            </h2>
            <p>{edge.node.frontmatter.date}</p>
            <p>{edge.node.excerpt}</p>
          </li>
        ))}
      </ol>
    </Layout>
  )
}

export default Blog
