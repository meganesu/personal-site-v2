import React from "react"

import { Highlight as SyntaxHighlightWrapper } from "prism-react-renderer"
import { themes } from "prism-react-renderer"
const theme = themes.nightOwl

import {
  container as containerStyles,
  fileTitle as fileTitleStyles,
  languageTag as languageTagStyles,
  preWrapper as preWrapperStyles,
  pre as preStyles,
  code as codeStyles,
  highlight as highlightStyles,
} from "./styles.module.css"

const CodeBlock = (props) => {
  const code = props.children.props.children.trim()

  const className = props.children.props.className || ""
  const language = className.replace(/language-/, "")

  const fileTitle = props.title || ""

  return (
    <div className={containerStyles}>
      {fileTitle != "" && (
        <div className={fileTitleStyles}>
          <span aria-label="file">📄</span> {fileTitle}
        </div>
      )}
      {language && <div className={languageTagStyles}>{language}</div>}
      <div className={preWrapperStyles}>
        <SyntaxHighlightWrapper
          code={code}
          language={language}
          theme={theme}
        >
          {({ className, tokens, getLineProps, getTokenProps }) => (
            <pre className={`${className} ${preStyles}`}>
              {/* for each line in the code */}
              {tokens.map((line, i) => (
                <code
                  {...getLineProps({ line, key: i })}
                  className={codeStyles}
                >
                  {/* for each token in the line */}
                  {line.map((token, key) => (
                    <span {...getTokenProps({ token, key })} />
                  ))}
                </code>
              ))}
            </pre>
          )}
        </SyntaxHighlightWrapper>
      </div>
    </div>
  )
}

export default CodeBlock
