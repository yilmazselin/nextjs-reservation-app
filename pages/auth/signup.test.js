import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import "jest-styled-components";
import { useSession } from "next-auth/react";
import { useTranslation } from "react-i18next";
import Signup from "./signup";

jest.mock("next-auth/react");
jest.mock("react-i18next", () => ({
  useTranslation: jest.fn(),
}));

const tSpy = jest.fn((str) => str);

useTranslation.mockReturnValue({
  t: tSpy,
  i18n: {
    changeLanguage: () => new Promise(() => {}),
  },
});

describe("Signup page test", () => {
  it("Should render signup page correctly", async () => {
    const mockSession = undefined;

    useSession.mockReturnValueOnce([mockSession, false]);
    const { container } = render(<Signup />);

    expect(container).toMatchSnapshot();

    const pageTitle = screen.getByText(/auth:signup-title/i);
    const emailInput = screen.getByLabelText(/common:labels.email/i);
    const passwordInput = screen.getByLabelText(/common:labels.password/i);
    const localeSelect = screen.getByLabelText(/common:labels.locale/i);
    const submitButton = screen.getByRole("submit-button");
    const tabBarListButton = screen.getByText(/common:tabbar.list/i);
    const tabBarAccountButton = screen.getByText(/common:tabbar.account/i);

    expect(pageTitle).toBeInTheDocument();
    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(localeSelect).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
    expect(submitButton).toBeDisabled();
    expect(tabBarListButton).toBeInTheDocument();
    expect(tabBarAccountButton).toBeInTheDocument();
  });
});
