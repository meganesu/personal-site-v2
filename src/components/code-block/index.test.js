import React from "react"
import { render, screen } from "@testing-library/react"

import CodeBlock from "."

// const Title = () => (
//   <div>This is my title!</div>
// )

test("Displays the correct title", () => {
  render(
    <CodeBlock>
      ```js title="my-test-file.js"
      const test = "hey there!";
      ```
    </CodeBlock>
  )

  // render(<Title />)

  // const element = screen.getByText("This is my title!")
  const element = screen.getByText("my-test-file.js")

  expect(element).toBeDefined()
})

describe('CodeBlock component', () => {
  it('renders', () => {

  });

  it('renders with file title', () => {
    
  });

  it('renders with language tag', () => {

  });
});
