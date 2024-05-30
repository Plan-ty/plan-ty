import React, { useState, useEffect } from 'react';
import Widgets from './Widgets';
import './Dashboard.css';

const parametersInformation = [
  { name: 'Water Temperature', type: 'waterTemperature', route: '/watertemp' },
  { name: 'Water pH', type: 'waterPh', route: '/pH' },
  { name: 'Electric Conductivity', type: 'waterConductivity', route: '/electricConduc' },
  { name: 'Flow Rate', type: 'waterFlow', route: '/flowRate' },
  { name: 'Water Level', type: 'waterLevel', route: '/waterlevel' },
  { name: 'Air Temperature', type: 'airTemperature', route: '/airTemperature' },
  { name: 'Air Humidity', type: 'airHumidity', route: '/airHumidity' },
  { name: 'Air CO2', type: 'airCo2', route: '/co2' },
  { name: 'Vapor Pressure Deficit', type: 'vpd', route: '/VPressureDeficit' },
  { name: 'Dew Point', type: 'dewPoint', route: '/dewPoint' },
  { name: 'Light Levels', type: 'lightLevel', route: '/lightLevels' }
];

const Dashboard = () => {
  const [parameters, setParameters] = useState({});
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchParameters();
  }, []);

  const fetchParameters = () => {
    fetch('http://localhost:5000/api/parameters')
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch parameters');
        }
        return response.json();
      })
      .then(data => setParameters(data))
      .catch(error => {
        console.error(error);
        setError('Failed to fetch parameters. Please check your backend server.');
      });
  };

  return (
    <div className="dashboard">
      {error ? (
        <p className="error">{error}</p>
      ) : (
        parametersInformation.map(param => (
          <Widgets
            key={param.type}
            parameterName={param.name}
            currentValue={parameters[param.type]}
            routePath={param.route}
          />
        ))
      )}
    </div>
  );
};

export default Dashboard;
