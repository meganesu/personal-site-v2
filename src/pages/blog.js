import React from "react"
import { graphql, useStaticQuery, Link } from "gatsby"
import Layout from "../components/layout/"
import {
  postList as postListStyles,
  post as postStyles,
} from "./blog.module.css"
import PostFilterList from "../components/post-filter-list"

const Blog = () => {
  const data = useStaticQuery(graphql`
    query {
      allMarkdownRemark(sort: { fields: frontmatter___date, order: DESC }) {
        nodes {
          frontmatter {
            title
            date(formatString: "MMMM Do, YYYY")
            description
            tags
          }
          excerpt(format: PLAIN)
          fields {
            slug
          }
          timeToRead
        }
      }
    }
  `)

  const uniquePostTags = new Set()
  data.allMarkdownRemark.nodes.forEach(node => {
    node.frontmatter.tags.forEach(tag => {
      uniquePostTags.add(tag)
    })
  })

  return (
    <Layout pageTitle="Blog | Megan Sullivan">
      <h1>Blog</h1>
      <PostFilterList
        filters={[
          "🌱 Sprouting",
          "🌿 Growing",
          "🌳 Mature"
        ]}
        color="orange"
      />
      <PostFilterList
        filters={Array.from(uniquePostTags).sort()}
        color="blue"
      />
      <ol className={postListStyles}>
        {data.allMarkdownRemark.nodes.map((node) => (
          <li className={postStyles}>
            <h2>
              <Link to={`/blog/${node.fields.slug}`}>
                {node.frontmatter.title}
              </Link>
            </h2>
            <p>{`${node.frontmatter.date} | ${node.timeToRead}-minute read`}</p>
            <p>{node.frontmatter.description || node.excerpt}</p>
          </li>
        ))}
      </ol>
    </Layout>
  )
}

export default Blog
