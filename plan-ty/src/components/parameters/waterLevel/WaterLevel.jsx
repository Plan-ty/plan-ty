import React, { useState, useEffect } from "react";
import axios from "axios";
import Switch from "../../Switch/Switch";
import "./../../parameters/Parameters.css";
import Chart from "./../../charts/Chart";

function WaterLevel() {
  const [data, setData] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [upperDangerInput, setUpperDangerInput] = useState("");
  const [lowerDangerInput, setLowerDangerInput] = useState("");
  const [upperWarningInput, setUpperWarningInput] = useState("");
  const [lowerWarningInput, setLowerWarningInput] = useState("");
  const [upperNotificationToggle, setUpperNotificationToggle] = useState(false);
  const [lowerNotificationToggle, setLowerNotificationToggle] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    axios
      .get("http://localhost:3001/data")
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  const sendData = () => {
    axios
      .post("http://localhost:3001/data", inputValue)
      .then((response) => {
        console.log("Data sent successfully:", response.data);
        // After sending the data, fetch updated data to refresh the view
        fetchData();
        setInputValue(""); // Clear input field
      })
      .catch((error) => {
        console.error("Error sending data:", error);
      });
  };

  const sendThresholdData = (upperValue, lowerValue, thresholdType) => {
    axios
      .post("http://localhost:3001/data", {
        upperValue,
        lowerValue,
        thresholdType,
      })
      .then((response) => {
        console.log("Thresholds sent successfully:", response.data);
        // After sending the data, fetch updated data to refresh the view
        fetchData();
        // Clear input fields based on threshold type
        if (thresholdType === "danger") {
          setUpperDangerInput("");
          setLowerDangerInput("");
        } else if (thresholdType === "warning") {
          setUpperWarningInput("");
          setLowerWarningInput("");
        }
      })
      .catch((error) => {
        console.error("Error sending thresholds:", error);
      });
  };

  const toggleUpperNotification = () => {
    const newUpperNotificationToggle = !upperNotificationToggle;
    setUpperNotificationToggle(newUpperNotificationToggle);

    // Send notification status to backend for upper threshold
    axios
      .post("http://localhost:3001/data", {
        upperEnabled: newUpperNotificationToggle,
        lowerEnabled: lowerNotificationToggle, // Keep lower threshold status unchanged
      })
      .then((response) => {
        console.log(
          "Upper Notification status sent successfully:",
          response.data
        );
      })
      .catch((error) => {
        console.error("Error sending upper notification status:", error);
      });
  };

  const toggleLowerNotification = () => {
    const newLowerNotificationToggle = !lowerNotificationToggle;
    setLowerNotificationToggle(newLowerNotificationToggle);

    // Send notification status to backend for lower threshold
    axios
      .post("http://localhost:3001/data", {
        upperEnabled: upperNotificationToggle, // Keep upper threshold status unchanged
        lowerEnabled: newLowerNotificationToggle,
      })
      .then((response) => {
        console.log(
          "Lower Notification status sent successfully:",
          response.data
        );
      })
      .catch((error) => {
        console.error("Error sending lower notification status:", error);
      });
  };

  const handleInputChange = (event, setValue) => {
    setValue(event.target.value);
    //indirectly used here as a callback function for handling input changes, thats why its giving a warning
  };

  const [isToggled, setIsToggledUpper] = useState(false);
  const [isToggledLower, setIsToggledLower] = useState(false);

  //TODO: do it as a component so that it can always be displayed on each page
  const date = new Date();
  const showTime =
    date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();

  return (
    <div>
      <h1>WATER LEVEL</h1>
      <div className="container">
        <div className="box1">
          <div className="lastFetched" id="left">
            <p>
              Last Fetched at: {showTime} -{" "}
              {data.map((item) => (
                <div key={item.id}>{item.name}</div>
              ))}{" "}
            </p>
            {/* {data.map((item) => (<div key={item.id}>{item.waterTemperature}</div>))} */}
            <p id="error">Error placeholder</p>
          </div>
          <div className="sendData" id="right">
            <input
              id="sendData"
              type="text"
              value={inputValue}
              onChange={(event) => setInputValue(event.target.value)}
              placeholder="Enter your data"
            />
            <button className="button" onClick={sendData}>
              Send Data
            </button>
          </div>
        </div>
        <div className="box2">
          <div className="dangerThresholds" id="left">
            <p>
              Danger Levels:{" "}
              {data.map((item) => (
                <div key={item.id}>
                  {" "}
                  Upper: {item.name}, Lower: {item.name}
                </div>
              ))}
            </p>
            {/* {data.map((item) => (<div key={item.id}> Upper: {item.upperThresh}, Lower: {item.lowerThresh}</div>))} */}
            <input
              id="upper"
              type="text"
              value={upperDangerInput}
              onChange={(event) => setUpperDangerInput(event.target.value)}
              placeholder="Enter Upper Level"
            />
            <button
              className="button1"
              onClick={() =>
                sendThresholdData(upperDangerInput, lowerDangerInput, "danger")
              }
            >
              Set Upper
            </button>
            <input
              id="lower"
              type="text"
              value={lowerDangerInput}
              onChange={(event) => setLowerDangerInput(event.target.value)}
              placeholder="Enter Lower Level"
            />
            <button
              className="button2"
              onClick={() =>
                sendThresholdData(upperDangerInput, lowerDangerInput, "danger")
              }
            >
              Set Lower
            </button>
          </div>
          <div className="warningThresholds" id="right">
            <p>
              Warning Levels:{" "}
              {data.map((item) => (
                <div key={item.id}>
                  {" "}
                  Upper: {item.name}, Lower: {item.name}
                </div>
              ))}
            </p>
            {/* {data.map((item) => (<div key={item.id}> Upper: {item.upperWarn}, Lower: {item.lowerWarn}</div>))} */}
            <input
              id="upper"
              type="text"
              value={upperWarningInput}
              onChange={(event) => setUpperWarningInput(event.target.value)}
              placeholder="Enter Upper Level"
            />
            <button
              className="button1"
              onClick={() =>
                sendThresholdData(
                  upperWarningInput,
                  lowerWarningInput,
                  "warning"
                )
              }
            >
              Set Upper
            </button>
            <input
              id="lower"
              type="text"
              value={lowerWarningInput}
              onChange={(event) => setLowerWarningInput(event.target.value)}
              placeholder="Enter Lower Level"
            />
            <button
              className="button2"
              onClick={() =>
                sendThresholdData(
                  upperWarningInput,
                  lowerWarningInput,
                  "warning"
                )
              }
            >
              Set Lower
            </button>
          </div>
        </div>
        <div className="notifications">
          <p>
            Notifications:{" "}
            {data.map((item) => (
              <div key={item.id}>
                {" "}
                Upper: {item.name}, Lower: {item.name}
              </div>
            ))}
          </p>
          <p>
            Upper:{" "}
            <Switch
              isToggledUpper={isToggled}
              onToggle={() => setIsToggledUpper(!isToggled)}
            />{" "}
            Lower:{" "}
            <Switch
              isToggled={isToggledLower}
              onToggle={() => setIsToggledLower(!isToggledLower)}
            />
          </p>
        </div>
        <div className="graph">
          <p>Graph:</p>
          <Chart dataKey="waterLevel" yAxisLabel="WL ml/cm" />
        </div>
      </div>
    </div>
  );
}

export default WaterLevel;