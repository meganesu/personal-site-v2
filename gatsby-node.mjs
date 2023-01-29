import readingTime from "reading-time"
import slugify from "@sindresorhus/slugify"

import path from "path";

export const onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (node.internal.type === "Mdx") {
    // Add additional fields for blog post pages

    // Skip any MDX nodes that aren't in the /blog/ directory
    const parentFileNode = getNode(node.parent)
    if (!parentFileNode.absolutePath.includes("/blog/" + parentFileNode.relativePath)) {
      return;
    }

    // Add slug field to be used by file system routes for `{mdx.fields__slug}.js` blog post pages
    let slug = parentFileNode.name
    if (slug === "index") {
      slug = parentFileNode.relativeDirectory
    }

    createNodeField({
      node,
      name: "slug",
      value: `/${slugify(slug)}`,
    })

    // Add field for estimated reading time
    const fileReadingTime = readingTime(node.body)
    createNodeField({
      node,
      name: "timeToRead",
      value: {
        ...fileReadingTime,
        minutesRoundedUp: Math.ceil(fileReadingTime.minutes)
      },
    })
  }
}

export const createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions

  // Query for MDX nodes in the /blog/ directory
  const result = await graphql(
    `
      {
        allMdx(
          filter: {
            internal: {
              # Example contentFilePath values:
              # For local development: /Users/megansullivan/Documents/personal-projects/personal-site-v2/blog/managing-focus-with-react-and-jest/index.mdx
              # On Netlify: /opt/build/repo/blog/why-use-graphql-sketchnote/index.mdx
              contentFilePath: { regex: "/(personal-site-v2|build/repo)/blog//" }
            }
          }
        ) {
          nodes {
            id
            fields {
              slug
            }
            internal {
              contentFilePath
            }
          }
        }
      }
    `
  )

  // Handle errors
  if (result.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query to create pages for MDX blog posts.`)
    return
  }

  // Create pages for each MDX file
  const blogPostTemplate = path.resolve(`src/templates/blog-post.js`)
  result.data.allMdx.nodes.forEach(node => {
    const slug = node.fields.slug

    createPage({
      path: `/blog${slug}`,
      component: `${blogPostTemplate}?__contentFilePath=${node.internal.contentFilePath}`,
      context: {
        id: node.id,
      }
    })
  })
}
