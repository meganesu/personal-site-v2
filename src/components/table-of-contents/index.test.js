import React from "react"
import { render, screen } from "@testing-library/react"

import TableOfContents from "."

const tableOfContents = {
  items: [
    {
      url: "#introduction",
      title: "Introduction",
    },
    {
      url: "#a-quick-crash-course-on-rss-feeds",
      title: "A Quick Crash Course on RSS Feeds",
      items: [
        {
          url: "#how-does-an-rss-feed-work",
          title: "How does an RSS feed work?",
        },
        {
          url: "#what-does-an-rss-feed-actually-look-like",
          title: "What does an RSS feed actually look like?",
        },
      ],
    },
    {
      url: "#prerequisites",
      title: "Prerequisites",
    },
    {
      url: "#the-starter-code",
      title: "The Starter Code",
    },
    {
      url: "#adding-an-rss-feed",
      title: "Adding an RSS Feed",
      items: [
        {
          url: "#prerequisite-confirm-that-you-have-sitemetadata",
          title: "Prerequisite: Confirm that you have siteMetadata",
        },
        {
          url: "#step-1-install-gatsby-plugin-feed",
          title: "Step 1: Install gatsby-plugin-feed",
        },
        {
          url: "#step-2-configure-the-plugin-in-your-gatsby-configjs-file",
          title: "Step 2: Configure the plugin in your gatsby-config.js file",
          items: [
            {
              url: "#configuring-optionsquery-and-feedquery",
              title: "Configuring options.query and feed.query",
            },
            {
              url: "#configuring-serialize",
              title: "Configuring serialize",
            },
            {
              url: "#the-full-plugin-configuration",
              title: "The Full Plugin Configuration",
            },
          ],
        },
        {
          url: "#step-3-build-and-serve-your-site-locally-to-test-the-rss-feed",
          title:
            "Step 3: Build and serve your site locally to test the RSS feed",
        },
        {
          url: "#step-4-optional-add-a-link-to-your-rss-feed-to-your-site",
          title: "Step 4: (Optional) Add a link to your RSS feed to your site",
        },
      ],
    },
    {
      url: "#troubleshooting-errors",
      title: "Troubleshooting Errors",
    },
    {
      url: "#takeaways",
      title: "Takeaways",
    },
    {
      url: "#wrap-it-up",
      title: "Wrap It Up",
    },
    {
      url: "#additional-resources",
      title: "Additional Resources",
    },
  ],
}

describe("TableOfContents component", () => {
  it("renders nested links in the correct DOM structure", () => {
    const { container } = render(
      <TableOfContents tableOfContents={tableOfContents} />
    )

    expect(container.querySelector("ul")).toMatchSnapshot()
  })

  it("renders the correct number of links", () => {
    render(<TableOfContents tableOfContents={tableOfContents} />)
    const links = screen.getAllByRole("link")

    expect(links.length).toBe(19)
  })

  it("renders a link with the correct url and title", () => {
    render(<TableOfContents tableOfContents={tableOfContents} />)
    const link = screen.getByRole("link", {
      name: "Step 4: (Optional) Add a link to your RSS feed to your site",
    })

    expect(link.href).toBe(
      "http://localhost/#step-4-optional-add-a-link-to-your-rss-feed-to-your-site"
    )
  })
})
