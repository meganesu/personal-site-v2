import React from "react"
import { render, screen } from "@testing-library/react"

import * as runtime from "react/jsx-runtime"
import { evaluate } from "../../../vendor/mdx"
import remarkMdxCodeMeta from "../../../vendor/remark-mdx-code-meta"

import CodeBlock from "."

describe("CodeBlock component", () => {
  let MdxContent

  beforeAll(async () => {
    const mdFencedCodeBlock = `
      \`\`\`javascript title="my-test-file.js"
      const test = "hey there!"
      \`\`\`
    `

    const mdxModule = await evaluate(
      mdFencedCodeBlock,
      {
        ...runtime,
        development: false,
        remarkPlugins: [remarkMdxCodeMeta],
      }
    )

    MdxContent = mdxModule.default
  })

  it("renders with file title", () => {
    render(<MdxContent components={{ pre: CodeBlock }} />)

    const element = screen.getByText("my-test-file.js")

    expect(element).toBeDefined()
  })

  it("renders with language tag", () => {
    render(<MdxContent components={{ pre: CodeBlock }} />)

    const element = screen.getByText("javascript")

    expect(element).toBeDefined()
  })
})

describe("CodeBlock component with line highlighting", () => {
  it("supports highlight-line", async () => {
    // Given an MDX code block using highlight-line
    const mdFencedCodeBlock = `
    \`\`\`javascript
    const greeting = "Howdy" // highlight-line
    
    const name = "Megan" // highlight-line
    console.log(greeting, ", my name is ", name) // highlight-line
    
    return true
    \`\`\`
    `

    let MdxContent
    const mdxModule = await evaluate(mdFencedCodeBlock, {
      ...runtime,
      development: false,
      remarkPlugins: [remarkMdxCodeMeta],
    })

    MdxContent = mdxModule.default

    // When the MDX code block is rendered
    render(<MdxContent components={{ pre: CodeBlock }} />)

    // Then the highlight class is applied to the correct lines
    const codeElement = screen.getByRole("code")
    const lines = codeElement.children

    expect(lines.length).toBe(6)

    expect(lines[0].classList.contains("highlight")).toBe(true)
    expect(lines[1].classList.contains("highlight")).toBe(false)
    expect(lines[2].classList.contains("highlight")).toBe(true)
    expect(lines[3].classList.contains("highlight")).toBe(true)
    expect(lines[4].classList.contains("highlight")).toBe(false)
    expect(lines[5].classList.contains("highlight")).toBe(false)
  })

  it("supports highlight-start and highlight-end", async () => {
    // Given an MDX code block using highlight-start and highlight-end
    const mdFencedCodeBlock = `
    \`\`\`javascript
    const greeting = "Howdy"

    // highlight-start
    const name = "Megan"
    console.log(greeting, ", my name is ", name)
    // highlight-end

    return true
    \`\`\`
    `

    let MdxContent
    const mdxModule = await evaluate(mdFencedCodeBlock, {
      ...runtime,
      development: false,
      remarkPlugins: [remarkMdxCodeMeta],
    })

    MdxContent = mdxModule.default

    // When the MDX code block is rendered
    render(<MdxContent components={{ pre: CodeBlock }} />)

    // Then the highlight class is applied to the correct lines
    const codeElement = screen.getByRole("code")
    const lines = codeElement.children

    expect(lines[0].classList.contains("highlight")).toBe(false)
    expect(lines[1].classList.contains("highlight")).toBe(false)
    expect(lines[2].classList.contains("highlight")).toBe(true)
    expect(lines[3].classList.contains("highlight")).toBe(true)
    expect(lines[4].classList.contains("highlight")).toBe(false)
    expect(lines[5].classList.contains("highlight")).toBe(false)

    // And the highlight-begin / highlight-end lines aren't rendered
    expect(lines.length).toBe(6)
  })

  it("supports highlight-next-line", async () => {
    // Given an MDX code block using highlight-next-line
    const mdFencedCodeBlock = `
    \`\`\`javascript
    const greeting = "Howdy"

    // highlight-next-line
    const name = "Megan"
    console.log(greeting, ", my name is ", name)

    // highlight-next-line
    return true
    \`\`\`
    `

    let MdxContent
    const mdxModule = await evaluate(mdFencedCodeBlock, {
      ...runtime,
      development: false,
      remarkPlugins: [remarkMdxCodeMeta],
    })

    MdxContent = mdxModule.default

    // When the MDX code block is rendered
    render(<MdxContent components={{ pre: CodeBlock }} />)

    // Then the highlight class is applied to the correct lines
    const codeElement = screen.getByRole("code")
    const lines = codeElement.children

    expect(lines[0].classList.contains("highlight")).toBe(false)
    expect(lines[1].classList.contains("highlight")).toBe(false)
    expect(lines[2].classList.contains("highlight")).toBe(true)
    expect(lines[3].classList.contains("highlight")).toBe(false)
    expect(lines[4].classList.contains("highlight")).toBe(false)
    expect(lines[5].classList.contains("highlight")).toBe(true)

    // And the highlight-next-line lines aren't rendered
    expect(lines.length).toBe(6)
  })
})
