const readingTime = require("reading-time")
const slugify = require("@sindresorhus/slugify")

exports.onCreateNode = ({ node, actions }) => {
  const { createNodeField } = actions

  if (node.internal.type === "Mdx") {
    const fileReadingTime = readingTime(node.body)
    createNodeField({
      node,
      name: "timeToRead",
      value: {
        ...fileReadingTime,
        minutesRoundedUp: Math.ceil(fileReadingTime.minutes)
      },
    })

    createNodeField({
      node,
      name: "slug",
      value: `/${slugify(node.frontmatter.title)}`,
    })
  }
}
