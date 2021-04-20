import React, { useState } from "react"
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

  const allPosts = data.allMarkdownRemark.nodes

  const uniquePostTags = new Set()
  allPosts.forEach(node => {
    node.frontmatter.tags.forEach(tag => {
      uniquePostTags.add(tag)
    })
  })

  const [selectedPostTags, setSelectedPostTags] = useState(new Set())
  const [selectedPostStatuses, setSelectedPostStatuses] = useState(new Set())
  const [postList, setPostList] = useState(allPosts)

  const addFilter = (filterList, setFilterList) => filterName => {
    console.log(filterList)
    const newFilterList = filterList.add(filterName)
    setFilterList(newFilterList)
    setPostList(allPosts.filter(shouldPostDisplay))
  }

  const removeFilter = (filterList, setFilterList) => filterName => {
    console.log('removed', filterName)
    const newFilterList = filterList
    newFilterList.delete(filterName)
    setFilterList(newFilterList)
    setPostList(allPosts.filter(shouldPostDisplay))
  }

  const postStatuses = [
    "🌱 Sprouting",
    "🌿 Growing",
    "🌳 Mature"
  ]

  const shouldPostDisplay = node => {
    // When no filters are selected, show all posts
    if (selectedPostTags.size === 0) {
      return true
    }

    // Check if one of the node's tags is in the set of selected filters
    return node.frontmatter.tags.some(tag => selectedPostTags.has(tag))
  }

  return (
    <Layout pageTitle="Blog | Megan Sullivan">
      <h1>Blog</h1>
      <PostFilterList
        filters={postStatuses}
        color="blue"
        onAdd={addFilter(selectedPostStatuses, setSelectedPostStatuses)}
        onRemove={removeFilter(selectedPostStatuses, setSelectedPostStatuses)}
      />
      <PostFilterList
        filters={Array.from(uniquePostTags).sort()}
        color="orange"
        onAdd={addFilter(selectedPostTags, setSelectedPostTags)}
        onRemove={removeFilter(selectedPostTags, setSelectedPostTags)}
      />
      <ol className={postListStyles}>
        {postList.map((node) => (
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
