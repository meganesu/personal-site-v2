module.exports = {
  plugins: [
    "gatsby-plugin-sharp",
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
        name: "src",
        path: `${__dirname}/src`,
      },
    },
    {
      resolve: "gatsby-transformer-remark",
      options: {
        plugins: [
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
  ],
}
