    import React, { useState, useEffect } from "react";
    import axios from "axios";

    const EnergyUsage = () => {

        const [energy, setEnergyUsage] = useState('');
       
        useEffect(() => {
            energyUsage();
          }, []);
        
          const energyUsage = async () => {
            try {
              const response = await axios.get("http://localhost:5021");
              setEnergyUsage(response);
            } catch (error) {
              console.error("Error getting Energy Usage:", error);
            }
          };
    


          return (
            <div className="energyUsage">
                <p>Energy Usage(J): {energy} </p>

            </div>
          )
    };



    export default EnergyUsage;