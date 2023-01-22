import React from "react"
import { render } from "@testing-library/react"

// You have to write data-testid
const Title = () => <h1 data-testid="hero-title">Gatsby is awesome!</h1>

test("Displays the correct title", () => {
  const { getByTestId } = render(<Title />)
  // Assertion
  expect(getByTestId("hero-title")).toHaveTextContent("Gatsby is awesome!")
  // --> Test will pass
})

describe('CodeBlock component', () => {
  it('renders', () => {

  });

  it('renders with file title', () => {
    console.log('running a test')
  });

  it('renders with language tag', () => {

  });
});
