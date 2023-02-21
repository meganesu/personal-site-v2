import { Link } from 'gatsby'
import React from 'react'

import CalloutBox from '../callout-box'

import {
  tocWrapper as tocWrapperStyles,
  heading as headingStyles,
  link as linkStyles,
} from "./styles.module.css"

const ListItem = ({url, title, items}) => {
  return (
    <>
      <li className={linkStyles}>
        <Link to={url}>{title}</Link>
      </li>
      {
        items != undefined && (
          <ul>
            {
              items.map(({url, title, items}) => {
                return <ListItem url={url} title={title} items={items} />
              })
            }
          </ul>
        )
      }
    </>
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
        <ul>
        {
          tableOfContents.items != undefined && (
            tableOfContents?.items.map(({url, title, items}) => {
              return <ListItem url={url} title={title} items={items} />
            })
          )
        }
        </ul>
      </nav>
    </CalloutBox>
  )
}

export default TableOfContents
