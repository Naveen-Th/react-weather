import React, { useEffect,useState } from 'react';
import ApexCharts from 'react-apexcharts';

export const ReactApexChart = ({fullhr }) => {
  const two_Hour = fullhr.map((temp)=>temp).filter(index => index % 2 === 0);
  console.log('Two_Hour',two_Hour);
  const [state, setState] = useState({
    type: "line",
    height: 440,
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
            fontSize: "12px",
            fontFamily: "inherit",
            fontWeight: 400,
          },
        },
        categories: [
          
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
    <div>
      <div id="chart">
        <ApexCharts options={state.options} series={state.series} type="area" height={350} />
      </div>
      
    </div>
  );
};