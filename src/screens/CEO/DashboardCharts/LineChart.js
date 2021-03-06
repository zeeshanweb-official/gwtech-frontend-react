import React from 'react'
import "./Charts.css";
import { Chart } from 'primereact/chart';

const DashboardLineChart = () => {
 const basicData = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  datasets: [
      {
          label: 'First Dataset',
          data: [65, 59, 80, 81, 56, 55, 40],
          fill: false,
          borderColor: '#42A5F5',
          tension: .4
      },
      {
          label: 'Second Dataset',
          data: [28, 48, 40, 19, 86, 27, 90],
          fill: false,
          borderColor: '#FFA726',
          tension: .4
      }
  ]
};

const multiAxisData = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  datasets: [{
      label: 'Dataset 1',
      fill: false,
      borderColor: '#42A5F5',
      yAxisID: 'y',
      tension: .4,
      data: [65, 59, 80, 81, 56, 55, 10]
  }, {
      label: 'Dataset 2',
      fill: false,
      borderColor: '#00bb7e',
      yAxisID: 'y1',
      tension: .4,
      data: [28, 48, 40, 19, 86, 27, 90]
  }]
};

const lineStylesData = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  datasets: [
      {
          label: 'First Dataset',
          data: [65, 59, 80, 81, 56, 55, 40],
          fill: false,
          tension: .4,
          borderColor: '#42A5F5'
      },
      {
          label: 'Second Dataset',
          data: [28, 48, 40, 19, 86, 27, 90],
          fill: false,
          borderDash: [5, 5],
          tension: .4,
          borderColor: '#66BB6A'
      },
      {
          label: 'Third Dataset',
          data: [12, 51, 62, 33, 21, 62, 45],
          fill: true,
          borderColor: '#FFA726',
          tension: .4,
          backgroundColor: 'rgba(255,167,38,0.2)'
      }
  ]
};

const getLightTheme = () => {
  let basicOptions = {
      maintainAspectRatio: false,
      aspectRatio: .6,
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

const { basicOptions } = getLightTheme();

React.useEffect(() => {
    return () => {
        basicData.destroy()
    }
 }, [])

  return (
   <>
     <Chart type="line" data={basicData} options={basicOptions}  style={{height:"300px"}}/>
   </>
  )
}

export default DashboardLineChart