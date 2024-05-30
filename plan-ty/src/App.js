import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import NavBar from "./components/navBar/NavBar";
import WaterTemp from "./components/parameters/waterTemp/WaterTemp";
import FlowRate from "./components/parameters/flowRate/FlowRate";
import ElectricConduc from "./components/parameters/electricConduc/ElectricConduc";
import PHLevels from "./components/parameters/pH/pHLevels";
import AirHumidity from "./components/parameters/airHumidity/AirHumidity";
import DewPoint from "./components/parameters/dewPoint/DewPoint";
import Home from "./components/home/Home";
import AirTemp from "./components/parameters/airTemp/AirTemp";
import WaterLevel from "./components/parameters/waterLevel/WaterLevel";
import CO2 from "./components/parameters/co2/CO2";
import LightLevels from "./components/parameters/lightLevels/LightLevels";
import VPressureDeficit from "./components/parameters/VPressureDeficit/VPressureDeficit";
import Login from "./components/auth/Login";

function App() {
  const [token, setToken] = useState(sessionStorage.getItem("jwt"));
  const [isAuthenticated, setIsAuthenticated] = useState(!!token); // Update isAuthenticated based on token presence

  useEffect(() => {
    const token = sessionStorage.getItem("jwt");
    console.log('Token from sessionStorage:', token); // Debug log
    setIsAuthenticated(!!token);
    const fetchProtectedData = async () => {
      if (token) {
        try {
          const response = await fetch("http://localhost:3000/protected", {
            headers: { Authorization: `Bearer ${token}` },
          });
          if (response.ok) {
            setIsAuthenticated(true);
          } else {
            setIsAuthenticated(false);
            sessionStorage.removeItem("jwt");
            setToken(null);
          }
        } catch (error) {
          console.error("Failed to fetch protected data", error);
          setIsAuthenticated(false);
        }
      }
    };
    fetchProtectedData();
  }, [token]);

  console.log(isAuthenticated);

  return (
    <div className="App">
      <Router>
        <NavBar setToken={setToken} />
        <Routes>
          <Route path="/login" element={<Login setToken={setToken} />} />
          {!isAuthenticated && <Route path="*" element={<Navigate to="/login" replace />} />}
          {isAuthenticated && (
            <>
              <Route path="/home" element={<Home />} />
              <Route path="/waterTemp" element={<WaterTemp />} />
              <Route path="/flowRate" element={<FlowRate />} />
              <Route path="/electricConduc" element={<ElectricConduc />} />
              <Route path="/pH" element={<PHLevels />} />
              <Route path="/airTemperature" element={<AirTemp />} />
              <Route path="/waterLevel" element={<WaterLevel />} />
              <Route path="/airHumidity" element={<AirHumidity />} />
              <Route path="/dewPoint" element={<DewPoint />} />
              <Route path="/co2" element={<CO2 />} />
              <Route path="/lightLevels" element={<LightLevels />} />
              <Route path="/VPressureDeficit" element={<VPressureDeficit />} />
              <Route path="*" element={<Navigate to="/home" replace />} />
            </>
          )}
        </Routes>
      </Router>
    </div>
  );
}

export default App;