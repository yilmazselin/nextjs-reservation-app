import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import "jest-styled-components";
import { useTranslation } from "react-i18next";
import ProductCard from ".";

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

jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useDispatch: () =>
    jest.fn().mockImplementation(() => Promise.resolve({ title: "test" })),
}));

describe("<ProductCard />", () => {
  it("Should render correctly", () => {
    const { container } = render(<ProductCard image="/background.svg" />);

    expect(container).toMatchSnapshot();
  });

  it("Should viewed the product data", () => {
    const data = {
      id: 0,
      name: "Villa Bosphorus",
      description: "Lorem ipsum dolor sit amet",
      image: "/background.svg",
      rate: "5.0",
      distance: "3.7 km",
      price: "20.000",
      currency: "TL",
    };
    render(<ProductCard {...data} />);

    expect(screen.getByText(/Villa Bosphorus/)).toBeInTheDocument();
    expect(screen.getByText(/Lorem ipsum dolor sit amet/)).toBeInTheDocument();
    expect(screen.getByText(/5.0/)).toBeInTheDocument();
    expect(screen.getByText(/3.7 km/)).toBeInTheDocument();
    expect(screen.getByText(/20.000/)).toBeInTheDocument();
    expect(screen.getByText(/TL/)).toBeInTheDocument();
  });
});
