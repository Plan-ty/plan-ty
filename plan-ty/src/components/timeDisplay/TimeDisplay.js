import React, { useState, useEffect } from "react";

function TimeDisplay() {
  const [currentTime, setCurrentTime] = useState(getCurrentTime());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(getCurrentTime());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  function getCurrentTime() {
    const date = new Date();
    return (
      date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds()
    );
  }

  return <span>{currentTime}</span>;
}

export default TimeDisplay;

/* This one displays when resfreshed new value, upper code is real time
import React from "react";

function TimeDisplay() {
  const currentTime = getCurrentTime();

  function getCurrentTime() {
    const date = new Date();
    return (
      date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds()
    );
  }

  return <span>{currentTime}</span>;
}

export default TimeDisplay;

*/