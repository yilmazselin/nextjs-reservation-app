import "@testing-library/jest-dom"
import { fireEvent, render, screen } from "@testing-library/react"
import renderer from "react-test-renderer"
import Button from "./Button"
import "jest-styled-components"
import { colors } from "../../utils/styles"

describe("<Button />", () => {
  it("Should render correctly", () => {
    const component = renderer.create(<Button />)
    const tree = component.toJSON()

    expect(tree).toMatchSnapshot()
  })

  test("Should have background color='primary' when color='primary' prop exists", () => {
    const tree = renderer.create(<Button color="primary" />).toJSON()

    expect(tree).toMatchSnapshot()
    expect(tree).toHaveStyleRule("background-color", colors.red)
  })

  test("Should render a disabled button", () => {
    render(<Button children="Disabled" disabled />)
    const button = screen.getByText("Disabled")

    expect(button).toMatchSnapshot()
    expect(button).toHaveStyleRule("background-color", colors.disabled)
    expect(button).toBeDisabled()
  })

  test("button click event test", () => {
    let count = 0
    const setCount = (newCount) => {
      count = newCount
    }

    render(<Button children="Click" onClick={() => setCount(1)} />)
    const button = screen.getByText("Click")

    fireEvent.click(button)
    expect(count = 1)
  })
})
