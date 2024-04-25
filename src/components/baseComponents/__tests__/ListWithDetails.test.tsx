import { render, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";

import ListWithDetails from "../../composeComponents/ListWithDetails/ListWithDetails";

const mockData = [
  { name: "Repo 1", forks_count: 5 },
  { name: "Repo 2", forks_count: 10 },
] as any;

const mockFetchDetails = jest.fn().mockResolvedValue([]);

describe("ListWithDetails component", () => {
  it("renders correctly with initial data", () => {
    const { getByText } = render(
      <ListWithDetails data={mockData} fetchDetails={mockFetchDetails} />
    );

    expect(getByText("Repo 1")).toBeInTheDocument();
    expect(getByText("Repo 2")).toBeInTheDocument();

    expect(getByText("Count: 5")).toBeInTheDocument();
    expect(getByText("Count: 10")).toBeInTheDocument();
  });

 

  it("collapses details when clicking on collapse icon", async () => {
    const { getByTestId, queryByText } = render(
      <ListWithDetails data={mockData} fetchDetails={mockFetchDetails} />
    );

    fireEvent.click(getByTestId("expand-icon-0"));
    fireEvent.click(getByTestId("expand-icon-0"));
    await waitFor(() => {
      expect(queryByText("Details for Repo 1")).not.toBeInTheDocument();
    });
  });
});
