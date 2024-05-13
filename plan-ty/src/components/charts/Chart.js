import React from 'react'
import  {CategoryScale, Chart as ChartJS, LineElement, LinearScale, PointElement} from 'chart.js'
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement
)

const Chart = () => {

  var data = {
    labels: ["10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00"],
    datasets: [
      {
        label: "Water Temperature",
        backgroundColor: "rgba(255,255,255)",
        borderColor: "rgba(255,99,132,1)",
        borderWidth: 2,
        hoverBackgroundColor: "rgba(255,99,132,0.4)",
        hoverBorderColor: "rgba(255,99,132,1)",
        data: [18, 20, 20, 22, 25, 19, 18]
      }
    ]
  };

  var options = {
    maintainAspectRatio: false,
    scales: {
      y: {
        stacked: true,
        grid: {
          display: true,
          color: "rgba(255,255,132,0.2)"
        }
      },
      x: {
        grid: {
          display: false
        }
      }
    }
  };

  const lineBackgroundColor = {
    backgroundColor: "rgb(230, 230, 230)"
  };

  return (
    <div>
      <Line 
        data={data}
        options={options}
        height={400}
        style={lineBackgroundColor}
      />
    </div>
  )
}

export default Chart



//import Chart from './../../charts/Chart'






/*var data = {
    labels: ["10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00"],
    datasets: [
      {
        label: "Water Temperature",
        backgroundColor: "rgba(255,99,132,0.2)",
        borderColor: "rgba(255,99,132,1)",
        borderWidth: 2,
        hoverBackgroundColor: "rgba(255,99,132,0.4)",
        hoverBorderColor: "rgba(255,99,132,1)",
        data: [18, 20, 20, 22, 25, 19, 18]
      }
    ]
  };
  
  var options = {
    maintainAspectRatio: false,
    scales: {
      y: {
        stacked: true,
        grid: {
          display: true,
          color: "rgba(255,99,132,0.2)"
        }
      },
      x: {
        grid: {
          display: false
        }
      }
    }
  };
  
  new Chart("chart", {
    type: "line",
    options: options,
    data: data
  });*/
//https://codepen.io/chartjs/pen/YVWZbz