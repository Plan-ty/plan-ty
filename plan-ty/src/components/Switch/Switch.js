import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Switch.css";
import cx from "classnames";

const Switch = ({ rounded = true, initialStateUrl, isToggled, onToggle }) => {
  const [toggleState, setToggleState] = useState(isToggled);

  useEffect(() => {
    if (initialStateUrl) {
      axios.get(initialStateUrl)
        .then(response => {
          setToggleState(response.data.isToggled);
          // Only call onToggle if the fetched state differs from the prop
          if (response.data.isToggled !== isToggled) {
            onToggle(response.data.isToggled);
          }
        })
        .catch(error => {
          console.error("Error fetching initial state:", error);
        });
    }
  }, [initialStateUrl, isToggled, onToggle]);

  const sliderCX = cx('slider', {
    'rounded': rounded
  });

  const handleToggle = () => {
    const newState = !toggleState;
    setToggleState(newState);
    onToggle(newState);
  };

  return (
    <label className="switch">
      <input type="checkbox" checked={toggleState} onChange={handleToggle} />
      <span className={sliderCX} />
    </label>
  );
};

export default Switch;
