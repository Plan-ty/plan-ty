import React, { useState, useEffect } from "react";
import axios from "axios";
import Switch from "../../Switch/Switch";
import './../../parameters/Parameters.css';
import Chart from './../../charts/Chart';
import WarningThresholds from "../../inputs/WarningThresholds";
import DangerThresholds from "../../inputs/DangerThresholds";
import TimeDisplay from "../../timeDisplay/TimeDisplay";

function AirHumidity() {
  const [plant, setPlant] = useState({});
  const [upperDangerInput, setUpperDangerInput] = useState('');
  const [lowerDangerInput, setLowerDangerInput] = useState('');
  const [upperWarningInput, setUpperWarningInput] = useState('');
  const [lowerWarningInput, setLowerWarningInput] = useState('');
  const [upperNotificationToggle, setUpperNotificationToggle] = useState(false);
  const [lowerNotificationToggle, setLowerNotificationToggle] = useState(false);
  const [thresholds, setThresholds] = useState({
    upperWarning: null,
    lowerWarning: null,
    upperDanger: null,
    lowerDanger: null,
  });
  const [isInDangerZone, setIsInDangerZone] = useState(false);

  useEffect(() => {
    fetchData();
    fetchNotificationData();
  }, []);

  useEffect(() => {
    if (plant.airHumidity < thresholds.lowerDanger || plant.airHumidity > thresholds.upperDanger) {
      setIsInDangerZone(true);
    } else {
      setIsInDangerZone(false);
    }
  }, [plant, thresholds]);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:5021/Plants/thresholds");
      const data = response.data.thresholds.find(item => item.type === 'airHumidity');
      setPlant(response.data);
      setThresholds({
        upperWarning: data.warningMax,
        lowerWarning: data.warningMin,
        upperDanger: data.max,
        lowerDanger: data.min,
      });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchNotificationData = async () => {
    try {
      const response = await axios.get("http://localhost:5021/AlertsNotification/6");
      console.log("Fetched notification data:", response.data);
      setUpperNotificationToggle(response.data.upperEnabled);
      setLowerNotificationToggle(response.data.lowerEnabled);
    } catch (error) {
      console.error("Error fetching notification data:", error);
    }
  };

  const sendThresholdData = (upperThreshold, lowerThreshold, thresholdType) => {
    const data = {
      type: "airHumidity",
      warningMax: thresholds.upperWarning,
      warningMin: thresholds.lowerWarning,
      max: thresholds.upperDanger,
      min: thresholds.lowerDanger,
    };

    if (thresholdType === 'warning') {
      if (upperThreshold !== undefined) data.warningMax = upperThreshold;
      if (lowerThreshold !== undefined) data.warningMin = lowerThreshold;
    } else if (thresholdType === 'danger') {
      if (upperThreshold !== undefined) data.max = upperThreshold;
      if (lowerThreshold !== undefined) data.min = lowerThreshold;
    }

    axios
      .patch("http://localhost:5021/Plants/thresholds", data)
      .then((response) => {
        console.log("Threshold sent successfully:", response.data);
        fetchData(); // Refresh data
      })
      .catch((error) => {
        console.error("Error sending threshold:", error);
      });
  };

  const handleToggleUpperNotification = () => {
    const newToggleState = !upperNotificationToggle;
    setUpperNotificationToggle(newToggleState);
  };

  const handleToggleLowerNotification = () => {
    const newToggleState = !lowerNotificationToggle;
    setLowerNotificationToggle(newToggleState);
  };

  const sendNotificationSettings = () => {
    axios
      .patch("http://localhost:5021/AlertsNotification/6", {
        id: 6,
        upperEnabled: upperNotificationToggle,
        lowerEnabled: lowerNotificationToggle
      })
      .then((response) => {
        console.log("Notification settings sent successfully:", response.data);
      })
      .catch((error) => {
        console.error("Error sending notification settings:", error);
      });
  };

  return (
    
      <div>
        <h1>AIR HUMIDITY</h1>
        <div className="container">
          <div className="box1">
            <div className="lastFetched" id="left">
              {/* !!!!!Change the plant.waterTemperature to the name of the actual value passed in the json object */}
              <p>Last Fetched at: <TimeDisplay /> - {plant.airHumidity} %</p>
              {/* {data.map((item) => ( <div key={item.id}>{item.name}</div> ))} */}
              {/* {data.map((item) => (<div key={item.id}>{item.waterTemperature}</div>))} */}
              {isInDangerZone && <p id="error">The Current Levels Are In Danger Zone!</p>}
            </div>
          </div>
          <div className="box2">
            <DangerThresholds
              upperDangerInput={upperDangerInput}
              setUpperDangerInput={setUpperDangerInput}
              lowerDangerInput={lowerDangerInput}
              setLowerDangerInput={setLowerDangerInput}
              sendThresholdData={sendThresholdData}
              upperDangerThreshold={thresholds.upperDanger}
              lowerDangerThreshold={thresholds.lowerDanger}
            />
              <WarningThresholds
              upperWarningInput={upperWarningInput}
              setUpperWarningInput={setUpperWarningInput}
              lowerWarningInput={lowerWarningInput}
              setLowerWarningInput={setLowerWarningInput}
              sendThresholdData={sendThresholdData}
              upperWarningThreshold={thresholds.upperWarning}
              lowerWarningThreshold={thresholds.lowerWarning}
            />
          </div>
          <div className="notifications">
      <p>Notifications: Upper: {upperNotificationToggle ? "Enabled" : "Disabled"}, Lower: {lowerNotificationToggle ? "Enabled" : "Disabled"}</p>
      <p>
        Upper: <Switch isToggled={upperNotificationToggle} onToggle={handleToggleUpperNotification} /> 
        Lower: <Switch isToggled={lowerNotificationToggle} onToggle={handleToggleLowerNotification} />
      </p>
      <button id="notification-button" onClick={sendNotificationSettings}>Update Notifications</button>
    </div>
          <div className="graph">
            <p>Graph:</p>
            <Chart dataKey="airHumidity" yAxisLabel=" Air Humidity (%)" />
          </div>
        </div>
    </div>  
);
}


export default AirHumidity;