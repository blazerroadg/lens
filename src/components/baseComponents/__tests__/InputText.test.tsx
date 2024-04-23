import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";

import InputText from "../InputText/InputText";

describe("InputText component", () => {
  it("renders without crashing", () => {
    render(<InputText />);
  });

  it("renders with placeholder text", () => {
    const { getByPlaceholderText } = render(
      <InputText placeholder="Enter text" />
    );
    expect(getByPlaceholderText("Enter text")).toBeInTheDocument();
  });

  it("calls onChange handler", () => {
    const handleChange = jest.fn();
    const { getByPlaceholderText } = render(
      <InputText placeholder="Enter text" onChange={handleChange} />
    );
    const input = getByPlaceholderText("Enter text");

    fireEvent.change(input, { target: { value: "Test" } });
    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  it("applies styles correctly", () => {
    const { container } = render(<InputText />);
    const input = container.querySelector("input");

    expect(input).toHaveStyle(`
      padding: 10px;
      margin: 5px;
      background: transparent;
      border: none;
      outline: none;
      width: 100%;
    `);
  });
});
