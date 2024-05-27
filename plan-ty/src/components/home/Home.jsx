import React from "react";
import MotorToggle from "../motorToggle/MotorToggle";
import Dashboard from "../widgets/Dashboard";

const Home = () => {
  return (
    <div id="home">
      <h1>Welcome to the Home Page</h1>
      <MotorToggle />
      <Dashboard />
    </div>
  );
};

export default Home;
