import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import LensImage from "../LensImage/LensImage";

describe("LensImage component", () => {
  it("renders correctly with alt text", () => {
    render(<LensImage src="image.jpg" alt="Test Image" />);
    const image = screen.getByAltText("Test Image");
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute("src", "image.jpg");
  });

  it("passes additional props to the underlying img element", () => {
    render(
      <LensImage src="image.jpg" alt="Test Image" className="custom-class" />
    );
    const image = screen.getByAltText("Test Image");
    expect(image).toHaveClass("custom-class");
  });

  it("applies styling correctly", () => {
    render(<LensImage src="image.jpg" alt="Test Image" />);
    const image = screen.getByAltText("Test Image");
    expect(image).toHaveStyle(`
      max-width: 15%;
      height: auto;
      margin-bottom: 20px;
      border-radius: 8px;
      box-shadow: 0 2px 6px rgba(0,0,0,0.1);
    `);
  });

  it("forwards ref to the underlying img element", () => {
    const ref = React.createRef<HTMLImageElement>();
    render(<LensImage src="image.jpg" alt="Test Image" ref={ref} />);
    expect(ref.current).toBeInTheDocument();
    expect(ref.current?.tagName).toBe("IMG");
  });

  it("handles user interaction correctly", () => {
    const handleClick = jest.fn();
    render(
      <LensImage src="image.jpg" alt="Test Image" onClick={handleClick} />
    );
    const image = screen.getByAltText("Test Image");
    userEvent.click(image);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
