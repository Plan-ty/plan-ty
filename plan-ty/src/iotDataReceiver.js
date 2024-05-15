import React, { useState, useEffect } from "react";
import axios from "axios";

function IotComponent() {
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

  return (
    <div>
      <h1>IoT Data</h1>
      <ul>
        {data.map((item) => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        placeholder="Enter your data"
      />
      <button onClick={sendData}>Send Data</button>
    </div>
  );
}

export default IotComponent;

/*
<ul>
        {data.map((item) => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>

For the mocking, install json server: npm install -g json-server
When you want to run it: powershell -ExecutionPolicy Bypass -Command "json-server --watch db.json --port 3001"
"http://localhost:3001/data"
*/