import "@testing-library/jest-dom"
import { render, screen } from "@testing-library/react"
import "jest-styled-components"
import Icon from "."

describe("<Icon />", () => {
  render(<Icon icon="list" style={{ marginTop: "20px" }} />)
  const icon = screen.getByTestId("svg-icon")

  it("Should render correctly", () => {
    expect(icon).toBeVisible()
  })

  it("should have custom CSSProps", () => {
    expect(icon).toHaveStyle({
      marginTop: "20px"
    })
  })
})
