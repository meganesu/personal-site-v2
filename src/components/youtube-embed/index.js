import * as React from 'react'
import { container as containerStyles, iframe as iframeStyles } from './index.module.css'

const YouTubeEmbed = ({src}) => {
  return (
    <div className={containerStyles}>
      <iframe
        className={iframeStyles}
        src={src}
        title="YouTube video player"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
      >
      </iframe>
      
    </div>
  )
}

export default YouTubeEmbed