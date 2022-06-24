import React from 'react'

import Highlight, { defaultProps } from "prism-react-renderer"
import theme from "prism-react-renderer/themes/nightOwl"

const CodeBlock = props => {
  console.log("CODE BLOCK PROPS", props);
  const className = props.children.props.className || "";
  const code = props.children.props.children.trim();
  const language = className.replace(/language-/, "");

  const fileTitle = props.children.props.title

  return (
    <div
      style={{
        background: "#011627",
        color: "white",
        margin: "1.5rem 0",
        fontFamily: "monospace",
        fontSize: "1rem",
      }}
    >
    { fileTitle &&
      <div
        style={{
          borderBottom: "1px solid #5f7e97",
          padding: "0.75rem",
          background: "#0b2942",
          zIndex: "10",
        }}
      >
        <span aria-label="file">📄</span> {fileTitle}
      </div>
    }
    { language &&
      <div
        style={{
          background: "#6449a3",
          padding: "0.25rem 0.75rem",
          marginLeft: "1rem",
          borderRadius: "0 0 5px 5px",
          display: "inline-block",
        }}
      >
        {language}
      </div>
    }
    <div
      style={{
        overflow: "auto",
        paddingRight: "1rem",
      }}
    >
      <Highlight {...defaultProps} code={code} language={language} theme={theme}>
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <pre
            className={className}
            style={{
              ...style,
              marginLeft: "1rem",
            }}
          >
            {tokens.map((line, i) => (
              <div {...getLineProps({ line, key: i })}>
                {line.map((token, key) => (
                  <span {...getTokenProps({ token, key })} />
                ))}
              </div>
            ))}
          </pre>
        )}
      </Highlight>
    </div>
  </div>
  );
}

export default CodeBlock