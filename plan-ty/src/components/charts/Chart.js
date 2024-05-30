import React, { useState, useEffect } from 'react'
import  {CategoryScale, Chart as ChartJS, LineElement, LinearScale, PointElement} from 'chart.js'
import { Line } from 'react-chartjs-2';
import axios from "axios";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement
)

const Chart = ({ dataKey, yAxisLabel }) => { // Accept props for data key and Y-axis label

  const [chartData, setChartData] = useState({
  labels: [],
    datasets: [
      {
        backgroundColor: "rgba(255,255,255)",
        borderColor: "rgba(249,99,132,1)",
        borderWidth: 2,
        /*hoverBackgroundColor: "rgba(255,99,132,0.4)",*/
        hoverBackgroundColor: "rgb(255, 255, 255)",
        hoverBorderColor: "rgba(255,255,255,1)",
        data: []
      }
    ]
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/db.json");
        const jsonData = response.data;

        const labels = jsonData.map(entry => entry.time + ":00");
        const values = jsonData.map(entry => entry[dataKey]); // Use dataKey prop to extract the appropriate data

        setChartData(prevState => ({
          ...prevState,
          labels: labels,
          datasets: [
            {
              ...prevState.datasets[0],
              data: values
            }
          ]
        }));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [dataKey]); // Include dataKey in dependencies

  const options = {
    maintainAspectRatio: false,
    scales: {
      x: {
        title: {
          display: true,
          text: 'Time (h)'
        }
      },
      y: {
        title: {
          display: true,
          text: yAxisLabel // Use yAxisLabel prop for Y-axis label
        },
        stacked: true,
        grid: {
          display: true,
          color: "rgba(255,255,132,0.2)"
        }
      }
    }
  };
  

  const lineBackgroundColor = {
    backgroundColor: "rgb(255, 255, 255)"
  };

  return (
    <div>
      <Line 
        data={chartData}
        options={options}
        height={400}
        style={lineBackgroundColor}
      />
    </div>
  )
}

export default Chart;


//https://codepen.io/chartjs/pen/YVWZbz