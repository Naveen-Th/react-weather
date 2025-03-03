import React, { useState, useEffect } from "react";
import { ReactApexChart } from "./ReactApexChart";
import { HourlyImg } from "./Image";
import { HourlyImg1 } from "./Image";

var air_condition;
var air_desc
const getAir = (air) => {
  switch (true) {
    case (air >= 0 && air <= 3):
      air_condition = 'Good';
      air_desc = 'The air is clean and safe. No health risks.';
      break;
    case (air >= 4 && air <= 6):
      air_condition = 'Moderate';
      air_desc = 'The air quality is acceptable, but sensitive people (like those with asthma) may notice slight effects.';
      break;
    case (air >= 7 && air <= 8):
      air_condition = 'Unhealthy';
      air_desc = 'The air is unhealthy for sensitive groups. This includes people with respiratory or heart conditions';
      break;
    case (air >= 9 && air <= 10):
      air_condition = 'Very Unhealthy';
      air_desc = 'The air is unhealthy for everyone. Prolonged exposure can cause serious health issues.';
      break;
    case (air > 10):
      air_condition = 'Hazardous)';
      air_desc = 'The air quality is extremely hazardous. It poses a serious health risk to everyone, including healthy individuals.';
      break;
    default:
      return 'Index Value Out Of Range';
  }
};
var uv_condition;
var uv_desc;
const getUv = (uv) => {
  switch (true) {
    case (uv >= 0 && uv <= 2):
      uv_condition = 'Low';
      uv_desc = 'No protection needed. Enjoy the sun';
      break;
    case (uv >= 3 && uv <= 5):
      uv_condition = 'Moderate';
      uv_desc = 'Wear sunscreen and sunglasses';
      break;
    case (uv >= 6 && uv <= 7):
      uv_condition = 'High';
      uv_desc = 'Use sunscreen, wear protective clothing and limit sun exposure';
      break;
    case (uv >= 8 && uv <= 10):
      uv_condition = 'Very High';
      uv_desc = 'Stay in the shade, wear sunscreen and avoid the sun during peak hours';
      break;
    case (uv > 10):
      uv_condition = 'Extreme)';
      uv_desc = 'Avoid sun exposure, wear sunscreen,stay in the shade, and cover up.';
      break;
    default:
      return 'Index Value Out Of Range';
  }
}


export const Weather = ({ children, onWeather }) => {

  const currentWeather = onWeather.current;
  const location = onWeather.location;
  const foreCast = onWeather.forecast;
  const air = currentWeather?.air_quality['gb-defra-index'];
  const uv = Math.round(onWeather.current.uv);
  getAir(air);
  getUv(uv);

  const date = new Date();
  const day = date.getDay();
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const today = days[day];

  const full_hr = foreCast.forecastday[0].hour.map((hour) => Math.round(hour.temp_c));
  const two_hr = full_hr.filter((_,i) => i % 2 == 0);
  
  return (
    <div className="min-h-screen text-black font-sans" >
      <div className="container mx-auto px-4 py-8">
        {children}
        <main className="container mx-auto mt-20">
          <div className="grid grid-cols-6 gap-8">

            <div className="p-0 md:p-0 col-span-6 md:col-span-2">
              <div className="mb-0 overflow-hidden rounded-3xl bg-white p-5 shadow-lg">
                <div className="flex justify-between">
                  <h3 className="text-2xl font-semibold">{today}</h3>
                  <p>{location.localtime.slice(11)}</p>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex flex-col ">
                    <h4 className="font-semibold">{location.name}<sup><i className="fa-solid fa-location-arrow ml-1"></i></sup></h4>
                    <h1 className="text-6xl md:text-8xl">{Math.round(currentWeather.temp_c)}°</h1>
                  </div>
                  <HourlyImg1 condition={currentWeather.condition.text.trim('').toLowerCase()} day={currentWeather.is_day} 
                  className="w-52 h-52"
                  />
                </div>

                <div className="flex flex-row justify-between">
                  <div className="flex flex-col gap-1 md:text-base text-sm">
                    <div className="flex flex-row gap-1">
                      <p>Real Feel {Math.round(currentWeather.feelslike_c)}°</p>
                    </div>
                    <div className="flex flex-row gap-1">
                      <p>Wind {Math.round(currentWeather.wind_kph)} km/h</p>
                    </div>
                    <div className="flex flex-row gap-1">
                      <p>Humidity {Math.round(currentWeather.humidity)}%</p>
                    </div>
                  </div>

                  <div className="ml-1 self-end">
                    <div className="flex flex-col text-right">
                      <p className="">{currentWeather.condition.text}</p>
                      <p className="mt-1 text-sm">{currentWeather.is_day === 0 ?
                        <><span>Night</span> <i className="fa-solid fa-moon"></i></>
                        : <><span>Day</span> <i className="fa-solid fa-sun-bright"></i></>}
                      </p>
                      <p className="text-xs mt-1">Last Updated :{currentWeather.last_updated}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 md:mt-5 flex w-full flex-col items-stretch py-5 px-5 rounded-3xl bg-white  shadow-lg overflow-hidden">
                <div className="flex flex-row gap-1 items-center text-sm font-semibold">
                  <i className="fa-solid fa-clock-two"></i>
                  <h5>Hourly Forecast</h5>
                </div>

                <div className="flex gap-6 md:gap-2 mt-4 overflow-x-auto scrollbar-none">
                  {
                    foreCast.forecastday[0].hour.map((hour) => {
                      const condition = hour.condition.text.trim('').toLowerCase();
                      const is_day = hour.is_day;  

                      return (
                        <div key={hour.time} className="flex flex-col items-center">
                          <h4 className="text-sm font-normal">{hour.time.slice(11)}</h4>
                          
                          <div className="flex flex-col items-center">
                          
                            <HourlyImg condition={condition} day={is_day}  />
                            <p className="text-sm">{Math.round(hour.temp_c)}°</p>
                            <p className="text-blue-600 text-sm">{hour.chance_of_rain > 1 ? `${hour.chance_of_rain}%` : null}</p>
                          </div>
                        </div>
                      );
                    })
                  }
                </div>
              </div>


            </div>

            <div className="mt-0 md:mt-0 col-span-6 md:col-span-4">
              <div className="grid grid-cols-2 justify-items-center gap-4 px-0 md:grid-cols-3 lg:grid-cols-4">

                <div className="col-span-2 w-full">
                  <div className="flex h-40 flex-col overflow-hidden rounded-3xl bg-white p-4 shadow-lg">
                    <div className="flex flex-row gap-1 items-center text-sm font-semibold ">
                      <i className="fa-sharp fa-solid fa-leaf"></i>
                      <h5>Air Pollution</h5>
                    </div>
                    <div className="mt-2 flex flex-col h-full">
                      <h1 className="text-2xl font-semibold">{air_condition}</h1>
                      <input
                        type="range"
                        min={0}
                        max={10}
                        className="mt-2 accent-white slider-thumb h-2 w-full appearance-none overflow-hidden rounded-md"
                        value={currentWeather.air_quality['gb-defra-index']}
                        style={{
                          background: 'linear-gradient(90deg, rgb(58, 110, 180) 0%, rgb(126, 212, 87) 20%, rgb(248, 212, 73) 40%, rgb(235, 77, 96) 60%, rgb(180, 96, 231) 80%, rgb(178, 34, 34) 100%)'
                        }}
                        readOnly
                      />
                    </div>
                    <p className="text-xs">{air_desc}</p>
                  </div>
                </div>


                <div className="flex h-40 w-full flex-col items-stretch overflow-hidden rounded-3xl bg-white p-4 shadow-lg">

                  {currentWeather.is_day === 0 ? 
                  <>
                    <div className="flex flex-row gap-1 items-center text-sm font-semibold">
                      <i className="fa-solid fa-sunrise"></i>
                      <h5>Sunrise</h5>
                    </div>
                    <div className="mt-2 flex flex-col h-full">
                      <h1 className="text-2xl font-semibold">{foreCast.forecastday[0].astro.sunrise}</h1>
                    </div>
                    <p className="text-xs"><i className="fa-solid fa-sunset"></i> Sunset {foreCast.forecastday[0].astro.sunset}</p>
                  </>
                  :
                  <>
                    <div className="flex flex-row gap-1 items-center text-sm font-semibold">
                      <i className="fa-solid fa-sunset"></i>
                      <h5>Sunset</h5>
                    </div>
                    <div className="mt-2 flex flex-col h-full">
                      <h1 className="text-2xl font-semibold">{foreCast.forecastday[0].astro.sunset}</h1>
                    </div>
                    <p className="text-xs "><i className="fa-solid fa-sunrise"></i> Sunrise {foreCast.forecastday[0].astro.sunrise}</p>
                  </>
                }
                </div>

                <div className="flex h-40 w-full flex-col items-stretch overflow-hidden rounded-3xl bg-white p-4 shadow-lg ">
                  <div className="flex flex-row gap-1 items-center text-sm font-semibold">
                    <i className="fa-solid fa-wind"></i>
                    <h5>Wind</h5>
                  </div>
                  <div className="mt-2 flex flex-col h-full">
                    <h1 className="text-2xl font-semibold">{Math.round(currentWeather.wind_kph)} km/h</h1>
                  </div>
                  <div className="flex gap-1">
                    <i className="fa-sharp fa-solid fa-compass"></i>
                    <p className="text-xs">{currentWeather.wind_dir}</p>
                  </div>
                </div>

                <div className="flex h-40 w-full flex-col overflow-hidden rounded-3xl bg-white p-4 shadow-lg ">
                  <div className="flex flex-row gap-1 items-center text-sm font-semibold">
                    <i className="fa-solid fa-sun-bright"></i>
                    <h5>UV Index</h5>
                  </div>
                  <div className="mt-2 flex flex-col h-full">
                    <div className="flex items-center gap-2">
                      <h1 className="text-2xl font-semibold">{Math.round(currentWeather.uv)}</h1>
                      <h1>{uv_condition}</h1>
                    </div>
                    <input type="range" min={0} max={10} className="mt-2 accent-white slider-thumb h-2 w-full appearance-none overflow-hidden rounded-md" value={currentWeather.uv} style={{ background: 'linear-gradient(90deg, rgb(58, 110, 180) 0%, rgb(126, 212, 87) 20%, rgb(248, 212, 73) 40%, rgb(235, 77, 96) 60%, rgb(180, 96, 231) 80%, rgb(178, 34, 34) 100%)' }} readOnly />
                  </div>
                  <p className="text-xs">{uv_desc}</p>
                </div>

                <div className="flex h-40 w-full flex-col items-stretch overflow-hidden rounded-3xl bg-white p-4 shadow-lg ">
                  <div className="flex flex-row gap-1 items-center text-sm font-semibold">
                    <i className="fa-solid fa-droplet"></i>
                    <h5>Precipitation</h5>
                  </div>
                  <div className="mt-2 flex flex-col h-full">
                    <h1 className="text-2xl font-semibold">{foreCast.forecastday[0].day.totalprecip_mm} mm</h1>
                    <h1 className="text-sm font-semibold">Today</h1>
                  </div>
                  <p className="text-xs">
                    {foreCast.forecastday[1].day.totalprecip_mm === 0
                      ? 'No precipitation expected for Tommorrow'
                      : `${foreCast.forecastday[1].day.totalprecip_mm} mm of precipitation expected for Tommorrow`}
                  </p>
                </div>

                <div className="flex h-40 w-full flex-col items-stretch overflow-hidden rounded-3xl bg-white p-4 shadow-lg ">
                  <div className="flex flex-row gap-1 items-center text-sm font-semibold">
                    <i className="fa-solid fa-temperature-high"></i>
                    <h5>Feels Like</h5>
                  </div>
                  <div className="mt-2 flex flex-col h-full">
                    <h1 className="text-2xl font-semibold">{Math.round(currentWeather.feelslike_c)}°</h1>
                  </div>
                  <p className="text-xs">{Math.round(currentWeather.feelslike_c) > Math.round(currentWeather.temp_c) && 'It feels warmer than the actual temperature'}</p>
                  <p className="text-xs">{Math.round(currentWeather.feelslike_c) === Math.round(currentWeather.temp_c) && 'Simler to actual temperature'}</p>
                  <p className="text-xs">{Math.round(currentWeather.feelslike_c) < Math.round(currentWeather.temp_c) && 'It feels cooler than the actual temperature'}</p>
                </div>

                <div className="flex h-40 w-full flex-col items-stretch overflow-hidden rounded-3xl bg-white p-4 shadow-lg ">
                  <div className="flex flex-row gap-1 items-center text-sm font-semibold">
                    <i className="fa-solid fa-droplet-percent"></i>
                    <h5>Humidity</h5>
                  </div>
                  <div className="mt-2 flex flex-col h-full">
                    <h1 className="text-2xl font-semibold">{currentWeather.humidity}%</h1>
                  </div>
                  <p className="text-xs">{`The dew point is ${currentWeather.dewpoint_c}° right now`}</p>
                </div>

                <div className="flex h-40 w-full flex-col items-stretch overflow-hidden rounded-3xl bg-white p-4 shadow-lg ">
                  <div className="flex flex-row gap-1 items-center text-sm font-semibold">
                    <i className="fa-solid fa-eye"></i>
                    <h5>Visibility</h5>
                  </div>
                  <div className="mt-2 flex flex-col h-full">
                    <h1 className="text-2xl font-semibold">{currentWeather.vis_km} km</h1>
                  </div>
                </div>

                <div className="flex h-40 w-full flex-col items-stretch overflow-hidden rounded-3xl bg-white p-4 shadow-lg ">
                  <div className="flex flex-row gap-1 items-center text-sm font-semibold">
                    <i className="fa-solid fa-gauge-high"></i>
                    <h5>Pressure</h5>
                  </div>
                  <div className="mt-2 flex flex-col h-full">
                    <h1 className="text-2xl font-semibold">{currentWeather.pressure_mb}</h1>
                  </div>
                </div>

                <div className="flex h-40 w-full  flex-col items-stretch overflow-hidden rounded-3xl bg-white p-4 shadow-lg ">
                  <div className="flex flex-row gap-1 items-center text-sm font-semibold">
                    <i className="fa-solid fa-chart-line-up"></i>
                    <h5>Average</h5>
                  </div>
                  <div className="mt-2 flex flex-col h-full">
                    <h1 className="text-2xl font-semibold">
                      {currentWeather.temp_c - foreCast.forecastday[0].day.maxtemp_c > 0
                        ? `+${Math.round(currentWeather.temp_c - foreCast.forecastday[0].day.maxtemp_c).toFixed(0)}`
                        : `${Math.round((currentWeather.temp_c - foreCast.forecastday[0].day.maxtemp_c).toFixed(0))}`
                      }
                    </h1>
                    <h1 className="text-sm font-semibold">Average daily high</h1>
                  </div>
                  <div className="flex justify-between text-xs">
                    <div>
                      <h1>Today</h1>
                      <h1>Average</h1>
                    </div>
                    <div>
                      <h1>{Math.round(currentWeather.temp_c)}°</h1>
                      <h1>{Math.round(foreCast.forecastday[0].day.maxtemp_c)}°</h1>
                    </div>
                  </div>
                </div>

                <div className="flex h-40 w-full flex-col items-stretch overflow-hidden rounded-3xl bg-white p-4 shadow-lg ">
                  <div className="flex flex-row gap-1 items-center text-sm font-semibold">
                    <i className="fa-solid fa-moon-stars"></i>
                    <h5>{foreCast.forecastday[0].astro.moon_phase}</h5>
                  </div>
                  <div className="mt-2 flex flex-col h-full text-xs">
                    <div className="flex items-center gap-3">
                      <p >Illumination</p>
                      <h1 className="font-semibold text-end">{foreCast.forecastday[0].astro.moon_illumination}</h1>
                    </div>
                    <div className="flex items-center gap-3">
                      <p>Moon Rise</p>
                      <h1 className="font-semibold text-end">{foreCast.forecastday[0].astro.moonrise}</h1>
                    </div>

                  </div>
                </div>
    
              </div>

              
            </div>
          </div>
          
            <div className="mt-5 w-full overflow-hidden rounded-3xl bg-white p-2 shadow-lg  appearance-none">
                <ReactApexChart hrs={two_hr}></ReactApexChart>
            </div>
        </main>
      </div>
    </div>

  );
};