import React from "react"
import { render, screen } from "@testing-library/react"

import * as runtime from 'react/jsx-runtime'
import { evaluate } from "../../../vendor/mdx"
import remarkMdxCodeMeta from '../../../vendor/remark-mdx-code-meta';

import CodeBlock from "."

describe('CodeBlock component', () => {
  let MdxContent;

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
  });

  it('renders with file title', () => {
    render(
      <MdxContent components={{pre: CodeBlock}} />
    )

    const element = screen.getByText("my-test-file.js")

    expect(element).toBeDefined()
  });

  it('renders with language tag', () => {
    render(
      <MdxContent components={{pre: CodeBlock}} />
    )

    const element = screen.getByText("javascript")

    expect(element).toBeDefined()
  });
});

describe('CodeBlock component with line highlighting', () => {
  
  it('supports highlight-line', async () => {
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
    const mdxModule = await evaluate(
      mdFencedCodeBlock,
      {
        ...runtime,
        development: false,
        remarkPlugins: [remarkMdxCodeMeta],
      }
    )
      
    MdxContent = mdxModule.default

    // When the MDX code block is rendered
    render(
      <MdxContent components={{pre: CodeBlock}} />
    )

    // Then the highlight class is applied to the correct lines
    const codeElements = screen.getAllByRole("code")

    expect(codeElements[0].classList.contains("highlight")).toBe(true)
    expect(codeElements[1].classList.contains("highlight")).toBe(false)
    expect(codeElements[2].classList.contains("highlight")).toBe(true)
    expect(codeElements[3].classList.contains("highlight")).toBe(true)
    expect(codeElements[4].classList.contains("highlight")).toBe(false)
    expect(codeElements[5].classList.contains("highlight")).toBe(false)
  })

  it.todo('supports highlight-start and highlight-end')

  it.todo('supports highlight-next-line')
})
