---
title: How to Add an RSS Feed to Your Gatsby Site
date: "2021-01-10"
description: "RSS feeds are a low-maintenance way to help your readers stay up-to-date on your latest content. This post walks you through the steps to add an RSS feed to an existing Gatsby site."
---

## Introduction

As a content creator, you want to make it easy for your readers to stay updated on your latest content. By adding an RSS feed to your site, readers can get automatic updates whenever you post a new article, video, or photo of your dog.

In this post, I'll show you how to add an RSS feed to a Gatsby site.

## A Quick Crash Course on RSS Feeds

### What is an RSS feed?

An [RSS feed](https://www.rssboard.org/rss-specification) is a specific kind of XML file. The structure looks similar to HTML, but it uses different kinds of elements.

The two main RSS elements are:

* `<channel>` - Contains information about your overall site, like the URL where it's hosted. Also contains one or more `<item>` elements. Each RSS feed contains a single `<channel>` element.
* `<item>` - Contains information about a single unit of content on your site, like a specific blog post or video. You'll have multiple `<item>` elements - one for each piece of content on your site.

> Looking for more details about the structure of an RSS feed? Here's the formal [RSS specification](https://www.rssboard.org/rss-specification).

### How does an RSS feed work?

Here's a brief overview:

1. Your site generates an RSS feed for all your content. You add a link to it someplace (maybe your site's header or footer) where it's easy for users to find.
1. A reader decides they love your content and want to get updates from your site. (Hooray!) They add the URL for your RSS feed to whatever **feed aggregator** software they use (like Feedly). The feed aggregator checks your RSS feed periodically to see if there's any new content.
1. Time goes by. When you post a new piece of content, your RSS feed gets updated to include a new `<item>` element with information about the new content.
1. The next time your reader's feed aggregator checks your site's RSS feed, it sees the new content and notifies the reader. The reader checks out your new content and marvels at how handy it is that your site has an RSS feed!

The best part is, once you set up your RSS feed the first time, all the updates happen automatically! 🥳

## Prerequisites

In this post, you'll learn specifically how to add an RSS feed to an existing Gatsby site.

If you don't have a Gatsby site on your own, that's fine! I created some starter code that you can use to follow along. (Don't worry, I won't tell.) More on that in the next section.

If you'd rather follow along with your own Gatsby site, it will be helpful to have a basic blog set up, with separate pages for each post. The starter code uses the `gatsby-transformer-remark` plugin to query for Markdown nodes, but if your blog posts use something besides Markdown, you can make adjustments to the GraphQL queries specified in this post.

## The Starter Code

The starter code for this post is a simplified Gatsby blog. Posts are written in Markdown and stored in the `src/blog` directory.

To get the site up and running locally:

1. Fork the [starter project repo](https://github.com/meganesu/gatsby-blog-with-rss-feed-example) on GitHub.
1. Clone your forked repo. (Don't forget to swap out `<your-github-username>` for your own GitHub username.)
   ```shell
   git clone https://github.com/<your-github-username>/gatsby-blog-with-rss-feed-example.git
   ```
1. In your terminal, change directories into the repo you just cloned.
   ```shell
   cd gatsby-blog-with-rss-feed-example
   ```
1. Start up the local developmenet server.
   ```shell
   npm run develop
   ```
1. In a web browser, navigate to `localhost:8000`. You should see something like this:
   <img
     src="./blog-landing-page.png"
     alt='A blog landing page. The title says "My Blog Posts", and three posts are listed: "My First Post," "Another Great Post," and "Yet Another Post."'
   />

> A few notes on the starter code, if you're curious how it works:
>
> * It uses [Gatsby's File System Route API](https://www.gatsbyjs.com/docs/reference/routing/file-system-route-api/) to programatically generate new pages for each blog post. The template for each page is in the `src/pages/{MarkdownRemark.frontmatter__title}.js` file.
> * It also uses the [`gatsbyPath` field](https://www.gatsbyjs.com/docs/reference/routing/file-system-route-api/#routing-and-linking) from the File System Route API to generate slugs for each blog post page that's created.


## Add an RSS Feed

The high-level process for adding an RSS feed to your Gatsby site looks like this:

* **Prerequisite:** Confirm that you have `siteMetadata` set up in your `gatsby-config.js` file.
* **Step 1:** Install the `gatsby-plugin-feed` plugin.
* **Step 2:** Configure `gatsby-plugin-feed` in your `gatsby-config.js` file.
* **Step 3:** Build and serve your site locally to test the RSS feed.
* **Step 4:** (Optional) Add a link to your RSS feed to your site.

> To skip ahead and see the finished product, check out the `solution` branch of the starter code repo. **TODO: add link to the branch**

### Prerequisite: Confirm that you have `siteMetadata`

If you haven't already, you'll need to add a `siteMetadata` object to your `gatsby-config.js` file. This object contains high-level information about your site.

Your `siteMetadata` object will need the following properties:

- `title` - The name of your site
- `siteUrl` - The URL where your site will be hosted once it's deployed
- `description` - A short sentence describing the purpose of your site

This data will be added to the `<channel>` element in your RSS feed.

The starter code shows what this looks like in context:

```javascript
// gatsby-config.js
module.exports = {
  siteMetadata: {
    title: "My Personal Blog",
    siteUrl: "https://my-personal-blog.com",
    description:
      "An example Gatsby blog with an automatically generated RSS feed.",
  },
  // ...
}
```

### Step 1: Install `gatsby-plugin-feed`

In your command line, install `gatsby-plugin-feed`.

```shell
npm install gatsby-plugin-feed
```

This will add the plugin to your `package.json` file as a dependency and add it to your `node_modules` folder.


### Step 2: Configure the plugin in your `gatsby-config.js` file

To make your Gatsby site actually use the plugin, you need to add it to the `plugins` array in your `gatsby-config.js` file. (You can add it before or after the existing plugins; it doesn't matter.)

```javascript
// gatsby-config.js
module.exports = {
  siteMetadata: { /* ... */ },
  plugins: [
    {
      resolve: 'gatsby-plugin-feed',
      options: {
        // We'll get to this in a moment
      }
    }
    // The rest of the existing plugins
  ]
}
```

Next, configure the additional options that `gatsby-plugin-feed` needs to generate your RSS feed. Your `options` object should have the following fields:

* `query` - The GraphQL query for pulling in data that should be shared across all the RSS feeds generated
    * By default, this will pull in the data from `siteMetadata`
* `feeds` - An array of feed objects (described below)
    * Unless you want to have separate RSS feeds for different kinds of content, you'll probably only need one feed object in this array

A feed object has the following properties:

* `title` - (string) The text to put in the `<title>` element of the generated RSS feed
* `output` - (string) The path where you want your generated RSS feed to be hosted on your site
* `query` - (string) A GraphQL query for how to get the data for the contents of the feed
* `serialize` - (function) A function specifying how to set properties on the `<item>` elements in the RSS feed for each piece of content.

Setting the `title` and `output` options are more straightforward, but the `query` and `serialize` options are described in more detail below.

#### Configuring `options.query` and `feed.query`

You may have noticed that there are two different `query` attributes in the plugin configuration: one under `options` and one in an individual feed object. Why are there two?

Imagine if you wanted to generate multiple RSS feeds for your site. For example, maybe you want one RSS feed for your blog posts and a separate RSS feed for your videos. Some of the data for your RSS feed will be the same in both cases (like the metadata for your site), but other data will be different (like the content of each `<item>` element in your feed).

The data from `options.query` will be included in all of your RSS feeds, while the data from the `query` field on a feed object will only be used for that specific feed.

Now let's put this into practice!

The query to pull in your shared site metadata will look like this:

```javascript
`
{
  site {
    siteMetadata {
      title
      description
      siteUrl
      site_url: siteUrl
    }
  }
}
`
```

And the query to pull in your blog data for your feed will look like this:

```javascript
`
{
  allMarkdownRemark(sort: {fields: frontmatter___date, order: ASC}) {
    nodes {
      frontmatter {
        title
        date
        description
      }
      html
      slug: gatsbyPath(filePath: "/{MarkdownRemark.frontmatter__title}")
    }
  }
}
`
```

> If you're new to GraphQL, you can start up your site in develop mode (with `npm run develop`) and use the GraphiQL explorer at `localhost:8000/___graphql` to see what queries and data fields you have available to you.

#### Configuring `serialize`

The `serialize` option takes a function that shows how to use the data from your GraphQL queries to build up the fields in each `<item>` element in the feed.

For this project, your `serialize` function will set the following properties for each item:

* `title` - The name of this piece of content.
* `description` - (optional) A 1-2 sentence summary of this piece of content.
* `url` - The full URL where this piece of content lives.
    * This will show up as a `<link>` element in the `<item>` element generated for the RSS feed.
* `guid` - Globally unique identifier. A string that is unique to this piece of content. (You can just use the URL again for this.)
* `date` - The publish date for this piece of content.
    * This will show up as a `<pubDate>` element in the `<item>` element generated for the RSS feed.

> To see the full list of all the additional item options you could pass in, refer to the [`rss` package documentation](https://www.npmjs.com/package/rss#itemoptions). The `rss` package is what `gatsby-plugin-feed` uses under the hood.

`serialize` receives all the data from the combined `options.query` and `feed.query` response. You can destructure this data and use it in your configuration for each `<item>` element. For example, the function below will create an `<item>` element with the `title`, `description`, and `date` data from `node.frontmatter`, and it also adds a `url` and `guid` property by combining data from the `site` and `allMarkdownRemark` queries.

```javascript
({ query: { site, allMarkdownRemark } }) => {
  return allMarkdownRemark.nodes.map(node => {
    return Object.assign({}, node.frontmatter, {
      url: `${site.siteMetadata.siteUrl}${node.slug}`,
      guid: `${site.siteMetadata.siteUrl}${node.slug}`,
    })
  })
}
```

#### The Full Plugin Configuration

After adding all the plugin options to your `gatsby-config.js` file, the configuration for `gatsby-plugin-feed` should look like this:

```javascript
// gatsby-config.js
{
  resolve: "gatsby-plugin-feed",
  options: {
    query: `
      {
        site {
          siteMetadata {
            title
            description
            siteUrl
            site_url: siteUrl
          }
        }
      }
    `,
    feeds: [
      {
        title: "My Personal Blog RSS Feed",
        output: "rss.xml",
        query: `
        {
          allMarkdownRemark(sort: {fields: frontmatter___date, order: ASC}) {
            nodes {
              frontmatter {
                title
                date
                description
              }
              html
              slug: gatsbyPath(filePath: "/{MarkdownRemark.frontmatter__title}")
            }
          }
        }
        `,
        serialize: ({ query: { site, allMarkdownRemark } }) => {
          return allMarkdownRemark.nodes.map(node => {
            return Object.assign({}, node.frontmatter, {
              url: `${site.siteMetadata.siteUrl}${node.slug}`,
              guid: `${site.siteMetadata.siteUrl}${node.slug}`,
            })
          })
        },
      }
    ]
  }
},
```

### Step 3: Build and serve your site locally to test the RSS feed

The `gatsby-plugin-feed` plugin only generates an RSS feed for production-style builds. (That means the link to your RSS feed won't work if you're running `npm run develop`.)

To test your RSS feed locally, you'll have to build and serve your site by running the following command:

```shell
npm run build && npm run serve
```

Once your site is up and running, you should be able to see it in a web browser at `localhost:9000`.

You can check your RSS feed by visiting `localhost:9000/rss.xml` (or whatever you configured the `output` option to be).

The generated RSS feed should look something like this:

```xml
<rss version="2.0">
  <channel>
    <title>My Personal Blog RSS Feed</title>
    <description>
      An example Gatsby blog with an automatically generated RSS feed.
    </description>
    <link>https://my-personal-blog.com</link>
    <generator>GatsbyJS</generator>
    <lastBuildDate>Wed, 27 Jan 2021 08:07:58 GMT</lastBuildDate>
    <item>
      <title>My First Post</title>
      <description>The first thing I've ever written.</description>
      <link>https://my-personal-blog.com/my-first-post/</link>
      <guid isPermaLink="false">https://my-personal-blog.com/my-first-post/</guid>
      <pubDate>Fri, 01 Jan 2021 00:00:00 GMT</pubDate>
    </item>
    <item>
      <title>Another Great Post</title>
      <description>The second thing I've ever written.</description>
      <link>https://my-personal-blog.com/another-great-post/</link>
      <guid isPermaLink="false">https://my-personal-blog.com/another-great-post/</guid>
      <pubDate>Sat, 02 Jan 2021 00:00:00 GMT</pubDate>
    </item>
    <item>
      <title>Yet Another Post</title>
      <description>The third thing I've ever written. I'm on a roll!</description>
      <link>https://my-personal-blog.com/yet-another-post/</link>
      <guid isPermaLink="false">https://my-personal-blog.com/yet-another-post/</guid>
      <pubDate>Sun, 03 Jan 2021 00:00:00 GMT</pubDate>
    </item>
  </channel>
</rss>
```

If it worked, congratulations, your site now has an automatically generated RSS feed! If it didn't, try checking out the [Troubleshooting Errors](#troubleshooting-errors) section. (If your problem isn't listed there, reach out to me on Twitter and I'll try to help debug!)

### Step 4: (Optional) Add a link to your RSS feed to your site

Now that you've done all this work to generate and RSS feed for your site, it's time to make it discoverable by your readers! (This step is optional, although it's probably a good idea if you want people to actually use your RSS feed.)

Add a link to your RSS feed to the blog page. (Header or footer?)

Test your link by killing your local server and restarting it. (Production builds don't do hot reloading, so you need to restart the server to see your changes.)

You could test the link using the development server (npm run develop), but the RSS feed doesn't get generated for dev builds, so you'll get a 404 when you try to visit the URL.

And you're done! The next time you deploy your site, you should be able to visit `<your-domain>/rss.xml` (or whatever you configured `output` to be) and see your own RSS feed.

## Troubleshooting Errors

To help troubleshoot, here are some of the errors I ran into as I was implementing this on my own site, as well as the solution for how I fixed the problem:

<details>
  <summary>
    Cannot query field "siteUrl" on type "SiteSiteMetadata".
  </summary>

**The Error Message:**

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

**The Underlying Problem:** Your site doesn't have site metadata, which the default query in `gatsby-plugin-feed` expects there to be.

**The Solution:** Add site metadata to your `gatsby-config.js` file. See [Prerequisite: Confirm that you have `siteMetadata`](#prerequisite-confirm-that-you-have-sitemetadata).

</details>

<details>
  <summary>
    Cannot query field "fields" on type "MarkdownRemark".
  </summary>

**The Error Message:**

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

**The Underlying Problem:** Your blog posts don't have a slug field. The default GraphQL query used by `gatsby-plugin-feed` expects your MarkdownRemark nodes to have a `fields.slug` property. (You can use the GraphiQL explorer to manually inspect the available fields on the MarkdownRemark query and confirm that `fields.slug` is not available.)

**The Solution:** In your configuration for `gatsby-plugin-feed` (in the `gatsby-config.js` file), make sure the `feed.query` option includes the `slug` field in the query.

</details>

## Wrap It Up

Now that you've added an RSS feed to this sample blog site, try adding one to your own Gatsby site. Let me know how it goes!

Want to be notified when I write new content? You can subscribe to the [RSS feed for my own blog](/rss.xml), or you can [follow me on Twitter](https://twitter.com/meganesulli). See you around!

## Additional Resources

- [Gatsby How-To Guide: Adding an RSS Feed](https://www.gatsbyjs.com/docs/how-to/adding-common-features/adding-an-rss-feed/)
- [`gatsby-plugin-feed` README](https://www.gatsbyjs.com/plugins/gatsby-plugin-feed/)
- [How do RSS Feeds Work](https://rss.com/blog/how-do-rss-feeds-work/)
- [What is RSS](https://rss.softwaregarden.com/aboutrss.html): Intro to RSS feeds and RSS aggregators
- [RSS Specification](https://www.rssboard.org/rss-specification)
