import React from "react";
import im from './assets/cloud.webp';
import { ReactApexChart } from "./ReactApexChart";

var condition;
var desc;
var color;
var rangeColor;
const getUv = (uv) => {
  switch (true) {
    case (uv >= 0 && uv <= 2):
      condition = 'Very Good';
      desc = 'No special protection needed';
      color = 'border-l-green-500';
      rangeColor = 'accent-green-500';
      break;
    case (uv >= 3 && uv <= 5):
      condition = 'Moderate';
      desc = 'Wear sunglasses'
      color = 'border-l-yellow-500';
      rangeColor = 'accent-yellow-500';
      break;
    case (uv >= 6 && uv <= 7):
      condition = 'High';
      desc = 'Wear protective clothing';
      color = 'border-l-orange-500';
      rangeColor = 'accent-orange-500';
      break;
    case (uv >= 8 && uv <= 10):
      condition = 'Very High';
      desc = 'Wear a wide-brimmed hat and sunglasses';
      color = 'border-l-red-500';
      rangeColor = 'accent-red-500';
      break;
    case (uv > 10):
      condition = 'Extreme';
      desc = 'Avoid sun exposure as much as possible';
      color = 'border-l-violet-500';
      rangeColor = 'accent-violet-500';
      break;
    default:
      return 'Index Value Out Of Range';
  }
}

export const Weather = ({ children, onWeather }) => {
  const uv = Math.round(onWeather.current.uv);
  getUv(uv);
  const tomorrowWeather = onWeather.forecast.forecastday[1];

  const hourData = onWeather.forecast.forecastday[0].hour.map((hour) => Math.round(hour.temp_c));
  const even = hourData.map((temp)=>temp).filter(index => index % 2 === 0);
  const title = onWeather?.location?.name;
  
  // Placeholder weather data
  const todayWeather = {
    city: "Gubbi",
    date: "24 Dec, 2023",
    temp: 26,
    high: 27,
    low: 10,
    condition: "Cloudy",
    feelsLike: 26,
    uvIndex: 5,
    windSpeed: "3.3 KP/H",
    humidity: 60,
    sunrise: "6:45 AM",
    sunset: "5:30 PM",
  };
  const hourlyWeather = [
    { time: "1PM", temp: '20' },
    { time: "2PM", temp: '21' },
    { time: "3PM", temp: '20' },
    { time: "4PM", temp: '19' },
    { time: "5PM", temp: '18' },
    { time: "6PM", temp: '17' },
  ];

  return (
    <div className=" style.bg min-h-screen text-white font-sans" style={{ background: '#060C1A' }}>
      <div className="container mx-auto px-4 py-8">


        <div className="grid grid-cols-1 md:grid-cols-3  gap-12 mt-6">
          <div className="col-span-3 md:col-span-3 lg:col-span-2 ">
            {children}
          </div>
          <div className="p-5 md:p-10 col-span-3 md:col-span-3 lg:col-span-2  rounded-3xl" style={{ background: '#0E1421' }}>
            <div className="grid grid-cols-2">
              <div>
                <button className="bg-indigo-500 shadow-lg shadow-indigo-500/50 rounded-3xl px-5 py-1 text-center font-semibold md:text-lg">
                  <i className="fa-duotone fa-light fa-location-dot fa-fade mr-1"></i>
                  {onWeather?.location?.name}</button>
                <h1 className="text-xl md:text-5xl  mt-8">Monday</h1>
                <p className="mt-2 text-base text-slate-300">{todayWeather.date}</p>
                <h3 className="text-xl md:text-5xl mt-7">{Math.round(onWeather?.current?.temp_c)}°</h3>
                <p className="mt-2 text-base text-slate-300">High: {Math.round(onWeather?.forecast?.forecastday[0]?.day?.maxtemp_c)} | Low: {todayWeather.low}</p>
              </div>
              <div className="mt-0 flex items-end justify-center flex-col">
                <img src={onWeather?.current?.condition?.icon} className="md:w-36 md:h-36 h-16 w-20 " />
                <h4 className="mt-0 text-3xl font-extralight">{onWeather?.current?.condition?.text}</h4>
                <p className="mt-3 text-base text-slate-300">Feels Like {todayWeather.feelsLike}°C</p>
                <p className="mt-3 text-base text-slate-300">{onWeather.current.is_day === 0 ? 'Night' : 'Day'}</p>
              </div>
            </div>
          </div>

          <div className="p-4 md:p-7 rounded-3xl row-span-2 col-span-3 md:col-span-3 lg:col-span-1" style={{ background: '#0E1421' }}>
            <h4 className="text-lg">Today Highlight</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-2 mt-3 gap-5">
              <div className="bg-indigo-900 p-3 rounded-2xl">
                <h1>Chance Of Rain: 20%</h1>
              </div>

              <div className={`${color} rounded-3xl border-l-8  `} >
                <div className="p-4 bg-indigo-900 rounded-xl text-slate-200 ">
                  <div className="flex items-center">
                    <i className="fa-light fa-temperature-list text-lg"></i>
                    <h1 className="ml-2">UV Index</h1>
                  </div>
                  <div className="mt-4">
                    <h1 className="text-4xl">{Math.round(onWeather?.current?.uv)}</h1>
                    <h4 className="text-xl">
                      {condition}
                    </h4>
                    <label for="disabled-range-slider-usage" className="sr-only"> range</label>
                    <input type="range" className={`${rangeColor} range-slider  w-full`} min="0" max="10" value={onWeather?.current?.uv} readOnly />
                    <p className="text-xs">
                      {desc}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-indigo-900 p-3 rounded-2xl">
                <h1>Wind Status: {todayWeather.windSpeed}</h1>
              </div>
              <div className="bg-indigo-900 p-3 rounded-2xl">
                <p>Humidity: {todayWeather.humidity}%</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-4 col-span-3 lg:col-span-2 md:col-span-3  gap-x-4 md:gap-x-4 lg:gap-5">
            <h4 className="col-span-3 text-lg ">Today/Week</h4>

            <div className="p-3 rounded-2xl gap-x-3 text-center grid grid-cols-3 md:col-span-3 col-span-3  md:grid-cols-6 mt-7" style={{ background: 'linear-gradient(250deg, #0E1421 0% 10% , #1D325F 50% 100% , #0E1421 100% 100%)' }}>

              <div className="m-2 bg-black/50  ring-4 ring-black/35 rounded-3xl col-span-6 shadow-black shadow-2xl">
                <ReactApexChart hourly={even} fullhr={hourData} city={title}></ReactApexChart>
              </div>

            </div>

            <div className="bg-slate-500 rounded-3xl p-5 mt-5  col-span-0 row-span-0 md:row-span-2 md:col-span-0" style={{ background: '#0E1421' }}>
              <h3 className="">Sunrise</h3>
              <p className="">{todayWeather.sunrise}</p>
              <h3 className="">Sunset</h3>
              <p className="">{todayWeather.sunset}</p>
            </div>

            <div className="col-span-4 md:col-span-3" >
                <div className="mt-16 px-4  flex items-center rounded-2xl" style={{ background: 'linear-gradient(250deg, #0E1421 0% 10% , #1D325F 50% 100% , #0E1421 100% 100%)' }}> 
                  <div> 
                    <h4 className="text-white">Tomorrow</h4> 
                    <p className="text-slate-500 text-nowrap">{tomorrowWeather.day.condition.text}</p> 
                  </div> 
                  <div className="flex items-center justify-between  w-full">
                      <h1 className="text-4xl font-light ml-4">{Math.round(tomorrowWeather?.day.maxtemp_c)}°</h1>  
                      <div className="flex justify-items-end mb-0 ">
                        <img src={tomorrowWeather.day.condition.icon} alt="Weather Icon" className="w-20" />
                      </div>
                   </div>
                </div>
            </div>

            <div className="mt-4 col-span-4 bg-white  rounded-3xl">
            
            </div>

          </div>
        </div>
      </div>

    </div>

  );
};