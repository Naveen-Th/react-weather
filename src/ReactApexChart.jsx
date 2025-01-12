import React, { useEffect,useState } from 'react';
import ApexCharts from 'react-apexcharts';

export const ReactApexChart = ({fullhr }) => {
  const even = fullhr.map((temp)=>temp).filter(index => index % 2 === 0);
  console.log('even',even);
  const [state, setState] = useState({
    type: "line",
    height: 440,
    series: [
      {
        name: "Temp",
        data: fullhr,
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
          "0","1","2","3", "4","5","6","7",
          "8", "9","10","11", "12", "13",
          "14","15", "16","17", "18","19","20","21",
          "22","23"
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
        data: fullhr,
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