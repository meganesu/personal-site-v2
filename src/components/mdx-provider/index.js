import React from 'react'
import { MDXProvider } from "@mdx-js/react"

import CalloutBox from '../callout-box'
import CodeBlock from '../code-block'
import Collapsible from '../collapsible'
import InlineCode from '../inline-code'
import YouTubeEmbed from '../youtube-embed'

const components = {
  CalloutBox,
  Collapsible,
  YouTubeEmbed,
  inlineCode: props => <InlineCode {...props} />,
  pre: props => <CodeBlock {...props} />,
}

const Provider = ({children}) => {
  return (
    <MDXProvider components={components}>
      {children}
    </MDXProvider>
  )
}

export default Provider