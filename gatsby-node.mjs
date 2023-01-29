import readingTime from "reading-time"
import slugify from "@sindresorhus/slugify"

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
