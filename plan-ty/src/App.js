import "./App.css";
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NavBar from "./components/navBar/NavBar";
import WaterTemp from "./components/parameters/waterTemp/WaterTemp";
import FlowRate from "./components/parameters/flowRate/FlowRate";
import ElectricConduc from "./components/parameters/electricConduc/ElectricConduc";
import PHLevels from "./components/parameters/pH/pHLevels";
import WaterLevel from "./components/parameters/waterLevel/WaterLevel";
import Home from "./components/home/Home";

function App() {
  return (
    <div className="App">
      <Router>
        <div>
          <NavBar />
          <Routes>
            <Route path="/plan-ty" element={<Home />}></Route>
            <Route path="/plan-ty/waterTemp" element={<WaterTemp />} />
            <Route path="/plan-ty/flowRate" element={<FlowRate />} />
            <Route path="/plan-ty/electricConduc" element={<ElectricConduc />} />
            <Route path="/plan-ty/pH" element={<PHLevels />} />
            <Route path="/plan-ty/waterLevel" element={<WaterLevel />} />
            <Route path="*" element={<div>404 Not Found</div>}></Route>
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
