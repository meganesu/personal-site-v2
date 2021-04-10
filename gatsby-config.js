module.exports = {
  siteMetadata: {
    title: `Megan Sullivan's Personal Website`,
    siteUrl: `https://meganesulli.com`,
    description: `The personal website for Megan Sullivan, a software developer and educator.`,
  },
  plugins: [
    "gatsby-plugin-sharp",
    "gatsby-plugin-react-helmet",
    "gatsby-plugin-image",
    {
      resolve: "gatsby-plugin-mdx",
      options: {
        defaultLayouts: {
          default: require.resolve("./src/components/layout")
        }
      }
    },
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: "UA-159656850-1",
        head: false, // Place the tracking script in the head (instead of in the body)
        anonymize: true, // (optional) Anonymize the IP address of the sender
        respectDNT: true, // (optional) Respect user's Do Not Track setting
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
      resolve: "gatsby-transformer-remark",
      options: {
        plugins: [
          {
            resolve: "gatsby-remark-autolink-headers",
            options: {
              className: "header-anchor",
              enableCustomId: true,
            }
          },
          {
            resolve: "gatsby-remark-prismjs",
            options: {
              classPrefix: "language-",
            }
          },
          {
            resolve: "gatsby-remark-images",
            options: {
              maxWidth: 800,
            }
          }
        ]
      }
    },
    {
      resolve: `gatsby-plugin-feed`,
      options: {
        feeds: [
          {
            title: `Megan Sullivan's Blog RSS Feed`,
            output: `/rss.xml`,
            serialize: ({ query: { site, allMarkdownRemark } }) => {
              return allMarkdownRemark.edges.map(edge => {
                return Object.assign({}, edge.node.frontmatter, {
                  url: `${site.siteMetadata.siteUrl}/blog/${edge.node.fields.slug}`,
                  guid: `${site.siteMetadata.siteUrl}/blog/${edge.node.fields.slug}`,
                })
              })
            },
            query: `
              {
                allMarkdownRemark(
                  sort: { order: DESC, fields: [frontmatter___date] },
                ) {
                  edges {
                    node {
                      fields { slug }
                      frontmatter {
                        title
                        date
                        description
                      }
                    }
                  }
                }
              }
            `,
          }
        ],
      }
    },
  ],
}
