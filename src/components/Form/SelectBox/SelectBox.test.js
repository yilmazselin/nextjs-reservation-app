import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import "jest-styled-components";
import { useTranslation } from "react-i18next";
import SelectBox from ".";
import { localeOptions } from "../../../utils/constant";

jest.mock("react-i18next", () => ({
  useTranslation: jest.fn(),
}));

const tSpy = jest.fn((str) => str);
const useTranslationSpy = useTranslation;

useTranslationSpy.mockReturnValue({
  t: tSpy,
  i18n: {
    changeLanguage: () => new Promise(() => {}),
  },
});

describe("<SelectBox />", () => {
  it("Should render correctly", () => {
    const { container } = render(<SelectBox />);

    expect(container).toMatchSnapshot();
  });

  it("Should have the correct label", () => {
    render(<SelectBox id="test-select" label="Test Select" />);
    expect(screen.getByLabelText("Test Select")).toBeInTheDocument();
  });

  it("Selection simulates", () => {
    render(<SelectBox options={localeOptions} />);

    expect(tSpy).toHaveBeenCalledTimes(2);

    fireEvent.change(screen.getByTestId("select"), { target: { value: "tr" } });

    const options = screen.getAllByTestId("select-option");

    expect(options[0].selected).toBeTruthy();
    expect(options[1].selected).toBeFalsy();
  });

  it("Should call changeHandler onChange on selectbox", () => {
    const mockHandler = jest.fn();

    render(<SelectBox onChange={mockHandler} options={localeOptions} />);
    fireEvent.change(screen.getByTestId("select"), { target: { value: "tr" } });
    expect(mockHandler.mock.calls.length).toBe(1);
  });
});
