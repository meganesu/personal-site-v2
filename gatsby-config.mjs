import dotenv from "dotenv"
dotenv.config({
  path: `.env`,
})

import remarkGfm from "remark-gfm"
import remarkMdxCodeMeta from 'remark-mdx-code-meta';

import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

export default {
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
        mdxOptions: {
          remarkPlugins: [
            remarkGfm,
            remarkMdxCodeMeta,
          ],
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
              linkImagesToOriginal: false,
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
      resolve: "gatsby-source-filesystem",
      options: {
        name: "pages",
        path: `${__dirname}/src/pages`,
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
                  url: `${site.siteMetadata.siteUrl}/blog${node.fields.slug}`,
                  guid: `${site.siteMetadata.siteUrl}/blog${node.fields.slug}`,
                })
              })
            },
            query: `{
              allMdx(
                sort: { frontmatter: { date: DESC } }
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
                  fields {
                    slug
                  }
                  frontmatter {
                    title
                    date
                    description
                  }
                }
              }
            }`,
          },
        ],
      },
    },
  ],
}
