import React from "react"

import { Highlight as SyntaxHighlightWrapper } from "prism-react-renderer"
import { themes } from "prism-react-renderer"
const theme = themes.nightOwl

import {
  container as containerStyles,
  fileTitle as fileTitleStyles,
  languageTag as languageTagStyles,
  pre as preStyles,
  code as codeStyles,
  line as lineStyles,
  highlight as highlightStyles,
} from "./styles.module.css"

const CodeBlock = (props) => {
  const code = props.children.props.children.trim()

  const languageClassName = props.children.props.className || ""
  const language = languageClassName.replace(/language-/, "")

  const fileTitle = props.title || ""

  return (
    <figure className={containerStyles}>
      {fileTitle != "" && (
        <figcaption className={fileTitleStyles}>
          <span aria-label="file">📄</span> {fileTitle}
        </figcaption>
      )}
      {language != "" &&
        <div className={languageTagStyles}>{language}</div>
      }
      <SyntaxHighlightWrapper
        code={code}
        language={language}
        theme={theme}
      >
        {({ className, tokens, getLineProps, getTokenProps }) => {
          let currentlyInHighlightedBlock = false // for highlight-start / highlight-end
          let shouldHighlightNextLine = false // for highlight-next-line

          return (
            <pre
              className={`${className} ${preStyles}`}
              tabIndex="0"
            >
              <code className={codeStyles}>
                {
                  // for each line in the code block
                  tokens.map((line, i) => {
                    let shouldHighlightLine = false

                    if (shouldHighlightNextLine) {
                      shouldHighlightLine = true
                      shouldHighlightNextLine = false
                    }

                    if (currentlyInHighlightedBlock) {
                      shouldHighlightLine = true
                    }

                    const tokensToRender = []
                    let shouldRenderLine = true
                    line.forEach(token => {
                      // for highlight-line
                      if (token.types.includes("comment") && token.content.includes("highlight-line")) {
                        shouldHighlightLine = true
                        return
                      }

                      // for highlight-start
                      if (token.types.includes("comment") && token.content.includes("highlight-start")) {
                        currentlyInHighlightedBlock = true
                        shouldRenderLine = false
                        return
                      }

                      // for highlight-end
                      if (token.types.includes("comment") && token.content.includes("highlight-end")) {
                        currentlyInHighlightedBlock = false
                        shouldRenderLine = false
                        return
                      }

                      // for highlight-next-line
                      if (token.types.includes("comment") && token.content.includes("highlight-next-line")) {
                        shouldHighlightNextLine = true
                        shouldRenderLine = false
                      }

                      tokensToRender.push(token)
                    })

                    if (!shouldRenderLine) {
                      return
                    }

                    let lineClassNames = lineStyles
                    if (shouldHighlightLine) {
                      lineClassNames = lineClassNames.concat(` ${highlightStyles}`)
                    }

                    return (
                      <div
                        {...getLineProps({ line, key: i, className: lineClassNames })}
                      >
                        {/* for each token in the line */}
                        {tokensToRender.map((token, key) => (
                          <span {...getTokenProps({ token, key })} />
                        ))}
                      </div>
                    )}
                  )
                }
              </code>
            </pre>
          )}
        }
      </SyntaxHighlightWrapper>
    </figure>
  )
}

export default CodeBlock
