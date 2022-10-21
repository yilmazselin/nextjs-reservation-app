import "@testing-library/jest-dom"
import { render, screen } from "@testing-library/react"
import "jest-styled-components"
import { useTranslation } from "react-i18next"
import UserCard from "."

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

describe("<UserCard />", () => {
  it("Should render correctly", () => {
    const { container } = render(<UserCard />)

    expect(container).toMatchSnapshot()
  })

  it("Should viewed the user data", () => {
    const data = {
      user: {
        email: "test@gmail.com",
        password: "1234",
        locale: "tr"
      }
    }

    render(<UserCard currentLocale={data.user.locale} data={data} />)

    expect(screen.getByText(/account:email: test@gmail.com/i)).toBeInTheDocument()
    expect(screen.getByText(/account:password: 1234/i)).toBeInTheDocument()
    expect(screen.getByText(/account:locale: tr/i)).toBeInTheDocument()
  })
})
