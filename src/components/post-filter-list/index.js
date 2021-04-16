import React from 'react'
import Chip from '../chip'
import {list as listStyles, listItem as listItemStyles} from './styles.module.css'

const PostFilterList = ({filters, color}) => {
  return (
    <ul className={listStyles}>
      {
        filters.map(tag => (
          <li className={listItemStyles}>
            <Chip text={tag} color={color} />
          </li>
        ))
      }
    </ul>
  )
}

export default PostFilterList