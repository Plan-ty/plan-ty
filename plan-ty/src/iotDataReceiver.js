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
      .get("api-endpoint")
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  const sendData = () => {
    axios
      .post("api-endpoint", { data: inputValue })
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
          <li key={item.id}>{item.name}</li> // Adjust this based on your data structure
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
