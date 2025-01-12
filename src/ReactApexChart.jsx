import React, { useEffect, useState, useMemo } from 'react';
import ApexCharts from 'react-apexcharts';

export const ReactApexChart = ({ fullhr }) => {
  // Calculate two_Hour only when fullhr changes
  const two_Hour = useMemo(() => fullhr.filter((_, index) => index % 2 === 0), [fullhr]);

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
        enabled: false,
      },
      fill: {
        type: 'gradient', 
        gradient: {
          shade: 'dark',
          type: 'vertical',
          shadeIntensity: 0.5,
          gradientToColors: ['#2196F3'],
          opacityFrom: 1,
          opacityTo: 0.1,
          stops: [0, 100], // Gradually transition from orange to blue
          colorStops: [
            { offset: 0, color: '#FF8C00', opacity: 0.6 },
            { offset: 100, color: '#2196F3', opacity: 0.2 }, 
          ]
        }
      },
      forecastDataPoints: {
        count: 1,
        fillOpacity: 0.5,
        strokeWidth: 3,
        dashArray: 10,
      },
      colors: ['white'],
      stroke: {
        lineCap: "round", // Rounded corners for smoothness
        curve: "smooth",  // Smooth curve for the line
        width: 3,         // Thin line for subtlety
        colors: ['#efcef5'],
      },
      markers: {
        size: 0, // No markers, just the line
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
            colors: "#888", // Light gray for the axis labels
            fontSize: "12px", // Subtle font size
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
            colors: "#888", // Light gray for the y-axis labels
            fontSize: "12px", // Subtle font size
            fontFamily: "inherit",
            fontWeight: 400,
          },
        },
      },
      grid: {
        show: true,
        borderColor: "#ddd", // Light border color
        strokeDashArray: 5,  // Dashed grid lines, subtle like Apple’s charts
        xaxis: {
          lines: {
            show: false,  // Hide x-axis lines for a minimalist design
          },
        },
        yaxis: {
          lines: {
            show: false,  // Hide y-axis lines for cleaner look
          },
        },
        padding: {
          top: 0,
          right: 20,
        },
      },
      tooltip: {
        theme: "dark", // Use dark theme for tooltips
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
          data: two_Hour,
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
