import React, { useEffect } from 'react';
import ApexCharts from 'react-apexcharts';

export const ReactApexChart = ({ hourly, city }) => {
  const [state, setState] = React.useState({
    type: "line",
    height: 440,
    series: [
      {
        name: "Temp",
        data: hourly,
      }
    ],
    options: {
      chart: {
        toolbar: {
          show: false,
        },
      },
      title: {
        text: `${city}`, // Set the title here
        align: 'center',
        style: {
          fontSize: '16px',
          fontWeight: 'bold',
          color: '#000', // You can customize the color
        },
      },
      dataLabels: {
        enabled: false,
      },
      colors: ["#020617"],
      stroke: {
        lineCap: "round",
        curve: "smooth",
      },
      markers: {
        size: 0,
      },
      xaxis: {
        axisTicks: {
          show: false,
        },
        axisBorder: {
          show: false,
        },
        labels: {
          style: {
            colors: "#616161",
            fontSize: "12px",
            fontFamily: "inherit",
            fontWeight: 400,
          },
        },
        categories: [
          "0", "2", "4", "6", "8", "10", "12", "14", "16", "18", "20", "22",
        ],
      },
      yaxis: {
        labels: {
          style: {
            colors: "#616161",
            fontSize: "12px",
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
            show: true,
          },
        },
        padding: {
          top: 5,
          right: 20,
        },
      },
      fill: {
        opacity: 0.8,
      },
      tooltip: {
        theme: "dark",
      },
    },
  });

  // Update the chart when the hourly data or city changes
  useEffect(() => {
    setState(prevState => ({
      ...prevState,
      series: [{
        name: "Temp",
        data: hourly,
      }],
      options: {
        ...prevState.options,
        title: {
          text: `${city}`, // Update the title when city chang
        },
      },
    }));
  }, [hourly, city]);

  return (
    <div>
      <div id="chart">
        <ApexCharts options={state.options} series={state.series} type="area" height={350} />
      </div>
      <div id="html-dist"></div>
    </div>
  );
};