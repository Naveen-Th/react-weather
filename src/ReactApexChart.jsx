import React, { useEffect, useState, useMemo } from 'react';
import ApexCharts from 'react-apexcharts';

export const ReactApexChart = ({ days }) => {
  // Calculate two_Hour only when fullhr changes
  const two_Hour = useMemo(() => days.filter((_, index) => index % 2 === 0), [days]);

  const [state, setState] = useState({
    type: "line",
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
          enabled: false, 
        }
      },
      dataLabels: {
        enabled: false,  // Disable data labels
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
        size: 0, // No markers, just the line
      },
      xaxis: {
        axisTicks: {
          show: false,  // Hide x-axis ticks for minimal design
        },
        axisBorder: {
          show: false,  // Hide axis borders
        },
        labels: {
          style: {
            colors: "black", // Light gray for axis labels
            fontSize: "12px",   // Smaller font size
            fontFamily: "inherit",
            fontWeight: 600,
          },
          rotate: -45, // Rotate x-axis labels for better readability
        },
        categories: [
          "1", "2", "3", "4", "5", "6", "7", "8", "9", "10"
        ],
      },
      yaxis: {
        labels: {
          style: {
            colors: "black", // Light gray for the y-axis labels
            fontSize: "12px", // Smaller font size
            fontFamily: "inherit",
            fontWeight: 500,
          },
        },
      },
      grid: {
        show: true,
        borderColor: "#ECEFF1", // Very light grid lines
        strokeDashArray: 6,  // Dashed grid lines for a cleaner look
        xaxis: {
          lines: {
            show: true,  // Hide x-axis lines
          },
        },
        yaxis: {
          lines: {
            show: false,  // Hide y-axis lines
          },
        },
        padding: {
          top:0,
          right: 0,
        },
      },
      tooltip: {
        theme: "dark", // Dark tooltip for modern look
        style: {
          fontSize: "12px", // Tooltip font size
          fontFamily: "inherit",
        },
      },
    },
  });

  // Function to determine styles based on screen size
  const getResponsiveStyles = () => {
    if (window.innerWidth >= 1024) { // Desktop breakpoint
      return {
        height: '350px', // Height for desktop
        xAxisFontSize: '14px', // Larger font size for x-axis labels
        yAxisFontSize: '14px', // Larger font size for y-axis labels
      };
    } else {
      return {
        height: '210px', // Height for mobile
        xAxisFontSize: '12px', // Smaller font size for x-axis labels
        yAxisFontSize: '12px', // Smaller font size for y-axis labels
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
          data: days,
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
  }, [two_Hour, xAxisFontSize, yAxisFontSize]);

  return (
    <div style={{ width: '100%', height: height }}> {/* Set dynamic height based on screen size */}
      <div id="chart" style={{ height: '100%' }}> {/* Ensure the chart takes full height */}
        <ApexCharts options={state.options} series={state.series} type="area" height="100%" />
      </div>
    </div>
  );
};
