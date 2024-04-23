import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import Button from "../Button/Button";

describe("Button component", () => {
  test("renders children when not loading", () => {
    const { getByText } = render(<Button>Click me</Button>);
    expect(getByText("Click me")).toBeInTheDocument();
  });

  test("button is disabled when loading", () => {
    const { getByText } = render(<Button loading>Click me</Button>);
    const button = getByText((content, element) => {
      return element?.tagName.toLowerCase() === "button";
    });
    expect(button).toBeDisabled();
  });

  test("calls onClick handler when clicked", () => {
    const onClickMock = jest.fn();
    const { getByText } = render(
      <Button onClick={onClickMock}>Click me</Button>
    );
    fireEvent.click(getByText("Click me"));
    expect(onClickMock).toHaveBeenCalled();
  });

  test("button is disabled when loading", () => {
    const onClickMock = jest.fn();
    const { getByText } = render(
      <Button loading onClick={onClickMock}>
        Click me
      </Button>
    );
    const button = getByText((content, element) => {
      return element?.tagName.toLowerCase() === "button";
    });
    expect(button).toBeDisabled();
    fireEvent.click(button);
    expect(onClickMock).not.toHaveBeenCalled();
  });
});
