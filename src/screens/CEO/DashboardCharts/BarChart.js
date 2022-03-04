import React from 'react'
import "./Charts.css";
import { Chart } from 'primereact/chart';

const DashboardBarChart = () => {
 const basicData = {
  labels: ['January', 'February', 'March', 'April'],
  datasets: [
      {
          label: 'My First dataset',
          backgroundColor: '#42A5F5',
          data: [65, 59, 80, 81, 56, 55, 40]
      },
      {
          label: 'My Second dataset',
          backgroundColor: '#FFA726',
          data: [28, 48, 40, 19, 86, 27, 90]
      }
  ]
};



const getLightTheme = () => {
  let basicOptions = {
      maintainAspectRatio: false,
      aspectRatio: .8,
      plugins: {
          legend: {
              labels: {
                  color: '#495057'
              }
          }
      },
      scales: {
          x: {
              ticks: {
                  color: '#495057'
              },
              grid: {
                  color: '#ebedef'
              }
          },
          y: {
              ticks: {
                  color: '#495057'
              },
              grid: {
                  color: '#ebedef'
              }
          }
      }
  };


  return {
      basicOptions,
  }
}

const { basicOptions} = getLightTheme();

React.useEffect(() => {
    return () => {
        basicData.destroy()
    }
 }, [])

  return (
   <>
    <Chart type="bar" data={basicData} options={basicOptions} style={{height:"308px"}}/>
   </>
  )
}

export default DashboardBarChart