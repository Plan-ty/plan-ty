import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Widgets.css';

function Widgets({ parameterName, currentValue, min, warningMin, warningMax, max, routePath }) {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate(routePath);
  };

  const getColor = () => {
    if (currentValue < min || currentValue > max) {
      return '#F0A8AF';
    } else if (currentValue < warningMin || currentValue > warningMax) {
      return '#FFE085';
    } else {
      return '#AEEAC9';
    }
  };

  return (
    <div className="widget" style={{ backgroundColor: getColor() }}>
      <h3>{parameterName}</h3>
      <p>Current Value: {currentValue}</p>
      <button onClick={handleButtonClick}>View Details</button>
    </div>
  );
}

export default Widgets;
