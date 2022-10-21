import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import { useTranslation } from "react-i18next";
import * as nextRouter from "next/router";
import "jest-styled-components";
import TabBar from ".";

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

jest.mock(
  "next/link",
  () =>
    ({ children }) =>
      children
);
nextRouter.useRouter = jest.fn();
nextRouter.useRouter.mockImplementation(() => ({ route: "/account" }));

describe("<TabBar />", () => {
  it("should render correctly", () => {
    const { container } = render(<TabBar />);
    expect(container).toMatchSnapshot();
  });
  it("should render csdsdsorrectly", () => {
    const push = jest.fn();

    render(<TabBar />);
    const mytest = screen.getByTestId("tab-account");
    fireEvent.click(mytest);
  });
});
