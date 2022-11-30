require("dotenv").config({
  path: `.env`,
})

module.exports = {
  siteMetadata: {
    title: `Megan Sullivan's Personal Website`,
    siteUrl: `https://meganesulli.com`,
    description: `The personal website for Megan Sullivan, a software developer and educator.`,
    image: `images/meganesulli-default-social-card.png`,
    favicon: `images/favicon.png`,
  },
  plugins: [
    "gatsby-plugin-netlify",
    "gatsby-plugin-sharp",
    "gatsby-plugin-react-helmet",
    "gatsby-plugin-image",
    {
      resolve: "gatsby-plugin-mdx",
      options: {
        defaultLayouts: {
          default: require.resolve("./src/components/layout"),
        },
        gatsbyRemarkPlugins: [
          {
            resolve: "gatsby-remark-autolink-headers",
            options: {
              className: "header-anchor",
              enableCustomId: true,
            },
          },
          {
            resolve: "gatsby-remark-images",
            options: {
              maxWidth: 800,
            },
          },
        ],
      },
    },
    {
      resolve: `gatsby-plugin-google-gtag`,
      options: {
        trackingIds: [process.env.GOOGLE_ANALYTICS_4_TRACKING_ID],
        pluginConfig: {
          head: false, // Place the tracking script in the head (instead of in the body)
          anonymize: true, // (optional) Anonymize the IP address of the sender
          respectDNT: true, // (optional) Respect user's Do Not Track setting
        },
      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "blog",
        path: `${__dirname}/blog`,
      },
    },
    {
      resolve: `gatsby-plugin-feed`,
      options: {
        feeds: [
          {
            title: `Megan Sullivan's Blog RSS Feed`,
            output: `/rss.xml`,
            serialize: ({ query: { site, allMdx } }) => {
              return allMdx.nodes.map((node) => {
                return Object.assign({}, node.frontmatter, {
                  url: `${site.siteMetadata.siteUrl}/blog/${node.slug}`,
                  guid: `${site.siteMetadata.siteUrl}/blog/${node.slug}`,
                })
              })
            },
            query: `
              {
                allMdx(
                  sort: { order: DESC, fields: [frontmatter___date] },
                ) {
                  nodes {
                    slug
                    frontmatter {
                      title
                      date
                      description
                    }
                  }
                }
              }
            `,
          },
        ],
      },
    },
  ],
}
