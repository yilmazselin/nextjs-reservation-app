import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import "jest-styled-components";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";

import Account from ".";

const push = jest.fn();

jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));
useRouter.mockImplementation(() => ({
  push,
  pathname: "/",
  route: "/",
  asPath: "/",
  locale: "tr",
  query: "",
}));

jest.mock("next-auth/react", () => {
  const originalModule = jest.requireActual("next-auth/react");
  const mockSession = {
    expires: "12312321",
    id: 0,
    user: { email: "test@gmail.com", locale: "tr", password: "1234" },
  };

  return {
    ...originalModule,
    useSession: jest.fn(() => ({ data: mockSession, status: "authenticated" })),
  };
});

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

describe("<Account />", () => {
  it("Should render correctly", async () => {
    const { container } = render(<Account />);

    expect(container).toMatchSnapshot();
  });

  it("The page title should be rendered correctly", async () => {
    render(<Account />);
    expect(screen.getByText(/account:title/i)).toBeInTheDocument();
  });

  it("The userCard should be rendered correctly", async () => {
    render(<Account />);
    expect(
      screen.getByText(/account:email: test@gmail.com/i)
    ).toBeInTheDocument();
    expect(screen.getByText(/account:password: 1234/i)).toBeInTheDocument();
    expect(screen.getByText(/account:locale: tr/i)).toBeInTheDocument();
  });

  it("The signout button should be rendered correctly", async () => {
    render(<Account />);
    expect(screen.getByRole("signout-button")).toBeInTheDocument();
  });

  it("Select locale simulates", async () => {
    render(<Account />);
    fireEvent.change(screen.getByTestId("select"), { target: { value: "en" } });
    expect(push).toHaveBeenCalledWith("/", "/account", { locale: "en" });
  });
});
