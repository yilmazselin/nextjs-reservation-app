import "@testing-library/jest-dom"
import { render, screen } from "@testing-library/react"
import "jest-styled-components"
import Text from "."

describe("<Text />", () => {
  it("should render correctly", () => {
    const { container } = render(<Text children="Hello" />)

    expect(container).toMatchSnapshot()
  })

  it("should have custom CSSProps", () => {
    render(<Text
      children="Hello"
      params={{ color: "red",
        fontSize: 24 }}
    />)
    const text = screen.getByText("Hello")

    expect(text).toHaveStyle({
      color: "red",
      fontSize: 24
    })
  })
})
