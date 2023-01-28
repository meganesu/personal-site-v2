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
