import React, { useState, useEffect } from "react";
import Widgets from "./Widgets";
import './Dashboard.css';

const parametersInformation = [
    { name: 'Water Temperature', type: 'waterTemperature', route: '/watertemp', min: 15, warningMin: 18, warningMax: 25, max: 28 },
    { name: 'Water pH', type: 'waterPh', route: '/pH', min: 6, warningMin: 6.5, warningMax: 7.5, max: 8 },
    { name: 'Electric Conductivity', type: 'waterConductivity', route: '/electricConduc', min: 0.5, warningMin: 1, warningMax: 2.5, max: 3 },
    { name: 'Flow Rate', type: 'waterFlow', route: '/flowRate', min: 0.1, warningMin: 0.2, warningMax: 1.5, max: 2 },
    { name: 'Water Level', type: 'waterLevel', route: '/waterlevel', min: 5, warningMin: 6, warningMax: 10, max: 12 },
    { name: 'Air Temperature', type: 'airTemperature', route: '/airTemperature', min: 18, warningMin: 20, warningMax: 25, max: 30 },
    { name: 'Air Humidity', type: 'airHumidity', route: '/airHumidity', min: 30, warningMin: 35, warningMax: 60, max: 70 },
    { name: 'Air CO2', type: 'airCo2', route: '/co2', min: 300, warningMin: 350, warningMax: 600, max: 800 },
    { name: 'Vapor Pressure Deficit', type: 'vpd', route: '/VPressureDeficit', min: 0.8, warningMin: 0.9, warningMax: 1.2, max: 1.3 },
    { name: 'Dew Point', type: 'dewPoint', route: '/dewPoint', min: 10, warningMin: 12, warningMax: 18, max: 20 },
    { name: 'Light Levels', type: 'lightLevel', route: '/lightLevels', min: 300, warningMin: 400, warningMax: 800, max: 1000 },
];

const mockParameters = {
    waterTemperature: 22,
    waterLevel: 3,
    vpd: 1.0,
    waterPh: 7,
    lightLevel: 600,
    waterFlow: 0.5,
    waterConductivity: 0.7,
    dewPoint: 15,
    airCo2: 450,
    airTemperature: 23,
    airHumidity: 50,
};

function DisplayDashboard() {
    const [parameters, setParameters] = useState({});

    useEffect(() => {
        // Simulate fetching data
        setParameters(mockParameters);
    }, []);

    return (
        <div className="dashboard">
            {parametersInformation.map(param => (
                <Widgets
                    key={param.type}
                    parameterName={param.name}
                    currentValue={parameters[param.type]}
                    min={param.min}
                    warningMin={param.warningMin}
                    warningMax={param.warningMax}
                    max={param.max}
                    routePath={param.route}
                />
            ))}
        </div>
    );
}

export default DisplayDashboard;
