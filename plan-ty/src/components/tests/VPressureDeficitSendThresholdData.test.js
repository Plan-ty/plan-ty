import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import VPressureDeficit from "../parameters/VPressureDeficit/VPressureDeficit";
//import "@testing-library/jest-dom/extend-expect";

const mock = new MockAdapter(axios);

describe("VPressureDeficit Component", () => {
  beforeEach(() => {
    mock.reset();
  });

  test("renders without crashing", () => {
    render(<VPressureDeficit />);
    expect(screen.getByText(/VAPOR PRESSURE DEFICIT/i)).toBeInTheDocument();
  });

  test("displays last fetched data", async () => {
    mock.onGet("http://localhost:5021/Plants").reply(200, { light: 1.5 });
    render(<VPressureDeficit />);
    expect(await screen.findByText(/kPa/i)).toBeInTheDocument();
  });

  test("sends warning thresholds data", async () => {
    mock.onPatch("http://localhost:5021/Plants/thresholds").reply(200, {});
    render(<VPressureDeficit />);
    //no proper labels in code. therefore I used text from id: ! Naming convention: Danger and Warning uses the same id:uper and lower.
    fireEvent.change(screen.getByLabelText(/upper/i), {
      target: { value: "2.0" },
    });
    fireEvent.change(screen.getByLabelText(/lower/i), {
      target: { value: "0.5" },
    });
    fireEvent.click(screen.getByText(/setLowerWarningInput/i));
    await waitFor(() => expect(mock.history.patch.length).toBe(1));
    expect(mock.history.patch[0].data).toEqual(
      JSON.stringify({
        type: "vpd",
        warningMax: "2.0",
        warningMin: "0.5",
        max: null,
        min: null,
      })
    );
  });
});
