import React from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import Dropdown from "react-bootstrap/Dropdown";

function DropDown() {
  return (
    <div style={{}}>
      <Dropdown>
        <Dropdown.Toggle
          style={{ backgroundColor: "#96C5C0", border: "none", color: "black" }}
        >
          Parameters
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item as={Link} to="/waterTemp" data-cy="temp">
            Water Temperature
          </Dropdown.Item>
          <Dropdown.Item as={Link} to="/flowRate" data-cy="flow">
            Water Flow Rate
          </Dropdown.Item>
          <Dropdown.Item as={Link} to="/pH" data-cy="ph">
            Water pH Level
          </Dropdown.Item>
          <Dropdown.Item as={Link} to="/waterLevel">
            Water Level
          </Dropdown.Item>
          <Dropdown.Item as={Link} to="/electricConduc" data-cy="ec">
            Electric Conductivity
          </Dropdown.Item>
          <Dropdown.Item as={Link} to="/airTemperature">
            Air Temperature
          </Dropdown.Item>
          <Dropdown.Item as={Link} to="/airHumidity">
            Air Humidity
          </Dropdown.Item>
          <Dropdown.Item as={Link} to="/dewPoint">
            Dew Point
          </Dropdown.Item>
          <Dropdown.Item as={Link} to="/ec">
            EC
          </Dropdown.Item>
          <Dropdown.Item as={Link} to="/co2">
            CO2
          </Dropdown.Item>
          <Dropdown.Item as={Link} to="/lightLevels">
            Light Levels
          </Dropdown.Item>
          <Dropdown.Item as={Link} to="/VPressureDeficit">
            Vapor Pressure Deficit
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
}

export default DropDown;
