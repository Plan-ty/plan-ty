import React, { useState, useEffect } from "react";
import axios from "axios";
import Switch from "../../Switch/Switch";
import './../../parameters/Parameters.css';
import Chart from './../../charts/Chart';
import WarningThresholds from "../../inputs/WarningThresholds";
import DangerThresholds from "../../inputs/DangerThresholds";

function CO2() {
  const [plant, setPlant] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [upperDangerInput, setUpperDangerInput] = useState("");
  const [lowerDangerInput, setLowerDangerInput] = useState("");
  const [upperWarningInput, setUpperWarningInput] = useState("");
  const [lowerWarningInput, setLowerWarningInput] = useState("");
  const [upperNotificationToggle, setUpperNotificationToggle] = useState(false);
  const [lowerNotificationToggle, setLowerNotificationToggle] = useState(false);
  const [isToggled, setIsToggledUpper] = useState(false);
  const [isToggledLower, setIsToggledLower] = useState(false);
  const [thresholds, setThresholds] = useState({
    upperWarning: null,
    lowerWarning: null,
    upperDanger: null,
    lowerDanger: null,
  });
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:5021/Plants/thresholds");
      const data = response.data.thresholds.find(item => item.type === 'airCo2');
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

  if (!plant) return null;

  const sendThresholdData = (upperThreshold, lowerThreshold, thresholdType) => {
    const data = {
      type: "airCo2",
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

  const toggleUpperNotification = () => {
    const newUpperNotificationToggle = !upperNotificationToggle;
  setUpperNotificationToggle(newUpperNotificationToggle);
  
  // Send notification status to backend for upper threshold
  axios
    .post("http://192.168.156.250:5021/Plants/1/co2", {
      upperEnabled: newUpperNotificationToggle,
      lowerEnabled: lowerNotificationToggle // Keep lower threshold status unchanged
    })
    .then((response) => {
      console.log("Upper Notification status sent successfully:", response.data);
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
    .post("http://192.168.156.250:5021/Plants/1/co2", {
      upperEnabled: upperNotificationToggle, // Keep upper threshold status unchanged
      lowerEnabled: newLowerNotificationToggle
    })
    .then((response) => {
      console.log("Lower Notification status sent successfully:", response.data);
    })
    .catch((error) => {
      console.error("Error sending lower notification status:", error);
    });
  };
  
  const handleInputChange = (event, setValue) => {
    setValue(event.target.value);
    //indirectly used here as a callback function for handling input changes, thats why its giving a warning
  };

  //TODO: do it as a component so that it can always be displayed on each page
  const date = new Date();
    const showTime = date.getHours() 
        + ':' + date.getMinutes() 
        + ":" + date.getSeconds();

       // console.log(data.waterTemperature)
  return (
    
      <div>
        <h1>Air CO2</h1>
        <div className="container">
          <div className="box1">
          <div className="lastFetched" id="left">
            {/* !!!!!Change the plant.waterTemperature to the name of the actual value passed in the json object */}
          <p>Last Fetched at: {showTime} - {plant.co2}%</p>
          {/* {data.map((item) => ( <div key={item.id}>{item.name}</div> ))} */}
               {/* {data.map((item) => (<div key={item.id}>{item.waterTemperature}</div>))} */}
                <p id="error">Error placeholder</p>
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
        <p>Notifications: </p>
        {/* {plant.map((item) => ( <div key={item.id}> Upper: {item.name}, Lower: {item.name}</div> ))} */}
        <p>Upper: <Switch isToggledUpper={isToggled} onToggle={() => setIsToggledUpper(!isToggled)}/> Lower: <Switch isToggled={isToggledLower} onToggle={() => setIsToggledLower(!isToggledLower)}/></p>
        </div>
        <div className="graph">
              <p>Graph:</p>
              <Chart dataKey="co2" yAxisLabel="Air CO2 (%)" />
          </div>
          </div>
    </div>  
);
}


export default CO2;