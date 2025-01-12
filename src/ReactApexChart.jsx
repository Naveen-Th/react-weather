import React, { useEffect, useState } from 'react';
import ApexCharts from 'react-apexcharts';

export const ReactApexChart = ({ fullhr }) => {
  const two_Hour = fullhr.filter((_, index) => index % 2 === 0);
  console.log('Two_Hour', two_Hour);

  const [state, setState] = useState({
    type: "line",
    height: '100%', // Use percentage for responsive height
    series: [
      {
        name: "Temp",
        data: two_Hour,
      }
    ],
    options: {
      chart: {
        toolbar: {
          show: false,
        },
        zoom: {
          enabled: false, // Disable zooming for better mobile experience
        },
        height: '100%', // Ensure the chart takes full height
      },
      dataLabels: {
        enabled: false,
      },
      fill: {
        opacity: 0.8,
      },
      colors: ['#FF9800'],
      stroke: {
        lineCap: "round",
        curve: "smooth",
      },
      markers: {
        size: 0,
      },
      xaxis: {
        axisTicks: {
          show: true,
        },
        axisBorder: {
          show: false,
        },
        labels: {
          style: {
            colors: "#616161",
            fontSize: "10px", // Smaller font size for mobile
            fontFamily: "inherit",
            fontWeight: 400,
          },
          rotate: -45, // Rotate labels for better visibility
        },
        categories: [
          "0", "2", "4", "6", "8", "10", "12", "14", "16", "18", "20", "22", "24"
        ],
      },
      yaxis: {
        labels: {
          style: {
            colors: "#616161",
            fontSize: "10px", // Smaller font size for mobile
            fontFamily: "inherit",
            fontWeight: 400,
          },
        },
      },
      grid: {
        show: true,
        borderColor: "#dddddd",
        strokeDashArray: 5,
        xaxis: {
          lines: {
            show: false,
          },
        },
        yaxis: {
          lines: {
            show: false,
          },
        },
        padding: {
          top: 0,
          right: 20,
        },
      },
      tooltip: {
        theme: "dark",
      },
    },
  });

  useEffect(() => {
    setState(prevState => ({
      ...prevState,
      series: [{
        name: "Temp",
        data: two_Hour,
      }],
    }));
  }, [fullhr]);

  return (
    <div  className=''> {/* Set a fixed height for the chart container */}
      <div id="chart">
        <ApexCharts options={state.options} series={state.series} type="area" height="100%" />
      </div>
    </div>
  );
};