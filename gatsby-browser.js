exports.onRouteUpdate = ({location, prevLocation}) => {
  // if you got to the current page from a different page on this site
  //  (and not from clicking a link in the table of contents),
  //  move focus to the route heading link next to the h1
  if (prevLocation && prevLocation.pathname != location.pathname) {
    const skipLink = document.querySelector("#skip-link")

    if (skipLink) {
      skipLink.focus()
    }
  }

  // if current location has a hash (for heading id), move focus to
  //  the link for that heading
  //  e.g. http://localhost:8000/blog/post/#heading
  if (location.hash !== "") {
    const headingIdWithoutHash = location.hash.slice(1)
    const headingElement = document.querySelector(`[id="${headingIdWithoutHash}"] a`)

    if (headingElement) {
      headingElement.focus()
    }
  }
}
