import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import "jest-styled-components";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import List from "./index";

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
  useSelector: jest.fn().mockReturnValue([
    {
      id: 0,
      name: "Villa Bosphorus",
      description: "Lorem ipsum dolor sit amet",
      image: "/background.svg",
      rate: "5.0",
      distance: "3.7 km",
      price: 20000,
      currency: "TL",
    },
  ]),
  useDispatch: () => jest.fn().mockImplementation(() => Promise.resolve()),
}));

describe("<List />", () => {
  afterEach(() => {
    useSelector.mockClear();
  });

  it("Should render correctly", () => {
    const { container } = render(<List />);
    expect(container).toMatchSnapshot();
  });

  it("Add to cart click event", async () => {
    render(<List />);

    const addBasketButton = screen.getByTestId("add-basket");
    expect(addBasketButton).toHaveTextContent(/list:addBasket/);
    fireEvent.click(addBasketButton);
    expect(addBasketButton).not.toHaveTextContent(/list:addBasket/);
    const removeBasketButton = screen.getByTestId("remove-basket");
    expect(removeBasketButton).toBeInTheDocument();
  });
});
