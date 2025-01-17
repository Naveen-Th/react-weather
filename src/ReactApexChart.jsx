import React, { useEffect, useState, useMemo } from 'react';
import ApexCharts from 'react-apexcharts';

export const ReactApexChart = ({ hrs }) => {
  
  const [state, setState] = useState({
    type: "line",
    series: [
      {
        name: "Temp",
        data: hrs,
      }
    ],
    options: {
      chart: {
        toolbar: {
          show: false,
        },
        zoom: {
          enabled: false, 
        }
      },
      dataLabels: {
        enabled:false
      },
      
      forecastDataPoints: {
        count: 1,
        fillOpacity: 0.5,
        strokeWidth: 2,
        dashArray: 10,
      },
      fill: {
        colors: ['#FF7700'],
        opacity: 0,
        type: 'gradient',
        gradient: {
            shade: 'light',
            type: "vertical",
            shadeIntensity: 1,
            gradientToColors: ['#1ecfe3'],
            inverseColors: false,
            opacityFrom: 0.8,
            opacityTo: 0,
            stops: [5,100],
            colorStops: []
        }
      },
      stroke: {
        lineCap: "round", 
        curve: "smooth",  
        width: 2.3,         
        colors: ['orangered'],
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
            colors: "black", 
            fontSize: "12px",   
            fontFamily: "inherit",
            fontWeight: 600
          },
          rotate: -45, 
        },
        categories: [
          "0", "2", "4", "8", "10", "12", "14", "16", "18", "20","22","24"
        ],
      },
      yaxis: {
        labels: {
          style: {
            colors: "black", 
            fontSize: "12px", 
            fontFamily: "inherit",
            fontWeight: 500,
          },
        },
      },
      grid: {
        show: true,
        borderColor: "#ECEFF1", 
        strokeDashArray: 6,  
        xaxis: {
          lines: {
            show: true,  
          },
        },
        yaxis: {
          lines: {
            show: false,  
          },
        },
        padding: {
          top:0,
          right: 0,
        },
      },
      tooltip: {
        theme: "dark", 
        style: {
          fontSize: "12px", 
          fontFamily: "inherit",
        },
      },
    },
  });

  // Function to determine styles based on screen size
  const getResponsiveStyles = () => {
    if (window.innerWidth >= 1024) { 
      return {
        height: '350px', 
        xAxisFontSize: '14px',
        yAxisFontSize: '14px', 
      };
    } else {
      return {
        height: '210px', 
        xAxisFontSize: '12px', 
        yAxisFontSize: '12px', 
      };
    }
  };

  const { height, xAxisFontSize, yAxisFontSize } = getResponsiveStyles();

  useEffect(() => {
    setState(prevState => ({
      ...prevState,
      series: [
        {
          name: "Temp",
          data: hrs,
        }
      ],
      options: {
        ...prevState.options,
        xaxis: {
          ...prevState.options.xaxis,
          labels: {
            ...prevState.options.xaxis.labels,
            style: {
              ...prevState.options.xaxis.labels.style,
              fontSize: xAxisFontSize,
            },
          },
        },
        yaxis: {
          ...prevState.options.yaxis,
          labels: {
            ...prevState.options.yaxis.labels,
            style: {
              ...prevState.options.yaxis.labels.style,
              fontSize: yAxisFontSize,
            },
          },
        },
      },
    }));
  }, [hrs, xAxisFontSize, yAxisFontSize]);

  return (
    <div style={{ width: '100%', height: height }}> 
      <div id="chart" style={{ height: '100%' }}> 
        <ApexCharts options={state.options} series={state.series} type="area" height="100%" />
      </div>
    </div>
  );
};
