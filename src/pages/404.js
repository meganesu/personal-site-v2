import React from "react"
import { StaticImage } from "gatsby-plugin-image"

import Layout from "../components/layout"
import RouteTargetHeading from "../components/route-target-heading"

import {
  wrapper as wrapperStyles,
  doodle as doodleStyles,
} from "./404.module.css"

const PageNotFound = ({ location }) => {
  return (
    <Layout
      title="404 | Megan Sullivan"
      description="Oops! That page doesn't exist."
      location={location}
    >
      <div className={wrapperStyles}>
        <div className={doodleStyles}>
          <StaticImage
            src="../images/megan-oops.png"
            alt="A cartoon Megan grins sheepishly while she scratches her head and a bead of sweat drips down her forehead."
          />
        </div>
        <div>
          <RouteTargetHeading level={1} targetId="navigation">
            404: Page Not Found
          </RouteTargetHeading>
          <p>Oops! That page doesn't exist.</p>
        </div>
      </div>
    </Layout>
  )
}

export default PageNotFound