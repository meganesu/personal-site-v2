exports.onRouteUpdate = ({location, prevLocation}) => {
  if (prevLocation) {
    const skipLink = document.querySelector("#skip-link")

    if (skipLink) {
      skipLink.focus()
    }
  }
}
