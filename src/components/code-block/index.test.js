import React from "react"
import { render, screen } from "@testing-library/react"

import * as runtime from 'react/jsx-runtime'
import { evaluate } from "../../../vendor/mdx"
import remarkMdxCodeMeta from '../../../vendor/remark-mdx-code-meta';

import CodeBlock from "."

describe('CodeBlock component', () => {
  it('renders', () => {

  });

  it('renders with file title', () => {
    const mdFencedCodeBlock = `
      \`\`\`js title="my-test-file.js"
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

    const MdxContent = mdxModule.default

    render(
      <MdxContent components={{pre: CodeBlock}} />
    )

    const element = screen.getByText("my-test-file.js")

    expect(element).toBeDefined()
  });

  it('renders with language tag', () => {

  });
});
