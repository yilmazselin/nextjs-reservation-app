import "@testing-library/jest-dom"
import {
  act,
  fireEvent,
  render,
  screen,
  waitFor
} from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import "jest-styled-components"
import { useTranslation } from "react-i18next"
import SignupForm from "./SignupForm"

jest.mock("react-i18next", () => ({
  useTranslation: jest.fn()
}))

const tSpy = jest.fn((str) => str)

useTranslation.mockReturnValue({
  t: tSpy,
  i18n: {
    changeLanguage: () => new Promise(() => {})
  }
})

describe("<SignupForm />", () => {
  it("should render the form fields correctly", () => {
    const { container } = render(<SignupForm onSubmit={false} />)

    expect(container).toMatchSnapshot()
    expect(screen.getByLabelText(/common:labels.email/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/common:labels.password/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/common:labels.locale/i)).toBeInTheDocument()
    const button = screen.getByRole("submit-button")

    expect(button).toBeInTheDocument()
    expect(button).toBeDisabled()
  })

  it("should submit the form data correctly", async () => {
    const handleSubmit = jest.fn()

    render(<SignupForm onSubmit={handleSubmit} />)
    const user = userEvent.setup()

    const email = screen.getByLabelText(/common:labels.email/i)
    const password = screen.getByLabelText(/common:labels.password/i)
    const locale = screen.getByLabelText(/common:labels.locale/i)
    const submitButton = screen.getByRole("submit-button")

    await user.type(email, "test@gmail.com")
    await user.type(password, "123456")
    act(() => {
      fireEvent.change(locale, {
        target: {
          value: "en"
        }
      })
    })
    await user.click(submitButton)
    expect(submitButton).toBeDisabled()

    await waitFor(() => expect(handleSubmit).toHaveBeenCalledWith({
      email: "test@gmail.com",
      password: "123456",
      locale: "en"
    }))
  })
})
