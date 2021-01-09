---
title: Adding an RSS Feed to Your Gatsby Site
date: "2021-01-10"
---

## Introduction

How an RSS feed works. You add the feed to your site. Readers add the URL to your feed to their feed aggregator of choice. The feed aggregator regularly checks your RSS feed, and when it sees something new, it notifies your reader. [Insert illustration.]

Why do you care? Adding an RSS feed to your site makes it so that your readers can get updates when you post new content, without you needing to send an email newsletter or post on social media.

In this post, I'll show you how to add an RSS feed to a Gatsby site.

## The Starter Code

Introduce the starter project: https://github.com/meganesu/gatsby-blog-with-rss-feed-example

This is a simple Gatsby blog. Posts are written in Markdown and stored in the `src/blog` directory.

To get the site up and running locally:

1. Clone the repo.
    ```shell
    git clone https://github.com/meganesu/gatsby-blog-with-rss-feed-example
    ```
1. In your terminal, change directories into the repo you just cloned.
    ```shell
    cd gatsby-blog-with-rss-feed-example
    ```
1. Start up the development server:
    ```shell
    npm run develop
    ```
1. In a web browser, navigate to `localhost:8000`. [Insert screenshot of what they should see.]

## Add an RSS Feed

> To skip ahead and see the finished product, check out the `solution` branch of the starter code repo.

1. Install `gatsby-plugin-feed`
    ```shell
    npm install gatsby-plugin-feed
    ```
1. Add to `gatsby-config.js` plugins array
    ```javascript
    // gatsby-config.js
    module.exports = {
      plugins: [
        'gatsby-plugin-feed',
      ]
    }
    ```
1. Test it out by stopping the development server and doing a prod build. (The RSS feed is only generated on prod builds.)
    
    ```shell
    npm run build && npm run serve
    ```
    
    You should see an error something like:

    ```shell
     ERROR #11321  PLUGIN

    "gatsby-plugin-feed" threw an error while running the onPostBuild
    lifecycle:

    Cannot query field "siteUrl" on type "SiteSiteMetadata".

    GraphQL request:7:11
    6 |           description
    7 |           siteUrl
      |           ^
    8 |           site_url: siteUrl, Cannot query field "siteUrl" on type
     "SiteSiteMetadata".

    GraphQL request:8:11
    7 |           siteUrl
    8 |           site_url: siteUrl
      |           ^
    9 |         }
    ```
1. The error from the previous step is being thrown because the default query that the `gatsby-plugin-feed` makes expects the `gatsby-config.js` file to contain site metadata (which it currently doesn't).
    
    Add that site metadata now. You'll need to include three properties:
    
    * `title` - the name of your site
    * `siteUrl` - the URL where your site will be hosted once it's deployed
    * `description` - a short sentence describing the purpose of your site
    
    ```javascript
    // gatsby-config.js
    module.exports = {
      siteMetadata: {
        title: 'My Personal Blog',
        siteUrl: 'https://my-personal-blog.com',
        description: 'The personal blog for [your name here].',
      }
    }
    ```
1. Test it out again by doing another prod build.
    ```shell
    gatsby build && gatsby serve
    ```

    Now you should see a different error, similar to:
    ```
    ERROR #11321  PLUGIN

    "gatsby-plugin-feed" threw an error while running the onPostBuild lifecycle:

    Cannot query field "fields" on type "MarkdownRemark".

    GraphQL request:16:15
    15 |               }
    16 |               fields {
      |               ^
    17 |                 slug
    ```

1. The error from the previous step occurs because the default GraphQL query used by `gatsby-plugin-feed` expects your MarkdownRemark nodes to have a fields.slug property. If you use graphiql to look at the properties available, you'll see that there is no `fields.slug` property available.

    At this point, you have two options:

    * You can add a `fields.slug` property using the `onCreateNode` API in a new `gatsby-node.js` file.
    * You can override the GraphQL query that `gatsby-plugin-feed` uses to create your RSS feed.

    In this particular case, since you're going to end up customizing the `gatsby-plugin-feed` options later on anyway, you might as well override the query as well.

1. Test it out again by doing another prod build.
    ```shell
    gatsby build && gatsby serve
    ```

    This time, it should build successfully.
1. Open the site in a web browser and check out your generated RSS feed. The default path for the feed will be `localhost:9000/rss.xml`.
1. Customize the feed! I wanted to get rid of THE weird "content:encoded" field. (Don't want the full post text in the RSS feed!)
    Use `serialize` feed option
1. Do another prod build and look at the final RSS feed.

> Don't forget to commit your changes once you're done!

## Troubleshooting Errors

Error:

```shell
     ERROR #11321  PLUGIN

    "gatsby-plugin-feed" threw an error while running the onPostBuild
    lifecycle:

    Cannot query field "siteUrl" on type "SiteSiteMetadata".

    GraphQL request:7:11
    6 |           description
    7 |           siteUrl
      |           ^
    8 |           site_url: siteUrl, Cannot query field "siteUrl" on type
     "SiteSiteMetadata".

    GraphQL request:8:11
    7 |           siteUrl
    8 |           site_url: siteUrl
      |           ^
    9 |         }
```

Solution: Your site doesn't have site metadata. Make sure to add it to your `gatsby-config.js` file.

Error:

```
ERROR #11321  PLUGIN

"gatsby-plugin-feed" threw an error while running the onPostBuild
lifecycle:

Cannot query field "fields" on type "MarkdownRemark".

GraphQL request:16:15
15 |               }
16 |               fields {
   |               ^
17 |                 slug
```

Solution: Your posts don't have a slug field. If you're using the filesystem route API, make sure to alias your gatsbyPath call so it's called `slug`.


## Wrap It Up

Now that you've added an RSS feed to this sample blog site, try adding one to your own Gatsby site. Let me know how it goes!

Want to be notified when I write new content? You can subscribe to the [RSS feed for my own blog](/rss.xml), or you can [follow me on Twitter](https://twitter.com/meganesulli). See you around!

## Additional Resources

* [Gatsby How-To Guide: Adding an RSS Feed](https://www.gatsbyjs.com/docs/how-to/adding-common-features/adding-an-rss-feed/)
* [`gatsby-plugin-feed` README](https://www.gatsbyjs.com/plugins/gatsby-plugin-feed/)
* https://rss.com/blog/how-do-rss-feeds-work/* [What is RSS](https://rss.softwaregarden.com/aboutrss.html): Intro to RSS feeds and RSS aggregators
