import React from "react";
import MotorToggle from "../motorToggle/MotorToggle";
import Dashboard from "../widgets/Dashboard";
import EnergyUsage from "../energyUsage/EnergyUsage";

const Home = () => {
  return (
    <div id="home">
      <h1>Welcome to the Home Page</h1>
      <div className="homeContainer">
      <MotorToggle />
      <EnergyUsage />
      </div>
      <Dashboard />
    </div>
  );
};

export default Home;
