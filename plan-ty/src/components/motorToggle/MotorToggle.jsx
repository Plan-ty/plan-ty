import React, { useEffect, useState } from "react";
import axios from "axios";
import "./MotorToggle.css";
import "../home/Home.css";

const API_URL = "http://localhost:5021/Plants"; // Base URL

const MotorToggle = () => {
  const [motorState, setMotorStateInternal] = useState(false);

  const getMotorState = async () => {
    try {
      const response = await axios.get(`${API_URL}/ToggleWaterFlowCorrection`);
      return response.data;
    } catch (error) {
      console.error("Error fetching motor state:", error);
      throw error;
    }
  };

  const setMotorState = async (state) => {
    try {
      await axios.patch(
        `${API_URL}/ToggleWaterFlowCorrection`,
        { state }
      );
    } catch (error) {
      console.error("Error setting motor state:", error);
      throw error;
    }
  };

  useEffect(() => {
    const fetchMotorState = async () => {
      try {
        const data = await getMotorState();
        setMotorStateInternal(Boolean(data.state));
      } catch (error) {
        console.error("Error fetching motor state:", error);
      }
    };

    fetchMotorState();
  }, []);

  const handleToggle = async () => {
    try {
      const newState = !motorState;
      await setMotorState(newState);
      setMotorStateInternal(newState);
      console.log(newState ? "Motor is turned on" : "Motor is turned off");
    } catch (error) {
      console.error("Error setting motor state:", error);
    }
  };

  return (
    <div className="motor-toggle">
      <h3>Motor Control</h3>
      <button className={motorState ? "on" : "off"} onClick={handleToggle}>
        {motorState ? "Turn Off" : "Turn On"}
      </button>
    </div>
  );
};

export default MotorToggle;
