import React, { useState } from "react"
import { graphql, Link } from "gatsby"
import Layout from "../../components/layout/"
import RouteTargetHeading from "../../components/route-target-heading"
import {
  postList as postListStyles,
  post as postStyles,
} from "./index.module.css"
import PostFilterList from "../../components/post-filter-list"

const Blog = ({data, location}) => {
  const allPosts = data.allMdx.nodes

  const uniquePostTags = new Set()
  allPosts.forEach(node => {
    node.frontmatter.tags.forEach(tag => {
      uniquePostTags.add(tag)
    })
  })

  const [selectedPostTags, setSelectedPostTags] = useState(new Set())
  const [postsToDisplay, setPostsToDisplay] = useState(allPosts)

  const addFilter = () => filterName => {
    const newFilterList = selectedPostTags.add(filterName)
    setSelectedPostTags(newFilterList)
    setPostsToDisplay(allPosts.filter(shouldPostDisplay))
  }

  const removeFilter = () => filterName => {
    const newFilterList = selectedPostTags
    newFilterList.delete(filterName)
    setSelectedPostTags(newFilterList)
    setPostsToDisplay(allPosts.filter(shouldPostDisplay))
  }

  const shouldPostDisplay = node => {
    // When no filters are selected, show all posts
    if (selectedPostTags.size === 0) {
      return true
    }

    // Check if one of the node's tags is in the set of selected filters
    return node.frontmatter.tags.some(tag => selectedPostTags.has(tag))
  }

  return (
    <Layout
      title="Blog | Megan Sullivan"
      description="A list of my latest blog posts"
      location={location}
    >
      <RouteTargetHeading
        level={1}
        targetId="navigation"
      >
        Blog
      </RouteTargetHeading>
      <PostFilterList
        filters={Array.from(uniquePostTags).sort()}
        color="orange"
        onAdd={addFilter(selectedPostTags, setSelectedPostTags)}
        onRemove={removeFilter(selectedPostTags, setSelectedPostTags)}
      />
      <p aria-live="polite" aria-atomic="true">
        {postsToDisplay.length} {postsToDisplay.length === 1 ? "post" : "posts"} found
      </p>
      <ol className={postListStyles}>
        {postsToDisplay.map((node) => (
          <li className={postStyles}>
            <h2>
              <Link to={`/blog/${node.slug}`}>
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

export const query = graphql`
  query {
    allMdx(sort: { fields: frontmatter___date, order: DESC }) {
      nodes {
        frontmatter {
          title
          date(formatString: "MMMM Do, YYYY")
          description
          tags
        }
        excerpt
        slug
        timeToRead
      }
    }
  }
`

export default Blog
