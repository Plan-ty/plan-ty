import React from "react";
import { render, waitFor } from "@testing-library/react";
import VPressureDeficit from "../parameters/VPressureDeficit/VPressureDeficit";
import axios from "axios";
import ErrorBoundary from "./ErrorBoundary";

jest.mock("axios");

const mockAxiosResponse = {
  data: {
    thresholds: [
      {
        type: "vpd",
        warningMax: 80,
        warningMin: 20,
        max: 100,
        min: 10,
      },
    ],
    light: 10,
  },
};

describe("VPressureDeficit component data fetching", () => {
  beforeEach(() => {
    // Mock axios.get for fetchData function
    axios.get.mockResolvedValue(mockAxiosResponse);
  });

  test("fetches data from the correct endpoint", async () => {
    render(
      <ErrorBoundary>
        <VPressureDeficit />
      </ErrorBoundary>
    );

    // Wait for the component to call axios.get and process the data
    await waitFor(() => expect(axios.get).toHaveBeenCalled());

    // Check if axios.get was called with the correct URL
    expect(axios.get).toHaveBeenCalledWith(
      "http://localhost:5021/Plants/thresholds"
    );
  });
});

/*
describe("VPressureDeficit component", () => {
  it("fetches data from the API and sets state", async () => {
    axios.get.mockResolvedValueOnce(mockAxiosResponse);

    render(<VPressureDeficit />);

    // Check if axios.get is called with the correct URL
    expect(axios.get).toHaveBeenCalledWith(
      "https://jsonplaceholder.typicode.com/posts/1"
    );

    // Wait for the component to finish fetching data and update state
    expect(
      await screen.findByText("VAPOR PRESSURE DEFICIT")
    ).toBeInTheDocument();
    expect(await screen.findByText(/Last Fetched at:/i)).toBeInTheDocument();
  });

  it("handles API request error", async () => {
    const expectedErrorMessage = "API request failed";
    axios.get.mockRejectedValueOnce(new Error(expectedErrorMessage));

    render(<VPressureDeficit />);

    // Check if axios.get is called with the correct URL
    expect(axios.get).toHaveBeenCalledWith(
      "https://jsonplaceholder.typicode.com/posts/1"
    );
*/
/* // Check if the error message is rendered
    const errorMessage = "Error placeholder";
    const errorElement = await screen.findByText(errorMessage);
    expect(errorElement).toBeInTheDocument();*/
