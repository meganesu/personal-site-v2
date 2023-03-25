import { Link } from 'gatsby'
import React from 'react'

import CalloutBox from '../callout-box'

import {
  tocWrapper as tocWrapperStyles,
  heading as headingStyles,
  link as linkStyles,
} from "./styles.module.css"

const ContentsList = ({contents}) => {
  return (
    <ul>
      {
        contents.map(({url, title, items}) => {
          return (
            <>
            <li className={linkStyles}>
              <Link to={url}>{title}</Link>
            </li>
            {
              items != undefined && (
                <ContentsList contents={items} />
              )
            }
            </>
          )
        })
      }
    </ul>
  )
}

const TableOfContents = ({ tableOfContents }) => {
  console.log(tableOfContents)
  return (
    <CalloutBox color="orange">
      <nav aria-label="Table of Contents" className={tocWrapperStyles}>
        <h2 className={headingStyles}>
          Table of Contents
        </h2>
        <ContentsList contents={tableOfContents.items} />
      </nav>
    </CalloutBox>
  )
}

export default TableOfContents
