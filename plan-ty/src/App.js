import "./App.css";
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NavBar from "./components/navBar/NavBar";
import WaterTemp from "./components/parameters/waterTemp/WaterTemp";
import FlowRate from "./components/parameters/flowRate/FlowRate";
import ElectricConduc from "./components/parameters/electricConduc/ElectricConduc";
import PHLevels from "./components/parameters/pH/pHLevels";
import AirHumidity from "./components/parameters/airHumidity/AirHumidity";
import Home from "./components/home/Home";
import AirTemp from "./components/parameters/airTemp/AirTemp";
import WaterLevel from "./components/parameters/waterLevel/WaterLevel";

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
            <Route path="/airTemp" element={<AirTemp />} />
            <Route path="/waterLevel" element={<WaterLevel />} />
            <Route path="/airHumidity" element={<AirHumidity />} />
            <Route path="*" element={<div>404 Not Found</div>}></Route>
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
