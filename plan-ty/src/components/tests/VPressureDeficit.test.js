import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import VPressureDeficit from "../parameters/VPressureDeficit/VPressureDeficit";
import axios from "axios";

//const axios = require("axios"); // Mock axios
// Mock axios POST requests
jest.mock("axios");

// Sample plant data for testing
const mockPlantData = {
  light: 10, // Sample plant light data
};

// Mock axios response
const mockAxiosResponse = {
  data: mockPlantData,
};

describe("VPressureDeficit component", () => {
  beforeEach(() => {
    // Mock axios.get for fetchData function
    axios.get.mockResolvedValue(mockAxiosResponse);
  });

  test("renders the component properly", async () => {
    render(<VPressureDeficit />);

    // Use screen.findByText directly
    const lastFetchedElement = await screen.findByText(/Last Fetched at:/i);
    expect(lastFetchedElement).toBeInTheDocument();

    // Check if the component renders without errors
    expect(screen.getByText("VAPOR PRESSURE DEFICIT")).toBeInTheDocument();

    // Wait for the data to be fetched
    await screen.findByText(() =>
      expect(screen.getByText(/Last Fetched at:/i)).toBeInTheDocument()
    );
  });

  test("sends data when sendData button is clicked", async () => {
    render(<VPressureDeficit />);

    // Mock axios.post for sendData function
    axios.post.mockResolvedValueOnce({}); // Mock successful response

    // Simulate user input and button click
    fireEvent.change(screen.getByPlaceholderText("Enter your data"), {
      target: { value: "sampleData" },
    });
    fireEvent.click(screen.getByText("Send Data"));

    // Check if axios.post is called with correct data
    expect(axios.post).toHaveBeenCalledWith(
      "http://192.168.156.250:5021/Plants/1/light",
      "sampleData"
    );

    // Wait for the data to be sent and processed
    await screen.findByText(() =>
      expect(screen.getByText("Data sent successfully:")).toBeInTheDocument()
    );
  });

  // Add more tests for other functionalities such as setting thresholds, toggling notifications, etc.
});
