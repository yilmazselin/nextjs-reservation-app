import "@testing-library/jest-dom"
import { fireEvent, render, screen } from "@testing-library/react"
import "jest-styled-components"
import Input from "."

describe("<Input />", () => {
  it("Should render correctly", () => {
    render(<Input id="test-input" label="Test Input" />)
    const input = screen.getByLabelText("Test Input")

    expect(input).toMatchSnapshot()
  })

  it("Should call changeHandler onChange on input", () => {
    const mockHandler = jest.fn()

    render(<Input id="test-input" label="Test Input" onChange={mockHandler} />)
    const input = screen.getByLabelText("Test Input")

    fireEvent.change(input, {
      target: { value: "Message" }
    })

    expect(mockHandler.mock.calls.length).toBe(1)
  })
})
