import React from "react"
import Chip from "../chip"
import {
  list as listStyles,
  listItem as listItemStyles,
} from "./styles.module.css"

const PostFilterList = ({ filters, color, onAdd, onRemove }) => {
  return (
    <ul className={listStyles}>
      {filters.map((tag) => (
        <li className={listItemStyles}>
          <Chip text={tag} color={color} onAdd={onAdd} onRemove={onRemove} />
        </li>
      ))}
    </ul>
  )
}

export default PostFilterList
