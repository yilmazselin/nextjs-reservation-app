import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import "jest-styled-components";
import { useTranslation } from "react-i18next";
import ProductTotal from ".";

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

describe("<ProductTotal />", () => {
  it("Should render correctly", () => {
    const { container } = render(<ProductTotal />);

    expect(container).toMatchSnapshot();
  });

  it("Should viewed the basket data", () => {
    const basket = {
      total: 100,
      taxes: 0,
      generalTotal: 50,
      currency: "TL",
    };
    render(<ProductTotal basket={basket} />);

    expect(screen.getByText(/list:totalOfProducts/)).toBeInTheDocument();
    expect(screen.getByText(/list:total: 100 TL/)).toBeInTheDocument();
    expect(screen.getByTestId("taxes")).toBeInTheDocument();
    expect(screen.getByText(/list:generalTotal: 50 TL/)).toBeInTheDocument();
  });
});
