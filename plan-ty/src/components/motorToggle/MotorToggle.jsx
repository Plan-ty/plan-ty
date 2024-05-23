import React, { useEffect, useState } from "react";
import axios from "axios";
import "./MotorToggle.css";

//For testing with Json
const API_URL = "https://jsonplaceholder.typicode.com";
//replace with the real API URL:
//const API_URL = 'http://backend-url/api';

const MotorToggle = () => {
  const [motorState, setMotorStateInternal] = useState(false);

  const getMotorState = async () => {
    try {
      const response = await axios.get(`${API_URL}/posts/1`); // for testing
      // const response = await axios.get(`${API_URL}/motor-state`);
      return response.data;
    } catch (error) {
      console.error("Error fetching motor state:", error);
      throw error;
    }
  };

  const setMotorState = async (state) => {
    try {
      // Using JSONPlaceholder's /posts endpoint for testing
      await axios.put(`${API_URL}/posts/1`, { userId: state ? 1 : null });
      // const response = await axios.post(`${API_URL}/motor-state`, { state });
      //or
      // const response = await axios.put(`${API_URL}/motor/state`, { state });
      //return response.data;
    } catch (error) {
      console.error("Error setting motor state:", error);
      throw error;
    }
  };

  useEffect(() => {
    const fetchMotorState = async () => {
      try {
        const data = await getMotorState();
        // Assuming the 'userId' field represents the motor state in the response data
        setMotorStateInternal(Boolean(data.userId)); // Convert userId to boolean for motor state
        //setMotorStateInternal(data.state);
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
