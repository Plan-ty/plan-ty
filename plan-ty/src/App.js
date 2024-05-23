import "./App.css";
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
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

function App() {
  return (
    <div className="App">
      <Router>
        <div>
          <NavBar />
          <Routes>
            <Route path="/" element={<Home />}></Route>
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
            <Route path="*" element={<div>404 Not Found</div>}></Route>
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
