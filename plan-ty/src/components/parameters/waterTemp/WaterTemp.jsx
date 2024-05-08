import React, { useState, useEffect } from "react";
import axios from "axios";

function WaterTemp() {
  const [data, setData] = useState([]);
  const [inputValue, setInputValue] = useState("");

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
      .post("http://localhost:3001/data", inputValue )
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

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  //TODO: do it as a component so that it can always be displayed on each page
  const date = new Date();
    const showTime = date.getHours() 
        + ':' + date.getMinutes() 
        + ":" + date.getSeconds();

  return (
    <div>
        <h1>WATER TEMPERATURE</h1>

        <div className="lastFetched" >
            <p>Last Fetched at: {showTime} - {data.map((item) => ( <div key={item.id}>{item.name}</div> ))} </p>
            <p>Error placeholder</p>
        </div>
        <div>
            <input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            placeholder="Enter your data"/>
        <button onClick={sendData}>Send Data</button>
        </div>
        <div className="dangerThresholds">
            <p>Danger Levels: {data.map((item) => ( <div key={item.id}> Upper: {item.name}, Lower: {item.name}</div> ))}</p>
            <input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            placeholder="Enter Upper Level"/>
        <button onClick={sendData}>Set Data</button>
        <input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            placeholder="Enter Lower Level"/>
        <button onClick={sendData}>Set Data</button>
        </div>
        <div className="warningThresholds">
            <p>Warning Levels: {data.map((item) => ( <div key={item.id}> Upper: {item.name}, Lower: {item.name}</div> ))}</p>
            <input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            placeholder="Enter Upper Level"/>
        <button onClick={sendData}>Set Data</button>
        <input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            placeholder="Enter Lower Level"/>
        <button onClick={sendData}>Set Data</button>
        </div>
        <div className="notifications">
        <p>Notifications: {data.map((item) => ( <div key={item.id}> Upper: {item.name}, Lower: {item.name}</div> ))}</p>
        <p>Upper: <button>On/Off</button> Lower: <button>On/Off</button></p>
        </div>
        <div className="graph">
            <p>Graph: GraphComponent/</p>
        </div>

    </div>
    
);
}

export default WaterTemp;